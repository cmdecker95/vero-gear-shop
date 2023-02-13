<script>
  import { enhance } from "$app/forms";
  import { formatImage } from "$lib/utils";
  import { writable } from "svelte/store";

  let newColor;
  let newSize;
  let image;
  let url;

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

  function setURL() {
    url = formatImage(image);
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
    <section>
      <fieldset class="form-group">
        <input
          type="text"
          name="image"
          placeholder="Image ID"
          bind:value={image}
          required
        />
        <button class="contrast add" on:click|preventDefault={setURL}>
          <i class="fa-sharp fa-solid fa-eye" />
        </button>
      </fieldset>
      <div class="preview">
        {#if url}
          <img src={url} alt="product" />
        {:else}
          <h5>Preview your product image</h5>
          <p>
            Upload an image to Cloudflare Images, then copy and paste the <strong
              >Image ID</strong
            >
            above.
          </p>
        {/if}
      </div>
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
      <form on:submit|preventDefault={addColor} use:enhance>
        <fieldset class="form-group">
          <input
            type="text"
            name="color"
            bind:value={newColor}
            placeholder="Add a color..."
          />
          <button class="contrast add">+</button>
        </fieldset>
      </form>
      <!-- Colors added -->
      <div class="badges">
        {#each $colors as color}
          <form on:submit|preventDefault={() => deleteColor(color)} use:enhance>
            <button class="outline contrast">{color}</button>
          </form>
        {/each}
      </div>
      <input type="hidden" name="colors" value={$colors} />
      <!-- Product sizes -->
      <form on:submit|preventDefault={addSize} use:enhance>
        <fieldset class="form-group">
          <input
            type="text"
            name="size"
            bind:value={newSize}
            placeholder="Add a size..."
          />
          <button class="contrast add">+</button>
        </fieldset>
      </form>
      <!-- Sizes added -->
      <div class="badges">
        {#each $sizes as size}
          <form on:submit|preventDefault={() => deleteSize(size)} use:enhance>
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

  h3,
  section,
  .submit {
    margin-bottom: 0;
  }

  fieldset {
    margin-bottom: 1rem;
  }

  .form-group {
    display: flex;
    gap: 1rem;
  }

  .add {
    padding: 10px;
    width: 100px;
  }

  .preview {
    border: 1px dashed var(--muted-color);
    border-radius: 5px;
    padding: 1rem;
  }

  .badges {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
  }
</style>
