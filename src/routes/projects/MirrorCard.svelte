<script lang="ts">
  import type { Mirror } from '$src/types/Project';
  import LangBadge from '$src/components/LangBadge.svelte';
  export let mirror: Mirror;
</script>

<a class="mirror-card" href={mirror.html_url} title={mirror.description} target="_blank" rel="noreferrer">
  <img src={mirror.avatar_url} alt={`${mirror.stars_count}`} />
  <div class="right">
    <h3>{mirror.name}</h3>
    {#if mirror.language}<LangBadge language={mirror.language} />{/if}
  </div>
</a>

<style lang="scss">
  a.mirror-card {
    text-decoration: none;
    display: flex;
    gap: 1rem;
    padding: 0.5rem;
    background: var(--card-background);
    border-radius: var(--curve-factor);
    border: var(--card-border);
    height: 100%;
    color: var(--foreground);
    img {
      width: 2rem;
      height: 2rem;
    }
    h3 {
      margin: 0;
    }
    .right {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
  }
</style>
