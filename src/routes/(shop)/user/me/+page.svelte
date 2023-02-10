<script>
  import dog from "$lib/assets/dog.svg";

  export let data;
  const { user } = data;
</script>

<article>
  <header>
    <h1>Hi, {user.name} 👋</h1>
  </header>
  <section><img src={dog} alt="dog" /></section>
  <section>
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
      <button class="contrast">Orders</button>
    </form>
    <form method="POST" action="?/logout">
      <button class="outline secondary">Logout</button>
    </form>
  </section>
</article>

<style>
  article {
    margin-inline: auto;
    max-width: 500px;
  }

  h1 {
    margin-bottom: 0;
  }
</style>
