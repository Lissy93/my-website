<script lang="ts">
  import { searchTerm } from '$src/store/BlogStore';

  // Reference used for focusing on keydown from parent
  export let searchInputRef = null;

  // Define var to store search term locally, and bind it to store
  let usersSearchTerm = '';
  $: searchTerm.set(usersSearchTerm);

  // Clear search field, if search term is removed elsewhere
  searchTerm.subscribe((changed) => {
    if (!changed) usersSearchTerm = '';
  });
</script>

<form class="filter-form">
  <label for="filter-input">Filter</label>
  <input
    bind:value={usersSearchTerm}
    type="text"
    id="filter-input"
    bind:this={searchInputRef}
  />
</form>

<style lang="scss">
  @import '$src/styles/color-palette.scss';
  form {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  label {
    margin-right: 1rem;
  }
  input {
    background: var(--card-background);
    outline: none;
    border: var(--card-border);
    padding: 0.25rem 0.5rem;
    color: var(--accent);
    font-family: FiraCode;
    font-size: 1rem;
    border-radius: 4px;
  }
</style>
