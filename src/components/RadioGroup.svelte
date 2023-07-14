<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let groupLabel: string;
  export let groupId: string;
  export let options: {
    id: string;
    label: string;
    selected: boolean;
  }[];
  export let multiple: boolean = false;

  let selectedOptions: string[] = options.filter(option => option.selected).map(option => option.id);

  $: {
    options = options.map(option => ({
      ...option,
      selected: selectedOptions.includes(option.id),
    }));
    dispatch('change', { selected: selectedOptions });
  }

  const handleChange = (id: string, selected: boolean) => {
    if (multiple) {
      selectedOptions = !selected
        ? [...selectedOptions, id]
        : selectedOptions.filter(optionId => optionId !== id);
    } else {
      selectedOptions = [id];
    }
  };
</script>

<div class="radio-wrapper">
  <span class="radio-group-label">{groupLabel}</span>
  <div class="radio-group" class:wrap={options.length > 5}>
    {#each options as option (option.id)}
      <div class="radio-item">
        {#if multiple}
          <input 
            type="checkbox" 
            id={option.id} 
            name={groupId} 
            value={option.id} 
            bind:checked={option.selected}
            on:change={() => handleChange(option.id, option.selected)}
            class="hidden-radio"
          />
        {:else}
          <input 
            type="radio" 
            id={option.id} 
            name={groupId} 
            value={option.id} 
            bind:group={selectedOptions} 
            class="hidden-radio"
          />
        {/if}
        <label for={option.id} class:selected={option.selected} class:checkbox={multiple} class:radio={!multiple}>{option.label}</label>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .radio-wrapper {
    padding: 0.5rem;
    .radio-group {
      display: flex;
      gap: 0.5rem;
      &.wrap { flex-wrap: wrap; }
    }
    .radio-group-label {
      font-size: 0.8rem;
      color: var(--dimmed-text);
    }
    .hidden-radio {
      position: absolute;
      opacity: 0;
      height: 0;
      width: 0;
    }
    .radio-item {
      label {
        font-size: 0.9rem;
        padding: 0.2rem 0.25rem;
        cursor: pointer;
        border-radius: 4px;
        border: var(--card-border);
        background: var(--card-background);

        &.checkbox {
          &::before{
            content: '▢';
          }
          &:hover:not(.selected)::before{
            content: '▣';
          }
        }
        &.radio {
          &::before{
            content: '⃝';
          }
          &:hover:not(.selected)::before{
            content: '⏺';
          }
        }

        &::before {
          width: 1rem;
          height: 1rem;
          display: inline-block;
          margin-right: 0.25rem;
          color: var(--accent);
        }
        &.selected {
          color: var(--accent);
          &::before {
            content: '✔';
          }
          // &.checkbox:hover::before {
          //   content: '✗';
          // }
        }
      }
    }
  }
</style>
