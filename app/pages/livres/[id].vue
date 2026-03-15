<template>
  <div class="min-h-screen bg-[#FDFCFD]">
    <!-- Breadcrumb -->
    <Breadcrumb :items="[
      { label: 'Catalogue', to: '/catalogue' },
      { label: book.title || 'Chargement...', to: '#' },
    ]" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Bouton retour avec animation -->
      <NuxtLink to="/catalogue"
        class="group inline-flex items-center text-[#6a0d5f]/60 hover:text-[#6a0d5f] transition-all duration-300 font-medium mb-8">
        <div
          class="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mr-3 group-hover:shadow-md group-hover:-translate-x-1 transition-all duration-300">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        Retour au catalogue
      </NuxtLink>

      <div v-if="book.id" class="relative">
        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <!-- Left Column: Image -->
          <div class="lg:col-span-5 xl:col-span-5 relative group" v-reveal.repeat>
            <div class="sticky top-8">
              <!-- Backdrop Blur / Decorative Element -->
              <div
                class="absolute -inset-4 bg-[#6a0d5f]/5 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              </div>

              <div
                class="relative bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden aspect-[3/4] flex items-center justify-center p-4 border border-gray-100">
                <img :src="book.image"
                  class="w-full h-full object-contain transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  :alt="book.title" />

                <div v-if="book.isPromo"
                  class="absolute top-6 right-6 bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-xl animate-pulse">
                  -{{
                    Math.round(
                      ((book.oldPrice - book.price) / book.oldPrice) * 100,
                    )
                  }}%
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Details -->
          <div class="lg:col-span-7 xl:col-span-7 space-y-8" v-reveal.repeat>
            <div class="animate-fade-in-up">
              <div class="flex items-center space-x-3 mb-6">
                <span
                  class="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-[#6a0d5f]/10 text-[#6a0d5f] border border-[#6a0d5f]/10">
                  {{ book.category || "Littérature" }}
                </span>
              </div>

              <h1 class="text-4xl lg:text-5xl font-extrabold text-[#1a1a1a] leading-tight mb-4">
                {{ book.title }}
              </h1>

              <div class="flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div
                  class="w-12 h-12 rounded-full bg-gradient-to-tr from-[#6a0d5f] to-[#8B5A8C] flex items-center justify-center text-white font-bold text-lg mr-4">
                  {{ book.author ? book.author.charAt(0) : "A" }}
                </div>
                <div>
                  <p class="text-xs text-gray-500 font-bold uppercase tracking-widest">
                    Auteur de l'œuvre
                  </p>
                  <p class="text-xl font-bold text-gray-900">
                    {{ book.author }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Price & Actions -->
            <div
              class="p-8 rounded-[2rem] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-50 animate-fade-in-up"
              style="animation-delay: 100ms">
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div class="space-y-1">
                  <p class="text-sm text-gray-500 font-medium">Prix de vente</p>
                  <div class="flex items-baseline space-x-3">
                    <span class="text-4xl font-black text-[#6a0d5f]">
                      {{ book.price.toLocaleString() }}
                      <span class="text-xl">FCFA</span>
                    </span>
                    <span v-if="book.isPromo" class="text-xl text-gray-300 line-through">
                      {{ book.oldPrice.toLocaleString() }}
                    </span>
                  </div>
                  <p v-if="book.isPromo" class="text-green-600 text-sm font-bold flex items-center mt-1">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd" />
                    </svg>
                    Meilleur prix garanti
                  </p>
                </div>

                <div class="flex-grow max-w-md">
                  <button @click.stop.prevent="addToCart(book)" :disabled="cartStore.getQuantity(book.id) > 0 || !book.stockAvailable
                    "
                    class="group w-full py-5 rounded-2xl font-black text-lg transition-all duration-300 flex items-center justify-center gap-4 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 active:scale-95 overflow-hidden relative"
                    :class="[
                      !book.stockAvailable
                        ? 'bg-gray-100 text-gray-400'
                        : cartStore.getQuantity(book.id) > 0
                          ? 'bg-green-500 text-white shadow-green-200'
                          : 'bg-[#6a0d5f] text-white shadow-[#6a0d5f]/30 hover:shadow-[#6a0d5f]/50',
                    ]">
                    <!-- Animated Shine Effect -->
                    <div
                      class="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000">
                    </div>

                    <svg v-if="
                      book.stockAvailable &&
                      cartStore.getQuantity(book.id) === 0
                    " class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <svg v-else-if="cartStore.getQuantity(book.id) > 0" class="w-6 h-6" fill="none"
                      stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>

                    <span>
                      {{
                        !book.stockAvailable
                          ? "Épuisé"
                          : cartStore.getQuantity(book.id) > 0
                            ? "Dans le panier"
                            : "Ajouter au panier"
                      }}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Description with tabs-like feel -->
            <div class="animate-fade-in-up" style="animation-delay: 200ms">
              <div class="flex items-center space-x-8 border-b border-gray-100 mb-6">
                <button class="pb-4 text-sm font-bold border-b-2 border-[#6a0d5f] text-[#6a0d5f]">
                  Synopsis
                </button>
              </div>
              <p
                class="text-gray-600 text-lg leading-relaxed first-letter:text-4xl first-letter:font-bold first-letter:text-[#6a0d5f] first-letter:mr-1">
                {{ book.description || "Plongez dans cet ouvrage captivant qui explore les thématiques essentielles avec une profondeur inégalée." }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="flex flex-col items-center justify-center py-32 space-y-4">
        <div class="w-20 h-20 border-4 border-[#6a0d5f]/20 border-t-[#6a0d5f] rounded-full animate-spin"></div>
        <p class="text-xl font-medium text-gray-400">Le livre se prépare...</p>
      </div>
    </div>

    <!-- Lively "Vous aimerez aussi" Section -->
    <div v-if="relatedBooks.length" class="mt-20 py-20 bg-gradient-to-b from-white to-[#f9f5f9] overflow-hidden" v-reveal.repeat>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-end justify-between mb-12">
          <div class="space-y-2">
            <h2 class="text-3xl font-black text-gray-900 tracking-tight">
              Plus de trésors à découvrir
            </h2>
            <div class="h-1.5 w-24 bg-gradient-to-r from-[#6a0d5f] to-transparent rounded-full"></div>
            <p class="text-gray-500 font-medium pt-2">
              Basé sur vos intérêts pour {{ book.category }}
            </p>
          </div>
        </div>

        <div class="relative group/carousel">
          <!-- Navigation Buttons on sides -->
          <div class="absolute top-[40%] -left-4 lg:-left-16 -translate-y-1/2 z-20 transition-all duration-300">
            <button @click="scrollLeft" :disabled="!canScrollLeft"
              class="w-12 h-12 rounded-full border-2 border-gray-100 bg-white shadow-xl flex items-center justify-center hover:border-[#6a0d5f]/30 hover:text-[#6a0d5f] hover:scale-110 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none group">
              <svg class="w-6 h-6 transform group-active:-translate-x-1 transition-transform" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          
          <div class="absolute top-[40%] -right-4 lg:-right-16 -translate-y-1/2 z-20 transition-all duration-300">
            <button @click="scrollRight" :disabled="!canScrollRight"
              class="w-12 h-12 rounded-full border-2 border-gray-100 bg-white shadow-xl flex items-center justify-center hover:border-[#6a0d5f]/30 hover:text-[#6a0d5f] hover:scale-110 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none group">
              <svg class="w-6 h-6 transform group-active:translate-x-1 transition-transform" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div class="overflow-hidden px-1">
            <div ref="carousel" 
              @mouseenter="stopAutoScroll"
              @mouseleave="startAutoScroll"
              class="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 md:gap-8 lg:gap-10 pb-10 scroll-smooth">
              <div v-for="relatedBook in relatedBooks" :key="relatedBook.id" 
                class="flex-shrink-0 w-[calc(100%-1rem)] md:w-[240px] lg:w-[210px] snap-start group perspective-1000 py-4">
                <NuxtLink :to="`/livres/${relatedBook.id}`" class="block">
                  <div
                    class="relative aspect-[2/3] mb-6 rounded-2xl overflow-hidden shadow-md group-hover:shadow-2xl group-hover:-translate-y-3 transition-all duration-500 bg-white border border-gray-50/50">
                    <img :src="relatedBook.image"
                      class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      :alt="relatedBook.title" />
                    <div
                      class="absolute inset-0 bg-gradient-to-t from-[#6a0d5f]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span class="text-white text-xs font-bold uppercase tracking-widest bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full">Explorer</span>
                    </div>
                    <div v-if="relatedBook.isPromo"
                      class="absolute top-4 left-4 bg-red-500 text-white px-2.5 py-1 rounded-lg text-[10px] font-black shadow-lg">
                      PROMO
                    </div>
                  </div>

                  <div class="space-y-2 text-center md:text-left px-1">
                    <h3
                      class="font-bold text-gray-900 leading-tight group-hover:text-[#6a0d5f] transition-colors duration-200 line-clamp-2 min-h-[3rem] text-sm md:text-base">
                      {{ relatedBook.title }}
                    </h3>
                    <p class="text-[11px] md:text-xs text-gray-400 font-bold uppercase tracking-wider truncate">
                      {{ relatedBook.author }}
                    </p>
                    <div class="flex items-center justify-center md:justify-start space-x-2 pt-1">
                      <span class="text-base md:text-lg font-black text-[#6a0d5f]">
                        {{ relatedBook.price.toLocaleString() }}
                      </span>
                      <span class="text-[10px] text-[#6a0d5f]/50 font-bold uppercase">FCFA</span>
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Breadcrumb from "@/components/Breadcrumb.vue";
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
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

const route = useRoute();
const livreStore = useLivreStore();
const bookId = route.params.id;
const carousel = ref(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(false);
let autoScrollInterval = null;

const updateScrollState = () => {
  if (carousel.value) {
    const { scrollLeft, scrollWidth, clientWidth } = carousel.value;
    canScrollLeft.value = scrollLeft > 10;
    canScrollRight.value = scrollLeft + clientWidth < scrollWidth - 20;
  }
};

const startAutoScroll = () => {
  if (autoScrollInterval) return;
  autoScrollInterval = setInterval(() => {
    if (carousel.value) {
      const { scrollLeft, scrollWidth, clientWidth } = carousel.value;
      if (scrollLeft + clientWidth >= scrollWidth - 20) {
        carousel.value.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const item = carousel.value.querySelector('.snap-start');
        const scrollAmount = item ? item.offsetWidth + 24 : 300;
        carousel.value.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  }, 5000);
};

const stopAutoScroll = () => {
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval);
    autoScrollInterval = null;
  }
};

const config = useRuntimeConfig();

onMounted(async () => {
  if (!livreStore.livres.length) {
    await livreStore.fetchLivres();
  }
  nextTick(() => {
    updateScrollState();
    if (carousel.value) {
      carousel.value.addEventListener('scroll', updateScrollState);
    }
  });
  startAutoScroll();
});

onUnmounted(() => {
  if (carousel.value) {
    carousel.value.removeEventListener('scroll', updateScrollState);
  }
  stopAutoScroll();
});

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
    stockAvailable: b.stock?.quantite ?? 0,
    image: b.images?.length
      ? `${config.public.storageBase}/${b.images[0].path}`
      : "/images/livre.jpg",
  };
});

const relatedBooks = computed(() => {
  if (!book.value.category) return [];
  const list = livreStore.livres
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
  nextTick(updateScrollState);
  return list;
});

const scrollLeft = () => {
  stopAutoScroll();
  if (carousel.value) {
    const item = carousel.value.querySelector('.snap-start');
    const scrollAmount = item ? item.offsetWidth + 24 : 300;
    carousel.value.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  }
  startAutoScroll();
};

const scrollRight = () => {
  stopAutoScroll();
  if (carousel.value) {
    const item = carousel.value.querySelector('.snap-start');
    const scrollAmount = item ? item.offsetWidth + 24 : 300;
    carousel.value.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
  startAutoScroll();
};
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.perspective-1000 {
  perspective: 1000px;
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

.cubic-bezier {
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
