<template>
    <div>
      <h2>Sign Up</h2>
      <form @submit.prevent="signUp">
        <input v-model="email" type="email" placeholder="Email" required>
        <input v-model="password" type="password" placeholder="Password" required>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { auth } from '@/firebaseConfig';
  
  export default {
    name: 'SignUpView',
    setup() {
      const email = ref('');
      const password = ref('');
  
      const signUp = async () => {
        try {
          await auth.createUserWithEmailAndPassword(email.value, password.value);
          console.log('User created successfully');
          // Navigate to home view after successful sign-up
          this.$router.push('/');
        } catch (error) {
          console.error('Error signing up:', error);
        }
      };
  
      return {
        email,
        password,
        signUp
      };
    }
  }
  </script>
  