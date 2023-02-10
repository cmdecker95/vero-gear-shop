<script>
  import { formatImage, formatPrice } from "$lib/utils";

  export let data;
  const { cart, total } = data;
</script>

<header>
  <h1>Cart</h1>
</header>

<article>
  {#if cart.length > 0}
    <figure>
      <table role="grid">
        <thead>
          <tr>
            <th scope="col" />
            <th scope="col">Image</th>
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
                <a href="/cart/{cartItem.cartId}">
                  <i class="fa-solid fa-pen-to-square" />
                </a>
              </td>
              <td>
                <img src={formatImage(cartItem.image)} alt={cartItem.name} />
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
            <td />
            <td><strong>{formatPrice(total)}</strong></td>
          </tr>
        </tfoot>
      </table>
    </figure>
    <footer>
      <a class="outline contrast" href="/shop" role="button">Shop</a>
      <a class="contrast" href="/checkout" role="button">Checkout</a>
    </footer>
  {:else}
    <p>Your cart is empty.</p>
    <footer>
      <a class="contrast" href="/shop" role="button">Shop</a>
    </footer>
  {/if}
</article>

<style>
  figure {
    overflow: scroll;
  }
  i {
    color: black;
  }

  img {
    max-width: 100px;
  }
</style>
