<script>
  import { formatPrice } from "$lib/utils";
  import { Doughnut } from "svelte-chartjs";
  import "chart.js/auto";
  // import {
  //   Chart as ChartJS,
  //   Title,
  //   Tooltip,
  //   Legend,
  //   ArcElement,
  //   CategoryScale,
  // } from "chart.js";

  // ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

  export let data;
  const { orderCount, fulfilledCount, productCount, products, grandTotal } =
    data;

  console.log(orderCount);
  console.log(fulfilledCount);
  console.log(productCount);
  console.log(products);

  const chartData = {
    labels: ["📦 Processing", "✅ Fulfilled"],
    datasets: [
      {
        label: "Orders",
        data: [orderCount - fulfilledCount, fulfilledCount],
        backgroundColor: ["#FDB45C", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };
</script>

<header>
  <h1><a href="/admin/portal">Admin</a> / Overview</h1>
</header>

<article>
  <header><h3>Order Summary</h3></header>
  <main class="grid">
    <section
      style="display:flex;flex-direction:column;justify-content:space-between"
    >
      <h4 id="grandtotal">
        {formatPrice(grandTotal)}<br />
        <span>Total Sales</span>
      </h4>
      <h4 id="ordertotal">
        {orderCount}<br />
        <span>Total Orders</span>
      </h4>
      <h4 id="processing">
        {orderCount - fulfilledCount}<br />
        <span>Orders Processing</span>
      </h4>
      <h4 id="fulfilled">
        {fulfilledCount}<br />
        <span>Orders Fulfilled</span>
      </h4>
    </section>

    <section id="chart">
      <Doughnut
        data={chartData}
        options={{
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              font: {
                size: 20,
              },
              padding: {
                top: 10,
                bottom: 30,
              },
              text: `${Math.round(
                (100 * fulfilledCount) / orderCount
              )}% Fulfilled`,
            },
          },
        }}
      />
    </section>
  </main>
</article>

<style>
  main > * {
    margin: 1rem;
  }
  h3 {
    margin-bottom: 0;
  }
  #grandtotal {
    --kpi-color: limegreen;
  }
  #ordertotal {
    --kpi-color: #4d5360;
  }
  #processing {
    --kpi-color: #fdb45c;
  }
  #fulfilled {
    --kpi-color: rgb(54, 162, 235);
    margin-bottom: 1rem;
  }
  h4 {
    border-left: 3px solid var(--kpi-color);
    border-radius: 3px;
    padding-left: 0.5rem;
  }
  h4 > span {
    color: var(--kpi-color);
    font-weight: 300;
    letter-spacing: 1px;
  }
  #chart {
    display: grid;
    place-items: center;
  }
</style>
