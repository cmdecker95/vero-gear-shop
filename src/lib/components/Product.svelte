<script>
  export let image;
  export let name;
  export let price;
  export let colors;
  export let sizes;

  let color;
  let size;
</script>

<div class="col">
  <div class="card w-50 mb-3 mr-3">
    <div style="height:200px;overflow:hidden">
      <img src={image} class="card-img-top" alt={name} />
    </div>
    <div class="card-body">
      <div style="display:flex; justify-content:space-between">
        <h3 class="card-title">{name}</h3>
        <h3 class="card-title">${price}</h3>
      </div>
      <div class="w-50" style="display:flex;gap:0.5rem">
        <select name="color" on:input={(e) => (color = e.target.value)}>
          <option>COLORS</option>
          {#each colors as color}
            <option>{color}</option>
          {/each}
        </select>
        <select name="size" on:input={(e) => (size = e.target.value)}>
          <option>SIZES</option>
          {#each sizes as size}
            <option>{size}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>
</div>
