<template>
    <div>
      <h1>Login to Your Account</h1>
      <LoginForm />
    </div>
    <div>
        <p>Don't have an account? <router-link to="/sign-up">Sign Up</router-link></p>
    </div>
  </template>
  
  <script>
  import LoginForm from '@/components/LoginForm';
  
  export default {
    name: 'LoginView',
    components: {
      LoginForm
    }
  };
  </script>
  
  <style scoped>
  
  </style>