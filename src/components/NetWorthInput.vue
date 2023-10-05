<template>
    <div class="net-worth-input">
      <label for="netWorth">Change Net Worth: </label>
      <input v-model="netWorth" type="number" id="netWorth" placeholder="Enter your net worth">
      <button @click="submitNetWorth">Submit</button>
      <!-- Display current net worth next to the submit button -->
      <!-- <span v-if="currentNetWorth !== null">  Current Net Worth: ${{ currentNetWorth }}</span> -->
    </div>
</template>
  
<script>
import { db, auth } from '@/firebaseConfig';

export default {
  data() {
    return {
      netWorth: null,
      currentNetWorth: null
    };
  },
  methods: {
    async submitNetWorth() {
        if(confirm("Are you sure you would like manually change your net worth? You can add a transaction instead.")){
        try {
            const userId = auth.currentUser.uid;
            const userDocRef = db.collection('netWorths').doc(userId);
            await userDocRef.set({
            amount: this.netWorth
            }, { merge: true });
            this.currentNetWorth = this.netWorth;
            console.log("Net Worth Saved/Updated Successfully");
            this.$emit('networth-updated');
        } catch (error) {
            console.error("Error saving/updating net worth:", error);
        }
    }
    },
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
  mounted() {
    this.fetchCurrentNetWorth();
  }
}
</script>
  
<style scoped>
.net-worth-input input {
  height: 20px;
}

button { 
    color:#050; 
    font: old 84% Avenir; 
    background-color:rgb(255, 255, 255); 
    border:1px solid;
    border-radius: 6px;
    transition-duration: 0.4s;
    height: 25px;
}

button:hover {
  background-color: #4CAF50;
  color: white;
}

.add-form {
  margin-bottom: 40px;
}

.form-control {
  margin: 20px 0;
}

.form-control label {
  display: block;
}

.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
</style>
