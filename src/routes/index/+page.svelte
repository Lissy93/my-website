<script lang="ts">
import Heading from '$src/components/Heading.svelte';
import { slugify, formatDate } from '$src/helpers/post-utils';

export let data: any;

console.log(data);
</script>


<section>
<Heading level="h2">Posts</Heading>
<ul>
  <li><span class="line">┬</span></li>
{#each data.posts as post, index }
  <li>
    <span class="line">{index+1 === data.posts.length ? '└' : '├'}</span>
    <a href="{`/blog/${slugify(post.title)}` || post.link }">
      {post.title}
    </a>
  </li>
{/each}
</ul>
</section>

<section>
<Heading level="h2">Projects</Heading>
<ul>
{#each data.repos as project}
  <li>
    <a>{project.name}</a>
  </li>
{/each}
</ul>
</section>

<section>
<Heading level="h2">Contact</Heading>
</section>


<style lang="scss">
  section {
    width: 90vw;
    margin: 1rem auto;
  }
  ul {
    list-style: none;
    padding: 0;
    li {
      margin: 0.25rem 0;
      font-size: 1.1rem;
      transition: all 0.2s ease-in-out;
      display: flex;
      gap: 0.5rem;
      a {
        color: var(--foreground);
        text-decoration: none;
        position: relative;
        display: inline-block;
        transition: all 0.2s ease-in-out;
        &::before {
          content: '🮥';
          position: absolute;
          left: -1em;
          opacity: 0;
          font-size: 1rem;
          transition: opacity 0.3s ease-out, left 0.3s ease-out;
        }
      }
      .line {
        color: var(--dimmed-text);
        font-size: 1.5rem;
      }
      &:hover {
        .line {
          color: var(--accent);
        }
        a {
          // padding-left: 1em;
          transform: translateX(1rem);
          &::before {
            opacity: 1;
            left: -1.5rem;
          }
        }
      }
    }
  }
</style>