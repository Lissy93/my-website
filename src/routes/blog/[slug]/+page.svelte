<script lang="ts">
  import { get } from 'svelte/store';
  import { goto } from '$app/navigation';
  import type { RssPost, RssPosts } from '$src/types/RssXml';
  import { PostStatus } from '$src/types/RssXml';
  import { blogStore, rssFeedUrls } from '$src/store/BlogStore';
  import { slugify, formatDate } from '$src/helpers/post-utils';
  import type { PageData } from './$types';
  import ArticleContent from '$src/components/ArticleContent.svelte';
  import NotFound from '$src/components/NotFound.svelte';
  import Loading from '$src/components/Loading.svelte';
  import { fetchPostsFromRss } from '$src/helpers/fetch-rss-posts';

  export let data: PageData; // Svelte data about current page

  let postStatus: PostStatus = PostStatus.Loading; // Will store post status
  const postSlug = data.slug; // The URL slug, to reference blog post
  let postToRender: RssPost | undefined; // Will store the blog post to render

  const triggerPostLoad = () => {
    const posts: Promise<RssPost[]> = fetchPostsFromRss(get(rssFeedUrls));
    posts
      .then((resolvedPosts) => {
        postStatus = PostStatus.Ready;
        blogStore.set(resolvedPosts)
      }).catch(() => {
        postStatus = PostStatus.Errored;
      });
  };

  /* Updates the status, to determine which view is shown */
  const updateStatus = () => {
    if ($blogStore.length === 0) {
      postStatus = PostStatus.Loading;
      triggerPostLoad()
    } else if (!postToRender) {
      postStatus = PostStatus.NotFound;
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
</script>

{#if postStatus === PostStatus.Ready && postToRender}
  <article>
    <button class="back-button" on:click={goBackToPostPage}>← Back</button>
    <h1>{postToRender.title}</h1>
    <div class="meta">
      <time
        datetime={postToRender.pubDate}
        title="First published on: {postToRender.pubDate}">
        {formatDate(postToRender.pubDate)}
      </time>
      <p class="view-original">
        {#if postToRender.author}
        Published by {postToRender.author},
        {/if}
        View <a href={postToRender.link} title="Read: {postToRender.title}">original</a>
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
  margin: 1rem 5vw;
  padding: 0 0 1rem 0;
  min-height: 50vh;

  h1 {
    margin: 0.5rem 1.5rem;
    font-size: 2.2rem;
    font-weight: 800;
  }

  button.back-button {
    padding: 0.25rem 0.5rem;
    margin: 0.5rem;
    border: 0;
    border-radius: 4px;
    background: var(--accent-2);
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

    time, .view-original {
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
