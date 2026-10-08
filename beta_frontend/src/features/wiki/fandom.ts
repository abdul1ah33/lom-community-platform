/**
 * The community Fandom wiki: the fallback for anything our own wiki doesn't cover yet.
 * It is NOT spoiler-filtered, so every link to it goes through FandomLink's warning.
 */
const FANDOM_ORIGIN = "https://lordofthemysteries.fandom.com";

export const FANDOM_HOME = `${FANDOM_ORIGIN}/wiki/Lord_of_Mysteries_Wiki`;

/**
 * Fandom's search for `query`. `go=Go` is MediaWiki's "jump to the article on an exact title
 * match"; anything else lands on the results page.
 */
export function fandomSearchUrl(query: string) {
  return `${FANDOM_ORIGIN}/wiki/Special:Search?search=${encodeURIComponent(query.trim())}&go=Go`;
}
