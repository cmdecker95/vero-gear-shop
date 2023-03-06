<script>
  export let data;

  function downloadCSV(csv, filename) {
    let csvFile;
    let downloadLink;
    // CSV file
    csvFile = new Blob([csv], { type: "text/csv" });
    // Download link
    downloadLink = document.createElement("a");
    // File name
    downloadLink.download = filename;
    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);
    // Hide download link
    downloadLink.style.display = "none";
    // Add the link to DOM
    document.body.appendChild(downloadLink);
    // Click download link
    downloadLink.click();
  }
</script>

<header>
  <h1>
    <a href="/admin/portal">Admin</a> / <a href="/admin/orders">Orders</a> / Download
  </h1>
</header>

<button on:click={downloadCSV(data.csv, "all-orders.csv")}>
  <i class="fa-solid fa-file-excel" />&nbsp; Export Ready
</button>
