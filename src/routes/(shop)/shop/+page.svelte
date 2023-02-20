<script>
  import Product from "$lib/components/Product.svelte";
  import shop from "$lib/assets/shop.svg";

  export let data;
  const { products } = data;
</script>

<article class="hero">
  <main class="grid">
    <section class="hero-img"><img src={shop} alt="shop" /></section>
    <section class="hero-text">
      <h1>The official shop for <span>VERO Gear</span></h1>
      <p>
        <strong>By the students, for the students.</strong>
        Every purchase supports current and future classes of the Texas A&M VERO
        Program, both through fundraising and stylish representation.
      </p>
    </section>
  </main>
</article>

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
  .hero {
    margin-bottom: 2rem;
  }
  .hero > main > section {
    margin-bottom: 0;
  }

  .hero-img {
    display: grid;
    place-items: center;
  }
  .hero-img > img {
    max-width: 80%;
  }
  .hero-text {
    justify-content: space-around;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .hero-text > h1 {
    color: var(--lightgrey);
    line-height: 100%;
    margin-bottom: 1rem;
    margin-top: 4rem;
  }
  .hero-text > h1 > span {
    color: var(--maroon);
  }
  .products {
    column-gap: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    margin-bottom: 250px;
    row-gap: 1rem;
  }
</style>
