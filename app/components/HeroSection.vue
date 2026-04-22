<template>
  <section class="relative w-full h-[500px] md:h-[500px] lg:h-[600px] overflow-hidden group">
    <!-- BANNIÈRES (CARROUSEL) -->
    <transition-group name="fade" tag="div" class="absolute inset-0">
      <div v-for="(img, index) in images" :key="index" v-show="currentIndex === index"
        class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] ease-linear"
        :class="currentIndex === index ? 'scale-105' : 'scale-100'" :style="{ backgroundImage: `url('${img}')` }"></div>
    </transition-group>

    <!-- OVERLAY PROGRESSIF POUR LISIBILITÉ -->
    <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

    <!-- CONTENU -->
    <div
      class="relative z-10 h-full flex items-center px-6 sm:px-12 md:px-20 lg:px-32 max-w-[1400px] mx-auto overflow-hidden">
      <div class="text-left text-white max-w-2xl transform transition-all duration-700 translate-y-0 opacity-100">
        <h1
          class="animate-title text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight tracking-wide">
          <span
            class="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-200 to-white bg-[length:200%_auto] custom-gradient-text drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            Bienvenue
          </span>
          dans notre
          <br class="hidden sm:block" />
          <span class="relative inline-block mt-1 sm:mt-2 group/title">
            <span class="relative z-10 drop-shadow-md">bibliothèque</span>
            <!-- Animation trait souligné -->
            <svg
              class="absolute w-[105%] h-[12px] md:h-[18px] -bottom-1 -left-1 text-[#6a0d5f] z-0 drop-shadow-md max-w-full"
              viewBox="0 0 100 10" preserveAspectRatio="none">
              <path pathLength="100" class="path-underline" d="M 0 8 Q 50 0 100 8" stroke="currentColor"
                stroke-width="4" fill="none" stroke-linecap="round" />
            </svg>
          </span>
        </h1>
        <p
          class="animate-subtitle text-lg md:text-xl lg:text-2xl font-light mb-8 md:mb-10 text-gray-100 max-w-xl leading-relaxed border-l-4 border-[#6a0d5f] pl-5 py-2 backdrop-blur-sm bg-black/20 rounded-r-xl shadow-lg">
          Découvrez une <strong class="text-white font-bold drop-shadow-lg">collection inspirante</strong> de nos
          meilleurs ouvrages et <span
            class="text-pink-200 custom-float inline-block drop-shadow-lg font-medium">nouveautés</span>.
        </p>
        <NuxtLink to="/catalogue"
          class="animate-button group/btn relative overflow-hidden px-8 py-4 bg-[#6a0d5f] rounded-full text-base md:text-lg font-bold shadow-xl hover:shadow-[#6a0d5f]/50 transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center justify-center">
          <span class="relative z-10 flex items-center gap-2">
            Découvrir nos livres
            <svg class="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </span>
          <!-- Effet lumineux au survol -->
          <div
            class="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1s_infinite]">
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- CONTROLES DU CARROUSEL (Flèches) -->
    <button @click="prevSlide"
      class="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/20 hover:bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 backdrop-blur-sm">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
    </button>
    <button @click="nextSlide"
      class="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/20 hover:bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 backdrop-blur-sm">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </button>

    <!-- INDICATEURS (Points progressifs) -->
    <div class="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
      <button v-for="(_, index) in images" :key="index" @click="setCurrentIndex(index)"
        class="group relative h-2 transition-all duration-500 rounded-full overflow-hidden"
        :class="currentIndex === index ? 'w-10 bg-white/30' : 'w-2 bg-white/50 hover:bg-white/80 hover:w-4'">
        <!-- Barre de progression pour l'image active -->
        <span v-if="currentIndex === index"
          class="absolute inset-y-0 left-0 bg-white animate-[progress_5s_linear]"></span>
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useBannerStore } from '~~/stores/banner';

const bannerStore = useBannerStore();

const images = computed(() => {
  // On récupère uniquement les images de la base, sans images par défaut
  // On s'assure qu'elles sont bien triées par l'ordre défini
  const sortedBanners = [...(bannerStore.banners || [])].sort((a, b) => (a.order || 0) - (b.order || 0));
  return sortedBanners.map(b => b.image_url);
});

const currentIndex = ref(0);
let intervalId = null;

const nextSlide = () => {
  if (images.value.length === 0) return;
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
  resetInterval();
};

const prevSlide = () => {
  if (images.value.length === 0) return;
  currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length;
  resetInterval();
};

const setCurrentIndex = (index) => {
  currentIndex.value = index;
  resetInterval();
};

const resetInterval = () => {
  if (intervalId) clearInterval(intervalId);
  // On ne lance l'intervalle que s'il y a plus d'une image pour boucler
  if (images.value.length > 1) {
    intervalId = setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % images.value.length;
    }, 5000);
  }
};

// Sécurité pour s'assurer que l'index reste valide si les données changent
watch(() => images.value.length, (newLength) => {
  if (currentIndex.value >= newLength) {
    currentIndex.value = 0;
  }
  resetInterval();
});

onMounted(async () => {
  await bannerStore.fetchActiveBanners();
  resetInterval();
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});

</script>

<style scoped>
/* Transisiton Crossfade (Fondu enchaîné) douceur absolue */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Animations d'entrée du texte */
@keyframes slideUpFade {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes textPulse {

  0%,
  100% {
    text-shadow: 0px 4px 15px rgba(0, 0, 0, 0.5), 0px 0px 5px rgba(255, 255, 255, 0.1);
  }

  50% {
    text-shadow: 0px 4px 20px rgba(0, 0, 0, 0.6), 0px 0px 15px rgba(255, 255, 255, 0.5);
  }
}

.animate-title {
  opacity: 0;
  animation: slideUpFade 1s cubic-bezier(0.16, 1, 0.3, 1) forwards, textPulse 4s ease-in-out infinite alternate;
}

.animate-subtitle {
  opacity: 0;
  animation: slideUpFade 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
}

.animate-button {
  opacity: 0;
  animation: slideUpFade 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards;
}

/* Animations CSS personnalisées */
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

@keyframes progress {
  from {
    width: 0%;
  }

  to {
    width: 100%;
  }
}

/* Nouvelles Animations pour le Texte */
@keyframes gradientText {
  0% {
    background-position: 0% 50%;
  }

  100% {
    background-position: 200% 50%;
  }
}

.custom-gradient-text {
  animation: gradientText 4s linear infinite;
}

@keyframes drawUnderline {
  0% {
    stroke-dashoffset: 100;
  }

  100% {
    stroke-dashoffset: 0;
  }
}

.path-underline {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: drawUnderline 1.2s cubic-bezier(0.25, 1, 0.5, 1) 0.8s forwards;
}

@keyframes floatWord {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-4px);
    color: #fdf2f8;
  }

  /* pink-50 */
}

.custom-float {
  animation: floatWord 3s ease-in-out infinite;
}
</style>
