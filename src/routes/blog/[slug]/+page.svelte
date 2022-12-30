<script lang="ts">
  import type { RssPost, RssPosts } from '$src/types/RssXml';
  import { PostStatus } from '$src/types/RssXml';
  import { blogStore } from '$src/store/BlogStore';
  import { slugify } from '$src/helpers/post-utils';
  import type { PageData } from './$types';

  export let data: PageData; // Svelte data about current page

  let postStatus: PostStatus = PostStatus.Loading; // Will store post status
  const postSlug = data.slug; // The URL slug, to reference blog post
  let postToRender: RssPost | undefined; // Will store the blog post to render

  /* Updates the status, to determine which view is shown */
  const updateStatus = () => {
    if ($blogStore.length === 0) {
      postStatus = PostStatus.Loading;
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
  <h1>{postToRender.title}</h1>
  <div>{@html postToRender.description}</div>
{:else if postStatus === PostStatus.Loading}
  <h2>Loading...</h2>
{:else if postStatus === PostStatus.NotFound}
  <h2>Post not found</h2>
{:else}
  <h2>Big Error</h2>
{/if}
