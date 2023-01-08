<script lang="ts">
  export let to = '';
</script>

<a href={to}>
  <slot />
</a>

<style>
a {
  text-decoration: none;
  color: var(--background);
  background: var(--accent);
  padding: 0.25rem 0.5rem;
  margin: 0.5rem;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  font-family: RedHatText;
  font-weight: bold;
  font-size: 1rem;
}
</style>