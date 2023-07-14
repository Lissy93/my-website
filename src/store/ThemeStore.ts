import { browser } from '$app/environment';
import { writable, derived, type Readable } from 'svelte/store';
import type { Theme } from '$src/types/Config';
import config from '$src/helpers/config';

// Gets the initial theme, either from local storage (if browser), or from the config
const initialTheme = (browser ? (localStorage.getItem('theme') as Theme) : null)
  || config.defaultTheme;

// The users selected color theme (e.g. light, dark, system, etc)
export const theme = writable<Theme>(initialTheme);

// When theme updated, save in localStorage ready for next time
theme &&
  theme.subscribe((newTheme: Theme) => {
    if (browser) localStorage.theme = newTheme;
  });

// Set the data-theme attribute on the document element
export const setHtmlThemeAttribute = (theme: Theme) => {
  if (browser) document.documentElement.setAttribute('data-theme', theme);
};

export const themeColors = derived([theme], ([$theme]) => {
  const themeData = (config.colorSchemes || {})[$theme] || {};
  setHtmlThemeAttribute($theme);
  return Object.keys(themeData).reduce((acc, key) => {
    acc[key] = themeData[key];
    return acc;
  }, {} as { [index: string]: unknown });
});

// Fetch, compute and encoded CSS properties for the selected theme, ready for injection
export const encodedThemeCss: Readable<string> = derived(
  [theme],
  ([$theme]) => {
    let cssProperties = '';
    const themeData = (config.colorSchemes || {})[$theme] || {};
    Object.keys(themeData).forEach((varName: string) => {
      cssProperties += `--${varName}:${themeData[varName]} !important;`;
    });
    const computedCss = `:root { ${cssProperties} }`;
    const encodedCss = browser
      ? window.btoa(computedCss)
      : Buffer.from(computedCss, 'utf-8').toString('base64');
    return `data:text/css;base64,${encodedCss}`;
  }
);
