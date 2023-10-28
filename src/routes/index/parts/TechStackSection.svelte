<script lang="ts">
  import config from '$src/helpers/config';
  import Heading from '$src/components/Heading.svelte';
  import LinkButton from '$src/components/LinkButton.svelte';
  import LangBadge from '$src/components/LangBadge.svelte';
  import Icon from '$src/components/Icon.svelte';

  const techStacks = Object.keys(config.techStack);
  const extraStacks = Object.keys(config.techStackExtras);

  export let accent = 'var(--accent)';

  </script>
  
  <section class="tech-stack-section" style="--accent:{accent};">
    <Heading level="h2" color="var(--accent)">Tech Stack</Heading>
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

    <p class="sub-info">
      Usually the tools I use for the job, depend on the job.
      There's no one-size fits all, and as such I'm always trying out new technologies, and constantly learning.
    </p>
    <p class="sub-info">
      The following technologies are the ones I'm most familiar with, and I've linked to code that I've written with each.
    </p>
    <div class="stack-table">
      <p class="hover-info">Hover over a technology, to see projects built using it</p>
      {#each techStacks as stackName}
      <div class="stack-name">
        <h4>{stackName}</h4>
      </div>
      <div class="stack-section">
        {#each config.techStack[stackName] as ts}
          <div class="stack-row">
            <div class="stack-label" title={`${ts.projects.length} public projects built with ${ts.language}`}>
              <LangBadge language={ts.language} size={20} />
            </div>
            <div class="stack-content">
              {#each ts.projects as project}
                <a class="repo-link" target="_blank" rel="noreferrer"
                  href="https://github.com/{config.githubUser}/{project}">
                  <Icon name="github2" size={20} />
                  <span>{project}</span>
                </a>
              {/each}
            </div>
          </div>
        {/each}
      </div>
      {/each}
      {#each extraStacks as stackName}
      <div class="stack-name">
        <h4>{stackName}</h4>
      </div>
      <div class="stack-section extra-stacks">
        {#each config.techStackExtras[stackName] as ts}
          <LangBadge language={ts} size={20} />
        {/each}
      </div>
      {/each}
    </div>
  </section>
  
  <style lang="scss">
  @import '$src/styles/media-queries.scss';
  .tech-stack-section {
    --transition:  0.3s 0.1s all ease-in-out;
    @include tablet-down {
      width: 100vw;
      margin: 0;
    }
    .buttons {
      display: flex;
      gap: 1rem;
    }
    .sub-info {
      font-size: 0.8rem;
      font-style: italic;
      margin: 0.5rem 0;
      color: var(--dimmed-text);
    }
    .stack-row {
      .stack-label {
        transform: rotate(0) translateY(0);
        width: auto;
      }
      .stack-content {
        height: 0;
        padding-bottom: 0;
      }
    }
    &:hover {
      .stack-row {
        .stack-label {
          transform: rotate(-40deg) translateY(2rem);
          width: 2rem;
        }
        .stack-content {
          height: 5rem;
          padding-bottom: 1rem;
        }
      }
      .hover-info {
        opacity: 1;
      }
    }
  }

  .stack-section {
    display: flex;
    @include tablet-down {
      flex-wrap: wrap;
    }
  }
  .hover-info {
    opacity: 0;
    margin: 0;
    transition: var(--transition);
  }
  .stack-row {
    transition: all 0.3s 100ms ease-in-out;
    width: auto;
    padding: 0.25rem;
    .stack-label {
      transform: rotate(-40deg) translateY(2rem);
      width: 2rem;
      transition: var(--transition);
    }
    .stack-content {
      overflow: hidden;
      width: 0;
      margin-left: 2rem;
      height: 5rem;
      padding: 0.5rem 0 1rem 0;
      transition: var(--transition);
    }
    &:hover  {
      .stack-label {
        transform: rotate(0) translateX(4em) scale(1.1);
      }
      .stack-content {
        width: 10rem;
        height: auto;
        min-height: 5rem;
        padding: 0.5rem 0.5rem 1rem 1rem;
        margin-right: 0;
      }
    }
  }

  .stack-name {
    font-size: 1.5rem;
    letter-spacing: 0.2rem;
    color: var(--accent);
    opacity: 0.4;
    margin: 0.5rem 0 0 0;
    h4 { margin: 0; }
  }

  .repo-link {
    color: var(--foreground);
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: var(--curve-factor);
    padding: 0.1rem 0.25rem;
    font-size: 0.8rem;
    display: flex;
    gap: 0.5rem;
    transition: all 0.1s ease-in-out;
    &:hover {
      transform: scale(1.05) rotate(-0.5deg);
      border: 1px solid var(--foreground);
    }
    span {
      max-width: 15rem;
      overflow: hidden;
      word-break: break-all;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      line-clamp: 1; 
    }
  }

  .extra-stacks {
    gap: 0.5rem;
    margin-top: 0.25rem;
  }
  </style>
