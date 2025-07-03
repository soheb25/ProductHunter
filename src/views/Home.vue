<template>
    <DefaultLayout>
      <section class="py-10 px-4">
        <h1 class="text-3xl font-bold mb-6 text-center text-customText">Welcome to Our Store</h1>
        <ProductList />
      </section>
    </DefaultLayout>
</template>
  
<script>
import DefaultLayout from '@/layout/DefaultLayout.vue'
import ProductList from '@/components/product/ProductList.vue'

export default {
  components: {
    DefaultLayout,
    ProductList
  }
}
</script>
  