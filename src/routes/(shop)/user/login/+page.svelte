<script>
  import { enhance } from "$app/forms";
  import Error from "$lib/components/Error.svelte";

  export let form;
</script>

<section class="grid">
  <article>
    <h1>Login</h1>
    {#if form?.error}
      <Error message={form.error} />
    {/if}
    <form method="POST" use:enhance>
      <input
        type="email"
        name="email"
        placeholder="Email"
        aria-label="Email"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        aria-label="Password"
        required
      />
      <button type="submit" class="contrast">Login</button>
    </form>
    <hgroup>
      Need an account?
      <a href="/user/register">Register</a>
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
