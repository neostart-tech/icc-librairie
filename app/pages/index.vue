<template>
  <div>
    <!-- HERO -->
    <HeroSection />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6">
      <div class="flex gap-4 md:gap-6">
        <!-- SIDEBAR -->
        <SidebarFiltre
          :categories="categorieStore.categories"
          :min-price="0"
          :max-price="20000"
          @update:filters="updateFilters"
        />

        <!-- CONTENU -->
        <section class="flex-1">
          <!-- LIVRES -->
          <div
            v-if="paginatedBooks.length > 0"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <NuxtLink
              v-for="book in paginatedBooks"
              :key="book.id"
              :to="`/livres/${book.id}`"
              class="group relative bg-white rounded-lg shadow transition overflow-hidden w-full hover:shadow-lg cursor-pointer block"
            >
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
                class="w-full h-48 sm:h-52 object-cover group-hover:scale-105 transition"
              />

              <!-- Infos -->
              <div class="p-3">
                <h3
                  class="font-semibold text-sm sm:text-base mb-1 line-clamp-1"
                >
                  {{ book.title }}
                </h3>
                <p class="text-xs text-gray-500 mb-2">{{ book.author }}</p>

                <div class="flex gap-2 items-center mb-3">
                  <span
                    v-if="book.isPromo"
                    class="line-through text-gray-400 text-xs"
                  >
                    {{ book.oldPrice }} FCFA
                  </span>
                  <span class="text-[#6a0d5f] font-bold text-sm sm:text-base">
                    {{ book.price }} FCFA
                  </span>
                </div>

                <button
                  @click.stop.prevent="addToCart(book)"
                  :disabled="
                    cartStore.getQuantity(book.id) > 0 || !book.stockAvailable
                  "
                  class="w-full py-1.5 rounded-md text-xs sm:text-sm bg-[#6a0d5f] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{
                    !book.stockAvailable
                      ? "Indisponible"
                      : cartStore.getQuantity(book.id) > 0
                        ? "Déjà au panier"
                        : "Ajouter au panier"
                  }}
                </button>
              </div>
            </NuxtLink>
          </div>

          <div v-else class="flex items-center justify-center py-20">
            <p class="text-gray-600 text-base font-medium text-center">
              Aucun livre ne correspond à vos critères.
              <br />
              <span class="text-sm text-gray-500">
                Modifiez le tri ou les filtres.
              </span>
            </p>
          </div>

          <!-- PAGINATION -->
          <div class="flex justify-center mt-12 px-2">
            <div class="flex flex-wrap items-center gap-2 text-sm">
              <button @click="changePage(1)" class="px-3 py-1 border rounded">
                «
              </button>
              <button
                @click="changePage(currentPage - 1)"
                class="px-3 py-1 border rounded"
              >
                ‹
              </button>

              <button
                v-for="page in totalPages"
                :key="page"
                @click="changePage(page)"
                class="px-3 py-1 border rounded transition"
                :class="
                  page === currentPage
                    ? 'bg-[#6a0d5f] text-white border-[#6a0d5f]'
                    : 'hover:bg-gray-100'
                "
              >
                {{ page }}
              </button>

              <button
                @click="changePage(currentPage + 1)"
                class="px-3 py-1 border rounded"
              >
                ›
              </button>
              <button
                @click="changePage(totalPages)"
                class="px-3 py-1 border rounded"
              >
                »
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useLivreStore } from "~~/stores/livre";
import { useCategorieStore } from "~~/stores/categorie";
import SidebarFiltre from "@/components/SidebarFiltre.vue";
import HeroSection from "~/components/HeroSection.vue";
import { useSearch } from "~/composables/useSearch";

import { useCartStore } from "~~/stores/cart";

const cartStore = useCartStore();

const addToCart = (book) => {
  cartStore.add({
    id: book.id,
    title: book.title,
    author: book.author,
    price: book.price,
    image: book.image,
    stockAvailable: book.stockAvailable,
  });
};

const canAddToCart = (book) => {
  if (!book.stockAvailable) return false;

  return cartStore.getQuantity(book.id) < book.stockAvailable;
};

const livreStore = useLivreStore();
const categorieStore = useCategorieStore();

const config = useRuntimeConfig();

const { search } = useSearch();

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
  livreStore.livres.map((livre) => ({
    id: livre.id,
    title: livre.titre,
    author: livre.auteur,
    price: livre.prix_promo ?? livre.prix,
    oldPrice: livre.prix_promo ? livre.prix : null,
    isPromo: !!livre.prix_promo,

    // stock interne (pas affiché)
    stockAvailable: livre.stock?.quantite ?? 0,

    // catégorie pour filtrage
    category: livre.categorie?.libelle ?? "Autre",

    image: livre.images?.length
      ? `${config.public.storageBase}/${livre.images[0].path}`
      : "/images/livre.jpg",
  })),
);

/* PAGINATION */
const currentPage = ref(1);
const itemsPerPage = 12;

const filteredBooks = computed(() => {
  let result = books.value;

  /* RECHERCHE TEXTE */
  if (search.value) {
    const q = search.value.toLowerCase();
    result = result.filter((b) => b.title.toLowerCase().includes(q));
  }

  /* PRIX */
  result = result.filter((b) => b.price <= filters.value.maxPrice);

  /* PROMO */
  if (filters.value.onlyPromo) {
    result = result.filter((b) => b.isPromo);
  }

  /* CATÉGORIES */
  if (filters.value.categories.length) {
    result = result.filter((b) =>
      filters.value.categories.includes(b.category),
    );
  }

  /* TRI */
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
  }

  return result;
});

const totalPages = computed(() =>
  Math.ceil(filteredBooks.value.length / itemsPerPage),
);

const paginatedBooks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredBooks.value.slice(start, start + itemsPerPage);
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page;
};

watch(filters, () => (currentPage.value = 1), { deep: true });
</script>
