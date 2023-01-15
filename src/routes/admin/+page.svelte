<script>
  import { enhance } from "$app/forms";
  export let data;
</script>

<h1>ADMIN</h1>

<h3>Products</h3>
{#each data.products as product}
  <h4>{product.name}</h4>
  <img src={product.src} alt={product.name} />
{/each}

<h3>Add Product</h3>
<form method="POST" action="?/addproduct" use:enhance>
  <input type="text" name="name" placeholder="Enter product name" />
  <input type="file" name="file" accept=".jpg, .jpeg, .png" />
  <input type="submit" value="Add Product" />
</form>
