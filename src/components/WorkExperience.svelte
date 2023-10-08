<script lang="ts">
  import config from '$src/helpers/config';
  import Heading from '$src/components/Heading.svelte';
  import LangBadge from '$src/components/LangBadge.svelte';
  import Icon from '$src/components/Icon.svelte';

  const { workExperience } = config; 

  </script>

<Heading level="h2" color="var(--foreground)">Experience</Heading>

{#each workExperience as job}
  <div class="experience">
    <div class="line"></div>
    <img class="logo" src={job.companyLogo} alt={job.company} />
    <div class="info">
      <h5 class="title">
        <span class="position">{job.jobTitle}</span>
        <span class="at">@</span>
        <a class="company" href={job.companyUrl} target="_blank" rel="noreferrer">{job.company}</a>
      </h5>
      <p class="date">{job.datesWorked}</p>
      <p class="description">{job.responsibilities || ''}</p>
      {#if job.projects && job.projects.length > 0}
        <h6>{job.projectType || 'Projects' }</h6>
        <div class="projects">
          {#each job.projects as project}
            <div class="sub-project">
              <img src={project.logo} alt={project.name} />
              <p>{project.name} {project.description}</p>
            </div>
          {/each}
        </div>
      {/if}
      {#if job.technologies && job.technologies.length > 0}
        <h6>Core Technologies</h6>
        <div class="technologies">
          {#each job.technologies as tech}
            <LangBadge language={tech} />
          {/each}
        </div>
      {/if}
    </div>
  </div>
{/each}

<style lang="scss">
  .experience {
    padding-left: 1rem;
    position: relative;
    display: flex;
    gap: 1rem;
    .line {
      background: var(--dimmed-text);
      transform: translateX(2.9rem);
      width: 2px;
      z-index: 1;
      flex-grow: 0;
    }
    h5.title {
      font-size: 1.2rem;
      margin: 0.5rem 0;
      font-weight: 600;
      .at {
        color: var(--dimmed-text);
      }
      .company {
        color: var(--foreground);
        transition: 0.25s all ease-in-out;
        &:hover {
          color: var(--accent);
        }
      }
    }
    p.description {
      font-size: 0.8rem;
      margin: 0.5rem 0;
    }
    p.date {
      margin: 0.25rem 0;
      color: var(--dimmed-text);
      font-style: italic;
      font-size: 0.8rem;
    }
    img.logo {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
      z-index: 2;
      flex-grow: 0;
      border: 2px solid var(--dimmed-text);
      background: var(--card-background);
      transition: all 0.25s ease-in-out;
    }
    &:hover {
      img.logo {
        transform: scale(1.1);
        filter: contrast(1.1) saturate(1.2);
      }
    }
    .info {
      flex-grow: 1;
      padding-bottom: 1rem;
      h6 {
        margin: 0.5rem 0;
        font-size: 1rem;
        font-weight: 500;
        color: var(--dimmed-text);
      }
      .projects {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        align-items: flex-start;
        padding-left: 0.5rem;
        .sub-project {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          img {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 2rem;
            filter: opacity(90%);
            transition: all 0.25s ease-in-out;
          }
          p {
            font-size: 0.8rem;
            min-width: 3rem;
            max-width: 4rem;
            margin: 0.2rem 0;
            text-align: center;
            word-break: break-word;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            overflow: hidden;
            color: var(--dimmed-text);
          }
          &:hover {
            img {
              filter: grayscale(0);
              transform: scale(1.1);
            }
            p {
              overflow: visible;
            }
          }
        }
      }
      .technologies {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
    }
    &:last-child {
      .line {
        border-radius: 50%;
      }
    }
  }
</style>
