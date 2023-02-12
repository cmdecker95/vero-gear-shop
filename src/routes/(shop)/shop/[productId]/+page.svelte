<script>
  import { goto } from "$app/navigation";
  import { formatImage, formatPrice } from "$lib/utils";

  export let data;
  const { product } = data;
  const { id, image, name, colors, sizes } = product;
  let { price } = product;
  let color;
  let size;
  let qty = 1;

  async function add() {
    if (!color || !size || !qty) return;
    await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({ id, price, color, size, qty }),
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
    <div class="image">
      <img src={formatImage(image)} alt={name} />
    </div>
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
    <a class="contrast" href="#add" role="button" on:click={add}>Add</a>
  </footer>
</article>

<style>
  .image {
    display: grid;
    place-items: center;
  }

  img {
    max-height: 400px;
    min-width: fit-content;
  }

  a {
    text-decoration: none;
  }

  a:hover > .go-back {
    color: var(--secondary-hover);
  }

  .go-back {
    align-items: center;
    display: flex;
    gap: 0.5rem;
  }

  header {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  h3 {
    margin-bottom: 0;
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
