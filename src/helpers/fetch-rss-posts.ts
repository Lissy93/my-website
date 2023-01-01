import { XMLParser } from 'fast-xml-parser';
import type { RssPost, RssPosts } from '$src/types/RssXml';

interface NotSureYet {
  [key: string]: any;
}

/**
 * Helper function to fetch, parse, validate and normalize content from a given RSS feed
 * @param RSS_URL - The URL to the XML formatted ATOM/RSS feed
 * @returns - An array of formatted blog posts
 */
export const fetchPostsFromRss = (RSS_URL: string) => {

  const findValueFromKeys = (dataMass: NotSureYet, keys: string[]): string => {
    const keyWithValue = keys.find((key: string) => dataMass[key]);
    return keyWithValue ? dataMass[keyWithValue] : '';
  }

  const getAuthor = (dataMass: NotSureYet) => {
    if (dataMass.author && typeof dataMass.author === 'string') return dataMass.author;
    if (dataMass.author?.name) return dataMass.author?.name;
    return ''
  };

  // This bit is quite messy, but not all RSS feeds have the same key names
  // So we have to check which properties are available for each attribute
  const normalizePosts = (rawPosts: Array<NotSureYet>): RssPosts => {
    const rssPosts: RssPost[] = [];
    rawPosts.forEach((rawPost: NotSureYet) => {
      const post: RssPost = {
        title: rawPost.title,
        description: findValueFromKeys(rawPost, ['content', 'content:encoded', 'description', 'summary']),
        author: getAuthor(rawPost),
        pubDate: findValueFromKeys(rawPost, ['pubDate', 'published', 'date', 'updated']),
        link: findValueFromKeys(rawPost, ['link', 'guid']),
        tags: findValueFromKeys(rawPost, ['tags', 'category']),
        thumbnail: '',
      }
      rssPosts.push(post);
    });
    return rssPosts;
  };

  // Uses fast-xml-parser to convert XML RSS feel into JSON format
  const parseXml = (rawRssData: string): RssPosts => {
    const parser = new XMLParser();
    const rssJson = parser.parse(rawRssData);
    console.log(rssJson);
    const hopefullyHasData = rssJson?.feed?.entry || rssJson?.rss?.channel?.item || [];
    return normalizePosts(hopefullyHasData);
  };

  // Fetches XML from given URL, then calls the parse and format functions to get post list
  const initiateFetchRequest = async (rssUrl: string) => {
    return fetch(rssUrl)
      .then((response) => response.text())
      .then((rawXml) => parseXml(rawXml));
  };

  // Kick off request and process parsed response
  return initiateFetchRequest(RSS_URL);
};
