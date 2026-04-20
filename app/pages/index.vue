<template>
  <div>
    <!-- HERO -->
    <HeroSection />

    <!-- Top Categories Section -->
    <section class="bg-gray-50 py-20 px-4 overflow-hidden">
      <div class="max-w-7xl mx-auto" v-reveal.repeat>
        <div class="relative border-2 border-[#6a0d5f]/10 rounded-[3rem] p-8 md:p-16 bg-white/50 backdrop-blur-sm">
          <!-- Section Title -->
          <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-50 px-6">
            <h2 class="text-2xl md:text-3xl font-bold text-[#6a0d5f] uppercase tracking-wide whitespace-nowrap">
              Catégories en vogue
            </h2>
          </div>

          <div class="relative flex items-center">
            <!-- Navigation ARROWS -->
            <button @click="scroll('left')"
              class="absolute top-[40%] md:top-1/2 -translate-y-1/2 -left-2 md:-left-16 w-10 h-10 md:w-12 md:h-12 bg-[#6a0d5f] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-30">
              <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M15 19l-7-7 7-7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>

            <!-- Categories Container and Auto-scroll Wrapper -->
            <div class="w-full relative px-2 md:px-4">
              <div ref="scrollContainer"
                class="flex lg:grid lg:grid-cols-5 gap-6 md:gap-8 overflow-x-auto lg:overflow-visible py-12 -my-12 scrollbar-hide scroll-smooth snap-x snap-mandatory lg:snap-none">
                <div v-for="(cat, index) in topCategories" :key="cat.id"
                  v-reveal.repeat :class="`reveal-delay-${index * 100}`"
                  class="group flex flex-col items-center text-center w-64 md:w-72 lg:w-auto flex-shrink-0 snap-center">

                  <!-- Circular Image Container -->
                  <NuxtLink :to="`/catalogue?category=${cat.libelle}`" class="relative mb-8 block">
                    <!-- Permanent Rotating Decorative Border -->
                    <div
                      class="dashed-border absolute -inset-5 border-2 border-dashed border-[#6a0d5f]/20 rounded-full group-hover:border-[#6a0d5f]/50 transition-colors duration-1000">
                    </div>

                    <!-- Main Circle -->
                    <div
                      class="relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-white p-6 shadow-2xl shadow-[#6a0d5f]/5 overflow-hidden ring-4 ring-white group-hover:shadow-[#6a0d5f]/20 transition-all duration-500">
                      <img :src="cat.lastBookImage" :alt="cat.libelle"
                        class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                    </div>

                    <!-- Badge Number -->
                    <div
                      class="absolute top-4 -right-1 w-8 h-8 md:w-10 md:h-10 bg-[#6a0d5f] text-white rounded-full flex items-center justify-center font-bold text-xs md:text-sm shadow-xl border-4 border-white group-hover:scale-110 transition-transform duration-300">
                      0{{ index + 1 }}
                    </div>
                  </NuxtLink>

                  <!-- Label & Count -->
                  <NuxtLink :to="`/catalogue?category=${cat.libelle}`" class="group/link">
                    <h3
                      class="font-bold text-gray-900 group-hover/link:text-[#6a0d5f] text-sm md:text-base mb-1 uppercase tracking-tight transition-colors">
                      {{ cat.libelle }}
                    </h3>
                    <span
                      class="text-[10px] font-bold bg-[#6a0d5f]/5 text-[#6a0d5f] px-3 py-1 rounded-full uppercase tracking-widest">
                      {{ cat.bookCount }} Livres
                    </span>
                  </NuxtLink>
                </div>
              </div>
            </div>

            <button @click="scroll('right')"
              class="absolute top-[40%] md:top-1/2 -translate-y-1/2 -right-2 md:-right-16 w-10 h-10 md:w-12 md:h-12 bg-[#6a0d5f] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-30">
              <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>

          <!-- Pagination Dots (Desktop) -->
          <div class="hidden lg:flex justify-center gap-3 mt-12">
            <div
              class="w-2.5 h-2.5 rounded-full bg-[#6a0d5f]/10 hover:bg-[#6a0d5f]/30 transition-colors cursor-pointer">
            </div>
            <div class="w-8 h-2.5 rounded-full bg-[#6a0d5f] shadow-lg shadow-[#6a0d5f]/20"></div>
            <div
              class="w-2.5 h-2.5 rounded-full bg-[#6a0d5f]/10 hover:bg-[#6a0d5f]/30 transition-colors cursor-pointer">
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Recent Books Section -->
    <section class="py-24 px-4 bg-white overflow-hidden">
      <div class="max-w-7xl mx-auto" v-reveal.repeat>
        <!-- Section Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div class="space-y-2">
            <h2 class="text-2xl md:text-3xl font-bold text-gray-900 tracking-wide uppercase">
              Nos livres <span class="text-[#6a0d5f]">récents</span>
            </h2>
            <div class="flex items-center gap-4">
              <div class="h-1.5 w-24 bg-[#6a0d5f] rounded-full relative overflow-hidden animate-pulse-slow">
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer-fast"></div>
              </div>
              <p class="text-gray-500 font-medium uppercase tracking-[0.2em] text-xs">
                Découvrez les dernières pépites de notre collection
              </p>
            </div>
          </div>
          <NuxtLink to="/catalogue"
            class="group flex items-center gap-3 px-8 py-4 bg-gray-50 hover:bg-[#6a0d5f] text-[#6a0d5f] hover:text-white rounded-full font-bold text-sm transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-[#6a0d5f]/20 uppercase tracking-widest border border-gray-100">
            Explorer tout le catalogue
            <svg class="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <!-- Books Grid -->
          <div class="lg:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div v-for="(book, index) in recentBooks" :key="book.id" 
              v-reveal.repeat :class="`reveal-delay-${index * 100}`"
              class="group flex flex-col">

              <!-- Book Image Container -->
              <NuxtLink :to="`/livres/${book.id}`"
                class="relative aspect-[3/4] rounded-3xl bg-gray-50 p-6 mb-6 overflow-hidden transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-[#6a0d5f]/10 block group-hover:-translate-y-2">
                <!-- Badges -->
                <div
                  class="absolute top-4 left-4 flex flex-col gap-2 z-10 transition-transform duration-500 group-hover:translate-x-1">
                  <span v-if="book.isPromo"
                    class="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-widest">
                    Hot
                  </span>
                  <span v-if="book.isPromo"
                    class="bg-[#6a0d5f] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-widest">
                    -30%
                  </span>
                </div>

                <img :src="book.image" :alt="book.titre"
                  class="w-full h-full object-contain drop-shadow-2xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-3" />

                <!-- Overlay Button -->
                <div
                  class="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <button @click.stop.prevent="addToCart(book)"
                    class="w-full py-4 bg-white/90 backdrop-blur text-[#6a0d5f] rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl hover:bg-[#6a0d5f] hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" stroke-width="2.5" />
                    </svg>
                    Ajouter
                  </button>
                </div>
              </NuxtLink>

              <!-- Book Info -->
              <div class="space-y-2 px-2">
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {{ book.categorie?.libelle || 'Inspirant' }}
                </span>
                <h3
                  class="font-bold text-gray-900 text-sm md:text-base line-clamp-1 leading-tight group-hover:text-[#6a0d5f] transition-colors">
                  {{ book.titre }}
                </h3>
                <p class="text-[10px] font-bold text-gray-500 truncate">
                  {{ book.auteurRel?.nom || book.auteur || 'Auteur Inconnu' }}
                </p>

                <div class="flex items-center gap-3 pt-1">
                  <span class="text-lg font-bold text-[#6a0d5f]">
                    {{ formatPrice(book.prix_promo || book.prix) }}
                  </span>
                  <span v-if="book.prix_promo" class="text-sm font-bold text-gray-300 line-through">
                    {{ formatPrice(book.prix) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-3 reveal-left" v-reveal.repeat>
            <div class="relative h-full rounded-3xl overflow-hidden group shadow-2xl shadow-[#6a0d5f]/10">
              <img src="/images/ban-cote.webp" alt="Promotion"
                class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div
                class="absolute inset-0 bg-gradient-to-t from-[#6a0d5f]/90 via-[#6a0d5f]/20 to-transparent p-10 flex flex-col justify-end items-start gap-6">
                <div class="space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                  <h3 class="text-3xl font-bold text-white leading-tight uppercase tracking-wide">
                    Trouvez votre <br />
                    <span class="text-orange-400">meilleur</span> livre
                  </h3>
                  <p class="text-white/80 text-sm font-medium">
                    Profitez de -25% sur une sélection limitée !
                  </p>
                </div>
                <NuxtLink to="/catalogue"
                  class="px-8 py-4 bg-white text-[#6a0d5f] rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all duration-300">
                  Acheter plus
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import HeroSection from "~/components/HeroSection.vue";
import { computed, onMounted, ref } from "vue";
import { useLivreStore } from "~~/stores/livre";
import { useCategorieStore } from "~~/stores/categorie";
import { useCartStore } from "~~/stores/cart";

const livreStore = useLivreStore();
const categorieStore = useCategorieStore();
const cartStore = useCartStore();
const config = useRuntimeConfig();

const scrollContainer = ref(null);

onMounted(async () => {
  await Promise.all([
    livreStore.fetchLivres(),
    categorieStore.fetchCategories(),
  ]);
});

const scroll = (direction) => {
  if (!scrollContainer.value) return;
  const container = scrollContainer.value;
  const scrollAmount = window.innerWidth < 1024 ? container.clientWidth * 0.8 : 500;

  if (direction === 'right') {
    const isAtEnd = Math.ceil(container.scrollLeft + container.clientWidth) >= container.scrollWidth - 10;
    if (isAtEnd) {
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  } else {
    const isAtStart = container.scrollLeft <= 10;
    if (isAtStart) {
      container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }
};

const formatPrice = (price) => {
  if (price === undefined || price === null) return '0 FCFA';
  return new Intl.NumberFormat('fr-FR').format(Number(price)) + ' FCFA';
};

const addToCart = (book) => {
  cartStore.add({
    id: book.id,
    title: book.titre,
    price: book.prix_promo || book.prix,
    image: book.image,
    stockAvailable: book.stock?.quantite || 1
  });
};

const recentBooks = computed(() => {
  return [...livreStore.livres]
    .sort((a, b) => b.id - a.id)
    .slice(0, 4)
    .map(book => {
      const imagePath = book.images?.length
        ? `${config.public.storageBase}/${book.images[0].path}`
        : "/images/livre.jpg";
      return {
        ...book,
        image: imagePath,
        categorie: book.categorie || categorieStore.categories.find(c => c.id === book.categorie_id),
        isPromo: !!book.prix_promo
      };
    });
});

const topCategories = computed(() => {
  const cats = [...categorieStore.categories]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  return cats.map((cat) => {
    const catLivres = livreStore.livres.filter(l => l.categorie_id === cat.id);
    const lastBook = catLivres[0];
    const imagePath = lastBook?.images?.length
      ? `${config.public.storageBase}/${lastBook.images[0].path}`
      : "/images/livre.jpg";

    return {
      ...cat,
      bookCount: catLivres.length,
      lastBookImage: imagePath
    };
  });
});
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

.animate-fadeInUp {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
}

/* Continuous rotation for dashed borders */
@keyframes spinDashedPermanent {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.dashed-border {
  animation: spinDashedPermanent 15s linear infinite;
}

@keyframes shimmer-fast {
  from { transform: translateX(-100%); }
  to { transform: translateX(100%); }
}

@keyframes pulse-slow {
  0%, 100% { transform: scaleX(1); opacity: 1; }
  50% { transform: scaleX(1.1); opacity: 0.8; }
}

.animate-shimmer-fast {
  animation: shimmer-fast 2s infinite linear;
}

.animate-pulse-slow {
  animation: pulse-slow 3s infinite ease-in-out;
  transform-origin: left;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>