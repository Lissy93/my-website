
import type { RssUrlList } from '$src/types/RssXml';

interface SiteConfig {
  title: string, // Website title / name
  source: string, // Link to project source (e.g. on GitHub)
  initialFeeds: RssUrlList, // List of RSS feeds to fetch + show on load
  additionalFeeds: RssUrlList, // List of all available feeds to add to filter dropdown
  routeLinks: { // List of route links to show in the navbar
    route: string,
    label: string,
  }[],
  routeColors?: { // Accent colors for each route (may be hex code, or CSS variable)
    route: string,
    color: string,
  }[],
  footerInfo: { // Meta and legal info to display in the footer
    author: string,
    authorSite: string,
    license: string,
    licenseLink: string,
    copyright: boolean,
  },
};

const config: SiteConfig = {
  title: 'Alicia Sykes',
  source: '',
  initialFeeds: [
    { label: 'Notes', url: 'https://notes.aliciasykes.com/feed' },
  ],
  additionalFeeds: [
    { label: 'Notes', url: 'https://notes.aliciasykes.com/feed' },
    { label: 'Dev.to', url: '/local-feeds/dev-to.atom' },
    { label: 'BlogSpot', url: '/local-feeds/blogspot.atom' },
    { label: 'GitHub', url: '/local-feeds/github.atom' },
    { label: 'StackOverflow', url: '/local-feeds/stackoverflow.atom' },
    { label: 'Twitter', url: '/local-feeds/twitter.atom' },
    { label: 'Reddit', url: '/local-feeds/reddit.atom' },
    { label: 'Mastodon', url: '/local-feeds/mastodon.atom' },
    { label: 'YouTube', url: '/local-feeds/youtube.atom' },
  ],
  routeLinks: [
    { label: 'Home', route: '/home' },
    { label: 'Blog', route: '/blog' },
    { label: 'Projects', route: '/projects' },
    { label: 'Contact', route: '/contact' },
    { label: 'About', route: '/about' },
  ],
  routeColors: [
    { route: '/home', color: '#ff0099' },
    { route: '/blog', color: '#b45eff' },
    { route: '/about', color: '#01c0f0' },
    { route: '/contact', color: '#ff0099' },
    { route: '/projects', color: '#b45eff' },
  ],
  footerInfo: {
    author: 'Alicia Sykes',
    authorSite: 'https://github.com/lissy93',
    license: 'MIT',
    licenseLink: '',
    copyright: true,
  },
};

export default config;
