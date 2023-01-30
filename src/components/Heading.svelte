<script lang="ts">

type Level = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export let level: Level = 'h1';
</script>

<svelte:element this={level} class="title">
  <slot></slot>
</svelte:element>


<style lang="scss">
  .title {
    color: var(--accent);
    &h1 {
      font-size: 2rem;
      margin: 1rem 0;
    }
  }
</style>