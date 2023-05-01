import type { Packaging } from '../MusicBrainz/typeId.ts';
import type { PartialDate } from '../utils/date.ts';

export type HarmonyRelease = {
	title: string;
	artists: ArtistCredit;
	gtin: GTIN;
	externalLinks: ExternalLink[];
	media: HarmonyMedium[];
	releaseDate: PartialDate;
	labels?: Label[];
	packaging?: Packaging;
	images?: Artwork[];
	availableIn?: CountryCode[];
	excludedFrom?: CountryCode[];
};

export type HarmonyMedium = {
	title?: string;
	number?: number;
	format?: MediumFormat;
	tracklist: HarmonyTrack[];
};

export type HarmonyTrack = {
	title: string;
	artists?: ArtistCredit;
	number: number | string;
	/** Track duration in milliseconds. */
	duration: number;
	isrc?: string;
	availableIn?: CountryCode[];
};

export type ArtistCreditName = {
	name: string;
	creditedName?: string;
	externalLink?: URL;
	joinPhrase?: string;
};

type ArtistCredit = ArtistCreditName[];

export type Label = {
	name: string;
	externalLink?: URL;
	catalogNumber?: string;
};

export type Artwork = {
	url: URL;
	thumbUrl?: URL;
	types?: ArtworkType[];
	comment?: string;
};

type ArtworkType = 'front' | 'back';

export type ExternalLink = {
	url: URL;
	types?: LinkType[];
};

export type LinkType =
	| 'discography page'
	| 'free download'
	| 'free streaming'
	| 'mail order'
	| 'paid download'
	| 'paid streaming';

/** MusicBrainz medium formats (incomplete). */
export type MediumFormat =
	| 'Cassette'
	| 'CD'
	| 'CD-R'
	| 'Data CD'
	| 'Digital Media'
	| 'DVD'
	| 'DVD-Audio'
	| 'DVD-Video'
	| 'Vinyl'
	| '7" Vinyl'
	| '12" Vinyl';

/** Global Trade Item Number with 8 (EAN-8), 12 (UPC), 13 (EAN-13) or 14 digits. */
export type GTIN = number | string;

/** ISO 639-1 two letter county code. */
export type CountryCode = string;

export type ReleaseOptions = Partial<{
	withSeparateMedia: boolean;
	withAllTrackArtists: boolean;
	withISRC: boolean;
	withAvailability: boolean;
}>;

export type ProviderName = string;

/** Mapping from the provider's name to the release returned by that provider. */
export type ProviderReleaseMapping = Record<ProviderName, HarmonyRelease | undefined>;

export type ReleaseProperty = keyof HarmonyRelease | 'duration' | 'isrc';

/** Mapping from release properties to lists of preferred providers for these properties */
export type ProviderPreferences = Partial<Record<ReleaseProperty, ProviderName[]>>;