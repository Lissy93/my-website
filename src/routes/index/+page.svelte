<script lang="ts">
import Heading from '$src/components/Heading.svelte';

export let data;

console.log(data);
</script>


<main>
<Heading level="h2">Posts</Heading>
{#each data.posts as post}
  <h3>{post.title}</h3>
{/each}
<Heading level="h2">Projects</Heading>

<Heading level="h2">Contact</Heading>
</main>


<style lang="scss">

</style>