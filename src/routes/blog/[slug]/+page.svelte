<script lang="ts">
  import { get } from 'svelte/store';
  import { goto } from '$app/navigation';
  import type { RssPost, RssPosts, RssUrlList } from '$src/types/RssXml';
  import { PostStatus } from '$src/types/RssXml';
  import { blogStore, rssFeedUrls, extraFeeds } from '$src/store/BlogStore';
  import { slugify, formatDate } from '$src/helpers/post-utils';
  import type { PageData } from './$types';
  import ArticleContent from '$src/components/ArticleContent.svelte';
  import NotFound from '$src/components/NotFound.svelte';
  import Loading from '$src/components/Loading.svelte';
  import Heading from '$src/components/Heading.svelte';
  import { fetchPostsFromRss } from '$src/helpers/fetch-rss-posts';
  import config from '$src/helpers/config';

  export let data: PageData; // Svelte data about current page

  let fetchedPrimary = false;
  let fetchedExtra = false;

  let postStatus: PostStatus = PostStatus.Loading; // Will store post status
  const postSlug = data.slug; // The URL slug, to reference blog post
  let postToRender: RssPost | undefined; // Will store the blog post to render

  const triggerPostLoad = (feeds: RssUrlList) => {
    const posts: Promise<RssPost[]> = fetchPostsFromRss(feeds);
    posts
      .then((resolvedPosts) => {
        postStatus = PostStatus.Ready;
        blogStore.set(resolvedPosts);
      })
      .catch(() => {
        postStatus = PostStatus.Errored;
      });
  };

  /* Updates the status, to determine which view is shown */
  const updateStatus = () => {
    if ($blogStore.length === 0) {
      postStatus = PostStatus.Loading;
      if (!fetchedPrimary) {
        triggerPostLoad(get(rssFeedUrls));
        fetchedPrimary = true;
      }
    } else if (!postToRender) {
      postStatus = PostStatus.NotFound;
      if (!fetchedExtra) {
        triggerPostLoad(extraFeeds);
        fetchedExtra = true;
      }
    } else {
      postStatus = PostStatus.Ready;
    }
  };

  /* Given an array of posts, and a post slug, return the matching post */
  const getPostToRender = (
    posts: RssPosts,
    slug: string
  ): RssPost | undefined => {
    return posts.find((post: RssPost) => slugify(post.title) === slug);
  };

  /* Update page title with blog post title, or current state */
  const makeTitle = () => {
    let title = 'Read Article';
    if (postToRender?.title) title = postToRender.title;
    else if (postStatus === PostStatus.Loading) title = 'Loading Post';
    else if (postStatus === PostStatus.NotFound) title = 'Post not Found';
    else if (postStatus === PostStatus.Errored) title = 'Error';
    return `${title} | Alicia Sykes's Blog`;
  };

  const makeDescription = () => {
    return postToRender
      ? postToRender?.description
          .replace(/<\/?[^>]+(>|$)/g, '')
          .substring(0, 200) + '...'
      : "Read this article, and many more on Alicia Sykes's blog";
  };

  /**
   * Navigate the user back to the main blog page
   */
  const goBackToPostPage = () => {
    goto('/blog');
  };

  // Get the post to render, using post list from store, and slug from URL
  postToRender = getPostToRender($blogStore, postSlug);
  updateStatus();

  // If the list of posts in the store is empty, subscribe to re-execute when populated
  if (!postToRender) {
    blogStore.subscribe((posts) => {
      postToRender = getPostToRender(posts, postSlug);
      updateStatus();
    });
  }

  $: title = makeTitle();
  $: description = makeDescription();
</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>{title}</title>
  <meta name="title" content={title} />
  <meta name="description" content={description} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article" />
  <meta property="og:url" content={config.baseUrl} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />

  <!-- Image, if present -->
  {#if postToRender?.thumbnail}
    <meta property="og:image" content={postToRender?.thumbnail} />
    <meta property="twitter:image" content={postToRender?.thumbnail} />
  {/if}

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={config.baseUrl} />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={description} />
</svelte:head>

{#if postStatus === PostStatus.Ready && postToRender}
  <article>
    <button class="back-button" on:click={goBackToPostPage}>← Back</button>
    <div class="title">
      <Heading
        level="h1"
        size="2.2rem"
        font="RedHatText"
        commandStyle={false}
        color="var(--foreground)"
      >
        {postToRender.title ||
          formatDate(postToRender.pubDate) ||
          'Un-named Update'}
      </Heading>
    </div>
    <div class="meta">
      <time
        datetime={postToRender.pubDate}
        title="First published on: {postToRender.pubDate}"
      >
        {formatDate(postToRender.pubDate)}
      </time>
      <p class="view-original">
        {#if postToRender.author}
          Published by {postToRender.author},
        {/if}
        {#if postToRender.link && postToRender.link.length > 5}
          View
          <a
            href={postToRender.link}
            title="Read: {postToRender.title}"
            target="_blank">original</a
          >
        {/if}
      </p>
    </div>
    <div class="article-content">
      <ArticleContent content={postToRender.description} />
    </div>
  </article>
{:else if postStatus === PostStatus.Loading}
  <Loading />
{:else if postStatus === PostStatus.NotFound}
  <NotFound message="Post not Found" />
{:else}
  <h2>Big Error</h2>
{/if}

<style lang="scss">
  article {
    color: var(--foreground);
    background: var(--card-background);
    font-family: RedHatText;
    border-radius: 6px;
    border: var(--card-border);
    margin: 1rem auto;
    padding: 0 0 1rem 0;
    min-height: 50vh;
    max-width: 1000px;

    .title {
      margin: 0 1.5rem;
    }

    button.back-button {
      padding: 0.25rem 0.5rem;
      margin: 0.5rem;
      border: 0;
      border-radius: 4px;
      background: var(--accent);
      cursor: pointer;
      font-family: RedHatText;
      font-weight: bold;
      font-size: 1rem;
    }
    .article-content {
      padding: 1rem 1.5rem;
    }

    .meta {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 1rem 1.5rem;
      border-bottom: 1px dashed var(--dimmed-text);

      time,
      .view-original {
        margin: 0;
        font-size: 0.8rem;
        letter-spacing: 0.1rem;
        text-transform: uppercase;
        color: var(--dimmed-text);
        font-family: RedHatText;
        transition: color 0.75s ease-in-out;
        a {
          color: var(--dimmed-text);
        }
      }
    }
  }
</style>
