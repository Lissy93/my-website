import { writable, get, derived, type Readable } from 'svelte/store';
import { XMLParser } from 'fast-xml-parser';

import type { RssPosts, RssResponse } from '$src/types/RssXml';

export const blogStore = writable<RssPosts>([]);

const fetchPosts = () => {
  // Uses fast-xml-parser to convert XML RSS feel into JSON format
  const parseXml = (rawRssData: string): RssResponse => {
    const parser = new XMLParser();
    return parser.parse(rawRssData);
  };

  // Fetches XML from given URL, calls parse, returns promised post list
  const fetchRss = async (rssUrl: string) => {
    return fetch(rssUrl)
      .then((response) => response.text())
      .then((rawXml) => parseXml(rawXml).rss.channel.item);
  };

  // Kick off request and process parsed response
  const RSS_URL = `https://notes.aliciasykes.com/feed`;
  const posts = fetchRss(RSS_URL);
  return posts;
};

if (get(blogStore).length < 1) {
  fetchPosts().then((response) => {
    blogStore.set(response);
  });
}


export const searchTerm = writable('');

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