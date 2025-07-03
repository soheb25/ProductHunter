<template>
  <!-- <div class="mb-8">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <h2 class="text-2xl font-bold text-customText pl-2">Shop Products</h2>
      <div>
        <label class="mr-2 font-medium text-customText">Category :</label>
        <select v-model="selectedCategory" class="border rounded px-3 py-1 bg-customBg cursor-pointer">
          <option value="">All</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
    </div>
  </div> -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 flex-wrap">
    <!-- 🔍 Search Input -->
    <!-- <div class="flex items-center gap-2 w-full sm:w-auto">
      <input v-model="searchTerm" type="text" placeholder="Search products..." class="w-full sm:w-64 border px-3 py-1 rounded" />
    </div> -->
    <!-- Category Filter -->
    <div class="flex items-center gap-2 ">
      <label class="font-medium text-gray-700">Category:</label>
      <select v-model="selectedCategory" class="border rounded px-3 py-1 bg-customBg cursor-pointer">
        <option value="">All</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>
    <!-- Sort Option -->
    <div class="flex items-center gap-6 sm:gap-2">
      <label class="font-medium text-gray-700">Sort By:</label>
      <select v-model="sortOption" class="border rounded px-3 py-1 bg-customBg cursor-pointer">
        <option value="">Default</option>
        <option value="priceLowHigh">Price: Low to High</option>
        <option value="priceHighLow">Price: High to Low</option>
        <option value="nameAZ">Name: A to Z</option>
        <option value="nameZA">Name: Z to A</option>
      </select>
    </div>

  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue'

export default {
  components: {
    ProductCard
  },
  data() {
    return {
      selectedCategory: '',
      sortOption: '',
      searchTerm: '',
      products: []
    }
  },
  created() {
    this.fetchProducts()
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch('https://dummyjson.com/products/search?q=phone')
        const data = await response.json()
        this.products = data.products
      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
    }
  },
  computed: {
    categories() {
      return [...new Set(this.products.map(p => p.category))]
    },
    filteredProducts() {
      // if (!this.selectedCategory) return this.products
      // return this.products.filter(p => p.category === this.selectedCategory)
      let filtered = this.selectedCategory ? this.products.filter(p => p.category === this.selectedCategory) : [...this.products]
      // let filtered = [...this.products]

      // // Filter by category
      // if (this.selectedCategory) {
      //   filtered = filtered.filter(p => p.category === this.selectedCategory)
      // }
      // if (this.searchTerm.trim() !== '') {
      //   const keyword = this.searchTerm.toLowerCase()
      //   filtered = filtered.filter(p => p.title.toLowerCase().include(keyword))
      // }

      switch (this.sortOption) {
        case 'priceLowHigh':
          return filtered.sort((a, b) => a.price - b.price)
        case 'priceHighLow':
          return filtered.sort((a, b) => b.price - a.price)
        case 'nameAZ':
          return filtered.sort((a, b) => a.title.localeCompare(b.title))
        case 'nameZA':
          return filtered.sort((a, b) => b.title.localeCompare(a.title))
        default:
          return filtered
      }
    }
  }
}
</script>