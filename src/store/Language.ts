import { derived, writable } from 'svelte/store';
import type { Locale, Translations } from '$src/types/Language';
import translations from '$src/helpers/translations';

export const locale = writable<Locale>('en');
export const locales = Object.keys(translations) as Locale[];

const defaultLocale = locales[0];

function translate(locale: Locale, key: string, vars: Translations[Locale]) {

  // Throw error if locale not found
  if (!translations[locale]) throw new Error(`No translations found for ${locale}`);

  // Get the text from the translations for locale or fallback to default locale
  let text = translations[locale][key] || translations[defaultLocale][key];

  // Throw error if no translation found
  if (!text) throw new Error(`No translation found for ${locale}.${key}`);

  // Replace any passed in variables in the translation string.
  Object.keys(vars).map((k) => {
    const regex = new RegExp(`{{${k}}}`, 'g');
    text = text.replace(regex, vars[k]);
  });

  return text;
}

export const t = derived(locale, ($locale) => (key: string, vars = {}) =>
  translate($locale, key, vars)
);
