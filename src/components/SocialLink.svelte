<script lang="ts">
  import { slide } from 'svelte/transition';
  import Icon from '$src/components/Icon.svelte';
  import type { SocialMetric } from '$src/types/Socials';

  export let link: string;
  export let name: string;
  export let user: string;
  export let icon: string;
  export let tone: string;
  export let noAt = false;
  export let isSmall = false;
  export let metrics: SocialMetric[] | null = null;

  let hover = false;

  const formatUn = (username: string) => {
    return username.startsWith('@') ? username.slice(1) : username;
  };

  const toggleHover = (newState?: boolean) => {
    if (newState === undefined) hover = !hover;
    else hover = newState;
  };
</script>

<a
  href={link + user}
  target="_blank"
  rel="noreferrer"
  style={`--social-tone-dimmed: ${tone}4A; --social-tone: ${tone};`}
  class:isSmall
  transition:slide
  on:mouseenter={() => toggleHover(true)}
  on:mouseleave={() => toggleHover(false)}
>
  <Icon name={icon} height="42px" width="42px" hoverColor={tone} {hover} />
  <div class="text-part">
    <span class="social-title">{name}</span>
    <span class="social-user">{noAt ? '' : '@'}{formatUn(user)}</span>
    {#if metrics}
      <span class="social-metrics">
        {#each metrics as metric}
          <span class="metric">
            <span class="metric-label">{metric.label}</span>
            <span class="metric-value">{metric.value}</span>
          </span>
        {/each}
      </span>
    {/if}
  </div>
</a>

<style lang="scss">
  a {
    color: var(--foreground);
    text-decoration: none;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 0.75rem;
    height: 2.8rem;
    border: var(--card-border);
    background: var(--card-background);
    border-radius: var(--curve-factor);
    width: 15rem;
    transition: all ease-in-out 0.25s;
    .text-part {
      height: 2.8rem;
      display: flex;
      flex-direction: column;
      transition: 0.5s;
      overflow: hidden;
      .social-title {
        transition: all ease-in-out 0.25s;
      }
      .social-user {
        font-size: 1rem;
        opacity: 0.75;
        color: var(--dimmed-text);
        text-transform: capitalize;
        transition: all ease-in-out 0.25s;
      }
      .social-metrics {
        font-size: 0.75rem;
        opacity: 0.75;
        transform: translateY(1.5rem);
        transition: all ease-in-out 0.25s;
        .metric-value {
          color: var(--social-tone);
        }
      }
    }
    &:hover {
      // color: var(--accent);
      border: 1px solid var(--social-tone-dimmed);
      .social-title {
        transform: translateY(-2rem);
      }
      .social-user {
        transform: translateY(-1.25rem);
        font-size: 1.25rem;
        color: var(--foreground);
      }
      .social-metrics {
        transform: translateY(-1rem);
      }
    }
    &.isSmall {
      font-size: 1rem;
      min-width: 12rem;
      height: 2.2rem;
      gap: 0.5rem;
      width: 90%;
      
      .text-part {
        height: 2.2rem;
      }
      .social-user {
        font-size: 0.9rem;
      }
      .social-metrics {
        font-size: 0.6rem;
      }
      :global(svg) {
        width: 28px;
        height: 28px;
      }
    }
  }
</style>
