import { XMLParser } from 'fast-xml-parser';

const parseXml = (rawRssData: any) => {
  const parser = new XMLParser();
  return parser.parse(rawRssData);
};

/** @type {import('./$types').PageLoad} */
export const load = () => {
  const RSS_URL = `https://notes.aliciasykes.com/feed`;
  const posts = fetch(RSS_URL)
    .then((response) => response.text())
    .then((rawXml) => parseXml(rawXml).rss.channel.item);
  return { posts };
};
