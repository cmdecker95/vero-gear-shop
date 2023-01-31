<script>
  import Product from "$lib/components/Product.svelte";

  export let data;

  const addToCart = async ({ detail }) => {
    await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify(detail),
      headers: {
        "content-type": "application/json",
      },
    });
  };
</script>

<header>
  <article>
    <h1>Shop</h1>
    <p>
      <strong>You're preordering stuff!</strong>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia mollitia
      quas reiciendis alias natus minima adipisci veritatis expedita temporibus tenetur
      voluptas ea ducimus commodi ipsum, quod excepturi. Est, temporibus consequatur?
    </p>
  </article>
</header>

<div class="products">
  {#each data.products as product}
    <Product {product} />
  {/each}
</div>

<style>
  .products {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    row-gap: 1rem;
    column-gap: 1rem;
    justify-content: center;
  }
</style>
