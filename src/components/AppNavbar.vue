<template>
  <nav>
    <div class="site-title-container">
      <h class="site-title">PERSONAL FINANCE TRACKER</h>
    </div>
    <div class="actions">
      <div class="change-page">
        <router-link to="/">Home</router-link> |
        <router-link to="/investing">Investments</router-link>
      </div>
      <button v-if="isAuthenticated" @click="logout">Logout</button>
    </div>
  </nav>
</template>

  
<script>
  import { auth } from '@/firebaseConfig';

  export default {
    props: {
    isAuthenticated: {
      type: Boolean,
      required: true
    }
    },
    methods: {
      async logout() {
        try {
          await auth.signOut();
          this.$router.push({ name: 'Login' });
        } catch (e) {
          console.error('Logout Error:', e);
        }
      }
    }
  }

</script>
  
<style scoped>
nav {
    display: flex;
    justify-content: space-between;
    align-items: center; 
    padding: 10px 20px;
}

.site-title-container {
    flex: 1; 
    font-size: 20pt;
    text-align: left;
}

.actions {
    display: flex;
    align-items: center;
}

.change-page {
    margin-right: 20px;
}


button {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

.button:focus {
  outline: none;
}

.button:active {
  transform: scale(0.98);
}

.button-block {
  display: block;
  width: 100%;
}

</style>