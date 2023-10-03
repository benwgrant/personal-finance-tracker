<template>
    <div class="transactions-list">
        <h3>Your Transactions</h3>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Date/Time</th>
                    <th>Type</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="transaction in transactions" :key="transaction.id">
                    <td>{{ transaction.name }}</td>
                    <td>{{ transaction.date }}</td>
                    <td>{{ transaction.type }}</td>
                    <td>{{ transaction.amount }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { ref, onMounted, } from 'vue';  // Make sure 'expose' is imported if using Vue 3.2+
import { db, auth } from '@/firebaseConfig';

export default {
  setup() {
    const transactions = ref([]);

    const fetchTransactions = async () => {
      const userId = auth.currentUser.uid;
      const transactionsSnapshot = await db.collection('transactions').doc(userId).collection('userTransactions').get();

      // Clear previous transactions
      transactions.value = [];

      transactionsSnapshot.forEach(doc => {
        const data = doc.data();
        transactions.value.push({
          id: doc.id,
          name: data.name,
          amount: data.amount,
          type: data.type,
          date: data.date.toDate().toLocaleString()
        });
      });
    };

    // Call `fetchTransactions` when component is mounted
    onMounted(() => {
      fetchTransactions();
    });

    return {
      transactions,
      fetchTransactions  // This exposes the method to the template and via refs
    };
  },
}
</script>


<style scoped>
.transactions-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 20px;
}

.transactions-list h3 {
    margin-bottom: 15px;
    font-weight: bold;
    font-size: 24px;
}

table {
    width: 80%;  /* Adjust width as needed */
    border-collapse: collapse;
    margin: 0 auto; /* To center the table */
}

table, th, td {
    border: 1px solid #ddd;
    text-align: center;
}

th, td {
    padding: 8px 12px;
}

th {
    background-color: #f2f2f2;
    font-weight: bold;
}

tr:nth-child(even) {
    background-color: #f5f5f5;
}

tr:hover {
    background-color: #ddd;
}
</style>
