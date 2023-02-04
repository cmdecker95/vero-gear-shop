<script>
  export let data;
  const { products } = data;

  const formatPrice = (price) => {
    return Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };
</script>

<header>
  <h1>Orders</h1>
</header>
<!-- 
{#if products.length > 0}
  <article>
    <figure>
      <table role="grid">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Color</th>
            <th scope="col">Size</th>
            <th scope="col">Quantity</th>
            <th scope="col">$$$</th>
          </tr>
        </thead>
        <tbody>
          {#each products as product, i}
            <tr>
              <th scope="row">{i + 1}</th>
              <td>{product.name}</td>
              <td>{formatPrice(product.price)}</td>
              <td>{product.color}</td>
              <td>{product.size || "None"}</td>
              <td>{product.qty}</td>
              <td>{formatPrice(product.price * product.qty)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </figure>
    <footer>
      <a class="outline contrast" href="/shop" role="button">
        Continue Shopping
      </a>
      <a class="contrast" href="/checkout" role="button">Proceed to Checkout</a>
    </footer>
  </article>
{:else}
  <article>
    <p>Orders you place will appear here.</p>
    <footer>
      <a class="contrast" href="/shop" role="button">Continue Shopping</a>
    </footer>
  </article>
{/if}

<style>
  figure {
    overflow: scroll;
  }
</style> -->
