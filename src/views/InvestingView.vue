<template>
    <div class="home">
      <NetWorthDisplay ref="netWorthDisplay" :netWorth="currentNetWorth" />
      <StockSearch />
    </div>
  </template>
  
  <script>
  import NetWorthDisplay from '@/components/NetWorthDisplay.vue';
  import StockSearch from '@/components/StockSearch.vue';

  export default {
    name: 'HomeView',
    components: {
      NetWorthDisplay,
      StockSearch
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
  
  </style>