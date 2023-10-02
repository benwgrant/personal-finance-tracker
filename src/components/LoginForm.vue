  <template>
    <div>
      <input v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <button @click="login">Login</button>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { auth } from '@/firebaseConfig';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'LoginForm',
    setup() {
      const email = ref('');
      const password = ref('');
      const error = ref('');
      const router = useRouter();
  
      const login = async () => {
        try {
          await auth.signInWithEmailAndPassword(email.value, password.value);
          
          // Navigate to the home route after successful login
          router.push({ name: 'Home' });
          
        } catch (e) {
          error.value = e.message;
        }
      };
  
      return {
        email,
        password,
        login,
        error
      };
    }
  };
  </script>
  
  <style scoped>
  /* Add any desired styles here */
  </style>
  
  