<script lang="ts">
  import { blogStore } from '$src/store/BlogStore';
  import { slugify } from '$src/helpers/post-utils';
  // export let data;
  // const posts = data.posts as RssPost[];

  const makeHref = (postTitle: string) => {
    return `/blog/${slugify(postTitle)}`;
  };
</script>

Blog

<ul>
  {#each $blogStore as post}
    <li>
      <a href={makeHref(post.title)} rel="noreferrer">
        {post.title}
      </a>
    </li>
  {/each}
</ul>
