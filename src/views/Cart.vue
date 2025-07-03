<template>
  <default-layout>
    <div class="max-w-5xl mx-auto p-6">
      <h2 class="text-2xl font-bold mb-4">Your Cart</h2>
      <div v-if="items.length" class="grid md:grid-cols-3 gap-6">
        <!-- Cart Items -->
        <div class="md:col-span-2 space-y-4">
          <div v-for="item in items" :key="item.id"
            class="bg-white shadow p-4 rounded-xl flex justify-between items-center">
            <div class="flex items-center gap-3">
              <input type="checkbox" v-model="selectedItems" :value="item.id">
              <div>
                <h3 class="font-semibold text-gray-800">{{ item.title }}</h3>
                <p class="text-sm text-gray-500">{{ item.quantity }} × ${{ item.price }}</p>
              </div>
            </div>
            <!-- <div class="font-bold">${{ (item.price * item.quantity).toFixed(2) }}</div> -->
            <button @click="cart.removeFromCart(item.id)" class="text-red-500 hover:underline">
              Remove
            </button>
          </div>
          <div class="text-right mt-6 space-x-3">
            <button @click="clearSelected" class="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600"
              :disabled="!selectedItems.length">
              Clear
            </button>
            <button @click="cart.clearCart" class="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700">
              Clear Cart
            </button>
          </div>
        </div>
        <!-- Summary + Payment -->
        <div class="bg-white shadow p-6 rounded-xl space-y-4">
          <h3 class="text-lg font-semibold mb-2">🧾 Summary</h3>
          <p>Subtotal: ${{ subtotal.toFixed(2) }}</p>
          <div class="space-y-2">
            <input v-model="discountCode" placeholder="Discount code" class="border w-full px-3 py-2 rounded text-sm" />
            <button @click="applyDiscount" class="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
              Apply Discount
            </button>
            <p v-if="discountMessage" class="text-green-600 text-sm">{{ discountMessage }}</p>
          </div>
          <p v-if="discountPercent > 0" class="text-green-700">
            Discount ({{ discountPercent }}%): -${{ discountAmount.toFixed(2) }}
          </p>
          <hr />
          <p class="font-bold text-lg">
            Total: ${{ total.toFixed(2) }}
          </p>
          <button class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-4" @click="handlePayment">
            Pay Now
          </button>
        </div>
      </div>
      <div v-else class="text-gray-500 mt-10 text-center">
        Your cart is empty.
      </div>
    </div>
  </default-layout>
</template>

<script>
import { useCartStore } from '@/store/cart'
import { useUserStore } from '@/store/user'
import DefaultLayout from '@/layout/DefaultLayout.vue'

export default {
  components: { DefaultLayout },
  data() {
    return {
      discountCode: '',
      discountPercent: 0,
      discountMessage: '',
      selectedItems: []
    }
  },
  computed: {
    cart() {
      return useCartStore()
    },
    user() {
      return useUserStore()
    },
    items() {
      return this.cart.items
    },
    subtotal() {
      return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
    discountAmount() {
      return this.subtotal * (this.discountPercent / 100)
    },
    total() {
      return this.subtotal - this.discountAmount
    }
  },
  methods: {
    applyDiscount() {
      const code = this.discountCode.trim().toLowerCase()
      if (code === 'summer25') {
        this.discountPercent = 25
        this.discountMessage = '✅ 25% discount applied!'
      } else if (code === 'welcome10') {
        this.discountPercent = 10
        this.discountMessage = '✅ 10% welcome discount applied!'
      } else {
        this.discountPercent = 0
        this.discountMessage = '❌ Invalid discount code.'
      }
    },
    handlePayment() {
      if (!this.user.currentUser) {
        alert("You must be logged in to complete payment.")
        this.$router.push('/login')
        return
      }
      const order = {
        id: Date.now(),
        items: this.items,
        total: this.total.toFixed(2),
        date: new Date().toISOString(),
        status: 'Completed'
      }

      const orders = JSON.parse(localStorage.getItem('orders') || '{}')
      const userOrders = orders[this.user.currentUser.username] || []
      userOrders.push(order)
      orders[this.user.currentUser.username] = userOrders
      localStorage.setItem('orders', JSON.stringify(orders))

      alert(`🎉 Payment of $${this.total.toFixed(2)} successful!`)
      this.cart.clearCart()
      this.$router.push('/home')
    },
    clearSelected() {
      this.selectedItems.forEach(id => this.cart.removeFromCart(id))
      this.selectedItems = []
    }
  }
}
</script>