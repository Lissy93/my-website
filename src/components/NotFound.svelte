<script lang="ts">
  export let message = 'Page not Found';
</script>

<div class="four-o-four">
  <h1>404</h1>
  <h2>{message} :'(</h2>
  <a href="/">Home</a>
</div>

<style lang="scss">
  .four-o-four {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background: var(--card-background);
    border: var(--card-border);
    border-radius: 4px;
    width: fit-content;
    margin: 5vh auto;
    padding: 2rem 5rem;
    cursor: default;
    h1,
    h2,
    a {
      margin: 0.25rem auto;
    }
    h1 {
      font-size: 8rem;
    }
    h2 {
      font-size: 1.6rem;
    }
    a {
      text-decoration: none;
      color: var(--background);
      padding: 0.25rem 0.5rem;
      margin: 0.5rem;
      border: 0;
      border-radius: 4px;
      background: var(--accent);
      cursor: pointer;
      font-family: RedHatText;
      font-weight: bold;
      font-size: 1.6rem;
      margin-top: 1rem;
    }
  }
</style>
