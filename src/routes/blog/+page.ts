import { XMLParser } from 'fast-xml-parser';
import type { RssResponse } from './../../types/RssXml';


const parseXml = (rawRssData: any): RssResponse => {
  const parser = new XMLParser();
  return parser.parse(rawRssData);
};

/** @type {import('./$types').PageLoad} */
export const load = () => {
  console.log('Will Load...');
  const RSS_URL = `https://notes.aliciasykes.com/feed`;
  const posts = fetch(RSS_URL)
    .then((response) => response.text())
    .then((rawXml) => parseXml(rawXml).rss.channel.item);
  return { posts };
};
