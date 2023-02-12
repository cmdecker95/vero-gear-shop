<script>
  import { formatImage, formatPrice } from "$lib/utils";

  export let data;
  const { order, products } = data;
  const { id, createdAt, fulfilled, total } = order;
</script>

<a class="secondary" href="/admin/orders">
  <div class="go-back">
    <i class="fa-solid fa-circle-left" /><span>Orders</span>
  </div>
</a>

<article>
  <header>
    <h3>Order Details</h3>
    <fieldset>
      <label>
        <strong>ID</strong>
        <input type="text" value={id} disabled />
      </label>
      <label>
        <strong>Date</strong>
        <input type="text" value={createdAt.toLocaleString()} disabled />
      </label>
      <label>
        <strong>Status</strong>
        <input
          type="text"
          value={fulfilled ? "✅ Fulfilled" : "📦 Processing"}
          disabled
        />
      </label>
    </fieldset>
  </header>
  <figure>
    <table role="grid">
      <colgroup>
        <col width="20%" />
        <col width="70%" />
        <col width="10%" />
      </colgroup>
      <tbody>
        {#each products as product (product.id)}
          <tr>
            <td>
              <img
                src={formatImage(product.image, "thumbnail")}
                alt={product.name}
              />
            </td>
            <td colspan="2">
              <strong>{product.name}</strong><br />
              <strong>
                {formatPrice(product.price * product.qty)}
              </strong><br />
              Color: {product.color}<br />
              Size: {product.size}<br />
            </td>
          </tr>
        {/each}
      </tbody>
      <tfoot>
        <tr>
          <td />
          <td class="pricing">
            <strong>Total</strong>
          </td>
          <td class="pricing">
            <strong>{formatPrice(total)}</strong>
          </td>
        </tr>
      </tfoot>
    </table>
  </figure>
  <footer>
    <form method="POST">
      <button class="outline">Cancel order</button>
    </form>
  </footer>
</article>

<style>
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
  table {
    width: 100%;
  }
  td {
    padding-inline: 1rem;
  }
  img {
    max-width: 100px;
    min-width: 75px;
  }
  .pricing {
    text-align: right;
  }
</style>
