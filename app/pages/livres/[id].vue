<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Breadcrumb -->
    <Breadcrumb
      :items="[
        { label: 'Livres' },
        { label: book.title || 'Chargement...', to: `/livres/${book.id}` },
      ]"
    />

    <!-- Bouton retour -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <NuxtLink
        to="/"
        class="inline-flex items-center text-[#8B5A8C] hover:text-[#6a0d5f] transition-colors duration-200 font-medium"
      >
        <svg
          class="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Retour à la liste
      </NuxtLink>
    </div>

    <!-- Détails du livre -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="book.id" class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div
          class="grid grid-cols-1 lg:grid-cols-[310px_1fr] gap-4 p-6 items-start"
        >
          <!-- Image -->
          <div class="flex justify-center lg:justify-start">
            <div class="relative w-full max-w-[250px]">
              <img
                :src="book.image"
                class="w-full h-auto rounded-lg shadow-lg transform hover:scale-[1.02] transition-transform duration-300"
                :alt="book.title"
              />
              <div
                v-if="book.isPromo"
                class="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md"
              >
                PROMO
              </div>
            </div>
          </div>

          <!-- Infos -->
          <div class="space-y-5">
            <div>
              <span
                class="inline-block bg-purple-100 text-[#8B5A8C] px-3 py-1 rounded-full text-sm font-semibold mb-3"
              >
                {{ book.category || "Non catégorisé" }}
              </span>
              <h1
                class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 leading-tight"
              >
                {{ book.title }}
              </h1>
              <div class="flex items-center space-x-2 text-gray-600 mb-3">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span class="text-base">Auteur : {{ book.author }}</span>
              </div>
            </div>

            <!-- Prix -->
            <div class="space-y-2">
              <div class="flex items-center space-x-3">
                <span class="text-3xl font-bold text-[#8B5A8C]"
                  >{{ book.price }} FCFA</span
                >
                <span
                  v-if="book.isPromo"
                  class="text-lg text-gray-400 line-through"
                  >{{ book.oldPrice }} FCFA</span
                >
              </div>
              <div
                v-if="book.isPromo"
                class="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium"
              >
                Économisez
                {{ book.oldPrice ? book.oldPrice - book.price : 0 }} FCFA
              </div>
            </div>

            <!-- Description -->
            <div class="pt-3 border-t border-gray-200">
              <h2 class="text-lg font-semibold text-gray-900 mb-2">
                Description
              </h2>
              <p class="text-gray-700 text-sm leading-relaxed">
                {{ book.description || "Aucune description disponible." }}
              </p>
            </div>

            <!-- Ajouter au panier -->
            <div class="flex justify-center pt-3">
              <button
                @click.stop.prevent="addToCart(book)"
                :disabled="
                  cartStore.getQuantity(book.id) > 0 || !book.stockAvailable
                "
                class="w-50 py-1.5 rounded-md text-xs sm:text-sm bg-[#6a0d5f] text-white disabled:opacity-50 disabled:cursor-not-allowed"
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
          </div>
        </div>
      </div>

      <div v-else class="text-center py-20 text-gray-500">
        Chargement ou livre introuvable...
      </div>
    </div>

    <!-- Carousel "Vous aimerez aussi" -->
    <div
      v-if="relatedBooks.length"
      class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
    >
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Vous aimerez aussi</h2>
      <p class="text-gray-600 text-sm mb-6">
        Découvrez d'autres livres de notre collection
      </p>
      <div class="relative">
        <button
          @click="scrollLeft"
          :disabled="currentSlide === 0"
          class="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-3 z-10 bg-white w-8 h-8 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
          :class="{ 'opacity-50 cursor-not-allowed': currentSlide === 0 }"
        >
          <svg
            class="w-4 h-4 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          @click="scrollRight"
          :disabled="currentSlide >= totalSlides - 1"
          class="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-3 z-10 bg-white w-8 h-8 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
          :class="{
            'opacity-50 cursor-not-allowed': currentSlide >= totalSlides - 1,
          }"
        >
          <svg
            class="w-4 h-4 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <div class="overflow-hidden">
          <div
            ref="carousel"
            class="flex transition-transform duration-300 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <div
              v-for="group in groupedRelatedBooks"
              :key="groupIndex(group)"
              class="w-full flex-shrink-0 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 px-1"
            >
              <div
                v-for="relatedBook in group"
                :key="relatedBook.id"
                class="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
              >
                <NuxtLink :to="`/livres/${relatedBook.id}`" class="block">
                  <img
                    :src="relatedBook.image"
                    class="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200"
                    :alt="relatedBook.title"
                  />
                  <div
                    v-if="relatedBook.isPromo"
                    class="absolute top-1 left-1 bg-red-500 text-white px-1 py-0.5 rounded text-xs font-bold"
                  >
                    PROMO
                  </div>
                  <div class="p-2">
                    <h3
                      class="font-medium text-gray-900 text-xs mb-0.5 group-hover:text-[#8B5A8C] transition-colors duration-200 line-clamp-1"
                    >
                      {{ relatedBook.title }}
                    </h3>
                    <p class="text-xs text-gray-600 mb-1 truncate">
                      {{ relatedBook.author }}
                    </p>
                    <div class="flex items-center justify-between">
                      <span class="text-sm font-bold text-[#8B5A8C]"
                        >{{ relatedBook.price }} FCFA</span
                      >
                      <span
                        v-if="relatedBook.isPromo"
                        class="text-xs text-gray-400 line-through ml-1"
                        >{{ relatedBook.oldPrice }} FCFA</span
                      >
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Indicateurs -->
        <div class="flex justify-center space-x-1 mt-4">
          <button
            v-for="(g, i) in totalSlides"
            :key="i"
            @click="goToSlide(i)"
            class="w-2 h-2 rounded-full transition-all duration-200"
            :class="currentSlide === i ? 'bg-[#8B5A8C] w-4' : 'bg-gray-300'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Breadcrumb from "@/components/Breadcrumb.vue";
import { ref, computed, onMounted } from "vue";
import { useRoute } from "#app";
import { useLivreStore } from "~~/stores/livre";
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

const route = useRoute();
const livreStore = useLivreStore();
const bookId = route.params.id;
const carousel = ref(null);
const currentSlide = ref(0);

const config = useRuntimeConfig();

// Charger les livres si le store est vide
onMounted(async () => {
  if (!livreStore.livres.length) {
    await livreStore.fetchLivres();
  }
});

// Normalisation des données pour la vue détail
const book = computed(() => {
  const b = livreStore.livres.find((l) => l.id === bookId);
  if (!b) return {};
  return {
    id: b.id,
    title: b.titre,
    author: b.auteur,
    price: b.prix_promo ?? b.prix,
    oldPrice: b.prix_promo ? b.prix : null,
    isPromo: !!b.prix_promo,
    category: b.categorie?.libelle,
    description: b.description,

    // stock interne (pas affiché)
    stockAvailable: b.stock?.quantite ?? 0,

    image: b.images?.length
      ? `${config.public.storageBase}/${b.images[0].path}`
      : "/images/livre.jpg",
  };
});

// Related books : même catégorie, sauf le livre actuel
const relatedBooks = computed(() => {
  if (!book.value.category) return [];
  return livreStore.livres
    .filter(
      (b) => b.id !== bookId && b.categorie?.libelle === book.value.category,
    )
    .map((b) => ({
      id: b.id,
      title: b.titre,
      author: b.auteur,
      price: b.prix_promo ?? b.prix,
      oldPrice: b.prix_promo ? b.prix : null,
      isPromo: !!b.prix_promo,
      category: b.categorie?.libelle,
      image: b.images?.length
        ? `${config.public.storageBase}/${b.images[0].path}`
        : "/images/livre.jpg",
    }));
});

const itemsPerSlide = 6;
const groupedRelatedBooks = computed(() => {
  const groups = [];
  for (let i = 0; i < relatedBooks.value.length; i += itemsPerSlide) {
    groups.push(relatedBooks.value.slice(i, i + itemsPerSlide));
  }
  return groups;
});

const totalSlides = computed(() => groupedRelatedBooks.value.length);
const groupIndex = (group) => groupedRelatedBooks.value.indexOf(group);

// Carousel navigation
const scrollLeft = () => {
  if (currentSlide.value > 0) currentSlide.value--;
};
const scrollRight = () => {
  if (currentSlide.value < totalSlides.value - 1) currentSlide.value++;
};
const goToSlide = (i) => {
  currentSlide.value = i;
};
</script>

<style scoped>
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
</style>
