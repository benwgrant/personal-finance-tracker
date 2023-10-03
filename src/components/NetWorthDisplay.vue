<template>
    <div class="net-worth-display">
      <div class="amount" v-if="currentNetWorth">${{ currentNetWorth }}</div>
    </div>
</template>

<script>
import { db, auth } from '@/firebaseConfig';

export default {
  props: {
    netWorth: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      currentNetWorth: this.netWorth
    };
  },
  methods: {
    async fetchCurrentNetWorth() {
      try {
        const userId = auth.currentUser.uid;
        const netWorthDoc = await db.collection('netWorths').doc(userId).get();
        if (netWorthDoc.exists) {
          this.currentNetWorth = netWorthDoc.data().amount;
        }
      } catch (error) {
        console.error("Error fetching net worth:", error);
      }
    }
  },
  watch: {
    netWorth(newVal) {
      this.currentNetWorth = newVal;
    }
  },
  mounted() {
    this.fetchCurrentNetWorth();
  }
}
</script>

<style scoped>
.net-worth-display {
  text-align: center;
}

.amount {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
