<template>
  <div>
    <!-- HERO -->
    <HeroSection />

    <!-- Top Categories Section -->
    <section class="bg-gray-50 py-20 px-4 overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="relative border-2 border-[#6a0d5f]/10 rounded-[3rem] p-8 md:p-16 bg-white/50 backdrop-blur-sm">
          <!-- Section Title -->
          <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-50 px-6">
            <h2 class="text-2xl md:text-3xl font-black text-[#6a0d5f] uppercase tracking-tighter whitespace-nowrap">
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
                  class="group flex flex-col items-center text-center animate-fadeInUp w-64 md:w-72 lg:w-auto flex-shrink-0 snap-center"
                  :style="{ animationDelay: `${index * 150}ms` }">

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
                      class="absolute top-4 -right-1 w-8 h-8 md:w-10 md:h-10 bg-[#6a0d5f] text-white rounded-full flex items-center justify-center font-black text-xs md:text-sm shadow-xl border-4 border-white group-hover:scale-110 transition-transform duration-300">
                      0{{ index + 1 }}
                    </div>
                  </NuxtLink>

                  <!-- Label & Count -->
                  <NuxtLink :to="`/catalogue?category=${cat.libelle}`" class="group/link">
                    <h3
                      class="font-black text-gray-900 group-hover/link:text-[#6a0d5f] text-sm md:text-base mb-1 uppercase tracking-tight transition-colors">
                      {{ cat.libelle }}
                    </h3>
                    <span
                      class="text-[10px] font-black bg-[#6a0d5f]/5 text-[#6a0d5f] px-3 py-1 rounded-full uppercase tracking-widest">
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
  </div>
</template>

<script setup>
import HeroSection from "~/components/HeroSection.vue";
import { computed, onMounted, ref } from "vue";
import { useLivreStore } from "~~/stores/livre";
import { useCategorieStore } from "~~/stores/categorie";

const livreStore = useLivreStore();
const categorieStore = useCategorieStore();
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

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>