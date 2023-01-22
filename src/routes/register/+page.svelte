<script>
  console.log("🛸 register/+page.svelte");
  import { enhance } from "$app/forms";

  export let form;
</script>

<svelte:head>
  <title>Register</title>
</svelte:head>

<h1>Register</h1>

<section>
  <form method="post" use:enhance>
    <label for="email">First name</label>
    <input type="text" name="firstname" id="firstname" required />

    <label for="email">Last name</label>
    <input type="text" name="lastname" id="lastname" required />

    <label for="email">Email</label>
    <input type="email" name="email" id="email" required />

    <label for="password">Password</label>
    <input type="password" name="password" id="password" required />

    <button type="submit">Register</button>
  </form>

  {#if form?.error}
    <div class="notice error">
      {form.error}
    </div>
  {/if}

  <a href="/login">Login</a>
</section>
