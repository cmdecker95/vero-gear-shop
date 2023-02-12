<script>
  import { goto } from "$app/navigation";
  import { formatImage, formatPrice } from "$lib/utils";

  export let data;
  const { cartItem, product } = data;
  const { cartId } = cartItem;
  const { id, image, name, colors, sizes } = product;
  let { color, size, qty } = cartItem;
  let { price } = product;

  async function update() {
    await fetch("/api/cart", {
      method: "PUT",
      body: JSON.stringify({
        id,
        price,
        color,
        size,
        qty,
        oldCartId: cartId,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    goto("/cart");
  }

  async function remove() {
    await fetch("/api/cart", {
      method: "DELETE",
      body: JSON.stringify({ cartId }),
      headers: {
        "content-type": "application/json",
      },
    });

    goto("/cart");
  }

  const additionalPricing = {
    XL: 1,
    "2XL": 2,
    "3XL": 3,
    "4XL": 4,
    "5XL": 5,
    "6XL": 6,
  };

  $: price = product.price + (additionalPricing[size] ?? 0);
  $: if (qty < 1) qty = 1;
</script>

<a class="secondary" href="/cart">
  <div class="go-back">
    <i class="fa-solid fa-circle-left" /><span>Cart</span>
  </div>
</a>

<article>
  <header>
    <h3>{name}</h3>
    {formatPrice(price)}
  </header>
  <main class="grid">
    <img src={formatImage(image)} alt={name} />
    <section>
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
        <button class="contrast" on:click={() => (qty -= 1)}>-</button>
        <input id="qty" type="number" min="1" bind:value={qty} />
        <button class="contrast" on:click={() => (qty += 1)}>+</button>
      </div>
    </section>
  </main>
  <footer>
    <a class="outline" href="#remove" role="button" on:click={remove}>
      Remove
    </a>
    <a class="contrast" href="#save" role="button" on:click={update}>
      Save changes
    </a>
  </footer>
</article>

<style>
  header {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  h3 {
    margin-bottom: 0;
  }

  a {
    text-decoration: none;
  }

  a:hover > .go-back {
    color: var(--secondary-hover);
  }

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
