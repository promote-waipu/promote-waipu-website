# Promote Waipu — Website

**promotewaipu.co.nz**  
Built with [Astro](https://astro.build) · Edited via [CloudCannon](https://cloudcannon.com) · Hosted on [Azure Static Web Apps](https://azure.microsoft.com/en-us/products/app-service/static)

---

## Stack Overview

| Layer | Tool | Cost |
|-------|------|------|
| Framework | Astro (static site generator) | Free / open source |
| CMS (editor UI) | CloudCannon | Free tier available |
| Hosting | Azure Static Web Apps | Free tier |
| CI/CD | Azure DevOps Pipelines | Free tier |
| Forms | Formspree | Free tier (50 submissions/month) |
| Email newsletter | Mailchimp or Buttondown | Free tier |
| DNS | Cloudflare (recommended) | Free |

**Total ongoing cost: $0–$25/month** depending on CloudCannon tier needed.

---

## Project Structure

```
promote-waipu/
├── src/
│   ├── layouts/
│   │   └── Base.astro          # Shared header/footer/nav for all pages
│   ├── pages/
│   │   ├── index.astro         # Home page
│   │   ├── about.astro         # About Us
│   │   ├── contact.astro       # Contact + enquiry form
│   │   ├── join.astro          # Membership application form
│   │   ├── events/
│   │   │   └── index.astro     # Events listing page
│   │   ├── directory/
│   │   │   ├── index.astro     # Directory listing page (filterable)
│   │   │   └── add.astro       # Add a business listing form
│   │   ├── explore/
│   │   │   └── index.astro     # Explore Waipu
│   │   └── stay.astro          # Stay in Waipu
│   └── content/
│       ├── events/             # One .md file per event (editable in CloudCannon)
│       ├── directory/          # One .md file per business listing
│       └── explore/            # One .md file per explore location
├── public/
│   └── images/                 # Static images
├── .cloudcannon/
│   └── schemas/                # Field schemas for CloudCannon editor forms
├── cloudcannon.config.yml      # CloudCannon CMS configuration
├── astro.config.mjs            # Astro configuration
└── azure-pipelines.yml         # CI/CD — builds and deploys on push to main
```

---

## Developer Setup

```bash
# Clone the repo
git clone https://YOUR_ORG@dev.azure.com/YOUR_ORG/promote-waipu/_git/promote-waipu
cd promote-waipu

# Install dependencies
npm install

# Start local dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build
```

---

## CMS Setup (CloudCannon)

1. Sign up at [cloudcannon.com](https://cloudcannon.com)
2. Create a new site → connect to your Azure DevOps repository
3. CloudCannon reads `cloudcannon.config.yml` automatically
4. Invite the coordinator as an editor — they get a visual editing interface
5. When they save a page, CloudCannon commits to the repo → pipeline triggers → site rebuilds in ~60 seconds

### What the coordinator can edit

- **Events** — add, edit, archive events (date, description, image, ticket link)
- **Business Directory** — add and update business listings per category
- **Explore pages** — update descriptions and images for Waipu Cove, Caves, etc.
- **Page content** — edit body text on About, Home, Stay, Shop, Eat pages
- **Navigation** — reorder/add menu items via the data editor

---

## Forms Setup (Formspree)

1. Sign up at [formspree.io](https://formspree.io)
2. Create three forms:
   - **Contact / Enquiry** → emails to `hello@promotewaipu.co.nz`
   - **Add a Business Listing** → emails to `secretary@promotewaipu.co.nz`
   - **Join / Membership** → emails to `secretary@promotewaipu.co.nz`
3. Copy each form's ID into the relevant `.astro` page (replace `YOUR_FORM_ID`)

Free tier: 50 submissions/month per form. Upgrade if needed (~$10/month).

---

## Azure Static Web Apps Deployment

1. Create a Static Web App in the Azure portal
2. Connect to your Azure DevOps repo
3. Set output location to `dist`
4. Copy the deployment token
5. Add as pipeline variable `AZURE_STATIC_WEB_APPS_API_TOKEN` (secret)
6. Add your custom domain `promotewaipu.co.nz` in the Azure portal
7. Azure provides a free SSL certificate automatically

---

## DNS Configuration (after hosting is live)

Update at Cloudflare (or current DNS provider):

```
Type    Name    Value
A       @       (Azure Static Web App IP — provided by Azure)
CNAME   www     (Azure Static Web App hostname)
MX      @       (mail provider records)
TXT     @       v=spf1 ... (mail provider SPF)
TXT     _dmarc  v=DMARC1; p=quarantine; rua=mailto:dmarc@promotewaipu.co.nz
```

---

## Content Editing Guide (for coordinator)

See `/docs/editor-guide.md` for step-by-step instructions for the coordinator —
how to log into CloudCannon, add an event, update a business listing, etc.

---

## Contacts

| Role | Contact |
|------|---------|
| Technical | [your email] |
| Promote Waipu general | hello@promotewaipu.co.nz |
| Secretary | secretary@promotewaipu.co.nz |
