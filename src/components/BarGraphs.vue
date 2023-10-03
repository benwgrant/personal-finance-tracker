<template>
    <div class="bar-graph-container">
      <h3>Spending by Category</h3>
      <Bar
        id="transactions"
        :options="chartOptions"
        :data="chartData"
      />
    </div>
</template>
  
  
<script>
import { ref, onMounted } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { db, auth } from '@/firebaseConfig';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'BarChart',
  components: { Bar },
  setup() {
    const chartData = ref({
      labels: [],
      datasets: [
        {
          label: 'Spending by Category',
          backgroundColor: [],  // This will be updated later
          data: []
        }
      ]
    });
    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
            display: false // This will hide the legend
        }
    }
    };

    const fetchAndProcessTransactions = async () => {
      const userId = auth.currentUser.uid;
      const transactionsSnapshot = await db.collection('transactions').doc(userId).collection('userTransactions').get();

      const categoryData = {};
      const colorOptions = ["#fd7f6f", "#7eb0d5", "#b2e061", "#bd7ebe", "#ffb55a", "#ffee65", "#beb9db", "#fdcce5", "#8bd3c7"];
      const colorsUsed = [];

      transactionsSnapshot.forEach(doc => {
        const data = doc.data();
        if (!categoryData[data.type]) {
          categoryData[data.type] = 0;
          colorsUsed.push(colorOptions[colorsUsed.length % colorOptions.length]); // Cycle through the colors
        }
        categoryData[data.type] += data.amount;
      });

      chartData.value = {
        labels: Object.keys(categoryData),
        datasets: [
          {
            label: 'Spending by Category',
            backgroundColor: colorsUsed,
            data: Object.values(categoryData)
          }
        ]
      };
    };

    onMounted(() => {
      fetchAndProcessTransactions();
    });

    return {
      chartData,
      chartOptions,
      fetchAndProcessTransactions
    };
  }
};
</script>


<style scoped>
.bar-graph-container {
  display: flex;
  flex-direction: column;
  align-items: top;
  width: 100%;  /* Ensure the container takes up the full width of its parent */
  margin-top: 20px;
}

h3 {
  margin-bottom: 15px; 
  font-weight: bold;
  font-size: 24px;  
  text-align: top;  /* Center align the text for the title */
}

#transactions {
  width: 80%;  /* The graph will take up 80% of its container's width */
  max-width: 600px;  /* You can adjust this to fit your needs */
  height: 400px; /* Adjust the height as needed */
  margin: 0 auto;  /* Centers the chart within its container */
}
</style>