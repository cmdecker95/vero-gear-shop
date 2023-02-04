<script>
  import { enhance } from "$app/forms";
  import { writable } from "svelte/store";

  let newColor;
  let newSize;
  let files;

  const colors = writable([]);
  const sizes = writable([]);

  function addColor() {
    if ($colors.findIndex((color) => color === newColor.toUpperCase()) === -1)
      $colors = [...$colors, newColor.toUpperCase()];
    newColor = undefined;
  }

  function addSize() {
    if ($sizes.findIndex((size) => size === newSize.toUpperCase()) === -1)
      $sizes = [...$sizes, newSize.toUpperCase()];
    newSize = undefined;
  }

  function deleteColor(oldColor) {
    $colors = $colors.filter((value) => value !== oldColor);
  }

  function deleteSize(oldSize) {
    $sizes = $sizes.filter((value) => value !== oldSize);
  }
</script>

<a class="secondary" href="/admin">
  <div class="go-back">
    <i class="fa-solid fa-circle-left" /><span>Products</span>
  </div>
</a>
<article>
  <header>
    <h3>Add Product</h3>
  </header>

  <form class="grid" method="POST" action="?/addProduct" use:enhance>
    <!-- Product image -->
    <section class="upload">
      {#if files}
        <img src={URL.createObjectURL(files[0])} alt="product" />
      {:else}
        <label for="file">
          <i class="fa-solid fa-file-arrow-up" />
          Product image
        </label>
      {/if}
      <input
        id="file"
        type="file"
        name="file"
        bind:files
        accept=".jpg, .jpeg, .png"
        style="display:none"
        required
      />
    </section>
    <!-- Product name -->
    <section>
      <fieldset>
        <input type="text" name="name" placeholder="Product name" required />
      </fieldset>
      <!-- Product price -->
      <fieldset>
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Product price"
          required
        />
      </fieldset>
      <!-- Product colors -->
      <form on:submit|preventDefault={addColor}>
        <fieldset style="display:flex;gap:1rem">
          <input
            type="text"
            name="color"
            bind:value={newColor}
            placeholder="Add a color..."
          />
          <button class="contrast" style="padding:10px;width:100px">+</button>
        </fieldset>
      </form>
      <!-- Colors added -->
      <div style="display:flex;flex-direction:row;gap:1rem">
        {#each $colors as color}
          <form on:submit|preventDefault={() => deleteColor(color)}>
            <button class="outline contrast">{color}</button>
          </form>
        {/each}
      </div>
      <input type="hidden" name="colors" value={$colors} />
      <!-- Product sizes -->
      <form on:submit|preventDefault={addSize}>
        <fieldset style="display:flex;gap:1rem">
          <input
            type="text"
            name="size"
            bind:value={newSize}
            placeholder="Add a size..."
          />
          <button class="contrast" style="width:100px">+</button>
        </fieldset>
      </form>
      <!-- Sizes added -->
      <div style="display:flex;flex-direction:row;gap:1rem">
        {#each $sizes as size}
          <form on:submit|preventDefault={() => deleteSize(size)}>
            <button class="outline contrast">{size}</button>
          </form>
        {/each}
      </div>
      <input type="hidden" name="sizes" value={$sizes} />
      <!-- SUBMIT -->
      <button class="submit contrast">Add product</button>
    </section>
  </form>
</article>

<style>
  h3 {
    margin-bottom: 0;
  }

  a {
    text-decoration: none;
  }

  a:hover > .go-back {
    color: var(--secondary-hover);
  }

  .go-back {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  section {
    margin-bottom: 0;
  }

  fieldset {
    margin-bottom: 1rem;
  }

  .upload {
    margin-bottom: 0;
    display: grid;
    place-items: center;
    border: 1px dashed var(--muted-color);
    border-radius: 5px;
    color: var(--muted-color);
  }

  .upload > label {
    background-color: var(--muted-color);
    color: white;
    border-radius: 5px;
    padding: 1rem 3rem;
  }

  .upload > label:hover {
    cursor: pointer;
    background-color: var(--secondary);
    color: white;
    border-radius: 5px;
    padding: 1rem 3rem;
  }

  .upload > img {
    object-fit: contain;
  }

  .submit {
    margin-bottom: 0;
  }
</style>
