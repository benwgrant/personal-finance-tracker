<template>
  <div class="home">
    <NetWorthDisplay ref="netWorthDisplay" :netWorth="currentNetWorth" />
    <NetWorthInput @networth-updated="updateNetWorth" />
    <TransactionInput @transaction-submitted="refreshTransactionTable"/>
    <TransactionList ref="transactionTable" />
  </div>
</template>

<script>
import NetWorthInput from '@/components/NetWorthInput.vue';
import NetWorthDisplay from '@/components/NetWorthDisplay.vue';
import TransactionInput from '@/components/TransactionInput.vue';
import TransactionList from '@/components/TransactionList.vue';

export default {
  name: 'HomeView',
  components: {
    NetWorthInput,
    NetWorthDisplay,
    TransactionInput,
    TransactionList
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
    }
  }
}
</script>

