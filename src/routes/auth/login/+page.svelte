<script>
  let group = [];
  let colors = ["red", "blue"];
</script>

<form action="?/createProduct" method="post">
  <input type="text" name="image" value="Upload" />
  <input type="text" name="name" value="John" />
  <input type="number" name="price" value="99" />

  {#each colors as color}
    <label><input type="checkbox" bind:group value={color} />{color}</label>
  {/each}

  <input type="hidden" name="colors" bind:value={colors} />

  <select name="sizes" multiple>
    <option>Size 1</option>
    <option>Size 2</option>
    <option>Size 3</option>
  </select>

  <button type="submit">Submit</button>
</form>
