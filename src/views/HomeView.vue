<template>
  <div class="home">
    <NetWorthDisplay ref="netWorthDisplay" :netWorth="currentNetWorth" />
    <NetWorthInput @networth-updated="updateNetWorth" />
  </div>
</template>

<script>
import NetWorthInput from '@/components/NetWorthInput.vue';
import NetWorthDisplay from '@/components/NetWorthDisplay.vue';

export default {
  name: 'HomeView',
  components: {
    NetWorthInput,
    NetWorthDisplay
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
    }
  }
}
</script>

