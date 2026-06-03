/**
 * extract-listings.js
 *
 * Parses crawled Promote Waipu category pages and creates individual
 * CMS markdown files in src/content/directory/.
 *
 * Run from the project root:
 *   node scripts/extract-listings.js
 *
 * Requires Node 18+ (uses fs/promises, URL, etc.)
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CRAWLED_DIR = join(__dirname, '../../crawler/crawled');
const OUTPUT_DIR = join(__dirname, '../src/content/directory');

// Mapping: crawled filename (without .md) → category label
const FILE_CATEGORY_MAP = {
  'accommodation':             'Accommodation',
  'cafe':                      'Bakery & Cafe',
  'restaurants':               'Restaurants',
  'bars-and-pubs':             'Bars & Pubs',
  'health-and-wellbeing':      'Health & Wellbeing',
  'community-groups':          'Community Groups',
  'education':                 'Education',
  'engineering':               'Engineering',
  'florist':                   'Florist',
  'gift-shop':                 'Gift Shop',
  'glazier':                   'Glazier',
  'grocers-and-supermarkets':  'Grocers & Supermarkets',
  'jewellers':                 'Jewellers',
  'liquor-store':              'Liquor Store',
  'local-food-producer':       'Local Food Producer',
  'manufacturers':             'Manufacturers',
  'museum':                    'Museum',
  'pharmacy':                  'Pharmacy',
  'real-estate-agents':        'Real Estate Agents',
  'second-hand-shops':         'Second Hand Shops',
  'sports-and-recreation':     'Sports & Recreation',
  'copy-of-florist':           'Automotive',
  'copy-of-bars-pubs':         'Beauty',
  'copy-of-business-services': 'Building & Construction',
  'copy-of-community-groups':  'Cattery',
  'copy-of-clothing':          'Coaching',
  'copy-of-cattery':           'Clothing',
  'copy-of-engineering':       'Excavator Hire',
  'copy-of-glazier':           'Golf Club',
  'copy-of-grocers-supermarkets': 'Hairdresser',
  'copy-of-hairdresser':       'Hardware',
  'copy-of-lawyers':           'Landscapers & Nursery',
  'copy-of-liquor-store':      'Lawyers',
  'copy-of-museum':            'Massage',
  'copy-of-pharmacy-1':        'Professional Services',
  'copy-of-pharmacy':          'Radio',
  'copy-of-real-estate-agents': 'Rest Home',
  'copy-of-restaurants':       'Trades',
  'copy-of-trades':            'Venues',
  'copy-of-venues':            'Vet',
  'copy-of-vet':               'Yoga',
  'advertising-and-promotion': 'Advertising & Promotion',
  'antiques-and-collectibles':  'Antiques & Collectibles',
  'learn-2-surf-waipu-cove':   'Sports & Recreation',
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/['''`]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractLinks(text) {
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;
  const links = [];
  let m;
  while ((m = linkRe.exec(text)) !== null) {
    links.push({ label: m[1], url: m[2] });
  }
  return links;
}

function findWebsite(blockText) {
  const links = extractLinks(blockText);
  const website = links.find(l =>
    /view\s*website/i.test(l.label) ||
    /^https?:\/\//.test(l.label)
  );
  // Exclude internal promotewaipu.co.nz links
  if (website && !website.url.includes('promotewaipu.co.nz')) {
    return website.url;
  }
  return '';
}

function findFacebook(blockText) {
  const links = extractLinks(blockText);
  const fb = links.find(l =>
    /facebook/i.test(l.label) ||
    /facebook\.com/i.test(l.url)
  );
  return fb?.url || '';
}

function extractPhone(blockText) {
  const m = blockText.match(/(?:Ph|Phone|Tel)[\s:]+([0-9()\s\-+]{6,})/i);
  return m ? m[1].replace(/\s+/g, ' ').trim() : '';
}

function extractEmail(blockText) {
  const links = extractLinks(blockText);
  const emailLink = links.find(l => l.url.startsWith('mailto:'));
  if (emailLink) return emailLink.url.replace('mailto:', '').split('?')[0].trim();
  const emailRe = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}\b/i;
  const m = blockText.match(emailRe);
  return m ? m[0] : '';
}

/**
 * Strip markdown link syntax, headings, and excessive whitespace.
 * Returns clean plain text.
 */
function cleanText(text) {
  return text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')  // strip links, keep label
    .replace(/^#{1,6}\s*/gm, '')               // strip headings
    .replace(/\*\*([^*]+)\*\*/g, '$1')         // strip bold
    .replace(/\*([^*]+)\*/g, '$1')             // strip italic
    .trim();
}

/**
 * Remove boilerplate from a crawled page:
 * - top navigation
 * - footer
 * - Images Found section
 */
function stripBoilerplate(raw) {
  // Remove "## Images Found" and everything after it
  let text = raw.replace(/\n## Images Found[\s\S]*/i, '');

  // Remove footer
  text = text.replace(/© Waipu Business[\s\S]*/i, '');

  // Remove navigation block at the top (lines that are HOME / ABOUT US / BUSINESS etc nav links)
  // The nav block ends when we hit the first real content heading
  const navEnd = text.search(/\n### /);
  if (navEnd > 0) {
    // Keep only the real content
    text = text.slice(navEnd);
  }

  return text.trim();
}

/**
 * Split stripped content into raw business blocks.
 * Splits on ### / #### / ##### headings, or on a name+link pair at the start of a block.
 */
function splitIntoBlocks(text) {
  // Split on any heading-level marker that starts a new business
  const parts = text.split(/\n(?=#{1,5} )/);
  const blocks = [];
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.length > 10) blocks.push(trimmed);
  }
  return blocks.length > 0 ? blocks : [text];
}

/**
 * Parse a single block into a business object.
 */
function parseBlock(block, category) {
  const lines = block.split('\n').map(l => l.trim()).filter(Boolean);

  // Name: strip heading marker from first line
  let name = lines[0]
    .replace(/^#{1,5}\s*/, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')  // strip links
    .trim();

  // If name is very long it probably includes a tagline — keep only up to first sentence or 60 chars
  if (name.length > 80) {
    const firstStop = name.search(/[.!?—–]/);
    if (firstStop > 10) name = name.slice(0, firstStop).trim();
    else name = name.slice(0, 60).trim();
  }

  // Skip blocks that look like navigation or section headers
  const skipNames = [
    'home', 'about us', 'business', 'events', 'shop', 'eat', 'explore',
    'stay', 'subscribe', 'directory', 'accommodation', 'restaurants',
    'community', 'browse the business', 'add a listing', 'browse directory',
  ];
  if (skipNames.some(s => name.toLowerCase().startsWith(s))) return null;
  if (name.length < 2) return null;

  const phone   = extractPhone(block);
  const email   = extractEmail(block);
  const website = findWebsite(block);
  const facebook = findFacebook(block);

  // Description: everything that isn't a link, heading, or contact line
  const descLines = lines
    .slice(1)
    .filter(l => {
      if (/^\[/.test(l)) return false;                     // markdown link lines
      if (/^#{1,5}/.test(l)) return false;                 // headings
      if (/^Ph[\s:]/i.test(l)) return false;               // phone lines
      if (/^Phone[\s:]/i.test(l)) return false;
      if (/^Email[\s:]/i.test(l)) return false;
      if (/^Facebook[\s:]/i.test(l)) return false;
      if (/^Location[\s:]/i.test(l)) return false;
      if (/^View [Ww]ebsite/.test(l)) return false;
      if (/^view [Ff]acebook/.test(l)) return false;
      if (/^view [Pp]age/.test(l)) return false;
      if (/©/.test(l)) return false;
      if (/ADD A LISTING|BROWSE DIRECTORY/i.test(l)) return false;
      return true;
    })
    .map(l => cleanText(l))
    .filter(Boolean);

  const description = descLines.slice(0, 3).join(' ').replace(/\s+/g, ' ').trim();

  if (!name || name.length < 2) return null;

  return { name, category, phone, email, website, facebook, description };
}

function yamlSafe(str) {
  if (!str) return "''";
  // If value contains single quotes, use double-quoted style
  if (str.includes("'")) return `"${str.replace(/"/g, '\\"')}"`;
  return `'${str}'`;
}

function buildMarkdown(biz) {
  return [
    '---',
    `name: ${yamlSafe(biz.name)}`,
    `published: true`,
    `featured: false`,
    `category: ${yamlSafe(biz.category)}`,
    `address: ''`,
    `phone: ${yamlSafe(biz.phone)}`,
    `email: ${yamlSafe(biz.email)}`,
    `website: ${yamlSafe(biz.website)}`,
    `facebook: ${yamlSafe(biz.facebook)}`,
    `instagram: ''`,
    `logo: ''`,
    `image: ''`,
    `description: ${yamlSafe(biz.description)}`,
    '---',
    '',
  ].join('\n');
}

// ── Main ─────────────────────────────────────────────────────────────────────

if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

// Track slugs to avoid duplicate filenames
const usedSlugs = new Set();
// Track already-existing files (so we don't clobber manual entries)
const existing = existsSync(OUTPUT_DIR)
  ? readdirSync(OUTPUT_DIR).map(f => f.replace('.md', ''))
  : [];
existing.forEach(s => usedSlugs.add(s));

let created = 0;
let skipped = 0;

for (const [filename, category] of Object.entries(FILE_CATEGORY_MAP)) {
  const filePath = join(CRAWLED_DIR, `${filename}.md`);
  if (!existsSync(filePath)) {
    console.log(`⚠  Skipping ${filename}.md — file not found`);
    continue;
  }

  const raw = readFileSync(filePath, 'utf-8');
  const content = stripBoilerplate(raw);
  const blocks = splitIntoBlocks(content);

  for (const block of blocks) {
    const biz = parseBlock(block, category);
    if (!biz) continue;

    let slug = slugify(biz.name);
    if (!slug) continue;

    // Deduplicate slug
    let finalSlug = slug;
    let suffix = 2;
    while (usedSlugs.has(finalSlug)) {
      finalSlug = `${slug}-${suffix++}`;
    }
    usedSlugs.add(finalSlug);

    // Don't overwrite manually curated files
    const outPath = join(OUTPUT_DIR, `${finalSlug}.md`);
    if (existsSync(outPath)) {
      skipped++;
      continue;
    }

    writeFileSync(outPath, buildMarkdown(biz), 'utf-8');
    console.log(`✓  Created: ${finalSlug}.md  [${category}]`);
    created++;
  }
}

console.log(`\nDone. ${created} files created, ${skipped} skipped (already exist).`);
console.log('Review the files in src/content/directory/ — some may need cleanup in the CMS.');
