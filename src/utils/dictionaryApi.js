const SUPPORTED_LANGUAGES = ["en", "es", "fr", "ru", "de", "it", "pt", "ko", "ja", "hi"];

function normalizeLanguage(lang) {
  if (!lang) return "en";
  const code = String(lang).trim().toLowerCase().split("-")[0];
  return SUPPORTED_LANGUAGES.includes(code) ? code : "en";
}

export const DEFAULT_DICTIONARY_LANGUAGE = typeof navigator !== "undefined"
  ? normalizeLanguage(navigator.language || navigator.userLanguage)
  : "en";

export function dictionaryApiUrl(term, language = DEFAULT_DICTIONARY_LANGUAGE) {
  return `https://api.dictionaryapi.dev/api/v2/entries/${normalizeLanguage(language)}/${encodeURIComponent(term)}`;
}
