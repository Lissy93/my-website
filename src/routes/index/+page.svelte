<script lang="ts">
import Heading from '$src/components/Heading.svelte';
import Icon from '$src/components/Icon.svelte';
import LangBadge from '$src/components/LangBadge.svelte';
import LinkButton from '$src/components/LinkButton.svelte';
import { slugify, formatDate } from '$src/helpers/post-utils';

export let data: any;

console.log(data);
</script>

<div class="index-page">

  <!-- Blog Summary Section -->
  <section>
  <Heading level="h2">Posts</Heading>
  <div class="buttons">
    <LinkButton to="/">View All</LinkButton>
    <LinkButton to="/">Go to Blog</LinkButton>
  </div>
  <ul>
    <li class="first"><span class="line">┬</span></li>
  {#each data.posts as post, index }
    <li title={`Published ${formatDate(post.pubDate)}`}>
      <span class="line">{index+1 === data.posts.length ? '└' : '├'}</span>
      <a href="{`/blog/${slugify(post.title)}` || post.link }">
        <span class="txt">{post.title}</span>
      </a>
    </li>
  {/each}
  </ul>
  </section>

  <!-- Projects Summary Section -->
  <section>
  <Heading level="h2">Projects</Heading>
  <ul class="projects-list">
    <li class="first"><span class="line">┬</span></li>
  {#each data.repos.slice(0,20) as project, index}
    <li>
      <span class="line">{index+1 === data.posts.length ? '└' : '├'}<br>│<br>│</span>
      <a href={project.url} target="_blank" rel="noreferrer">
        <span class="txt">{project.name}</span>
        <span class="project-description">
          {project.description}
        </span>
        <span class="proj-info">
          {#if project.language}
          <LangBadge language={project.language} size={16} />
          {/if}
          <Icon name="star" color="var(--foreground)" hoverColor="var(--warning)" />
          {project.stars.toLocaleString()}
        </span>
      </a>
    </li>
  {/each}
  </ul>
  </section>

  <!-- About / Contact / Socials section -->
  <section>
  <Heading level="h2">Contact</Heading>
  </section>

</div>

<style lang="scss">
  @import '$src/styles/media-queries.scss';

  .index-page {
    display: grid;
    // grid-template-columns: 2fr 1fr;
    grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0.5rem;
    grid-row-gap: 0.5rem;
    padding: 1rem;
  }

  section {
    margin: 1rem auto;
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
        .line, &.first, .date { display: none; }
      }

      
      a, a .txt {
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
      .date {
        font-size: 0.7rem;
        opacity: 0;
        transition: all 0.3s ease-in-out;
      }

      &:hover a .txt, a:focus .txt {
          transform: translateX(1rem);
          &::before {
            opacity: 1;
            left: -1.5rem;
          }
        }

      &:hover:not(.first) {
        .line {
          color: var(--accent);
        }
        .date {
          opacity: 0.7;
          transform: translateX(1.5rem);
        }
      }
    }
  }
  ul.projects-list {
    li {
      display: flex;
      a {
        flex-direction: column;
      }
      .project-description {
        font-size: 0.8rem;
        color: var(--dimmed-text);
        max-width: 400px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2; 
        -webkit-box-orient: vertical;
        margin-left: 1rem;
      }
      .proj-info {
        margin-left: 1rem;
        color: var(--dimmed-text);
        font-size: 0.8rem;
        display: flex;
        gap: 0.5rem;
      }
      .line {
        line-height: 1.6rem;
      }
    }

  }
</style>