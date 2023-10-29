<script lang="ts">
import Heading from '$src/components/Heading.svelte';
import LinkButton from '$src/components/LinkButton.svelte';
import { slugify, formatDate } from '$src/helpers/post-utils';
import type { RssPosts } from '$src/types/RssXml';

export let posts: RssPosts;

export let accent = 'var(--accent)';

</script>

<section class="blog-section" style="--accent:{accent};">
  <Heading level="h2" color="var(--accent)">Posts</Heading>
  <div class="buttons">
    <LinkButton to="/blog" icon="more-arrow">See All</LinkButton>
    <LinkButton
      to="https://notes.aliciasykes.com"
      icon="website"
      priority="outline"
      textColor="var(--accent)"
      target="_blank"
    >View Blog</LinkButton>
  </div>
  <ul>
    <li class="first"><span class="line">┬</span></li>
  {#each posts.slice(0,50) as post, index }
    <li title={`Published ${formatDate(post.pubDate)}`}>
      <span class="line">{(index+1 === posts.length || index === 50) ? '└' : '├'}</span>
      <a href="{`/blog/${slugify(post.title)}` || post.link }">
        <span class="txt">{post.title}</span>
      </a>
    </li>
  {/each}
  </ul>
  </section>

<style lang="scss">
  @import '$src/styles/media-queries.scss';

  section {
    margin: 1rem auto;
    width: 100%;
    .buttons {
      display: flex;
      gap: 1rem;
    }
    &.blog-section {
      grid-row-start: span 3;
    }
    @include tablet-down {
      width: 100vw;
      margin: 0;
    }
  }
  ul {
    list-style: none;
    padding: 0;
    max-width: 800px;
    overflow: hidden;
    li {
      margin: 0;
      font-size: 1.1rem;
      transition: all 0.2s ease-in-out;
      display: flex;
      gap: 0.5rem;
      @include tablet-down {
        border-left: 2px solid var(--dimmed-text);
        &:first-child {
          border-image: linear-gradient(to bottom, transparent 30%, var(--dimmed-text) 30%) 100% 1;
          border-image-slice: 1;
        }
        &:last-child {
          border-image: linear-gradient(to bottom, var(--dimmed-text) 40%, transparent 40%) 100% 1;
          border-image-slice: 1;
        }
        &::before {
          content: "╴";
        }
      }
      @include tablet-down {
        .line, &.first { display: none; }
      }

      
      a, a .txt {
        color: var(--foreground);
        text-decoration: none;
        position: relative;
        display: inline-block;
        transition: all 0.2s ease-in-out;
        &::before {
          content: '›';
          position: absolute;
          left: -1em;
          top: -0.3rem;
          opacity: 0;
          font-size: 1.8rem;
          transform: scale(1, 0.2) rotate(90deg);
          transition: opacity 0.3s ease-out, left 0.3s ease-out, transform 0.15s ease-out;
        }
      }
      .line {
        color: var(--dimmed-text);
        font-size: 1.5rem;
      }

      &:hover a .txt, a:focus .txt {
          transform: translateX(1rem);
          &::before {
            opacity: 1;
            left: -1.5rem;
            transform: scale(1) rotate(0deg);
          }
        }

      &:hover:not(.first) {
        .line {
          color: var(--accent);
        }
      }
    }
  }
</style>
