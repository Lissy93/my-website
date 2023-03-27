<script lang="ts">
  import config from '$src/helpers/config';
  import Heading from '$src/components/Heading.svelte';
  import LinkButton from '$src/components/LinkButton.svelte';
  import LangBadge from '$src/components/LangBadge.svelte';
  import Icon from '$src/components/Icon.svelte';

  const techStacks = Object.keys(config.techStack);

  export let accent = 'var(--accent)';

  </script>
  
  <section class="tech-stack-section" style="--accent:{accent};">
    <Heading level="h2">Tech Stack</Heading>
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
      {#each techStacks as stackName}
      <div class="stack-name">
        <h4>{stackName}</h4>
      </div>
      <div class="stack-section">
        {#each config.techStack[stackName] as ts}
          <div class="stack-row">
            <div class="stack-label">
              <LangBadge language={ts.language} size={20} />
            </div>
            <div class="stack-projects">
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
    </div>
  </section>
  
  <style lang="scss">
  .tech-stack-section {
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
    .stack-table {
      // display: grid;
      // grid-template-columns: fit-content(8ch) 1fr;
      .stack-name {
        // writing-mode: vertical-rl;
        // text-orientation: upright;
        font-size: 1.5rem;
        letter-spacing: 0.2rem;
        color: var(--accent);
        opacity: 0.4;
        margin: 0.5rem 0 0 0;
        h4 { margin: 0; }
      }
    }
    .stack-row {
      display: flex;
      padding: 0.5rem;
      gap: 0.5rem;
      &:not(:last-child) {
        border-bottom: 1px dashed var(--dimmed-text);
      }
      .stack-label {
        min-width: 6rem;
      }
      .stack-projects {
        display: flex;
        gap: 0.5rem;
        flex-grow: 1;
        flex-wrap: wrap;
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
      }
    }
  }
  </style>
