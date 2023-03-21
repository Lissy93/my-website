<script lang="ts">
import config from '$src/helpers/config';
import Heading from '$src/components/Heading.svelte';
import Icon from '$src/components/Icon.svelte';
import LangBadge from '$src/components/LangBadge.svelte';
import LinkButton from '$src/components/LinkButton.svelte';
import type { Project } from '$src/types/Project';

export let projects: Project[];
let projectCount = 20;

</script>

<section class="projects-section">
  <Heading level="h2">Projects</Heading>
  <div class="buttons">
    <LinkButton to="/projects" icon="more-arrow">See All</LinkButton>
    <LinkButton
      to="https://github.com/{config.githubUser}"
      icon="github"
      priority="outline"
      textColor="var(--accent)"
      target="_blank"
    >View GitHub</LinkButton>
  </div>
  <ul class="projects-list">
    <li class="first"><span class="line">┬</span></li>
  {#each projects.slice(0, projectCount) as project, index}
    <li>
      <span class="line">{index+1 === projectCount ? '└' : '├'}
        {#if index != projectCount-1 }<br>│<br>│{/if}
      </span>
      <a href={project.url} target="_blank" rel="noreferrer" title="View {project.name} on GitHub">
        <span class="txt">{project.name}
          {#if project.isFork}<span class="fork"><Icon name="fork" height="10"/>FORK</span>{/if}
        </span>
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

<style lang="scss">
 @import '$src/styles/media-queries.scss';

.title-link {
  text-decoration: none;
  margin: 0.5rem auto 0 auto;
  :global(h1) {
    cursor: pointer;
  }
}

.index-page {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  grid-column-gap: 2rem;
  grid-row-gap: 0.5rem;
  padding: 1rem;
  width: 95vw;
  margin: 0 auto;
}

section {
  margin: 1rem auto;
  width: 100%;
  .buttons {
    display: flex;
    gap: 1rem;
  }
  &.projects-section, &.blog-section {
    grid-row-start: span 3;
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
      &:hover {
        .proj-info :global(svg) {
          fill: var(--warning);
        }
      }
    }
    .project-description {
      font-size: 0.8rem;
      color: var(--dimmed-text);
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
    .fork {
      color: var(--dimmed-text);
      border: var(--card-border);
      border-radius: var(--curve-factor);
      opacity: 0.8;
      font-size: 0.8rem;
      padding: 0.1rem 0.3rem;
    }
  }
}
</style>