<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
      <form @submit.prevent="handleRegister" class="space-y-4">
        <input v-model="username" placeholder="Username" class="w-full border px-4 py-2 rounded-lg" required />
        <input v-model="password" type="password" placeholder="Password" class="w-full border px-4 py-2 rounded-lg"
          required />
        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
        <button type="submit" class="w-full bg-green-600 text-white py-2 rounded-lg">Register</button>
        <p class="text-center mt-4 text-sm">
          Already have an account?
          <router-link to="/ProductHunter/" class="text-blue-600 hover:underline">Login</router-link>
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
    handleRegister() {
      const userStore = useUserStore()
      try {
        userStore.register(this.username, this.password)
        this.$router.push('/ProductHunter/')
      } catch (err) {
        this.error = err.message
      }
    }
  }
}
</script>