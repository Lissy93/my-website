<script lang="ts">
import Icon from '$src/components/Icon.svelte';
export let link: string;
export let name: string;
export let user: string;
export let icon: string;
export let tone: string;

let hover = false;

const formatUn = (username: string) => {
  return username.startsWith('@') ? username.slice(1) : username;
};

const toggleHover = (newState?: boolean) => {
  if (newState === undefined) hover = !hover;
  else hover = newState;
};

</script>

<a href={link + user} target="_blank" rel="noreferrer"
  on:mouseenter={() => toggleHover(true)} on:mouseleave={() => toggleHover(false)}>
  <Icon name={icon} height="42px" width="42px" hoverColor={tone} hover={hover} />
  <div class="text-part">
    <span class="social-title">{name}</span>
    <span class="social-user">@{formatUn(user)}</span>
  </div>
</a>

<style lang="scss">
a {
  color: var(--foreground);
  text-decoration: none;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0.75rem;
  height: 2.8rem;
  border: var(--card-border);
  background: var(--card-background);
  border-radius: var(--curve-factor);
  .text-part {
    display: flex;
    flex-direction: column;
    transition: .5s;
    overflow: hidden;
    .social-title {
      transition: all ease-in-out 0.25s;
    }
    .social-user {
      font-size: 1rem;
      opacity: 0.75;
      color: var(--dimmed-text);
      text-emphasis: italic;
      text-transform: capitalize;
      transition: all ease-in-out 0.25s;
    }
  }
  &:hover {
    // color: var(--accent);
    .social-title {
      transform: translateY(-2rem);
    }
    .social-user {
      transform: translateY(-1rem);
      font-size: 1.25rem;
      color: var(--foreground);
    }
  }
}
</style>
