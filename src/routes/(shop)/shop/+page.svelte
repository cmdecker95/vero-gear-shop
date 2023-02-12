<script>
  import Product from "$lib/components/Product.svelte";

  export let data;
  const { products } = data;
</script>

<header>
  <h1>Shop</h1>
</header>

<div class="products">
  {#if products}
    {#each products as product}
      <Product {product} />
    {/each}
  {:else}
    <p>No products to show.</p>
  {/if}
</div>

<style>
  .products {
    column-gap: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    row-gap: 1rem;
  }
</style>
