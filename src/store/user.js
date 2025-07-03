import { defineStore } from 'pinia'
import { useCartStore } from './cart.js'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null
  }),
  actions: {
    register(username, password) {
      const users = JSON.parse(localStorage.getItem('users') || '{}')
      if (users[username]) {
        throw new Error('User already exists')
      }
      users[username] = { password }
      localStorage.setItem('users', JSON.stringify(users))
      this.currentUser = { username }
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
    },
    // login(username, password) {
    //   const users = JSON.parse(localStorage.getItem('users') || '{}')
    //   if (!users[username] || users[username].password !== password) {
    //     throw new Error('Invalid username or password')
    //   }
    //   this.currentUser = { username }
    //   localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
    // },
    login(username, password) {
      const users = JSON.parse(localStorage.getItem('users') || '{}')
      if (!users[username] || users[username].password !== password) {
        throw new Error('Invalid username or password')
      }
      this.currentUser = { username }
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser))

      // 🔄 Load their cart
      const allCarts = JSON.parse(localStorage.getItem('userCarts') || '{}')
      const cartStore = useCartStore()
      cartStore.items = allCarts[username] || []
    },
    logout() {
      this.currentUser = null
      localStorage.removeItem('currentUser')
    },
    loadUser() {
      const saved = localStorage.getItem('currentUser')
      if (saved) {
        this.currentUser = JSON.parse(saved)
      }
    }
  }
})