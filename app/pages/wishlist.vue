<template>
  <div class="min-h-screen bg-[#F3F0F5] px-6 lg:px-12 py-10">
    <div class="max-w-7xl mx-auto">
      <!-- HEADER -->
      <div class="flex items-center gap-3 mb-8">
        <NuxtLink
          to="/"
          class="text-gray-500 hover:text-[#6a0d5f] transition text-xl"
        >
          ←
        </NuxtLink>
        <h1 class="text-2xl font-bold text-gray-800"> Liste de souhaits</h1>
      </div>

      <!-- LISTE VIDE -->
      <div
        v-if="wishlist.length === 0"
        class="bg-white rounded-xl shadow p-10 text-center"
      >
        <p class="text-gray-600 mb-6">
          Votre liste de souhaits est vide 💔
        </p>
        <NuxtLink
          to="/catalogue"
          class="inline-block bg-[#6a0d5f] text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
        >
          Découvrir les livres
        </NuxtLink>
      </div>

      <!-- LISTE -->
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <div
          v-for="book in wishlist"
          :key="book.id"
          class="group relative bg-white rounded-lg shadow transition overflow-hidden w-full max-w-[220px] mx-auto hover:shadow-lg"
        >
          <!-- IMAGE -->
          <img
            :src="book.image"
            :alt="book.title"
            class="w-full h-44 object-cover group-hover:scale-105 transition"
          />

          <!-- INFOS -->
          <div class="p-3 flex flex-col">
            <h3 class="font-semibold text-base mb-1 line-clamp-1">
              {{ book.title }}
            </h3>
            <p class="text-xs text-gray-500 mb-2">
              {{ book.author }}
            </p>

            <span class="text-[#6a0d5f] font-bold text-base mb-3">
              {{ book.price }} FCFA
            </span>

            <button
              @click="addToCart(book)"
              class="w-full bg-[#6a0d5f] text-white py-1.5 rounded-md text-sm hover:bg-purple-700 transition cursor-pointer"
            >
              Ajouter au panier
            </button>

            <!-- SUPPRIMER DE LA WISHLIST -->
            <button
              @click="removeFromWishlist(book.id)"
              class="mt-2 text-xs text-gray-400 hover:text-red-500 transition cursor-pointer"
            >
              Retirer de la liste de souhaits
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

const wishlist = ref([
  {
    id: 1,
    title: "Le Pouvoir de la Foi",
    author: "John Maxwell",
    price: 7500,
    image: "/images/livre.jpg",
  },
  {
    id: 2,
    title: "Marcher avec Dieu",
    author: "Rick Warren",
    price: 9800,
    image: "/images/livre1.jpg",
  },
])

const removeFromWishlist = (id) => {
  wishlist.value = wishlist.value.filter(book => book.id !== id)
}

const addToCart = (book) => {
  alert(`📚 "${book.title}" ajouté au panier`)
}
</script>
