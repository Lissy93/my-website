// import { XMLParser } from 'fast-xml-parser';
// import { get } from 'svelte/store';
// import type { RssResponse } from './../../types/RssXml';
// import { blogStore } from '../../store/BlogStore';

// /** @type {import('./$types').PageLoad} */
// export const load = () => {
//   // If posts already fetched, save time by returning them
//   const existingPosts = get(blogStore);
//   if (existingPosts && existingPosts.length > 0)
//     return { posts: existingPosts };

//   // Uses fast-xml-parser to convert XML RSS feel into JSON format
//   const parseXml = (rawRssData: string): RssResponse => {
//     const parser = new XMLParser();
//     return parser.parse(rawRssData);
//   };

//   // Fetches XML from given URL, calls parse, returns promised post list
//   const fetchPosts = async (rssUrl: string) => {
//     return fetch(rssUrl)
//       .then((response) => response.text())
//       .then((rawXml) => parseXml(rawXml).rss.channel.item);
//   };

//   // Kick off request and process parsed response
//   const RSS_URL = `https://notes.aliciasykes.com/feed`;
//   const posts = fetchPosts(RSS_URL);

//   // Update the store with response, to use later
//   posts.then((response) => {
//     blogStore.update(() => response);
//   });

//   // Return results
//   return { posts };
// };
