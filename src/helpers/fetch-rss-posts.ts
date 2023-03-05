import { XMLParser } from 'fast-xml-parser';
import config from '$src/helpers/config';
import type { RssPost, RssPosts, RssUrlList } from '$src/types/RssXml';

// Datatype for JSON parsed from RSS
// At this point, we don't know what the structure is
interface NotSureYet {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/**
 * Helper function to fetch, parse, validate and normalize content from a given RSS feed
 * @param RSS_URL - The URL to the XML formatted ATOM/RSS feed
 * @returns - An array of formatted blog posts
 */
export const fetchPostsFromRss = (
  RSS_FEEDS: RssUrlList,
  svelteFetch?: () => Promise<Response>
) => {
  // Returns first matching value, from an array of possible keys
  const findValueFromKeys = (dataMass: NotSureYet, keys: string[]): string => {
    const keyWithValue = keys.find((key: string) => dataMass[key]);
    return keyWithValue ? dataMass[keyWithValue] : '';
  };

  // Author data structure in RSS varies, so check if it's a string/ object of summin else
  const getAuthor = (dataMass: NotSureYet) => {
    if (dataMass.author && typeof dataMass.author === 'string')
      return dataMass.author;
    return dataMass.author?.name || dataMass['dc:creator'] || '';
  };

  // Some feeds (aka Mastodon) don't include a title. Make an artificial title from content
  const makeBackupTitle = (post: RssPost | NotSureYet) => {
    const desc = findValueFromKeys(post, [
      'content',
      'content:encoded',
      'description',
      'summary',
    ]);
    const formattedDesc = desc.replace(/<(.|\n)*?>/g, '');
    return formattedDesc.length > 36
      ? formattedDesc.slice(0, 50) + '...'
      : formattedDesc;
  };

  // Since RSS is a bit limited, we can manually attach extra data to certain posts
  const appendAdditionalInfo = (post: RssPost) => {
    const extraInfo = config.postComplimentaryData || [];
    const makeRef = (ref: string) =>
      ref.toLocaleLowerCase().replace(/\W+/g, '') || '___';
    const match = extraInfo.find((info) =>
      makeRef(post.title).includes(makeRef(info.postRef))
    );
    return match || {};
  };

  // This bit is quite messy, but not all RSS feeds have the same key names
  // So we have to check which properties are available for each attribute
  const normalizePosts = (rawPosts: Array<NotSureYet>): RssPosts => {
    const rssPosts: RssPost[] = [];
    rawPosts.forEach((rawPost: NotSureYet) => {
      const post: RssPost = {
        title: rawPost.title || makeBackupTitle(rawPost),
        description: findValueFromKeys(rawPost, [
          'content',
          'content:encoded',
          'description',
          'summary',
        ]),
        author: getAuthor(rawPost),
        pubDate: findValueFromKeys(rawPost, [
          'pubDate',
          'published',
          'date',
          'updated',
        ]),
        link: findValueFromKeys(rawPost, ['link', 'guid']),
        tags: findValueFromKeys(rawPost, ['tags', 'category']),
        thumbnail: findValueFromKeys(rawPost, ['media:thumbnail']) || '',
      };
      rssPosts.push({ ...post, ...appendAdditionalInfo(post) });
    });
    return rssPosts;
  };

  // Filters out any possible duplicate posts with same URL
  const removeDuplicates = (postsList: RssPosts): RssPosts => {
    return postsList.filter((post) =>
      postsList.find((p) => p.url === post.url)
    );
  };

  // Sorts combined list of posts in ascending order by date
  const sortByDate = (postList: RssPosts): RssPosts => {
    return postList.sort((a, b) => {
      return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
    });
  };

  // Parses the XML data into JSON format, using fast-xml-parser
  const parseXml = (rawRssData: string): RssPosts => {
    const parser = new XMLParser();
    const rssJson = parser.parse(rawRssData);
    const hopefullyHasData =
      rssJson?.feed?.entry || rssJson?.rss?.channel?.item || [];
    return normalizePosts(hopefullyHasData);
  };

  // Fetches data from an RSS endpoint, and initiates the parsing of the XML
  const fetchSinglePost = async (rssUrl: string) => {
    const fetchMethod = svelteFetch || fetch;
    return fetchMethod(rssUrl)
      .then((response) => response.text())
      .then((rawXml) => parseXml(rawXml));
  };

  // Initiates requests for an array of RSS feeds
  const fetchAllPosts = async (feeds: RssUrlList): Promise<RssPost[]> => {
    return await Promise.all(
      // Fetch data from all RSS feeds in array
      feeds.map((feed) => fetchSinglePost(feed.url))
    ).then(
      // Flattern, de-duplicate and sort combined results
      (result) => sortByDate(removeDuplicates(result.flat()))
    );
  };

  // Kick off request and process parsed response
  return fetchAllPosts(RSS_FEEDS);
};
