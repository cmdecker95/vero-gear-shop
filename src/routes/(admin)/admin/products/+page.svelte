<script>
  import Product from "$lib/components/Product.svelte";
  import { formatPrice } from "$lib/utils";

  export let data;
  const { products } = data;
</script>

<h1>Products</h1>

<article>
  {#if products.length > 0}
    <figure>
      <table role="grid">
        <thead>
          <tr>
            <th scope="col" />
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Colors</th>
            <th scope="col">Sizes</th>
          </tr>
        </thead>
        <tbody>
          {#each products as product (product.id)}
            <tr>
              <td>
                <div class="options">
                  <a href="/admin/products/{product.id}">
                    <i class="fa-solid fa-pen-to-square" style="color:black" />
                  </a>
                </div>
              </td>
              <td>{product.name}</td>
              <td>{formatPrice(product.price)}</td>
              <td>{product.colors}</td>
              <td>{product.sizes}</td>
            </tr>
          {/each}
        </tbody>
        <!-- <tfoot>
          <tr>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td><strong>{formatPrice(total)}</strong></td>
          </tr>
        </tfoot> -->
      </table>
    </figure>
  {:else}
    <p>No products to show.</p>
  {/if}
  <footer>
    <a class="contrast" href="/admin/products/add" role="button">Add</a>
  </footer>
</article>
