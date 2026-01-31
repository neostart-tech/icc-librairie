<template>

  <div class="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8">

    <NuxtLink to="/" class="text-[#6a0d5f] font-semibold mb-6 inline-block hover:underline">
      ← Retour à la liste
    </NuxtLink>

    <div class="flex flex-col md:flex-row gap-8">

      <div class="flex-1 flex justify-center md:justify-start">
        <img
          :src="book.image"
          class="w-48 sm:w-56 md:w-64 lg:w-72 rounded-xl shadow-md object-cover"
          alt="Image du livre"
        />
      </div>

      <div class="flex-1 flex flex-col justify-start gap-6">

        <!-- INFOS -->
        <div>
          <h1 class="text-2xl font-bold mb-2 text-gray-900">{{ book.title }}</h1>
          <p class="text-gray-600 text-sm mb-4">Auteur : {{ book.author }}</p>

          <div class="flex items-center gap-4 mb-4">
            <span v-if="book.isPromo" class="line-through text-gray-400">
              {{ book.oldPrice }} FCFA
            </span>
            <span class="text-[#6a0d5f] font-bold text-xl">
              {{ book.price }} FCFA
            </span>
          </div>

          <p class="text-gray-700 mb-6">
            Catégorie : <span class="font-semibold">{{ book.category }}</span>
          </p>

          <button
            class="bg-[#6a0d5f] text-white py-2 px-6 rounded-md text-sm
                   hover:bg-purple-700 transition"
          >
            Ajouter au panier
          </button>
        </div>

        <div>
          <h2 class="text-xl font-semibold mb-2">Description</h2>
          <p class="text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique. Duis cursus, mi quis viverra
            ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
          </p>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>

import { ref, computed } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const bookId = parseInt(route.params.id)

const books = [
  { id: 1, title: "Le Pouvoir de la Foi", author: "Joseph K.", price: 7500, oldPrice: 12000, isPromo: true, category: "Spiritualité", image: "/images/livre.jpg" },
  { id: 2, title: "Marcher avec Dieu", author: "Paul N.", price: 9800, isPromo: false, category: "Étude Biblique", image: "/images/livre1.jpg" },
  { id: 3, title: "Prières et Méditations", author: "Marie A.", price: 6500, oldPrice: 9000, isPromo: true, category: "Spiritualité", image: "/images/livre2.jpg" },
  { id: 4, title: "La Parole du Jour", author: "Jean P.", price: 8500, isPromo: false, category: "Théologie", image: "/images/livre.jpg" },
  { id: 5, title: "La Vie en Christ", author: "Anne M.", price: 12000, oldPrice: 15000, isPromo: true, category: "Famille & Éducation", image: "/images/livre1.jpg" },
  { id: 6, title: "Guide de Prière", author: "Pierre L.", price: 7200, isPromo: false, category: "Étude Biblique", image: "/images/livre2.jpg" },
  { id: 7, title: "Lumière du Cœur", author: "Lucie D.", price: 5400, oldPrice: 10000, isPromo: true, category: "Famille & Éducation", image: "/images/livre.jpg" },
  { id: 8, title: "Foi et Espérance", author: "Sophie K.", price: 6900, isPromo: false, category: "Théologie", image: "/images/livre1.jpg" },
]

const book = computed(() => books.find(b => b.id === bookId) || books[0])
</script>
