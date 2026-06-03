declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"directory": {
"021-719-773-cove-road-waipu-info-learn2surf.md": {
	id: "021-719-773-cove-road-waipu-info-learn2surf.md";
  slug: "021-719-773-cove-road-waipu-info-learn2surf";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"3d-verse.md": {
	id: "3d-verse.md";
  slug: "3d-verse";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"5r-studios.md": {
	id: "5r-studios.md";
  slug: "5r-studios";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"accessible-law.md": {
	id: "accessible-law.md";
  slug: "accessible-law";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"advertising-promotions.md": {
	id: "advertising-promotions.md";
  slug: "advertising-promotions";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"andras-flowers-gifts-2.md": {
	id: "andras-flowers-gifts-2.md";
  slug: "andras-flowers-gifts-2";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"andras-flowers-gifts.md": {
	id: "andras-flowers-gifts.md";
  slug: "andras-flowers-gifts";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"antiques-collectibles.md": {
	id: "antiques-collectibles.md";
  slug: "antiques-collectibles";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"automotive.md": {
	id: "automotive.md";
  slug: "automotive";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"bakery-cafe.md": {
	id: "bakery-cafe.md";
  slug: "bakery-cafe";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"bars-pubs.md": {
	id: "bars-pubs.md";
  slug: "bars-pubs";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"beauty.md": {
	id: "beauty.md";
  slug: "beauty";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"blueberry-country.md": {
	id: "blueberry-country.md";
  slug: "blueberry-country";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"building.md": {
	id: "building.md";
  slug: "building";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"cattery.md": {
	id: "cattery.md";
  slug: "cattery";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"clothing.md": {
	id: "clothing.md";
  slug: "clothing";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"coaching.md": {
	id: "coaching.md";
  slug: "coaching";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"cogswell-law.md": {
	id: "cogswell-law.md";
  slug: "cogswell-law";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"cove-flowers.md": {
	id: "cove-flowers.md";
  slug: "cove-flowers";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"creative-brand-aid.md": {
	id: "creative-brand-aid.md";
  slug: "creative-brand-aid";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"diggermate-bream-bay.md": {
	id: "diggermate-bream-bay.md";
  slug: "diggermate-bream-bay";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"education.md": {
	id: "education.md";
  slug: "education";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"email-breambaypatrol-gmail-com.md": {
	id: "email-breambaypatrol-gmail-com.md";
  slug: "email-breambaypatrol-gmail-com";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"empowering-communities-for-a-secure-tomorrow-our-vision-is-a-new-zealand-where-everyone-feels-safe.md": {
	id: "empowering-communities-for-a-secure-tomorrow-our-vision-is-a-new-zealand-where-everyone-feels-safe.md";
  slug: "empowering-communities-for-a-secure-tomorrow-our-vision-is-a-new-zealand-where-everyone-feels-safe";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"engineering.md": {
	id: "engineering.md";
  slug: "engineering";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"excavator-hire.md": {
	id: "excavator-hire.md";
  slug: "excavator-hire";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"family-friendly-2.md": {
	id: "family-friendly-2.md";
  slug: "family-friendly-2";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"family-friendly.md": {
	id: "family-friendly.md";
  slug: "family-friendly";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"florist.md": {
	id: "florist.md";
  slug: "florist";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"gift-shop.md": {
	id: "gift-shop.md";
  slug: "gift-shop";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"glazier.md": {
	id: "glazier.md";
  slug: "glazier";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"golf-club.md": {
	id: "golf-club.md";
  slug: "golf-club";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"grocers-supermarkets.md": {
	id: "grocers-supermarkets.md";
  slug: "grocers-supermarkets";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"hairdresser.md": {
	id: "hairdresser.md";
  slug: "hairdresser";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"hardware.md": {
	id: "hardware.md";
  slug: "hardware";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"health-wellbeing.md": {
	id: "health-wellbeing.md";
  slug: "health-wellbeing";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"huanui-college-is-committed-to-promoting-achievement-and-providing-an-environment-that-encourages-all-students-to-develop-their-abilities-to-achieve-personal-excellence.md": {
	id: "huanui-college-is-committed-to-promoting-achievement-and-providing-an-environment-that-encourages-all-students-to-develop-their-abilities-to-achieve-personal-excellence.md";
  slug: "huanui-college-is-committed-to-promoting-achievement-and-providing-an-environment-that-encourages-all-students-to-develop-their-abilities-to-achieve-personal-excellence";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"industry-vintage.md": {
	id: "industry-vintage.md";
  slug: "industry-vintage";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"inspire-real-estate.md": {
	id: "inspire-real-estate.md";
  slug: "inspire-real-estate";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"inverie-holiday-units.md": {
	id: "inverie-holiday-units.md";
  slug: "inverie-holiday-units";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"itm-well-see-you-right.md": {
	id: "itm-well-see-you-right.md";
  slug: "itm-well-see-you-right";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"jewellers.md": {
	id: "jewellers.md";
  slug: "jewellers";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"join-us-in-paradise.md": {
	id: "join-us-in-paradise.md";
  slug: "join-us-in-paradise";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"landscapers.md": {
	id: "landscapers.md";
  slug: "landscapers";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"lawyers.md": {
	id: "lawyers.md";
  slug: "lawyers";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"learn-2-surf-waipu-cove.md": {
	id: "learn-2-surf-waipu-cove.md";
  slug: "learn-2-surf-waipu-cove";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"left-fields.md": {
	id: "left-fields.md";
  slug: "left-fields";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"liquor-store.md": {
	id: "liquor-store.md";
  slug: "liquor-store";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"little-lato.md": {
	id: "little-lato.md";
  slug: "little-lato";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"local-food-producers.md": {
	id: "local-food-producers.md";
  slug: "local-food-producers";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"maggies-place.md": {
	id: "maggies-place.md";
  slug: "maggies-place";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"manufacturers.md": {
	id: "manufacturers.md";
  slug: "manufacturers";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"massage.md": {
	id: "massage.md";
  slug: "massage";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"mcleods-pizza-barn-northland-s-home-for-award-winning-beer-delicious-food-2.md": {
	id: "mcleods-pizza-barn-northland-s-home-for-award-winning-beer-delicious-food-2.md";
  slug: "mcleods-pizza-barn-northland-s-home-for-award-winning-beer-delicious-food-2";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"mcleods-pizza-barn-northland-s-home-for-award-winning-beer-delicious-food.md": {
	id: "mcleods-pizza-barn-northland-s-home-for-award-winning-beer-delicious-food.md";
  slug: "mcleods-pizza-barn-northland-s-home-for-award-winning-beer-delicious-food";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"mcleods-pizza-barn.md": {
	id: "mcleods-pizza-barn.md";
  slug: "mcleods-pizza-barn";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"museum.md": {
	id: "museum.md";
  slug: "museum";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"natalia-has-worked-in-the-jewellery-industry-for-35-years.md": {
	id: "natalia-has-worked-in-the-jewellery-industry-for-35-years.md";
  slug: "natalia-has-worked-in-the-jewellery-industry-for-35-years";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"nsp-the-most-experienced-excavator-bucket-manufacturer-in-new-zealand.md": {
	id: "nsp-the-most-experienced-excavator-bucket-manufacturer-in-new-zealand.md";
  slug: "nsp-the-most-experienced-excavator-bucket-manufacturer-in-new-zealand";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"origin-northland.md": {
	id: "origin-northland.md";
  slug: "origin-northland";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"other-services-available.md": {
	id: "other-services-available.md";
  slug: "other-services-available";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"pharmacy.md": {
	id: "pharmacy.md";
  slug: "pharmacy";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"professional-services.md": {
	id: "professional-services.md";
  slug: "professional-services";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"radio.md": {
	id: "radio.md";
  slug: "radio";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"ray-white-bream-bay-waipu.md": {
	id: "ray-white-bream-bay-waipu.md";
  slug: "ray-white-bream-bay-waipu";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"real-estate-agents.md": {
	id: "real-estate-agents.md";
  slug: "real-estate-agents";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"rest-home.md": {
	id: "rest-home.md";
  slug: "rest-home";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"second-hand-shops.md": {
	id: "second-hand-shops.md";
  slug: "second-hand-shops";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"sports-recreation.md": {
	id: "sports-recreation.md";
  slug: "sports-recreation";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"surf-shack.md": {
	id: "surf-shack.md";
  slug: "surf-shack";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"swanky-pants-2.md": {
	id: "swanky-pants-2.md";
  slug: "swanky-pants-2";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"swanky-pants.md": {
	id: "swanky-pants.md";
  slug: "swanky-pants";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"the-celtic-barn.md": {
	id: "the-celtic-barn.md";
  slug: "the-celtic-barn";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"the-harker-herbals-difference.md": {
	id: "the-harker-herbals-difference.md";
  slug: "the-harker-herbals-difference";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"the-shred.md": {
	id: "the-shred.md";
  slug: "the-shred";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"the-smouldering-hog.md": {
	id: "the-smouldering-hog.md";
  slug: "the-smouldering-hog";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"top-gun-civil-consulting.md": {
	id: "top-gun-civil-consulting.md";
  slug: "top-gun-civil-consulting";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"trades.md": {
	id: "trades.md";
  slug: "trades";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"view-website.md": {
	id: "view-website.md";
  slug: "view-website";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"waipu-bakery.md": {
	id: "waipu-bakery.md";
  slug: "waipu-bakery";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"waipu-cove-resort.md": {
	id: "waipu-cove-resort.md";
  slug: "waipu-cove-resort";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"waipu-pharmacy-is-your-friendly-local-pharmacy-in-waipu.md": {
	id: "waipu-pharmacy-is-your-friendly-local-pharmacy-in-waipu.md";
  slug: "waipu-pharmacy-is-your-friendly-local-pharmacy-in-waipu";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"waipu-scottish-migration-museum.md": {
	id: "waipu-scottish-migration-museum.md";
  slug: "waipu-scottish-migration-museum";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"waipu-yoga-to-promote-yoga-in-the-bream-bay-area-of-northland-nz.md": {
	id: "waipu-yoga-to-promote-yoga-in-the-bream-bay-area-of-northland-nz.md";
  slug: "waipu-yoga-to-promote-yoga-in-the-bream-bay-area-of-northland-nz";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"we-welcome-new-clients-both-farm-and-companion-animals.md": {
	id: "we-welcome-new-clients-both-farm-and-companion-animals.md";
  slug: "we-welcome-new-clients-both-farm-and-companion-animals";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"we-work-with-russell-health-spot-to-service-the-healthcare-needs-of-the-community.md": {
	id: "we-work-with-russell-health-spot-to-service-the-healthcare-needs-of-the-community.md";
  slug: "we-work-with-russell-health-spot-to-service-the-healthcare-needs-of-the-community";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"were-open-6-days-a-week-to-help-with-all-of-your-health-and-wellbeing-needs.md": {
	id: "were-open-6-days-a-week-to-help-with-all-of-your-health-and-wellbeing-needs.md";
  slug: "were-open-6-days-a-week-to-help-with-all-of-your-health-and-wellbeing-needs";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
"www.md": {
	id: "www.md";
  slug: "www";
  body: string;
  collection: "directory";
  data: InferEntrySchema<"directory">
} & { render(): Render[".md"] };
};
"events": {
"christmas-parade.md": {
	id: "christmas-parade.md";
  slug: "christmas-parade";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
};
"explore": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "explore";
  data: InferEntrySchema<"explore">;
  render(): Render[".md"];
}>;

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
