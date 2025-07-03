<template>
  <default-layout>
    <div class="max-w-3xl mx-auto p-6">
      <h2 class="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
        📦 Your Orders
      </h2>

      <div v-if="orders.length" class="space-y-6">
        <div v-for="order in orders" :key="order.id" class="bg-white p-6 rounded-xl shadow border-l-4 border-blue-600">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-semibold text-lg text-blue-700">
              Order #{{ order.id }}
            </h3>
            <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              {{ order.status }}
            </span>
          </div>
          <p class="text-gray-500 text-sm mb-4">📅 Placed on: {{ formatDate(order.date) }}</p>
          
          <ul class="ml-4 list-disc text-sm text-gray-700 mb-4 space-y-1">
            <li v-for="item in order.items" :key="item.id" class="flex justify-between">
              <span>{{ item.title }}</span>
              <span class="text-gray-800 font-medium">${{ item.price }} × {{ item.quantity }}</span>
            </li>
          </ul>

          <div class="flex justify-end items-center gap-4">
            <div class="text-lg font-bold text-gray-800">
              Total: <span class="text-green-600">${{ order.total }}</span>
            </div>
            <button @click="openModel(order)" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
              View Details
            </button>
          </div>
        </div>
      </div>

      <div v-else class="text-gray-500 text-center text-lg mt-20">
        😕 You have no orders yet.
      </div>

      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white max-w-lg w-full p-6 rounded-xl shadow-lg relative animate-fade-in">
            <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-black">
                &times;
            </button>
            <h3 class="text-2xl font-bold mb-4 text-blue-700">Order #{{ selectedOrder.id }}</h3>
            <p class="text-gray-500 mb-4">📅 {{ formatDate(selectedOrder.date) }}</p>
            <ul class="list-disc ml-4 text-sm text-gray-700 space-y-1 mb-4">
                <li v-for="item in selectedOrder.items" :key="item.id">
                    {{ item.title }} - ${{ item.price }} X {{ item.quantity }}
                </li>
            </ul>
            <div class="text-right text-lg font-bold text-gray-800">
                Total : <span class="text-green-600">${{ selectedOrder.total }}</span>
            </div>
        </div>
      </div>
    </div>
  </default-layout>
</template>


<script>
import { useUserStore } from '@/store/user';
import DefaultLayout from '@/layout/DefaultLayout.vue'
export default {
    components : {DefaultLayout},
    data() {
        return{ 
            orders : [],
            showModal : false,
            selectedOrder : {}
         }
    },
    created () {
        const userStore = useUserStore()
        const orders = JSON.parse(localStorage.getItem('orders') || '{}')
        this.orders = orders[userStore.currentUser?.username] || []
    },
    methods : {
        formatDate(datestr) {
            const d = new Date(datestr)
            return d.toLocaleString()
        },
        openModel(order) {
            this.selectedOrder = order
            this.showModal = true
        },
        closeModal() {
            this.showModal = false
        }
    }
}
</script>
