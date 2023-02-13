<script>
  import { enhance } from "$app/forms";
  import dog from "$lib/assets/dog.svg";

  export let data;
  const { user } = data;
</script>

<main class="grid">
  <section class="image"><img src={dog} alt="dog" /></section>
  <article>
    <header>
      <h1>Hi, {user.name} 👋</h1>
    </header>
    <section>
      {#if user.role === "ADMIN"}
        <form method="POST" action="?/admin" use:enhance>
          <button>✨ Admin Portal ✨</button>
        </form>
      {/if}
      <form method="POST" action="?/shop" use:enhance>
        <button class="contrast">Shop</button>
      </form>
      <form method="POST" action="?/cart" use:enhance>
        <button class="contrast">Cart</button>
      </form>
      <form method="POST" action="?/orders" use:enhance>
        <button class="contrast">Orders</button>
      </form>
      <form method="POST" action="?/logout" use:enhance>
        <button class="outline secondary">Logout</button>
      </form>
    </section>
  </article>
</main>

<style>
  .image {
    display: grid;
    margin-bottom: 0;
    place-content: center;
  }
  h1 {
    margin-bottom: 0;
  }
</style>
