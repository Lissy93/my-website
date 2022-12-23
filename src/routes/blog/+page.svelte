<script lang="ts">
  /** @type {import('./$types').PageData} */
  export let data;

  console.log(data);
</script>

Blog

{#each data.posts as post}
  <li>
    <a target="_blank" href={post.link} rel="noreferrer">
      {post.title}
    </a>
  </li>
{/each}
