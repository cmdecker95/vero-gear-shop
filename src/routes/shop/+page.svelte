<script>
  export let data;
</script>

<ul>
  {#each $data?.products as product}
    <li>
      <form method="POST" action="?/addToOrder">
        {product.name}</li>
  {/each} 
</ul>