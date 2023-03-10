<script lang="ts">
  import Icon from '$src/components/Icon.svelte';

  export let to = '';
  export let target = '_self';
  export let priority = 'primary';
  export let textColor = '';
  export let icon: string | null = null;
</script>

<a href={to} {target} class={priority} style={`--textColor: ${textColor}`}>
  {#if icon}
    <Icon name={icon} class={priority} color={textColor} />
  {/if}
  <slot />
</a>

<style lang="scss">
  a {
    text-decoration: none;
    padding: 0.25rem 0.5rem;
    margin: 0;
    border: 0;
    border-radius: 4px;
    cursor: pointer;
    font-family: RedHatText;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    filter: grayscale(15%);
    transition: all 0.2s ease-in-out;
    &:hover {
      filter: grayscale(0%);
      transform: scale(1.05) rotate(1deg);
    }
    &.primary {
      background: var(--accent);
      color: var(--background);
      font-weight: bold;
    }
    &.secondary {
      background: var(--card-background);
      color: var(--foreground);
      border: var(--card-border);
      &:hover {
        transform: scale(1.04) rotate(-0.8deg);
      }
    }
    &.outline {
      background: var(--background);
      color: var(--accent);
      border: 1px solid var(--accent);
      &:hover {
        transform: scale(1.04) rotate(-0.8deg);
        background: var(--accent);
        color: var(--background);
        :global(svg) {
          fill: var(--background);
        }
      }
    }
    color: var(--textColor, currentcolor);
  }
</style>
