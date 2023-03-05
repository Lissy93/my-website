<script lang="ts">
  export let showOnPx = 150;
  export let color = 'var(--accent)';
  let hidden = true;

  function goTop() {
    document.body.scrollIntoView();
  }

  function scrollContainer() {
    return document.documentElement || document.body;
  }

  function handleOnScroll() {
    if (!scrollContainer()) {
      return;
    }

    if (scrollContainer().scrollTop > showOnPx) {
      hidden = false;
    } else {
      hidden = true;
    }
  }
</script>

<svelte:window on:scroll={handleOnScroll} />

<div
  class="back-to-top"
  on:click={goTop}
  on:keypress={goTop}
  class:hidden
  style={`--accent: ${color};`}
>
  ↑ Back to top
</div>

<style lang="scss">
  .back-to-top {
    opacity: 1;
    z-index: 5;
    position: fixed;
    cursor: pointer;
    user-select: none;
    transition: opacity 0.5s, visibility 0.5s;
    right: 1rem;
    bottom: 1rem;
    color: var(--background);
    background: var(--accent);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-weight: bold;
    font-family: RedHatText;
    &.hidden {
      opacity: 0;
      visibility: hidden;
    }
  }
</style>
