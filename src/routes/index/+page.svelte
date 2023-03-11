<script lang="ts">
import config from '$src/helpers/config';
import Heading from '$src/components/Heading.svelte';
import Icon from '$src/components/Icon.svelte';
import LangBadge from '$src/components/LangBadge.svelte';
import LinkButton from '$src/components/LinkButton.svelte';
import SocialLink from '$src/components/SocialLink.svelte';
import { slugify, formatDate } from '$src/helpers/post-utils';
import { socialNetworks } from '$src/helpers/constants';
import type { SupportedSocials, UserSocial } from '$src/types/Socials';


export let data: any;
let projectCount = 20;

// Append usernames, and (if available) metrics to available socials
let socials: UserSocial[] = socialNetworks.map((social) => {
  const network: typeof SupportedSocials[number] = social.name;
  const metrics =
    data?.socials[social.name.toLowerCase().replace(/\W/g, '')] || [];
  return { ...social, user: config.contact.socials[network], metrics };
});

// Limit number of socials to display
let numSocialsToDisplay = config.contact.socialButtonLimit || 6;

// Show / hide more socials
const toggleSocialLimit = () => {
  const defLimit = config.contact.socialButtonLimit;
  numSocialsToDisplay =
    numSocialsToDisplay === defLimit ? socials.length : defLimit;
};

console.log(data);
</script>

<a href={config.contact.website} class="title-link" title="Go to {config.contact.website}">
  <Heading level="h1"
    color="var(--foreground)" size="4rem"
    commandStyle={false} blinkCursor={true}>
    {config.title}
  </Heading>
</a>

<div class="index-page">

  <!-- Blog Summary Section -->
  <section class="blog-section">
  <Heading level="h2">Posts</Heading>
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
  {#each data.repos.slice(0,projectCount) as project, index}
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

  <!-- About / Contact / Socials section -->
  <section class="contact-section">
  <Heading level="h2">Contact</Heading>
  <div class="buttons">
    <LinkButton to="/contact" icon="more-arrow">Get in Touch</LinkButton>
    <LinkButton
      to="{config.contact.pgpKeyLink}"
      icon="pgp"
      priority="outline"
      textColor="var(--accent)"
      target="_blank"
    >View GPG Key</LinkButton>
  </div>
  <div class="social-buttons">
    {#each socials.slice(0, numSocialsToDisplay) as social} <SocialLink {...social} isSmall /> {/each}
  </div>
    <!-- Show more/ less button -->
    {#if socials.length > config.contact.socialButtonLimit}
    <button class="toggle-limit" on:click={toggleSocialLimit}>
      {numSocialsToDisplay > config.contact.socialButtonLimit
        ? 'Show Less'
        : 'Expand to Show More'}
    </button>
    {/if}
  </section>

  <!-- About section -->
  <section class="about-section">
    <Heading level="h2">About</Heading>
    <div class="buttons">
      <LinkButton to="/about" icon="more-arrow">Keep Reading</LinkButton>
      <LinkButton
        to="https://linkedin.com/in/aliciasykes"
        icon="linkedin"
        priority="outline"
        textColor="var(--accent)"
        target="_blank"
      >View LinkedIn</LinkButton>
    </div>
    <br>
    <i>{config.about.intro}</i>
    <img width="150" src={config.about.picture} alt="Users profile" class="profile-pic" />
    {#each config.about.bio as bioLine}
      <p class="bio">{@html bioLine}</p>
    {/each}
  </section>

</div>

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
            // transform: rotate(72deg);
          }
        }
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

  .contact-section {
    width: 100%;
    .social-buttons {
      display: grid;
      grid-auto-flow: dense;
      grid-template-columns: repeat(
        auto-fit,
        minmax(12.5rem, 1fr)
      );
      gap: 1rem;
      margin: 1rem auto;
    }
    button.toggle-limit {
      background: none;
      border: none;
      border-radius: var(--curve-factor);
      color: var(--foreground);
      font-family: FiraCode, monospace;
      width: fit-content;
      cursor: pointer;
      opacity: 0.5;
      transition: all ease-in-out 0.1s;
      &:hover {
        color: var(--accent);
      }
    }
  }

  .about-section {
    img.profile-pic {
      margin: 0.5rem;
      float: right;
      border-radius: var(--curve-factor);
      border: var(--card-border);
    }
    i {
      color: var(--dimmed-text);
    }
    p.bio {
      :global(p) {
        margin: 1rem 0;
        font-size: 1.25rem;
        line-height: 1.8rem;
        font-family: RedHatText;
      }
      :global(a) {
        color: var(--accent);
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>