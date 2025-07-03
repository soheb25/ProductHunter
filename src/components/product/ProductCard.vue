<template>
  <div
    class="bg-stone-400 rounded-2xl shadow-md hover:shadow-xl transition-shadow p-4 flex flex-col items-center cursor-pointer transform hover:scale-[1.02]">
    <img :src="product.thumbnail" :alt="product.name" class="w-full h-52 rounded-xl mb-4" />
    <h3 class="text-lg font-semibold mb-1 text-customText text-center">{{ product.title }}</h3>
    <p class="text-customText font-bold text-md mb-2">${{ product.price }}</p>
    <div class="text-customText font-bold pl-1 text-sm mb-4 border rounded-md bg-indigo-300 flex gap-1">{{ product.rating }}
      <img class="h-4 pt-1" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg==">
    </div>
    <p class="text-customText text-sm mb-4">{{ product.category }}</p>
    <button @click="handleAddToCart"
      class="mt-auto bg-customPbg hover:bg-amber-950 text-white px-6 py-2 rounded-xl transition duration-300">Add to
      Cart
    </button>
    <Toast v-if="showToast" message="Added to cart!" />
  </div>
</template>

<script>
import { useCartStore } from '@/store/cart.js'
import Toast from './Toast.vue'

export default {
  name: 'PostCard',
  components: {
    Toast
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showToast: false
    }
  },
  methods: {
    handleAddToCart() {
      const cart = useCartStore()
      cart.addToCart(this.product)
      this.showToast = true
      setTimeout(() => {
        this.showToast = false
      }, 2000)
    }
  }
}
</script>