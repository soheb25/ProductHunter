import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/store/user';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import('@/views/Product.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/Cart.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/admin-login',
    name: 'AdminLogin',
    component: () => import('@/views/admin/AdminLogin.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/admin/Admin.vue'),
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/OrderHistory.vue'),
    meta : {requiresAuth : true}
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  userStore.loadUser() // restore user from localStorage
  const user = userStore.currentUser

  const isLoggedIn = !!user
  const isAdmin = user?.username === 'admin'

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else if (to.meta.isAdmin && !isAdmin) {
    next('/admin-login')
  } else {
    next()
  }
})

export default router;