<script>
  import { enhance } from "$app/forms";
</script>

<section class="grid">
  <article>
    <h1>Login</h1>
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
