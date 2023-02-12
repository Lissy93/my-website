import type { Translations } from '$src/types/Language';

const translations: Translations = {
  en: {
    // Page titles
    'pages.home': 'Home',
    'pages.blog': 'Blog',
    'pages.about': 'About',
    'pages.contact': 'Contact',
    'pages.projects': 'Projects',

    // Blog page text
    'blog.sources-menu': 'Sources',
    'blog.sources-all': 'Select All',
    'blog.sources-none': 'Clear Checked',
    'blog.read-more': 'Read more',
    'blog.time-days-ago': 'days ago',
    'blog.time-years-ago': 'years ago',
    'blog.post-hover.read': 'Read',
    'blog.post-hover.from': 'From',
    'blog.search.showing': 'Showing {{count}} results for "{{query}}"',
    'blog.search.clear': 'Clear',
    'blog.results.none': 'No Results',
    'blog.results.none-1': 'There were no results returned.',
    'blog.results.none-2': 'Try selecting more feeds in the dropdown, or broadening your search term',
    'blog.error': 'Oh no, something real bad happened',
  },
};

export default translations;
