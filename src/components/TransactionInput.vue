<template>
    <div class="transaction-input">
        <h3>Add Transaction</h3>
        <input v-model="name" placeholder="Transaction Name">
        <input v-model="amount" placeholder="Amount" type="number">
        <select v-model="type">
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Rent">Rent</option>
            <option value="Insurance">Insurance</option>
            <option value="Personal Spending">Personal Spending</option>
            <option value="Other">Other</option>
        </select>
        <button @click="submitTransaction">Submit</button>
    </div>
</template>

<script>
import { ref } from 'vue';
import { db, auth } from '@/firebaseConfig';

export default {
    setup(props, context) {  // Note the added `context` parameter
        const name = ref('');
        const amount = ref(null);
        const type = ref('Food'); // Default value

        const submitTransaction = async () => {
            const userId = auth.currentUser.uid;

            // Fetch current net worth
            const netWorthDocRef = db.collection('netWorths').doc(userId);
            const netWorthDoc = await netWorthDocRef.get();
            let currentNetWorth = netWorthDoc.exists ? netWorthDoc.data().amount : 0;

            const transaction = {
                name: name.value,
                amount: amount.value,
                type: type.value,
                date: new Date() // storing the current date and time
            };

            // Subtract transaction amount from current net worth
            currentNetWorth -= transaction.amount;

            try {
                // Add the transaction
                await db.collection('transactions').doc(userId).collection('userTransactions').add(transaction);
                console.log("Transaction added successfully");

                // Update net worth
                await netWorthDocRef.set({
                    amount: currentNetWorth
                }, { merge: true });

                context.emit('transaction-submitted');  // Use context.emit instead of this.$emit
                context.emit('networth-updated');
            } catch (error) {
                console.error("Error:", error);
            }
        };

        return {
            name,
            amount,
            type,
            submitTransaction
        };
    }
}
</script>

<style scoped>
/* Add any desired styles here */
</style>
