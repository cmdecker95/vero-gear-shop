<script>
  import { formatPrice, formatImage } from "$lib/utils";

  export let product;
  const { id, image, name, price } = product;
</script>

<a href={`/shop/${id}`}>
  <article>
    <header class="price">{formatPrice(price)}</header>
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
    position: relative;
    transition: all cubic-bezier();
  }
  article:hover {
    border: 0.5px solid var(--lightgrey);
    color: var(--lightgrey);
    cursor: pointer;
    font-size: medium;
    font-weight: 700;
  }
  header {
    color: var(--lightgrey);
    padding: 1rem;
    text-align: right;
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
    align-items: center;
    display: flex;
    font-size: medium;
    justify-content: left;
    min-height: 5rem;
    padding: 1rem;
    text-align: center;
  }
</style>
