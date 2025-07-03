<template>
    <router-link :to="`/product/${product.id}`" class="block bg-white rounded-2xl shadow p-4 hover:shadow-lg transition">
      <img :src="product.thumbnail" :alt="product.name" class="w-full h-48 object-cover rounded-lg mb-4" />
      <h2 class="text-lg font-semibold mb-2">{{ product.name }}</h2>
      <p class="text-customText mb-4">${{ product.price }}</p>
    </router-link>
</template>
  
<script>
  export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
}
  </script>