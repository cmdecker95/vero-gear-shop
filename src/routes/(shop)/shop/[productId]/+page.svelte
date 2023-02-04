<script>
  import { goto } from "$app/navigation";
  import { formatPrice } from "$lib/utils";

  export let data;
  const { product } = data;
  const { id, image, name, colors, sizes } = product;

  let { price } = product;
  let additionalPrice;
  let color;
  let size;
  let qty = 1;

  async function addToCart() {
    await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({ id, price, color, size, qty }),
      headers: {
        "content-type": "application/json",
      },
    });
    goto("/cart");
  }

  $: if (size === "XL") {
    additionalPrice = 1;
  } else if (size === "2XL") {
    additionalPrice = 2;
  } else if (size === "3XL") {
    additionalPrice = 3;
  } else if (size === "4XL") {
    additionalPrice = 4;
  } else if (size === "5XL") {
    additionalPrice = 5;
  } else if (size === "6XL") {
    additionalPrice = 6;
  } else {
    additionalPrice = 0;
  }

  $: price = product.price + additionalPrice;
  $: if (qty < 1) qty = 1;
</script>

<a class="secondary" href="/shop">
  <div class="go-back">
    <i class="fa-solid fa-circle-left" /><span>Shop</span>
  </div>
</a>

<article>
  <header>
    <h3>{name}</h3>
    {formatPrice(price)}
  </header>
  <main class="grid">
    <img src={image} alt={name} />
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
    <a class="contrast" href="#add" role="button" on:click={addToCart}>Add</a>
  </footer>
</article>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
