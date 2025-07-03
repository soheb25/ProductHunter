import { defineStore } from 'pinia'
import { useUserStore } from './user.js'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),

  actions: {
    // addToCart(product) {
    //   const existing = this.items.find(item => item.id === product.id)
    //   if (existing) {
    //     existing.quantity++;
    //   } else {
    //     this.items.push({ ...product, quantity: 1 })
    //   }
    // },

    // removeFromCart(productId) {
    //   this.items = this.items.filter(item => item.id !== productId)
    // },

    // clearCart() {
    //   this.items = []
    // },
    addToCart(product) {
      const existing = this.items.find(item => item.id === product.id)
      if (existing) {
        existing.quantity++;
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
      this.saveUserCart() // ✅ Save after change
    },

    removeFromCart(productId) {
      this.items = this.items.filter(item => item.id !== productId)
      this.saveUserCart() // ✅ Save after change
    },

    clearCart() {
      this.items = []
      this.saveUserCart() // ✅ Save after clearing
    },
    
    saveUserCart() {
      const allCarts = JSON.parse(localStorage.getItem('userCarts') || '{}')
      const userStore = useUserStore()
      if (userStore.currentUser) {
        allCarts[userStore.currentUser.username] = this.items
        localStorage.setItem('userCarts', JSON.stringify(allCarts))
      }
    }
  }
})
