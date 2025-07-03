<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <input v-model="username" placeholder="Username" class="w-full border px-4 py-2 rounded-lg" required />
        <input v-model="password" type="password" placeholder="Password" class="w-full border px-4 py-2 rounded-lg" required />
        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-lg">Login</button>
        <p class="text-center mt-4 text-sm">
          Don't have an account?
          <router-link to="/register" class="text-blue-600 hover:underline">Register</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/store/user'

export default {
  data() {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    handleLogin() {
      const userStore = useUserStore()
      try {
        userStore.login(this.username, this.password)
        this.$router.push('/home')
      } catch (err) {
        this.error = err.message
      }
    }
  }
}
</script>