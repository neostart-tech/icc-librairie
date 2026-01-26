<template>
  <!-- CARTE LIVRE -->
  <div
    class="relative bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
    @click="goToDetail"
  >
    <!-- IMAGE -->
    <div class="relative">
      <img
        :src="book.image"
        :alt="book.title"
        class="w-full h-54 object-cover"
      />

      <!-- WISHLIST (toujours visible) -->
      <button
        class="absolute top-3 right-3 bg-white w-9 h-9 rounded-full flex items-center justify-center shadow hover:bg-gray-100 cursor-pointer"
        @click.stop="addToWishlist"
      >
        🤍
      </button>
    </div>

    <!-- INFOS -->
    <div class="p-4 space-y-2">
      <h3 class="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">
        {{ book.title }}
      </h3>

      <p class="text-sm text-gray-500">
        {{ book.author }}
      </p>

      <p class="font-bold text-[#4A2B69]">
        {{ book.price }} FCFA
      </p>

      <!-- AJOUT PANIER (toujours visible) -->
      <button
        class="mt-3 w-full bg-[#4A2B69] text-white text-sm py-2 rounded-lg hover:bg-[#4A2B69] transition cursor-pointer"
        @click.stop="addToCart"
      >
        Ajouter au panier
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const goToDetail = () => {
  router.push(`/livres/${props.book.slug}`)
}

const addToCart = () => {
  alert(`Ajouté au panier : ${props.book.title}`)
}

const addToWishlist = () => {
  alert(`Ajouté à la wishlist : ${props.book.title}`)
}
</script>




