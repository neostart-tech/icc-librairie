<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Bouton retour -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <NuxtLink 
        to="/" 
        class="inline-flex items-center text-[#8B5A8C] hover:text-[#6a0d5f] transition-colors duration-200 font-medium"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Retour à la liste
      </NuxtLink>
    </div>

    <!-- Détails du livre -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-[310px_1fr] gap-4 p-6 items-start">
          <!-- Image -->
          <div class="flex justify-center lg:justify-start">
           <div class="relative w-full max-w-[250px]">
              <img
                :src="book.image"
                class="w-full h-auto rounded-lg shadow-lg transform hover:scale-[1.02] transition-transform duration-300"
                alt="Image du livre"
              />
              <div
                v-if="book.isPromo"
                class="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md"
              >
                PROMO
              </div>
            </div>
          </div>

          <!-- Informations -->
          <div class="space-y-5">
            <div>
              <span class="inline-block bg-purple-100 text-[#8B5A8C] px-3 py-1 rounded-full text-sm font-semibold mb-3">
                {{ book.category }}
              </span>
              <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                {{ book.title }}
              </h1>
              <div class="flex items-center space-x-2 text-gray-600 mb-3">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span class="text-base">Auteur : {{ book.author }}</span>
              </div>
            </div>

            <!-- Prix -->
            <div class="space-y-2">
              <div class="flex items-center space-x-3">
                <span class="text-3xl font-bold text-[#8B5A8C]">
                  {{ book.price }} FCFA
                </span>
                <span 
                  v-if="book.isPromo" 
                  class="text-lg text-gray-400 line-through"
                >
                  {{ book.oldPrice }} FCFA
                </span>
              </div>
              <div 
                v-if="book.isPromo"
                class="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium"
              >
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
                Économisez {{ (book.oldPrice - book.price) }} FCFA
              </div>
            </div>

            <!-- Description -->
            <div class="pt-3 border-t border-gray-200">
              <h2 class="text-lg font-semibold text-gray-900 mb-2">Description</h2>
              <p class="text-gray-700 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                varius enim in eros elementum tristique. Duis cursus, mi quis viverra
                ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
                Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet.
              </p>
            </div>

            <div class="flex justify-center pt-3">
            <button
              class="cursor-pointer bg-[#6a0d5f] hover:bg-[#6a0d5f] text-white py-2 px-4 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors duration-200"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Ajouter au panier
            </button>
          </div>

          </div>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-1">Vous aimerez aussi</h2>
        <p class="text-gray-600 text-sm">Découvrez d'autres livres de notre collection</p>
      </div>

      <div class="relative">
        <!-- Navigation -->
        <button 
          @click="scrollLeft"
          class="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-3 z-10 bg-white w-8 h-8 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
          :class="{ 'opacity-50 cursor-not-allowed': currentSlide === 0 }"
          :disabled="currentSlide === 0"
        >
          <svg class="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          @click="scrollRight"
          class="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-3 z-10 bg-white w-8 h-8 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
          :class="{ 'opacity-50 cursor-not-allowed': currentSlide >= totalSlides - 1 }"
          :disabled="currentSlide >= totalSlides - 1"
        >
          <svg class="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Grille de livres (6 par slide) -->
        <div class="overflow-hidden">
          <div 
            ref="carousel"
            class="flex transition-transform duration-300 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <!-- Premier groupe de 6 -->
            <div class="w-full flex-shrink-0 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 px-1">
              <div 
                v-for="relatedBook in firstGroup" 
                :key="relatedBook.id"
                class="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
              >
                <NuxtLink :to="`/book/${relatedBook.id}`" class="block">
                  <div class="relative">
                    <img
                      :src="relatedBook.image"
                      class="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200"
                      alt="Livre"
                    />
                    <div 
                      v-if="relatedBook.isPromo"
                      class="absolute top-1 left-1 bg-red-500 text-white px-1 py-0.5 rounded text-xs font-bold"
                    >
                      PROMO
                    </div>
                  </div>
                  
                  <div class="p-2">
                    <h3 class="font-medium text-gray-900 text-xs mb-0.5 group-hover:text-[#8B5A8C] transition-colors duration-200 line-clamp-1">
                      {{ relatedBook.title }}
                    </h3>
                    <p class="text-xs text-gray-600 mb-1 truncate">{{ relatedBook.author }}</p>
                    <div class="flex items-center justify-between">
                      <div>
                        <span class="text-sm font-bold text-[#8B5A8C]">
                          {{ relatedBook.price }} FCFA
                        </span>
                        <span 
                          v-if="relatedBook.isPromo"
                          class="text-xs text-gray-400 line-through ml-1"
                        >
                          {{ relatedBook.oldPrice }} FCFA
                        </span>
                      </div>
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </div>

            <div class="w-full flex-shrink-0 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 px-1">
              <div 
                v-for="relatedBook in secondGroup" 
                :key="relatedBook.id"
                class="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
              >
                <NuxtLink :to="`/book/${relatedBook.id}`" class="block">
                  <div class="relative">
                    <img
                      :src="relatedBook.image"
                      class="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200"
                      alt="Livre"
                    />
                    <div 
                      v-if="relatedBook.isPromo"
                      class="absolute top-1 left-1 bg-red-500 text-white px-1 py-0.5 rounded text-xs font-bold"
                    >
                      PROMO
                    </div>
                  </div>
                  
                  <div class="p-2">
                    <h3 class="font-medium text-gray-900 text-xs mb-0.5 group-hover:text-[#8B5A8C] transition-colors duration-200 line-clamp-1">
                      {{ relatedBook.title }}
                    </h3>
                    <p class="text-xs text-gray-600 mb-1 truncate">{{ relatedBook.author }}</p>
                    <div class="flex items-center justify-between">
                      <div>
                        <span class="text-sm font-bold text-[#8B5A8C]">
                          {{ relatedBook.price }} FCFA
                        </span>
                        <span 
                          v-if="relatedBook.isPromo"
                          class="text-xs text-gray-400 line-through ml-1"
                        >
                          {{ relatedBook.oldPrice }} FCFA
                        </span>
                      </div>
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Indicateurs de slide -->
        <div class="flex justify-center space-x-1 mt-4">
          <button 
            v-for="slide in totalSlides" 
            :key="slide"
            @click="goToSlide(slide - 1)"
            class="w-2 h-2 rounded-full transition-all duration-200"
            :class="currentSlide === slide - 1 ? 'bg-[#8B5A8C] w-4' : 'bg-gray-300'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from '#app'

const route = useRoute()
const bookId = parseInt(route.params.id)
const carousel = ref(null)
const currentSlide = ref(0)

// Liste des livres
const books = [
  { id: 1, title: "Le Pouvoir de la Foi", author: "Joseph K.", price: 7500, oldPrice: 12000, isPromo: true, category: "Spiritualité", image: "/images/livre.jpg" },
  { id: 2, title: "Marcher avec Dieu", author: "Paul N.", price: 9800, isPromo: false, category: "Étude Biblique", image: "/images/livre1.jpg" },
  { id: 3, title: "Prières et Méditations", author: "Marie A.", price: 6500, oldPrice: 9000, isPromo: true, category: "Spiritualité", image: "/images/livre2.jpg" },
  { id: 4, title: "La Parole du Jour", author: "Jean P.", price: 8500, isPromo: false, category: "Théologie", image: "/images/livre.jpg" },
  { id: 5, title: "La Vie en Christ", author: "Anne M.", price: 12000, oldPrice: 15000, isPromo: true, category: "Famille & Éducation", image: "/images/livre1.jpg" },
  { id: 6, title: "Guide de Prière", author: "Pierre L.", price: 7200, isPromo: false, category: "Étude Biblique", image: "/images/livre2.jpg" },
  { id: 7, title: "Lumière du Cœur", author: "Lucie D.", price: 5400, oldPrice: 10000, isPromo: true, category: "Famille & Éducation", image: "/images/livre.jpg" },
  { id: 8, title: "Foi et Espérance", author: "Sophie K.", price: 6900, isPromo: false, category: "Théologie", image: "/images/livre1.jpg" },
  { id: 9, title: "La Grâce Divine", author: "Thomas B.", price: 8900, oldPrice: 11000, isPromo: true, category: "Spiritualité", image: "/images/livre2.jpg" },
  { id: 10, title: "Chemins de Sagesse", author: "Élise R.", price: 7800, isPromo: false, category: "Théologie", image: "/images/livre.jpg" },
  { id: 11, title: "L'Appel du Ciel", author: "Marc D.", price: 9200, oldPrice: 13000, isPromo: true, category: "Étude Biblique", image: "/images/livre1.jpg" },
  { id: 12, title: "Prier sans cesse", author: "Sarah L.", price: 6100, isPromo: false, category: "Spiritualité", image: "/images/livre2.jpg" }
]

const book = computed(() => books.find(b => b.id === bookId) || books[0])
const relatedBooks = computed(() => 
  books.filter(b => b.id !== bookId)
)

// Diviser en groupes de 6
const firstGroup = computed(() => relatedBooks.value.slice(0, 6))
const secondGroup = computed(() => relatedBooks.value.slice(6, 12))

const totalSlides = computed(() => 2) // 2 groupes de 6

// Fonctions de navigation
const scrollLeft = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

const scrollRight = () => {
  if (currentSlide.value < totalSlides.value - 1) {
    currentSlide.value++
  }
}

const goToSlide = (index) => {
  currentSlide.value = index
}

onMounted(() => {
  // Rien de spécial ici
})
</script>

<style scoped>
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
</style>