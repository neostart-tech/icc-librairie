<template>
  <div class="max-w-7xl mx-auto px-12 py-8">

    <!-- HERO -->
    <section class="bg-[#E1DAF0] rounded-2xl py-12 pb-16 mb-10">
      <div class="max-w-7xl mx-auto px-6 lg:px-12">
        <div class="flex flex-col lg:flex-row items-center gap-8">
          <!-- Texte -->
          <div class="flex-1">
            <h2 class="text-xl md:text-2xl font-semibold mb-3 text-gray-900">
              {{ heroSlides[currentSlide].title }}
            </h2>
            <p class="text-sm md:text-base text-gray-600 leading-relaxed max-w-lg">
              {{ heroSlides[currentSlide].description }}
            </p>
          </div>

          <!-- Image -->
          <div class="flex-1 flex justify-center">
            <img
              :src="heroSlides[currentSlide].image"
              class="w-64 md:w-80 rounded-xl drop-shadow-xl transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>

    <div class="flex gap-6">

      <!-- SIDEBAR -->
      <SidebarFiltre
        :minPrice="0"
        :maxPrice="20000"
        @update:filters="updateFilters"
      />

      <!-- CONTENU -->
      <section class="flex-1">

        <!-- LIVRES -->
        <div v-if="paginatedBooks.length > 0"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="book in paginatedBooks"
            :key="book.id"
            class="group relative bg-white rounded-lg shadow transition overflow-hidden w-full max-w-[220px] mx-auto hover:shadow-lg"
          >
            <!-- Wishlist -->
            <button class="absolute top-2 right-2 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow cursor-pointer">
              <img src="/icone/heart.png" class="w-4 h-4" />
            </button>

            <!-- Solde -->
            <span
              v-if="book.isPromo"
              class="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full"
            >
              SOLDE
            </span>

            <!-- Image -->
            <img
              :src="book.image"
              class="w-full h-44 object-cover group-hover:scale-105 transition"
            />

            <!-- Infos -->
            <div class="p-3">
              <h3 class="font-semibold text-base mb-1 line-clamp-1">
                {{ book.title }}
              </h3>
              <p class="text-xs text-gray-500 mb-2">
                {{ book.author }}
              </p>

              <div class="flex gap-2 items-center mb-3">
                <span
                  v-if="book.isPromo"
                  class="line-through text-gray-400 text-xs"
                >
                  {{ book.oldPrice }} FCFA
                </span>
                <span class="text-[#6a0d5f] font-bold text-base">
                  {{ book.price }} FCFA
                </span>
              </div>

              <button class="w-full bg-[#6a0d5f] text-white py-1.5 rounded-md text-sm hover:bg-purple-700 cursor-pointer">
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>

      <!-- AUCUN RÉSULTAT -->
      <div v-else class="flex items-center justify-center py-20">
        <p class="text-gray-600 text-base font-medium">
          Aucun livre ne correspond à vos critères.
          <br />
          <span class="text-sm text-gray-500">
            Modifiez le tri, les filtres ou la recherche pour voir des résultats.
          </span>
        </p>
      </div>

        <!-- PAGINATION -->
        <div class="flex justify-center mt-12">
          <div class="flex items-center gap-2 text-sm">

            <button @click="changePage(1)" class="px-3 py-1 border rounded">«</button>
            <button @click="changePage(currentPage - 1)" class="px-3 py-1 border rounded">‹</button>

            <button
              v-for="page in totalPages"
              :key="page"
              @click="changePage(page)"
              class="px-3 py-1 border rounded transition"
              :class="page === currentPage
                ? 'bg-[#6a0d5f] text-white border-[#6a0d5f]'
                : 'hover:bg-gray-100'"
            >
              {{ page }}
            </button>

            <!-- <button @click="changePage(currentPage + 1)" class="px-3 py-1 border rounded">2</button>
            <button @click="changePage(currentPage + 1)" class="px-3 py-1 border rounded">3</button>
            <button @click="changePage(currentPage + 1)" class="px-3 py-1 border rounded">4</button>
            <button @click="changePage(currentPage + 1)" class="px-3 py-1 border rounded">5</button> -->

            <button @click="changePage(currentPage + 1)" class="px-3 py-1 border rounded">›</button>
            <button @click="changePage(totalPages)" class="px-3 py-1 border rounded">»</button>

          </div>
        </div>

      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue"
import SidebarFiltre from "@/components/SidebarFiltre.vue"

/* HERO */
const heroSlides = [
  {
    title: "Les livres les plus appréciés par nos lecteurs",
    description: "Foi, enseignements, méditation… découvrez les ouvrages qui inspirent.",
    image: "/images/i1.jpg",
  },
  {
    title: "Nouveautés fraîchement arrivées",
    description: "De nouveaux livres viennent enrichir notre librairie.",
    image: "/images/i2.jpg",
  },
]

const currentSlide = ref(0)
onMounted(() => {
  setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % heroSlides.length
  }, 4500)
})

/* FILTRES */
const search = ref("")
const filters = ref({
  sort: "default",
  onlyPromo: false,
  maxPrice: 20000,
  categories: [],
})

const updateFilters = (newFilters) => {
  filters.value = newFilters
  currentPage.value = 1
}

/* LIVRES */
const books = ref([
  { id: 1, title: "Le Pouvoir de la Foi", author: "Joseph K.", price: 7500, oldPrice: 12000, isPromo: true, category: "Spiritualité", image: "/images/livre.jpg" },
  { id: 2, title: "Marcher avec Dieu", author: "Paul N.", price: 9800, isPromo: false, category: "Étude Biblique", image: "/images/livre1.jpg" },
  { id: 3, title: "Prières et Méditations", author: "Marie A.", price: 6500, oldPrice: 9000, isPromo: true, category: "Spiritualité", image: "/images/livre2.jpg" },
  { id: 4, title: "La Parole du Jour", author: "Jean P.", price: 8500, isPromo: false, category: "Théologie", image: "/images/livre.jpg" },
  { id: 5, title: "La Vie en Christ", author: "Anne M.", price: 12000, oldPrice: 15000, isPromo: true, category: "Famille & Éducation", image: "/images/livre1.jpg" },
  { id: 6, title: "Guide de Prière", author: "Pierre L.", price: 7200, isPromo: false, category: "Étude Biblique", image: "/images/livre2.jpg" },
  { id: 7, title: "Lumière du Cœur", author: "Lucie D.", price: 5400, oldPrice: 10000, isPromo: true, category: "Famille & Éducation", image: "/images/livre.jpg" },
  { id: 8, title: "Foi et Espérance", author: "Sophie K.", price: 6900, isPromo: false, category: "Théologie", image: "/images/livre1.jpg" },
])

/* PAGINATION */
const currentPage = ref(1)
const itemsPerPage = 12

const filteredBooks = computed(() => {
  let result = books.value.filter(b => b.price <= filters.value.maxPrice)

  if (filters.value.onlyPromo) {
    result = result.filter(b => b.isPromo)
  }

  if (search.value) {
    const term = search.value.toLowerCase()
    result = result.filter(
      b => b.title.toLowerCase().includes(term) || b.author.toLowerCase().includes(term)
    )
  }

  if (filters.value.categories.length) {
    result = result.filter(b => filters.value.categories.includes(b.category))
  }

  switch (filters.value.sort) {
    case "priceAsc": result.sort((a, b) => a.price - b.price); break
    case "priceDesc": result.sort((a, b) => b.price - a.price); break
    case "alpha": result.sort((a, b) => a.title.localeCompare(b.title)); break
  }

  return result
})

const totalPages = computed(() =>
  Math.ceil(filteredBooks.value.length / itemsPerPage)
)

const paginatedBooks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredBooks.value.slice(start, start + itemsPerPage)
})

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

watch(search, () => currentPage.value = 1)
</script>
