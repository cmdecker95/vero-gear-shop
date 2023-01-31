<script>
  export let product;

  function formatPrice(price) {
    const options = { style: "currency", currency: "USD" };
    return Intl.NumberFormat("en-US", options).format(price);
  }
</script>

<article>
  <header class="product-header">
    {product.name}
  </header>
  <main>
    <img src={product.image} alt={product.name} />
  </main>
  <footer class="product-footer">
    <span>{formatPrice(product.price)}</span>
    <a class="contrast" href="/shop/{product.id}" role="button">+</a>
  </footer>
</article>

<style>
  .product-header {
    font-weight: 700;
    font-size: medium;
  }

  .product-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
