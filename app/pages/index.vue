<template>
  <div>
    <!-- HERO -->
    <HeroSection />
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6">
      <!-- FILTRES DROPDOWN - Z-INDEX MOYEN (derrière le header) -->
      <div class="relative" :class="{'z-40': isFilterOpen, 'z-30': !isFilterOpen}">
        <FiltersDropdown
          :categories="categorieStore.categories"
          :min-price="0"
          :max-price="20000"
          @update:filters="updateFilters"
          @open-change="(val) => isFilterOpen = val"
        />
      </div>
     
      <!-- CONTENU - Z-INDEX BAS -->
      <section id="livres-list" class="flex-1 mt-8 relative z-0">
        <!-- LIVRES -->
        <div
          v-if="paginatedBooks.length > 0"
          class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5"
        >
          <div
            v-for="book in paginatedBooks"
            :key="book.id"
            class="group relative bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 w-full cursor-pointer flex flex-col transform hover:-translate-y-1 hover:scale-[1.02]"
          >
            <!-- Lien sur toute la carte sauf le bouton -->
            <NuxtLink :to="`/livres/${book.id}`" class="absolute inset-0 z-10" />
           
            <!-- OVERLAY HOVER - Transparent -->
            <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-400 rounded-xl z-20 flex flex-col items-center justify-center p-4">
              <!-- Bouton principal au centre -->
              <button
  @click.stop.prevent="addToCart(book)"
  :disabled="!book.stockAvailable"
  class="w-full max-w-[160px] transform hover:scale-110 transition-all duration-300 px-4 py-2.5 rounded-lg text-sm font-bold shadow-xl mb-3 relative z-30"
  :class="[
    !book.stockAvailable
      ? 'bg-[#6a0d5f] text-white opacity-60 cursor-not-allowed'
      : cartStore.getQuantity(book.id) >= 1
        ? 'bg-[#6a0d5f] text-white cursor-default hover:bg-[#5a0b50]'
        : 'bg-[#6a0d5f] text-white hover:bg-[#5a0b50]'
  ]"
>
  <span v-if="!book.stockAvailable" class="flex items-center justify-center gap-2">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>
    Rupture
  </span>

  <span v-else-if="cartStore.getQuantity(book.id) >= 1" class="flex items-center justify-center gap-2">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M5 13l4 4L19 7" />
    </svg>
    Déjà
  </span>

  <span v-else class="flex items-center justify-center gap-2">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
    Ajouter
  </span>
              </button>

              <!-- Voir détails -->
              <span class="text-white/80 text-xs flex items-center gap-1 hover:text-white transition-colors cursor-pointer relative z-30" @click.stop.prevent="$router.push(`/livres/${book.id}`)">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Détails
              </span>
              <!-- Message stock faible -->
              <span v-if="book.stockAvailable > 0 && book.stockAvailable <= 3" class="absolute bottom-3 left-0 right-0 text-center text-white/90 text-[10px] font-medium">
                ⚡ Plus que {{ book.stockAvailable }} exemplaire{{ book.stockAvailable > 1 ? 's' : '' }}
              </span>
            </div>
            <!-- Conteneur image avec ratio réduit -->
            <div class="relative overflow-hidden aspect-[3/3.8] rounded-t-xl">
              <!-- Image -->
              <img
                :src="book.image"
                :alt="book.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
             
              <div class="absolute top-2 left-2 flex flex-col gap-1.5 z-0">
                <!-- Badge SOLDE -->
                <span
                  v-if="book.isPromo"
                  class="bg-gradient-to-r from-red-600 to-red-500 text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full shadow-lg"
                >
                  SOLDE
                </span>

               
                <!-- Badge NOUVEAUTÉ -->
                <span
                  v-if="isNewBook(book.id)"
                  class="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Nouveau
                </span>
              </div>
              <!-- Badges à droite (toujours visibles) -->
              <div class="absolute top-2 right-2 flex flex-col gap-1.5 z-0">
                <span
                  v-if="!book.stockAvailable"
                  class="bg-gray-900 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                  Rupture
                </span>
              </div>
            </div>
            <!-- Informations produit - Hauteur réduite -->
            <div class="p-3 flex flex-col flex-grow bg-white rounded-b-xl relative z-0">
              <h3 class="font-semibold text-xs sm:text-sm text-gray-800 mb-0.5 line-clamp-2 min-h-[2rem]">
                {{ book.title }}
              </h3>
             
              <p class="text-[10px] sm:text-xs text-gray-500 mb-1.5">{{ book.author }}</p>
             
              <!-- Prix et évaluation -->
              <div class="flex items-center justify-between mt-auto">
                <div class="flex flex-col">
                  <div class="flex items-baseline gap-1.5">
                    <span v-if="book.isPromo" class="text-[10px] text-gray-400 line-through">
                      {{ formatPrice(book.oldPrice) }}
                    </span>
                    <span class="text-sm sm:text-base font-bold text-[#6a0d5f]">
                      {{ formatPrice(book.price) }}
                    </span>
                    <span class="text-[8px] sm:text-[10px] text-gray-500">FCFA</span>
                  </div>
                  <span v-if="book.stockAvailable > 3" class="text-[9px] text-green-600 mt-0.5 flex items-center gap-0.5">
                    <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Disponible
                  </span>
                </div>
               
              </div>
            </div>
           
            <!-- Mini badge "Dans le panier" -->
            <div
              v-if="cartStore.getQuantity(book.id) >= 1 && book.stockAvailable > 0"
              class="absolute top-2 right-2 bg-[#6a0d5f] text-white text-[9px] font-medium py-1 px-2 rounded-full shadow-lg flex items-center gap-1 z-30"
            >
              <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Panier
            </div>

          </div>
        </div>
        <!-- État vide -->
        <div v-else class="flex flex-col items-center justify-center py-16 px-4">
          <div class="bg-gray-50 rounded-full p-5 mb-3">
            <svg class="w-14 h-14 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p class="text-gray-900 text-base font-semibold text-center">
            Aucun livre trouvé
          </p>
          <p class="text-gray-500 text-xs mt-1 text-center">
            Essayez de modifier vos filtres
          </p>
        </div>
        <!-- PAGINATION -->
        <div v-if="totalPages > 1" class="flex justify-center mt-12 px-2">
          <nav class="flex items-center gap-1 bg-white rounded-lg shadow-sm p-1">
            <button
              @click="changePage(1)"
              :disabled="currentPage === 1"
              class="px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              «
            </button>
            <button
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              ‹
            </button>
           
            <template v-for="(page, index) in displayedPages" :key="index">
              <span v-if="page === '...'" class="px-2.5 py-1.5 text-gray-500 text-xs">...</span>
              <button
                v-else
                @click="changePage(page)"
                class="min-w-[2.2rem] px-2.5 py-1.5 rounded-md text-xs font-medium transition-all"
                :class="
                  page === currentPage
                    ? 'bg-[#6a0d5f] text-white shadow-md'
                    : 'hover:bg-gray-100 text-gray-700'
                "
              >
                {{ page }}
              </button>
            </template>
           
            <button
              @click="changePage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              ›
            </button>
            <button
              @click="changePage(totalPages)"
              :disabled="currentPage === totalPages"
              class="px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              »
            </button>
          </nav>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useLivreStore } from "~~/stores/livre";
import { useCategorieStore } from "~~/stores/categorie";
import HeroSection from "~/components/HeroSection.vue";
import FiltersDropdown from "~/components/FiltersDropdown.vue";
import { useSearch } from "~/composables/useSearch";
import { useCartStore } from "~~/stores/cart";

const cartStore = useCartStore();
const livreStore = useLivreStore();
const categorieStore = useCategorieStore();
const config = useRuntimeConfig();
const { search } = useSearch();

/* État d'ouverture du dropdown */
const isFilterOpen = ref(false);

/* FILTRES */
const filters = ref({
  sort: "default",
  onlyPromo: false,
  maxPrice: 20000,
  categories: [],
});

const updateFilters = (newFilters) => {
  filters.value = newFilters;
  currentPage.value = 1;
};

/* CHARGEMENT DES LIVRES & CATEGORIES */
onMounted(async () => {
  await Promise.all([
    livreStore.fetchLivres(),
    categorieStore.fetchCategories(),
  ]);
});

/* ADAPTATION DES LIVRES API → UI */
const books = computed(() =>
  livreStore.livres.map((livre, index) => ({
    id: livre.id,
    title: livre.titre,
    author: livre.auteur ?? "--",
    price: livre.prix_promo ?? livre.prix,
    oldPrice: livre.prix_promo ? livre.prix : null,
    isPromo: !!livre.prix_promo,
    stockAvailable: livre.stock?.quantite ?? 0,
    category: livre.categorie?.libelle ?? "Autre",
    image: livre.images?.length
      ? `${config.public.storageBase}/${livre.images[0].path}`
      : "/images/livre.jpg",
    rating: (Math.random() * 1.5 + 3.5).toFixed(1),
    reviews: Math.floor(Math.random() * 30) + 8,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
  }))
);

/* PAGINATION */
const currentPage = ref(1);
const itemsPerPage = 12;

const filteredBooks = computed(() => {
  let result = books.value;
  if (search.value) {
    const q = search.value.toLowerCase();
    result = result.filter((b) =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q)
    );
  }
  result = result.filter((b) => b.price <= filters.value.maxPrice);
  if (filters.value.onlyPromo) {
    result = result.filter((b) => b.isPromo);
  }
  if (filters.value.categories.length) {
    result = result.filter((b) =>
      filters.value.categories.includes(b.category)
    );
  }
  switch (filters.value.sort) {
    case "priceAsc":
      result = [...result].sort((a, b) => a.price - b.price);
      break;
    case "priceDesc":
      result = [...result].sort((a, b) => b.price - a.price);
      break;
    case "alpha":
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "newest":
      result = [...result].sort((a, b) => b.createdAt - a.createdAt);
      break;
  }
  return result;
});

const totalPages = computed(() =>
  Math.ceil(filteredBooks.value.length / itemsPerPage)
);

const paginatedBooks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredBooks.value.slice(start, start + itemsPerPage);
});

const displayedPages = computed(() => {
  const delta = 2;
  const range = [];
  const rangeWithDots = [];
  let l;
  for (let i = 1; i <= totalPages.value; i++) {
    if (i === 1 || i === totalPages.value || (i >= currentPage.value - delta && i <= currentPage.value + delta)) {
      range.push(i);
    }
  }
  range.forEach((i) => {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  });
  return rangeWithDots;
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    document.getElementById('livres-list')?.scrollIntoView({ behavior: 'smooth' });
  }
};

const addToCart = (book) => {
  if (book.stockAvailable) {
    cartStore.add({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      image: book.image,
      stockAvailable: book.stockAvailable,
    });
  }
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR').format(price);
};

const calculateDiscount = (oldPrice, newPrice) => {
  if (!oldPrice) return 0;
  return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
};

const isNewBook = (bookId) => {
  return bookId <= 5;
};

watch(filters, () => (currentPage.value = 1), { deep: true });
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.aspect-\[3\/3\.8\] {
  aspect-ratio: 3/3.8;
}
/* Animation d'apparition */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.group {
  animation: fadeInUp 0.5s ease-out;
}
/* Hover sur toute la carte */
.group:hover {
  box-shadow: 0 25px 30px -10px rgba(106, 13, 95, 0.2);
}
/* Scale image au hover */
.group:hover img {
  transform: scale(1.1);
}
/* Overlay qui prend TOUT le bloc - transparent */
.group:hover .absolute.inset-0.bg-black\/60 {
  opacity: 1;
}
/* Z-index du header - à définir dans App.vue ou layout */
:global(.header) {
  z-index: 60 !important;
}
/* Z-index du dropdown filtre - toujours derrière le header */
.z-30 {
  z-index: 30;
}
.z-40 {
  z-index: 40;
}
.z-0 {
  z-index: 0;
}
/* Réduction hauteur carte */
.group {
  min-height: 300px;
}
@media (min-width: 640px) {
  .group {
    min-height: 330px;
  }
}
/* Animation bouton */
@keyframes buttonPop {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.group:hover button {
  animation: buttonPop 0.3s ease-out;
}
</style>