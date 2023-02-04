<script>
  import { enhance } from "$app/forms";
  import Error from "$lib/components/Error.svelte";

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
      <Error message={form.error} />
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
</style>
