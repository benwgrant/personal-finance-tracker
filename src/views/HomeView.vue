<template>
  <div class="home">
    <NetWorthDisplay ref="netWorthDisplay" :netWorth="currentNetWorth" />
    <NetWorthInput @networth-updated="updateNetWorth" />
    <TransactionInput 
      @transaction-submitted="refreshTransactionTable"
      @networth-updated="updateNetWorth"
      />
    <div class="flex-container">
      <TransactionList ref="transactionTable"
      @transaction-submitted="refreshTransactionTable"
      />
      <BarGraphs ref="transactionGraph" />
    </div>
  </div>
</template>

<script>
import NetWorthInput from '@/components/NetWorthInput.vue';
import NetWorthDisplay from '@/components/NetWorthDisplay.vue';
import TransactionInput from '@/components/TransactionInput.vue';
import TransactionList from '@/components/TransactionList.vue';
import BarGraphs from '@/components/BarGraphs.vue'

export default {
  name: 'HomeView',
  components: {
    NetWorthInput,
    NetWorthDisplay,
    TransactionInput,
    TransactionList,
    BarGraphs
  },
  data() {
    return {
      currentNetWorth: null
    };
  },
  methods: {
    updateNetWorth(newNetWorth) {
      this.currentNetWorth = newNetWorth;
      this.$refs.netWorthDisplay.fetchCurrentNetWorth();
    },
    refreshTransactionTable() {
      this.$refs.transactionTable.fetchTransactions();
      this.$refs.transactionGraph.fetchAndProcessTransactions();
    }
  }
}
</script>

<style scoped>
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: top;
  width: 90%;
  padding: 1rem;
}

.flex-container > TransactionList {
  width: 70%;
}

.flex-container > BarGraphs {
  width: 20%;
}

</style>