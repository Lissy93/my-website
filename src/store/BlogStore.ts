import { writable, derived, type Readable } from 'svelte/store';
import type { RssPosts, RssUrlList } from '$src/types/RssXml';

export const blogStore = writable<RssPosts>([]);

const initialFeeds: RssUrlList = [
  { label: 'Notes', url: 'https://notes.aliciasykes.com/feed' },
];

export const extraFeeds: RssUrlList = [
  { label: 'Notes', url: 'https://notes.aliciasykes.com/feed' },
  { url: '/local-feeds/dev-to.atom', label: 'Dev.to' },
  { url: '/local-feeds/blogspot.atom', label: 'Blogspot' },
  { url: '/local-feeds/github.atom', label: 'GitHub' },
  { url: '/local-feeds/stackoverflow.atom', label: 'StackOverflow' },
];

// RSS Feeds for Testing
// - Dave Steele:					https://davesteele.github.io/feed.xml
// - Serge Zaitsev:				https://zserge.com/rss.xml
// - Luke Smith: 					https://lukesmith.xyz/rss.xml
// - Will Browning				https://willbrowning.me/feed.xml
// - Octocats							https://octodex.github.com/atom.xml
// - Rehan Saeed					https://rehansaeed.com/rss.xml

// The list of URLs to RSS feeds to fetch
export const rssFeedUrls = writable<RssUrlList>(initialFeeds);

// Stores the users search term, for filtering posts
export const searchTerm = writable('');

// If 'searchTerm' is present, return only matching posts to render
export const filtered: Readable<RssPosts> = derived(
    [searchTerm, blogStore], 
    ([$searchTerm, $blogStore]) => {
      // If no search term, return everything
      if (!$searchTerm) return $blogStore;

      // For more accurate searches, ignore case and whitespace
      const normalize = (input: string) => input.toLocaleLowerCase().replaceAll(' ', '');

      // Search post title for matches
      const postTitleResults = $blogStore.filter(
        post => normalize(post.title).includes(normalize($searchTerm))
      );
      // If results were found return them, otherwise search entire post body
      if (postTitleResults.length > 0) {
        return postTitleResults;
      } else {
        return $blogStore.filter(
          post => normalize(post.description).includes(normalize($searchTerm))
        );
      }
    }
);
