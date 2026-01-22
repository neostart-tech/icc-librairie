<template>
  <section class="relative w-full h-screen overflow-hidden bg-black">

    <!-- SLIDES -->
    <div class="relative w-full h-full">
      <transition-group name="fade" tag="div">
        <img
          v-for="(image, index) in images"
          v-show="currentSlide === index"
          :key="image"
          :src="image"
          alt="slide"
          class="absolute inset-0 w-full h-full object-cover"
        />
      </transition-group>
    </div>

    <!-- FLECHE GAUCHE -->
    <button
      @click="prevSlide"
      class="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-full text-2xl"
    >
      ‹
    </button>

    <!-- FLECHE DROITE -->
    <button
      @click="nextSlide"
      class="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-full text-2xl"
    >
      ›
    </button>

  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const images = [
  '/images/i1.jpg',
  '/images/i2.jpg',
  '/images/i3.jpg',
  '/images/i4.jpg'
]

const currentSlide = ref(0)
let interval = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % images.length
}

const prevSlide = () => {
  currentSlide.value =
    currentSlide.value === 0
      ? images.length - 1
      : currentSlide.value - 1
}

onMounted(() => {
  interval = setInterval(() => {
    nextSlide()
  }, 5000) // 5 secondes
})

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
