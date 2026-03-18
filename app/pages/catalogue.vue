<template>
  <div class="min-h-screen bg-gray-50/50">
    <Breadcrumb :items="breadcrumbItems" />

    <!-- Header de page dynamique -->
    <div class="bg-[#6a0d5f] pt-10 pb-20 px-4 mb-[-2rem]">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="text-xl md:text-3xl font-bold text-white mb-4 uppercase tracking-wide">
          <template v-if="headerTitle === 'Tous les livres'">
            Tous les <span class="text-orange-400">livres</span>
          </template>
          <template v-else>
            {{ headerTitle }}
          </template>
        </h1>
        <p class="text-white/80 text-sm md:text-base max-w-2xl mx-auto font-medium">
          Découvrez notre collection complète d'ouvrages inspirants et édifiants pour nourrir votre foi.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12">
      <div class="flex flex-col lg:flex-row gap-10">
        <!-- SIDEBAR FILTERS (Desktop) -->
        <aside class="hidden lg:block w-72 flex-shrink-0 space-y-8 sticky top-[150px] h-fit reveal-right" v-reveal.repeat>
          <!-- TRI -->
          <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
              <svg class="w-5 h-5 text-[#6a0d5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
              Trier par
            </h3>
            <select v-model="filters.sort"
              class="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 focus:ring-2 focus:ring-[#6a0d5f]/20 transition-all cursor-pointer">
              <option value="default">Par défaut</option>
              <option value="priceAsc">Prix croissant</option>
              <option value="priceDesc">Prix décroissant</option>
              <option value="alpha">Ordre alphabétique</option>
              <option value="newest">Nouveautés</option>
            </select>
          </div>

          <!-- CATEGORIES -->
          <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
              <svg class="w-5 h-5 text-[#6a0d5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Catégories
            </h3>
            <div class="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              <label v-for="cat in categorieStore.categories" :key="cat.id"
                class="flex items-center gap-3 group cursor-pointer">
                <div class="relative flex items-center">
                  <input type="checkbox" :value="cat.libelle" v-model="filters.categories"
                    class="peer appearance-none w-5 h-5 rounded-lg border-2 border-gray-200 checked:bg-[#6a0d5f] checked:border-[#6a0d5f] transition-all duration-300">
                  <svg class="absolute w-3 h-3 text-white left-1 opacity-0 peer-checked:opacity-100 transition-opacity"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-sm font-medium text-gray-500 group-hover:text-[#6a0d5f] transition-colors">
                  {{ cat.libelle }}
                </span>
              </label>
            </div>
          </div>

          <!-- PRIX -->
          <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
              <svg class="w-5 h-5 text-[#6a0d5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Budget Max
            </h3>
            <input type="range" min="0" max="50000" step="500" v-model="filters.maxPrice"
              class="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#6a0d5f]">
            <div class="flex justify-between mt-3 px-1">
              <span class="text-xs font-bold text-gray-400">0</span>
              <span class="text-sm font-bold text-[#6a0d5f]">{{ formatPrice(filters.maxPrice) }} FCFA</span>
            </div>
          </div>

          <!-- PROMO -->
          <button @click="filters.onlyPromo = !filters.onlyPromo"
            class="w-full p-6 rounded-3xl border-2 transition-all duration-300 flex items-center justify-between group"
            :class="filters.onlyPromo ? 'border-[#6a0d5f] bg-[#6a0d5f]/5 text-[#6a0d5f]' : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'">
            <span class="font-bold text-sm">PROMOTIONS</span>
            <div class="w-10 h-6 rounded-full relative transition-colors duration-300"
              :class="filters.onlyPromo ? 'bg-[#6a0d5f]' : 'bg-gray-200'">
              <div
                class="absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 shadow-sm"
                :class="{ 'translate-x-4': filters.onlyPromo }"></div>
            </div>
          </button>

          <!-- RESET -->
          <button @click="resetFilters"
            class="w-full py-4 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-[#6a0d5f] transition-colors">
            Réinitialiser les filtres
          </button>
        </aside>

        <!-- MAIN CONTENT -->
        <main class="flex-1">
          <!-- MOBILE FILTERS TOGGLE -->
          <div class="lg:hidden mb-8 grid grid-cols-2 gap-4">
            <button @click="isDrawerOpen = true"
              class="bg-white border border-gray-100 p-4 rounded-2xl font-bold text-gray-700 flex items-center justify-center gap-3 shadow-sm active:scale-95 transition-transform">
              <svg class="w-5 h-5 text-[#6a0d5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Filtres
            </button>
            <div class="bg-white border border-gray-100 p-2 rounded-2xl shadow-sm">
              <select v-model="filters.sort"
                class="w-full h-full bg-transparent border-none text-sm font-bold text-gray-700 focus:ring-0">
                <option value="default">Trier par</option>
                <option value="priceAsc">Prix ↑</option>
                <option value="priceDesc">Prix ↓</option>
                <option value="alpha">A-Z</option>
              </select>
            </div>
          </div>

          <!-- SEARCH BAR -->
          <div class="mb-12 w-full max-w-2xl relative" v-reveal.repeat>
            <div
              class="group/search flex items-center bg-white border border-gray-200 rounded-[2rem] px-8 py-5 w-full shadow-sm transition-all duration-300 hover:shadow-xl hover:border-gray-300 focus-within:border-[#6a0d5f] focus-within:ring-8 focus-within:ring-[#6a0d5f]/5 cursor-text">
              <input v-model="search" type="text" placeholder="Titre, auteur ou mot-clé..."
                class="w-full text-lg text-gray-800 placeholder-gray-400 outline-none bg-transparent" />
              <div class="flex items-center gap-4">
                <div v-if="search" @click="search = ''"
                  class="p-2 hover:bg-gray-100 rounded-full cursor-pointer text-gray-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <div class="w-px h-8 bg-gray-100 mx-1"></div>
                <span class="text-[#6a0d5f]">
                  <svg viewBox="0 0 24 24" fill="none" class="w-7 h-7" stroke="currentColor" stroke-width="2.5"
                    stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <!-- GRILLE DE LIVRES -->
          <section id="livres-list" class="relative">
            <div v-if="paginatedBooks.length > 0"
              class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              <div v-for="(book, index) in paginatedBooks" :key="book.id"
                v-reveal.repeat :class="`reveal-delay-${(index % 4) * 100}`"
                class="group relative bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 w-full cursor-pointer flex flex-col transform hover:-translate-y-3 border border-gray-50/50">

                <NuxtLink :to="`/livres/${book.id}`" class="absolute inset-0 z-10" />

                <!-- Card Image -->
                <div class="relative overflow-hidden aspect-[3/4] rounded-[2rem] m-2 shadow-inner">
                  <img :src="book.image" :alt="book.title"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    loading="lazy" />

                  <!-- Badge Promo -->
                  <div class="absolute top-4 left-4">
                    <span v-if="book.isPromo"
                      class="bg-red-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-xl uppercase tracking-wide">
                      -{{ calculateDiscount(book.oldPrice, book.price) }}%
                    </span>
                  </div>

                  <!-- Overlay au hover -->
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-[#6a0d5f]/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  </div>
                </div>

                <!-- Card Content -->
                <div class="p-6 pt-2 flex flex-col flex-grow">
                  <h3
                    class="font-bold text-sm md:text-base text-gray-900 mb-1 lg:mb-2 line-clamp-2 min-h-[3rem] group-hover:text-[#6a0d5f] transition-colors">
                    {{ book.title }}
                  </h3>
                  <p class="text-xs font-bold text-gray-400 mb-4">{{ book.author }}</p>

                  <div class="mt-auto pt-4 border-t border-gray-50 space-y-4">
                    <div class="flex flex-col">
                      <span v-if="book.isPromo" class="text-[10px] text-gray-300 line-through font-bold">
                        {{ formatPrice(book.oldPrice) }} FCFA
                      </span>
                      <span class="text-base lg:text-lg font-bold text-[#6a0d5f]">
                        {{ formatPrice(book.price) }} <span class="text-[10px] tracking-wide opacity-50">FCFA</span>
                      </span>
                    </div>

                    <button @click.stop.prevent="addToCart(book)" :disabled="!book.stockAvailable"
                      class="w-full flex items-center justify-center gap-2 bg-[#6a0d5f] text-white py-3.5 rounded-2xl font-bold text-[13px] uppercase tracking-wide transition-all duration-300 relative z-20 shadow-lg shadow-[#6a0d5f]/20 hover:shadow-xl hover:bg-[#5a0b50] hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {{ book.stockAvailable ? 'Ajouter' : 'Rupture' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- État vide -->
            <div v-else
              class="flex flex-col items-center justify-center py-24 bg-white rounded-[3rem] shadow-sm border border-gray-50">
              <div class="bg-gray-50 rounded-full p-10 mb-6 group">
                <svg class="w-20 h-20 text-gray-200 group-hover:text-[#6a0d5f] transition-colors duration-500"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p class="text-gray-900 text-2xl font-bold mb-2">Aucun livre trouvé</p>
              <p class="text-gray-400 font-medium">Modifiez vos critères pour élargir la recherche.</p>
              <button @click="resetFilters"
                class="mt-8 bg-[#6a0d5f] text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-[#6a0d5f]/20 hover:scale-105 transition-transform active:scale-95">
                VOIR TOUT LE CATALOGUE
              </button>
            </div>

            <!-- PAGINATION -->
            <div v-if="totalPages > 1" class="flex justify-center mt-20">
              <nav class="flex items-center gap-3 bg-white rounded-[2rem] shadow-xl p-2 border border-gray-100/50">
                <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
                  class="w-12 h-12 flex items-center justify-center rounded-2xl transition-all disabled:opacity-20 hover:bg-gray-50 text-gray-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path d="M15 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>

                <div class="flex items-center gap-2">
                  <template v-for="(page, index) in displayedPages" :key="index">
                    <span v-if="page === '...'" class="px-2 text-gray-300 font-bold">...</span>
                    <button v-else @click="changePage(page)"
                      class="w-12 h-12 rounded-2xl text-sm font-bold transition-all" :class="page === currentPage
                        ? 'bg-[#6a0d5f] text-white shadow-xl shadow-[#6a0d5f]/30 scale-110'
                        : 'hover:bg-gray-50 text-gray-400 hover:text-gray-900'
                        ">
                      {{ page }}
                    </button>
                  </template>
                </div>

                <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
                  class="w-12 h-12 flex items-center justify-center rounded-2xl transition-all disabled:opacity-20 hover:bg-gray-50 text-gray-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
              </nav>
            </div>
          </section>
        </main>
      </div>
    </div>

    <!-- MOBILE FILTERS DRAWER -->
    <Teleport to="body">
      <div v-if="isDrawerOpen" class="fixed inset-0 z-[100] flex justify-end">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="isDrawerOpen = false"></div>
        <div class="relative w-full max-w-[320px] bg-white h-full shadow-2xl p-8 flex flex-col animate-slideLeft">
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-xl font-bold text-gray-900 tracking-wide">FILTRES</h2>
            <button @click="isDrawerOpen = false" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>

          <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-8">
            <!-- Sidebar content replicated for mobile -->
            <div class="space-y-6">
              <!-- CATEGORIES -->
              <div>
                <h3 class="font-bold text-gray-900 mb-4 text-xs uppercase tracking-widest">Par Catégorie</h3>
                <div class="space-y-3">
                  <label v-for="cat in categorieStore.categories" :key="cat.id" class="flex items-center gap-3">
                    <input type="checkbox" :value="cat.libelle" v-model="filters.categories"
                      class="w-5 h-5 rounded border-gray-300 text-[#6a0d5f] focus:ring-[#6a0d5f]/20">
                    <span class="text-sm font-bold text-gray-600">{{ cat.libelle }}</span>
                  </label>
                </div>
              </div>

              <!-- PRIX -->
              <div>
                <h3 class="font-bold text-gray-900 mb-4 text-xs uppercase tracking-widest">Prix Max</h3>
                <input type="range" min="0" max="50000" step="500" v-model="filters.maxPrice"
                  class="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#6a0d5f]">
                <p class="mt-3 font-bold text-[#6a0d5f] text-sm">{{ formatPrice(filters.maxPrice) }} FCFA</p>
              </div>

              <!-- PROMO -->
              <label class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl cursor-pointer">
                <span class="text-sm font-bold text-gray-700">EN PROMO</span>
                <input type="checkbox" v-model="filters.onlyPromo"
                  class="w-6 h-6 rounded border-gray-300 text-[#6a0d5f] focus:ring-[#6a0d5f]/20">
              </label>
            </div>
          </div>

          <button @click="isDrawerOpen = false"
            class="mt-8 w-full bg-[#6a0d5f] text-white py-5 rounded-3xl font-bold shadow-xl shadow-[#6a0d5f]/20">
            APPLIQUER LES FILTRES
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useLivreStore } from "~~/stores/livre";
import { useCategorieStore } from "~~/stores/categorie";
import { useSearch } from "~/composables/useSearch";
import { useCartStore } from "~~/stores/cart";

const route = useRoute();
const cartStore = useCartStore();
const livreStore = useLivreStore();
const categorieStore = useCategorieStore();
const config = useRuntimeConfig();
const { search } = useSearch();

const isFilterOpen = ref(false);
const isDrawerOpen = ref(false);
const currentPage = ref(1);
const itemsPerPage = 12;

const filters = ref({
  sort: "default",
  onlyPromo: false,
  maxPrice: 20000,
  categories: [],
});

// Titre dynamique et Breadcrumb
const selectedCategory = computed(() => {
  return route.query.category || null;
});

const headerTitle = computed(() => {
  if (selectedCategory.value) return selectedCategory.value;
  if (filters.value.categories.length === 1) return filters.value.categories[0];
  if (filters.value.categories.length > 1) return `${filters.value.categories.length} catégories`;
  return 'Tous les livres';
});

const breadcrumbItems = computed(() => {
  const items = [
    { label: 'Catalogue', to: '/catalogue' }
  ];
  if (selectedCategory.value) {
    items.push({ label: selectedCategory.value, to: '#' });
  }
  return items;
});

const updateFilters = (newFilters) => {
  filters.value = newFilters;
  currentPage.value = 1;
};

const resetFilters = () => {
  filters.value = {
    sort: "default",
    onlyPromo: false,
    maxPrice: 20000,
    categories: [],
  };
  search.value = "";
  currentPage.value = 1;
};

onMounted(async () => {
  await Promise.all([
    livreStore.fetchLivres(),
    categorieStore.fetchCategories(),
  ]);

  // Sync category from URL if present
  if (route.query.category) {
    filters.value.categories = [route.query.category];
  }
});

// Watch route category changes
watch(() => route.query.category, (newCat) => {
  if (newCat) {
    filters.value.categories = [newCat];
  } else {
    filters.value.categories = [];
  }
  currentPage.value = 1;
});

const books = computed(() =>
  livreStore.livres.map((livre) => ({
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
    createdAt: new Date(livre.created_at || Date.now())
  }))
);

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
      if (i - l === 2) { rangeWithDots.push(l + 1); }
      else if (i - l !== 1) { rangeWithDots.push('...'); }
    }
    rangeWithDots.push(i);
    l = i;
  });
  return rangeWithDots;
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.aspect-\[3\/4\] {
  aspect-ratio: 3/4;
}

@keyframes slideLeft {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
}

.animate-slideLeft {
  animation: slideLeft 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #6a0d5f;
  border-radius: 10px;
}
</style>
