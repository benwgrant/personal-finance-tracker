<template>
    <nav>
      <!-- <router-link to="/">Home</router-link> -->
      <button @click="logout">Logout</button>
    </nav>
</template>
  
<script>
  import { auth } from '@/firebaseConfig';

  export default {
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
/* Style your navbar here */
</style>