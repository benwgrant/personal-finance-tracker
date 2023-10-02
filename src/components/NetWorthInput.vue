<template>
    <div class="net-worth-input">
      <label for="netWorth">Total Net Worth: </label>
      <input v-model="netWorth" type="number" id="netWorth" placeholder="Enter your net worth">
      <button @click="submitNetWorth">Submit</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        netWorth: null
      };
    },
    methods: {
      submitNetWorth() {
        // handle submission
        // for now, let's log it
        console.log("Net Worth Submitted:", this.netWorth);
      }
    }
  }
  </script>
  
  <style scoped>
  .net-worth-input {
    padding: 20px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
  }
  </style>