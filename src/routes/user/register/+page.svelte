<script>
  import { enhance } from "$app/forms";

  export let form;

  let firstname = form ? form.firstname : "";
  let lastname = form ? form.lastname : "";
  let email = form ? form.email : "";
  let password = "";
  let confirm = "";
</script>

<section class="grid">
  <article>
    <h1>Register</h1>
    {#if form?.error}
      <p class="error">{form.error}</p>
    {/if}
    <form method="post" use:enhance>
      <input
        type="text"
        name="firstname"
        bind:value={firstname}
        placeholder="First name"
        required
      />
      <input
        type="text"
        name="lastname"
        bind:value={lastname}
        placeholder="Last name"
        required
      />
      <input
        type="email"
        name="email"
        bind:value={email}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        bind:value={password}
        placeholder="Password"
        required
      />
      <input
        type="password"
        name="confirm"
        bind:value={confirm}
        placeholder="Confirm password"
        required
      />

      <button type="submit" class="contrast">Register</button>
    </form>
    <hgroup>
      Have an account?
      <a href="/user/login">Login</a>
    </hgroup>
  </article>
</section>

<style>
  section {
    place-items: center;
  }
  article {
    max-width: 500px;
  }

  .error {
    background-color: #f9a826;
    border-radius: 3px;
    border-left: 3px solid darkred;
    color: darkred;
    padding: 1rem;
  }
</style>
