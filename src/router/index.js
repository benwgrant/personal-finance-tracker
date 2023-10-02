import { createRouter, createWebHashHistory } from 'vue-router'
import { auth } from '@/firebaseConfig';

const routes = [
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import('@/views/SignUpView.vue'),
    meta: {
      requiresNoAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: {
      requiresNoAuth: true // Indicates this route should NOT be accessed if user is authenticated
    }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      requiresAuth: true  // Indicates this route should only be accessed if user is authenticated
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresNoAuth = to.matched.some(record => record.meta.requiresNoAuth);
  const isAuthenticated = auth.currentUser;

  if (requiresAuth && !isAuthenticated) {
    // Redirect to login page if user is not authenticated
    next('/login');
  } else if (requiresNoAuth && isAuthenticated) {
    // Redirect to home page if user is authenticated and trying to access a no-auth page (like login)
    next('/');
  } else {
    // Otherwise, allow them to proceed
    next();
  }
});


export default router
