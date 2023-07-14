<script lang="ts">
  import { slide } from 'svelte/transition';
  import { emailJsEndpoint } from '$src/helpers/constants';
  import Loading from '$src/components/Loading.svelte';
  import Heading from '$src/components/Heading.svelte';
  import config from '$src/helpers/config';

  // Email form values
  let name: string = '';
  let email: string = '';
  let message: string = '';

  // Mail send status
  type MessageStatus = 'pending' | 'sending' | 'success' | 'error';
  let mailSendStatus: MessageStatus = 'pending';
  let showMailForm = true;

  const reShowMailForm = () => {
    mailSendStatus = 'pending';
    showMailForm = true;
  };

  const sendViaNetlify = () => {
    const encode = (data: any) => {
      return Object.keys(data)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join('&');
    };
    fetch('/static.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'contact-form',
        name,
        email,
        message,
      }),
    });
  };

  const sendEmail = () => {
    // Update state in UI
    mailSendStatus = 'sending';

    // Grab users input from the form
    const templateParams = {
      from_name: name,
      reply_email: email,
      message_body: message,
    };

    // Get mailer config, and combine with users input
    const mailConfig = config.contact.mailerConfig;
    mailConfig.template_params = {
      ...mailConfig.template_params,
      ...templateParams,
    };

    const reqParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mailConfig),
    };

    // Send mail
    fetch(emailJsEndpoint, reqParams)
      .then((response) => {
        mailSendStatus = response.status === 200 ? 'success' : 'error';
        showMailForm = false;
      })
      .catch(() => {
        mailSendStatus = 'error';
      });

    // Sending via Netlify
    sendViaNetlify();
  };
</script>

<form
  on:submit={sendEmail}
  class="contact-form"
  name="website-contact-form"
  data-netlify="true"
>
  <Heading level="h2" color="var(--accent)">send_message</Heading>
  {#if showMailForm && mailSendStatus != 'sending'}
    <div class="user-deets">
      <div class="input-group">
        <label for="name">Name</label>
        <input
          bind:value={name}
          required
          minlength="5"
          maxlength="30"
          type="text"
          name="name"
          id="name"
        />
      </div>
      <div class="input-group">
        <label for="email">Email</label>
        <input
          bind:value={email}
          required
          minlength="5"
          maxlength="40"
          type="email"
          name="email"
          id="email"
        />
      </div>
    </div>
    <label for="message">Message</label>
    <textarea
      bind:value={message}
      required
      minlength="20"
      maxlength="500"
      name="message"
      id="message"
      rows="5"
    />
    <button type="submit">Send</button>
  {/if}

  {#if mailSendStatus === 'sending'}
    <Loading title="Sending" hideHomeButton={true} />
  {:else if mailSendStatus !== 'pending'}
    <div class="response-info" transition:slide>
      {#if mailSendStatus === 'success'}
        <p class="success">Message Sent :)</p>
      {:else if mailSendStatus === 'error'}
        <p class="error">Snap! Failed to send :(</p>
      {/if}
      <button type="button" on:click={reShowMailForm}>Return to Message</button>
    </div>
  {/if}
</form>

<style lang="scss">
  h2 {
    font-size: 2rem;
    margin: 1rem 0;
    color: var(--accent);
    &:before {
      content: '>';
      margin-right: 6px;
      opacity: 0.8;
    }
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
    .response-info {
      background: var(--card-background);
      border-radius: var(--curve-factor);
      padding: 1rem;
      text-align: center;
      p {
        font-size: 1.25rem;
        margin: 0.5rem;
        font-weight: bold;
        &.success {
          color: var(--success);
        }
        &.error {
          color: var(--error);
        }
      }
      button {
        background: none;
        border: none;
        font-size: 0.75rem;
        margin: 0;
      }
    }
    input,
    textarea,
    button {
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
    textarea {
      resize: vertical;
      min-height: 5rem;
      max-height: 15rem;
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
</style>
