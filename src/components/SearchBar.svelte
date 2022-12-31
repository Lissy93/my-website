<script lang="ts">
  import { searchTerm } from '$src/store/BlogStore';

  let usersSearchTerm = '';
  $: searchTerm.set(usersSearchTerm);
  searchTerm.subscribe((changed) => {
    if (!changed) usersSearchTerm = '';
  });
</script>

<form class="filter-form">
  <label for="filter-input">Filter</label>
  <input bind:value={usersSearchTerm} type="text" id="filter-input">
</form>

<style lang="scss">
@import "$src/styles/color-palette.scss";
form {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: calc(5vw + 1rem);
}
label {
  margin-right: 1rem;
}
input {
  background: var(--card-background);
  outline: none;
  border: var(--card-border);
  padding: 0.25rem 0.5rem;
  color: var(--accent-1);
  font-family: FiraCode;
  font-size: 1rem;
  border-radius: 4px;
}
</style>