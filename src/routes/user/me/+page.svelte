<script>
  export let data;
  const { user } = data;
</script>

<section class="grid">
  <article>
    <h1>Hi, {user.name} 👋</h1>
    <p>Just so you know, we're really glad you're here!</p>
    {#if user.role === "ADMIN"}
      <form method="POST" action="?/admin">
        <button>✨ Admin Portal ✨</button>
      </form>
    {/if}
    <form method="POST" action="?/shop">
      <button class="contrast">Shop</button>
    </form>
    <form method="POST" action="?/cart">
      <button class="contrast">Cart</button>
    </form>
    <form method="POST" action="?/orders">
      <button class="secondary">Orders</button>
    </form>
    <form method="POST" action="?/logout">
      <button class="outline secondary">Logout</button>
    </form>
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
