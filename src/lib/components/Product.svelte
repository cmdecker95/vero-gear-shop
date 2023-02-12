<script>
  import { formatPrice, formatImage } from "$lib/utils";

  export let product;
  const { id, image, name, price } = product;
</script>

<a href={`/shop/${id}`}>
  <article>
    <span class="price">{formatPrice(price)}</span>
    <main>
      <img loading="lazy" src={formatImage(image)} alt={name} />
    </main>
    <footer>
      {name}
    </footer>
  </article>
</a>

<style>
  a {
    text-decoration: none;
  }
  article {
    margin: 0;
    border: 0.5px solid white;
    color: var(--darkgrey);
    font-size: medium;
    font-weight: 700;
    transition: all cubic-bezier();
  }
  article:hover {
    border: 0.5px solid var(--lightgrey);
    color: var(--lightgrey);
    cursor: pointer;
    font-size: medium;
    font-weight: 700;
  }
  article:hover > .price {
    background-color: var(--lightgrey);
    cursor: pointer;
  }
  .price {
    background-color: var(--darkgrey);
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
