/**
 * Data types for blog posts parsed from RSS feed
 */

export interface RssPost {
  title: string;
  author: string;
  description: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
  tags?: string;
  [key: string]: any;
}

export type RssPosts = RssPost[] | [];

export interface RssResponse {
  rss: {
    channel: {
      title: string;
      author: string;
      description: string;
      link: string;
      language: string;
      item: RssPosts;
    };
  };
}

export enum PostStatus {
  Loading,
  NotFound,
  Errored,
  Ready,
}

export interface RssUrlItem {
  label: string;
  url: string;
}

export type RssUrlList = RssUrlItem[] | [];
