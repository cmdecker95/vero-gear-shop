<script>
  import { formatPrice } from "$lib/utils";

  export let product;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<a href={`/shop/${product.id}`}>
  <article class="product">
    <main><img src={product.image} alt={product.name} /></main>
    <footer class="product-footer">
      {product.name}<br />
      {formatPrice(product.price)}
    </footer>
  </article>
</a>

<style>
  a {
    color: darkslategray;
    text-decoration: none;
    padding: 0;
  }

  main {
    display: grid;
    place-items: center;
  }

  main > img {
    height: 250px;
    object-fit: contain;
  }
  .product {
    color: gray;
    font-weight: 700;
    font-size: medium;
    transition: all cubic-bezier();
    transition-property: all;
    transition-duration: 300ms;
  }

  .product:hover {
    color: darkslategray;
    border: 0.5px solid darkslategray;
    cursor: pointer;
    box-shadow: none;
    font-weight: 700;
    font-size: medium;
    transition: all cubic-bezier();
    transition-property: all;
    transition-duration: 300ms;
  }
  .product-footer {
    display: flex;
    flex-direction: column;
    place-items: left;
    gap: 1rem;
  }
</style>
