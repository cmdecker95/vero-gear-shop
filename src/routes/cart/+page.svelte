<script>
  import { goto } from "$app/navigation";

  export let data;

  const { cart, total } = data;

  const formatPrice = (price) => {
    const options = { style: "currency", currency: "USD" };
    return Intl.NumberFormat("en-US", options).format(price);
  };
</script>

<header>
  <h1>Cart</h1>
</header>

{#if cart.length > 0}
  <article>
    <figure>
      <table role="grid">
        <thead>
          <tr>
            <th scope="col" />
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Color</th>
            <th scope="col">Size</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {#each cart as cartItem (cartItem.cartId)}
            <tr>
              <td>
                <div class="options">
                  <a href="/cart/{cartItem.cartId}">
                    <i class="fa-solid fa-pen-to-square" style="color:black" />
                  </a>
                </div>
              </td>
              <td>{cartItem.name}</td>
              <td>{formatPrice(cartItem.price)}</td>
              <td>{cartItem.color}</td>
              <td>{cartItem.size || "None"}</td>
              <td>{cartItem.qty}</td>
              <td>{formatPrice(cartItem.price * cartItem.qty)}</td>
            </tr>
          {/each}
        </tbody>
        <tfoot>
          <tr>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td><strong>{formatPrice(total)}</strong></td>
          </tr>
        </tfoot>
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
    <p>Your cart is empty.</p>
    <footer>
      <a class="contrast" href="/shop" role="button">Continue Shopping</a>
    </footer>
  </article>
{/if}

<style>
  figure {
    overflow: scroll;
  }
  .options {
    display: flex;
    gap: 0.6rem;
  }
</style>
