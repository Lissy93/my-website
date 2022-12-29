<script lang="ts">
  // import type { RssPost } from '../../types/RssXml';
  import { blogStore } from '../../store/BlogStore';
  import { slugify } from '../../helpers/post-utils';
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
