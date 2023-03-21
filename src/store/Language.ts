import { browser } from '$app/environment';
import { derived, writable } from 'svelte/store';
import type { Locale, Translations } from '$src/types/Language';
import translations, { supportedLanguages } from '$src/helpers/translations';
import config from '$src/helpers/config';

// If no translations for a given locale key are found, fallback to English
const fallbackLocale: Locale = 'en';

// Gets the initial language, either from local storage (if browser), or from the config
const initialLocale = (browser ? (localStorage.getItem('locale') as Locale) : null)
  || config.defaultLanguage
  || 'en';

// The currently selected language
export const locale = writable<Locale>(initialLocale);

// Full list of available languages
export const locales = Object.keys(translations) as Locale[];

// When lang updated, save in localStorage ready for next time
locale &&
  locale.subscribe((newLocale: Locale) => {
    if (browser) localStorage.locale = newLocale;
  });

// The main translation function, which returns a value for given key and locale
function translate(locale: Locale, key: string, vars: Translations[Locale]) {
  // Throw error if locale not found
  if (!translations[locale])
    throw new Error(`No translations found for ${locale}`);

  // Get the text from the translations for locale or fallback to default locale
  let text = translations[locale][key] || translations[fallbackLocale][key];

  // Throw error if no translation found
  if (!text) throw new Error(`No translation found for ${locale}.${key}`);

  // Replace any passed in variables in the translation string.
  Object.keys(vars).map((k) => {
    const regex = new RegExp(`{{${k}}}`, 'g');
    text = text.replace(regex, vars[k]);
  });

  return text;
}

// For use within component, with $t('key', { vars }) to return actual text
export const t = derived(
  locale,
  ($locale) =>
    (key: string, vars = {}) =>
      translate($locale, key, vars)
);

// Returns the meta data for the current language (flag, name, etc)
export const languageMeta = derived(locale, ($locale) =>
  supportedLanguages.find((l) => l.code === $locale)
);
