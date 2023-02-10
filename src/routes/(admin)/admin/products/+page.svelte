<script>
  import { formatImage, formatPrice } from "$lib/utils";

  export let data;
  const { products } = data;
</script>

<h1><a href="/admin/portal">Admin</a> / Products</h1>

<header>
  <a class="contrast" href="/admin/products/add" role="button">
    <i class="fa-sharp fa-solid fa-plus" />
    Add product
  </a>
</header>
<article>
  {#if products}
    <header>
      <h3>{products.length} Products</h3>
    </header>
    <figure>
      <table role="grid">
        <thead>
          <tr>
            <th scope="col" />
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Colors</th>
            <th scope="col">Sizes</th>
          </tr>
        </thead>
        <tbody>
          {#each products as product (product.id)}
            <tr>
              <td class="edit">
                <a href="/admin/products/{product.id}">
                  <i class="fa-solid fa-pen-to-square" />
                </a>
              </td>
              <td
                ><img
                  src={formatImage(product.image, "thumbnail")}
                  alt={product.name}
                /></td
              >
              <td>{product.name}</td>
              <td>{formatPrice(product.price)}</td>
              <td>{product.colors}</td>
              <td>{product.sizes}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </figure>
  {:else}
    <p>No products to show.</p>
  {/if}
</article>

<style>
  figure {
    overflow: scroll;
  }

  h3 {
    margin-bottom: 0;
  }

  .edit > a {
    display: grid;
    place-items: center;
  }

  td > a > i {
    color: black;
  }

  img {
    max-width: 100px;
  }
</style>
