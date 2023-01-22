<script lang="ts">

</script>

<section class="main">
  <h1>Contact</h1>

  <form class="contact">
    <div class="user-deets">
      <div class="input-group">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" />
      </div>
      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" />
      </div>      
    </div>
    <label for="message">Message</label>
    <textarea name="message" id="message" rows="5"></textarea>

    <button type="submit">Send</button>
  </form>
</section>

<style lang="scss">
  section.main {
    max-width: 50rem;
    margin: 1rem auto;
    text-align: left;
    h1 {
      font-size: 4rem;
      color: var(--accent);
    }
    form {
      display: flex;
      flex-direction: column;
      input, textarea, button {
        background: var(--card-background);
        border: var(--card-border);
        color: var(--foreground);
        border-radius: 4px;
        font-size: 1.25rem;
        padding: 0.25rem 0.5rem;
        margin: 0.5rem 0;
        font-family: FiraCode, monospace;
        transition: all ease-in-out 0.25s;
        &:focus {
          outline: none;
          box-shadow: 1px 1px 8px #ff00994a;
        }
      }
      label {
        margin-right: 0.5rem;
      }
      button {
        cursor: pointer;
        &:hover {
          background: var(--accent);
          color: var(--card-background);
        }
      }
      .input-group {
        display: flex;
        align-items: center;
      }
      .user-deets {
        margin-bottom: 1rem;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      }
    }
  }
</style>
