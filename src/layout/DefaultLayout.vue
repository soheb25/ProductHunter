<template>
  <div class="min-h-screen flex flex-col bg-customBg">
    <header class="shadow-md py-4 sm:px-6 px-2 bg-customHd">
      <div class="container mx-auto flex justify-between items-center">
        <router-link to="/" class="sm:text-2xl text-sm font-bold text-white">ProductHunter</router-link>
        <nav class="sm:space-x-4 space-x-2">
          <router-link to="/home" class="text-white hover:text-yellow-50">Home</router-link>
          <router-link to="/cart" class="text-white hover:text-yellow-50">Cart</router-link>
          <router-link to="/order" class="text-white hover:text-yellow-50">Orders</router-link>
          <router-link to="/admin-login" class="text-sm text-white hover:underline">Admin</router-link>
          <button v-if="user.currentUser" @click="logout" class="text-red-500 ml-4">Logout</button>
        </nav>
      </div>
          <div v-if="isImpersonating" class="bg-yellow-300 text-black py-2 text-center font-bold">
            🚨 You are login as: {{ currentUserName }} — <button class="underline" @click="backToAdmin">Back to
              Admin</button>
          </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="text-center py-4 mt-8 bg-customHd">
      <p class="text-sm text-white">&copy; 2025 MyStore. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import { useUserStore } from '@/store/user'

export default {
  computed: {
    user() {
      return useUserStore()
    },
    isImpersonating() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
      return currentUser.username !== 'admin' && !!localStorage.getItem('adminSession')
    },
    currentUserName() {
      const user = JSON.parse(localStorage.getItem('currentUser') || '{}')
      return user.username
    },
  },
  methods: {
    logout() {
      this.user.logout()
      this.$router.push('/')
    },
    backToAdmin() {
      const adminSession = localStorage.getItem('adminSession')
      if (adminSession) {
        localStorage.setItem('currentUser', adminSession)
        localStorage.removeItem('adminSession')
        alert('Restored Admin Session')
        this.$router.push('/admin')
      } else {
        alert('No Admin Session Found')
      }
    }
  }
}
</script>