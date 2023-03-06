<script>
  import { formatPrice } from "$lib/utils";
  import { goto } from "$app/navigation";

  export let data;
  const { orders, users } = data;

  let loading = false;

  function go() {
    loading = true;
    goto("/admin/orders/download");
  }
</script>

<header>
  <h1><a href="/admin/portal">Admin</a> / Orders</h1>
</header>

<article>
  <header style="text-align:center">
    {#if loading}
      <button aria-busy="true" />
    {:else}
      <button on:click={go}>
        <i class="fa-solid fa-file-excel" />&nbsp; Export Spreadsheet
      </button>
    {/if}
  </header>
  {#if orders.length > 0}
    <figure>
      <table role="grid">
        <thead>
          <tr>
            <th scope="col" />
            <th scope="col">Ordered By</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Total</th>
            <th scope="col">Products</th>
          </tr>
        </thead>
        <tbody>
          {#each orders as order}
            <tr>
              <td>
                <a href={`/admin/orders/${order.id}`}>
                  <i class="fa-sharp fa-solid fa-eye" />
                </a>
              </td>
              <td>{users.get(order.userId)}</td>
              <td>{order.createdAt.toLocaleString()}</td>
              <td>{order.fulfilled ? "✅ Fulfilled" : "📦 Processing"}</td>
              <td>{formatPrice(order.total)}</td>
              <td>{order.products.reduce((agg, a) => agg + a.qty, 0)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </figure>
  {:else}
    <p>Orders placed will appear here.</p>
    <footer>
      <a class="contrast" href="/admin/portal" role="button">Admin Portal</a>
    </footer>
  {/if}
</article>

<style>
  figure {
    overflow: scroll;
  }
</style>
