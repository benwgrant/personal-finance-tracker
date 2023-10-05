<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <AppNavbar :is-authenticated="isAuthenticated" />
  <router-view/>
  <!-- <footer>
    Made by Benjamin Grant. Github: https://github.com/benwgrant/personal-finance-tracker
  </footer> -->
</template>

<script>
import { ref, onMounted } from 'vue';
import { auth } from '@/firebaseConfig';
import AppNavbar from '@/components/AppNavbar.vue';

export default {
  components: {
    AppNavbar
  },
  setup() {
    const isAuthenticated = ref(false);

    // Listen for changes in authentication state
    onMounted(() => {
      auth.onAuthStateChanged(user => {
        isAuthenticated.value = !!user;
      });
    });

    return { isAuthenticated };
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}


</style>
