

export interface RssPost {
  title: string,
  author: string,
  description: string,
  link: string,
  pubDate: string,
  [key: string]: any;
}

export interface RssResponse {
  rss: {
    channel: {
      title: string,
      author: string,
      description: string,
      link: string,
      language: string,
      item: RssPost[],
    }
  }
}

export default RssResponse;
