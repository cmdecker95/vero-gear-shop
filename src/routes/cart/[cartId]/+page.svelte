<script>
  import { goto } from "$app/navigation";

  export let data;
  const { cartItem, product } = data;
  const { id, image, name, price, colors, sizes } = product;

  let color = cartItem.color;
  let size = cartItem.size;
  let qty = cartItem.qty;

  function formatPrice(price) {
    const options = { style: "currency", currency: "USD" };
    return Intl.NumberFormat("en-US", options).format(price);
  }

  async function saveChanges() {
    await fetch("/api/cart", {
      method: "PUT",
      body: JSON.stringify({ id, color, size, qty }),
      headers: {
        "content-type": "application/json",
      },
    });
    goto("/cart");
  }

  async function remove() {
    await fetch("/api/cart", {
      method: "DELETE",
      body: JSON.stringify({ cartId: cartItem.cartId }),
      headers: {
        "content-type": "application/json",
      },
    });

    goto("/cart");
  }

  $: if (qty < 1) qty = 1;
</script>

<a href="/cart">
  <div class="go-back">
    <i class="fa-solid fa-circle-left" /><span>Cart</span>
  </div>
</a>

<article>
  <header style="display:flex;justify-content:space-between">
    <strong>{name}</strong>
    {formatPrice(price)}
  </header>
  <main class="grid">
    <div style="display:flex;align-items:center">
      <img src={image} alt={name} />
    </div>
    <div>
      <!-- Color -->
      <label for="color">Color</label>
      <select id="color" bind:value={color}>
        <option value="" disabled>Select...</option>
        {#each colors as c}
          <option value={c}>{c}</option>
        {/each}
      </select>
      <!-- Size -->
      <label for="size">Size</label>
      <select id="size" bind:value={size}>
        <option value="" disabled>Select...</option>
        {#each sizes as s}
          <option value={s}>{s}</option>
        {/each}
      </select>
      <!-- Quantity -->
      <label for="qty">Quantity</label>
      <div class="quantity">
        <button class="secondary" on:click={() => (qty -= 1)}>-</button>
        <input id="qty" type="number" min="1" bind:value={qty} />
        <button class="secondary" on:click={() => (qty += 1)}>+</button>
      </div>
    </div>
  </main>
  <footer>
    <a href="#remove" role="button" on:click={remove}>Remove from cart</a>
    <a href="#save" role="button" on:click={saveChanges}>Save changes</a>
  </footer>
</article>

<style>
  .go-back {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .quantity {
    display: grid;
    grid-template-columns: auto 1fr auto;
    width: 25%;
  }

  .quantity > button {
    border-radius: 0;
    width: 50px;
  }

  .quantity > input {
    border-radius: 0;
    width: 100px;
  }
</style>
