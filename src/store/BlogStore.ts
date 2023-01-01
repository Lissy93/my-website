import { writable, get, derived, type Readable } from 'svelte/store';

import type { RssPosts } from '$src/types/RssXml';
import { fetchPostsFromRss } from '$src/helpers/fetch-rss-posts';

export const blogStore = writable<RssPosts>([]);




  /**
   * Given an array of URLs to RSS ATOM feeds, fetch and parse all posts
   * then merge results together and update the store
   * @param rssUrlList
   */
  const fetchAllPosts = (rssUrlList: string[]) => {
    rssUrlList.forEach((rssUrl) => {
      fetchPostsFromRss(rssUrl).then((response) => {
        const existingPosts = get(blogStore);
        const mergedPostList = [...response, ...existingPosts];
        blogStore.set(mergedPostList);
      });
    });
  };

  if (get(blogStore).length < 1) {
    const urls = [
      'https://notes.aliciasykes.com/feed',
      '/local-feeds/dev-to',
      // '/local-feeds/blogspot.xml',
    ];
    fetchAllPosts(urls);
  }

// RSS Feeds for Testing
// - Dave Steele:					https://davesteele.github.io/feed.xml
// - Serge Zaitsev:				https://zserge.com/rss.xml
// - Luke Smith: 					https://lukesmith.xyz/rss.xml
// - Will Browning				https://willbrowning.me/feed.xml
// - Octocats							https://octodex.github.com/atom.xml
// - Rehan Saeed					https://rehansaeed.com/rss.xml


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
