<script>
  import admin from "$lib/assets/admin.svg";
</script>

<main class="grid">
  <section class="image"><img src={admin} alt="admin" /></section>
  <article>
    <header>
      <h1>Admin Portal</h1>
    </header>
    <form method="POST" action="?/products">
      <button class="contrast">Products</button>
    </form>
    <form method="POST" action="?/orders">
      <button class="contrast">Orders</button>
    </form>
    <form method="POST" action="?/shop">
      <button class="outline secondary">Shop</button>
    </form>
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
