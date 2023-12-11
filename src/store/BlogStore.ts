import { writable, derived, type Readable } from 'svelte/store';
import type { RssPosts, RssUrlList } from '$src/types/RssXml';
import CONFIG from '$src/helpers/config';

export const blogStore = writable<RssPosts>([]);

export const config = CONFIG;

// List of RSS feeds to fetch + show on load
export const initialFeeds: RssUrlList = config.initialFeeds;

// List of extra feeds, that can be enabled through the UI
export const extraFeeds: RssUrlList = config.additionalFeeds;

// Set the RSS feed URLs to display, to initialFeeds
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
    const normalize = (input: string) =>
      input.toLocaleLowerCase().replaceAll(' ', '');

    // Search post title for matches
    const postTitleResults = $blogStore.filter((post) =>
      normalize(post.title).includes(normalize($searchTerm))
    );
    // If results were found return them, otherwise search entire post body
    if (postTitleResults.length > 0) {
      return postTitleResults;
    } else {
      return $blogStore.filter((post) =>
        normalize(post.description).includes(normalize($searchTerm))
      );
    }
  }
);
