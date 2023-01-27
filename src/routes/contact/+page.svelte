<script lang="ts">
import SocialLink from '$src/components/SocialLink.svelte';

const socials = [
  { name: 'Twitter', icon: 'twitter', tone: '#1DA1F2', link: 'https://twitter.com/', user: 'Lissy_Sykes' },
  { name: 'GitHub', icon: 'github2', tone: '#585858', link: 'https://github.com/', user: 'Lissy93' },
  { name: 'Dev.to', icon: 'dev-to', tone: '#f1f155', link: 'https://dev.to/', user: 'Lissy93' },
  { name: 'Mastodon', icon: 'mastodon', tone: '#6364FF', link: 'https://mastodon.social/', user: '@Lissy93' },
  { name: 'LinkedIn', icon: 'linkedin', tone: '#0A66C2', link: 'https://www.linkedin.com/in/', user: 'AliciaSykes' },
  { name: 'Instagram', icon: 'instagram', tone: '#E4405F', link: 'https://www.instagram.com/', user: 'liss.sykes' },
];

// 'github',
//     'website',
//     'star',
//     'fork',
//     'github2',
//     'dev-to',
//     'stackoverflow',
//     'mastodon',
//     'linkedin',
//     'youtube',
//     'twitter',
//     'reddit',
//     'keybase',
//     'matrix',
//     'email',
//     'pgp',

</script>

<section class="main">
  <div class="social-wrapper">
    <h2>Connect</h2>
    {#each socials as social}
      <SocialLink {...social} />
    {/each}

<!-- Twitter: https://twitter.com/Lissy_Sykes
Instagram: https://www.instagram.com/liss.sykes
Facebook: https://www.facebook.com/liss.sykes
LinkedIn: https://www.linkedin.com/in/aliciasykes
YouTube: https://youtube.com/@AliciaSykes
YouTube: https://www.youtube.com/c/AliciaSykes
Reddit: https://www.reddit.com/user/lissy93
Mastodon:  -->


<!-- GitHub: https://github.com/Lissy93
StackOverflow: https://stackoverflow.com/users/979052/alicia
Dev.to: https://dev.to/lissy93
Coders Rank: https://profile.codersrank.io/user/lissy93
GitStar: https://gitstar-ranking.com/Lissy93 -->


  </div>
  <form class="contact-form">
    <h2>Send me a message</h2>
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
  h1 {
      font-size: 4rem;
      color: var(--accent);
      font-family: RedHatText;
      margin: 0.25rem 5vw;
      color: var(--accent);
    }
  section.main {
    width: 90vw;
    margin: 2rem auto 1rem auto;
    text-align: left;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    h2 {
      font-size: 2rem;
      margin: 1rem 0;
      color: var(--accent);
    }
    .social-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      min-width: 500px;
    }
    form {
      display: flex;
      flex: 1;
      flex-direction: column;
      min-width: 500px;
      .user-deets {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: 1rem;
        .input-group {
          flex: 1;
          width: 200px;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          input {
            width: 100%;
          }
        }
      }
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
    }
  }
</style>
