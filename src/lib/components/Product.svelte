<script>
  import { formatPrice, formatImage } from "$lib/utils";

  export let product;
  const { id, image, name, price } = product;
  const formattedImage = formatImage(image);
  console.log("📷", formattedImage);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<a href={`/shop/${id}`}>
  <article>
    <span class="price">{formatPrice(price)}</span>
    <main>
      <img loading="lazy" src={formattedImage} alt={name} />
    </main>
    <footer>
      {name}
    </footer>
  </article>
</a>

<style>
  a {
    color: darkslategray;
    padding: 0;
    text-decoration: none;
  }

  article {
    color: gray;
    font-size: medium;
    font-weight: 700;
    transition: all cubic-bezier();
  }

  article:hover {
    border: 0.5px solid darkslategray;
    box-shadow: none;
    color: darkslategray;
    cursor: pointer;
    font-size: medium;
    font-weight: 700;
    transition: all cubic-bezier();
  }

  article:hover > .price {
    background-color: var(--secondary-hover);
    cursor: pointer;
    transition: all cubic-bezier();
  }

  .price {
    background-color: var(--secondary);
    border-radius: 0.2rem;
    color: white;
    padding: 0.2rem;
    position: relative;
    top: -1rem;
    left: -1rem;
  }

  main {
    display: grid;
    place-items: center;
  }

  main > img {
    height: 250px;
    object-fit: contain;
  }
  footer {
    min-height: 5rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
