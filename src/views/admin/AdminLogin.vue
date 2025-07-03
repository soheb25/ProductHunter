<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
            <h2 class="text-2xl font-bold mb-6 text-center">Admin Login</h2>
            <form @submit.prevent="handleLogin" class="space-y-4">
                <input v-model="username" placeholder="Admin Username" class="w-full border px-4 py-2 rounded"
                    required />
                <input v-model="password" type="password" placeholder="Password" class="w-full border px-4 py-2 rounded"
                    required />
                <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
                <button class="w-full bg-gray-800 text-white py-2 rounded hover:bg-black">Login</button>
            </form>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '@/store/user';

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
            const store = useUserStore()
            if (this.username === 'admin' && this.password === 'admin123') {
                store.login(this.username, this.password)
                this.$router.push('/ProductHunter/admin')
            } else {
                this.error = 'Invalid admin credentials'
            }
        }
    }
}
</script>