<template>
  <transition name="fade">
    <div v-if="visible" class="fixed bottom-6 right-6 bg-customBg text-white px-4 py-2 rounded-xl shadow-lg z-50">
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 2000
    }
  },
  data() {
    return {
      visible: false
    }
  },
  mounted() {
    this.visible = true
    setTimeout(() => {
      this.visible = false
    }, this.duration)
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>