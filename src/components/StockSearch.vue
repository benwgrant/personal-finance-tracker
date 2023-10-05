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
        <button @click="purchaseStock" :disabled="total > balance">Purchase</button>
        <p>Current balance: ${{ balance.toFixed(2) }}</p>
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
      total: 0,
      balance: 10000
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
    async fetchStockPrice(symbol) {
      const API_KEY = 'N2INPEQSCKDI4FTB';
      const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`);
      
      if (response.data && response.data['Time Series (5min)']) {
        const latestDataKey = Object.keys(response.data['Time Series (5min)'])[0];
        const latestData = response.data['Time Series (5min)'][latestDataKey];
        
        console.log("Latest Stock Price for", symbol, ":", latestData["1. open"]);
        
        this.selectedStock.price = parseFloat(latestData["1. open"]);
      } else {
        console.warn("Failed to fetch stock price for", symbol);
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
      this.fetchStockPrice(stock.symbol);
      this.calculateTotal();
    },
    calculateTotal() {
      this.total = this.shares * this.selectedStock.price;
      console.log("Total price", this.selectedStock.price)
    },
    purchaseStock() {
      if (this.total <= this.balance) {
        // Deduct from balance
        this.balance -= this.total;

        // For demonstration, simply logging the purchase
        console.log(`Purchased ${this.shares} shares of ${this.selectedStock.name}`);

        // Reset selection
        this.query = '';
        this.selectedStock = null;
        this.shares = 1;
        this.total = 0;
      } else {
        console.warn("Insufficient balance.");
      }
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
  width: 20%;
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

