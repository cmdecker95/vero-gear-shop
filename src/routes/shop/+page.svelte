<script>
  export let data;
  let testproducts = [{ name: "orange" }];
</script>

<div>
  <h1>Shop</h1>
  <div style="border-bottom:solid 1px black;width:4rem" />
</div>

<div style="display: flex; flex-wrap: wrap">
  <!-- {#each data.products as product} -->
  {#each testproducts as product}
    <div
      style="width: 500px; height: 300px; box-shadow: 0 2px 6px 0 hsla(0, 0, 0, 0.1)"
    >
      <form method="POST" action="?/addToOrder">
        {product.name}
      </form>
    </div>
  {/each}
</div>
