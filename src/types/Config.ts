import type { RssUrlList } from '$src/types/RssXml';
import type { Usernames } from '$src/types/Socials';
import type { Locale } from '$src/types/Language';

export type Theme = 'dark' | 'light' | 'system' | 'callisto';

export interface TechStackItem {
  language: string;
  projects: string[];
};

export interface SiteConfig {
  title: string; // Website title / name
  description: string; // Website description
  source: string; // Link to project source (e.g. on GitHub)
  baseUrl: string; // The URL where the site is hosted
  loadIndex?: boolean; // Weather to skip to /index instead of /home
  initialFeeds: RssUrlList; // List of RSS feeds to fetch + show on load
  additionalFeeds: RssUrlList; // List of all available feeds to add to filter dropdown
  defaultLanguage: Locale; // Default language to use if 'system' is not supported
  defaultTheme: Theme; // Default theme to use if 'system' is not supported
  colorSchemes?: {
    [key: string]: {
      // Theme name
      [key: string]: string; // Theme values
    };
  }; // Will be converted to CSS variables
  routeLinks: {
    // List of route links to show in the navbar
    route: string;
    label: string;
    color?: string;
    description?: string;
  }[];
  footerInfo: {
    // Meta and legal info to display in the footer
    author: string;
    authorSite: string;
    license: string;
    licenseLink: string;
    copyright: boolean;
  };
  githubUser: string; // GitHub username to fetch projects from
  workExperience: {
    company: string;
    companyUrl: string;
    companyLogo: string;
    jobTitle: string;
    datesWorked: string;
    responsibilities?: string;
    projectType?: 'Projects' | 'Clients' | 'Regiments' | string;
    projects?: {
      name: string;
      logo: string;
      description: string;
    }[];
    technologies?: string[];
  }[];
  projectComplimentaryData: {
    name: string; // GitHub repo name
    thumbnail: string; // URL to thumbnail image
    featured?: boolean; // If true, project will displayed in large size
    language?: string; // Optionally set/ override the repos language
  }[];
  postComplimentaryData: {
    // Optional extra data to attach to posts
    postRef: string; // Post title to attach to
    thumbnail: string; // URL to thumbnail image
  }[];
  contact: {
    name: string; // Full name associated with contact email
    email: string; // Email address to display
    website: string; // URL of personal website
    socials: Usernames; // Keyed list of social media usernames
    socialButtonLimit: number; // Number of social links to show, before show-more clicked
    mailerConfig: {
      // Config for sending mail client-side via emailjs
      service_id: string; // The ID of the service to use
      template_id: string; // The ID of the template to use
      user_id: string; // The users ID / public key
      template_params: {
        [key: string]: string; // And additional template params
      };
    };
    pgpKeyLink: string; // Link to PGP public key
    pgpPublicKey: string; // PGP public key to display
  };
  about: {
    intro: string;
    bio: string[];
    picture: string;
  };
  techStack: {
    [key: string]: TechStackItem[],
  };
  techStackExtras: {
    [key: string]: string[],
  };
  plausible?: {
    scriptSrc: string;
    domain: string;
  },
}
