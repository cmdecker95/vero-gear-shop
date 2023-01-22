<script>
  console.log("🛸 login/+page.svelte");
  import { enhance } from "$app/forms";

  export let form;
</script>

<section>
  <form method="post" use:enhance>
    <label for="email">Email</label>
    <input type="email" name="email" id="email" required />

    <label for="password">Password</label>
    <input type="password" name="password" id="password" required />

    <button type="submit">Login</button>
  </form>

  <a href="/register">Register</a>

  {#if form?.error}
    {form.error}
  {/if}
</section>
