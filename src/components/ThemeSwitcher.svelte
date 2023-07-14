<script lang="ts">
  import { slide } from 'svelte/transition';
  import config from '$src/helpers/config';
  import type { Theme } from '$src/types/Config';
  import { theme } from '$src/store/ThemeStore';
  import clickOutside from '$src/directives/clickOutside';

  const themes = Object.keys(config.colorSchemes || {});

  let dropdownOpen = false;

  const toggleDropdown = () => {
    dropdownOpen = !dropdownOpen;
  };

  const closeDropdown = () => {
    dropdownOpen = false;
  };

  const updateTheme = (newTheme: string) => {
    if (themes.includes(newTheme)) {
      theme.set(newTheme as Theme);
    }
    closeDropdown();
  };
</script>

<button
  on:click={toggleDropdown}
  class="open-theme-menu"
  title="Theme"
  data-ignore-outside-click>🎨</button
>

{#if dropdownOpen}
  <ul
    class="theme-switcher"
    transition:slide
    use:clickOutside
    on:click_outside={closeDropdown}
  >
    {#each themes as eachTheme}
      <li
        on:click={() => updateTheme(eachTheme)}
        on:keyup={() => updateTheme(eachTheme)}
        class:active={eachTheme === $theme}
      >
        {eachTheme}
      </li>
    {/each}
  </ul>
{/if}

<style lang="scss">
  .theme-switcher {
    position: absolute;
    top: 1.9rem;
    right: 0.5rem;
    border: var(--card-border);
    border-radius: 0 0 var(--curve-factor) var(--curve-factor);
    background: var(--card-background);
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    min-width: 5rem;
    text-align: left;
    list-style: none;
    z-index: 2;

    li {
      background: var(--card-background);
      color: var(--foreground);
      border: transparent;
      border-radius: var(--curve-factor);
      padding: 0.25rem;
      cursor: pointer;
      font-family: FiraCode;
      text-align: left;
      transition: all 0.2s ease-in-out;
      padding-left: 1.6rem;
      text-transform: capitalize;
      &.active {
        border: 1px solid transparent;
        padding-left: 0.25rem;
        cursor: default;
        &::before {
          content: '✔';
          margin-right: 0.25rem;
        }
        &:hover {
          border: 1px solid var(--accent);
          color: var(--foreground);
          background: none;
        }
      }
      &:hover {
        background: var(--accent);
        color: var(--background);
      }
    }
  }
  .open-theme-menu {
    background: none;
    border: transparent;
    color: var(--foreground);
    font-family: FiraCode;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.2rem;
    margin: 0 0.25rem;
  }
</style>
