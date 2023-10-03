<template>
    <div>
      <input v-model="query" @input="searchStocks" placeholder="Search for stocks..." />
      
      <ul v-if="stocks.length">
        <li v-for="stock in stocks" :key="stock.symbol" @click="selectStock(stock)">
          {{ stock.symbol }} - {{ stock.name }}: {{ stock.change }}
        </li>
      </ul>
  
      <div v-if="selectedStock && query.length > 0">
        <p>Price per share: {{ selectedStock.price }}</p>
        <label>
          Number of shares:
          <input type="number" v-model="shares" @input="calculateTotal" />
        </label>
        <p>Total price: {{ total }}</p>
      </div>
    </div>
  </template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      query: '',
      stocks: [],
      selectedStock: null,
      shares: 1,
      total: 0
    };
  },
  methods: {
    async searchStocks() {
        if (this.query.length < 3) {
            this.stocks = [];
            return;
        }

        const API_KEY = 'N2INPEQSCKDI4FTB'; 
        const response = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.query}&apikey=${API_KEY}`);

        if (response.data && response.data.bestMatches) {
            const rawStocks = response.data.bestMatches;
            this.stocks = rawStocks.map(stock => ({
            symbol: stock['1. symbol'],
            name: stock['2. name'],
            change: stock['9. change']
            }));
        } else {
            this.stocks = [];
            console.warn("API did not return expected data. Perhaps you've run out of calls or there's another error.");
        }
    },
    selectStock(stock) {
        if (this.query.length === 0) {
        this.selectedStock = null;
        this.stocks = [];
        return;
      }
      this.selectedStock = stock;
      this.query = `${stock.symbol} - ${stock.name}`;
      this.calculateTotal();
    },
    calculateTotal() {
      this.total = this.shares * this.selectedStock.price;
    }
  }
}
</script>

<style scoped>
.search-wrapper {
  display: flex;
  justify-content: center;
  width: 100%; 
}

.search-container {
  position: relative;
  width: 300px; 
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: box-shadow 0.3s ease;
}

.search-input:focus {
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  outline: none;
}

.results-dropdown {
  list-style-type: none;
  margin: 8px 0 0;
  padding: 0;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  max-height: 200px;
  overflow-y: auto;
  position: absolute;
  width: 100%;
  z-index: 1;
}

li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

li:hover {
  background-color: #f5f5f5;
}
</style>

