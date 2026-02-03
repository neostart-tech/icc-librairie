<template>
  <section class="relative w-full h-[320px] overflow-hidden">
    <!-- BACKGROUND FLOUTÉ -->
    <div
      v-if="currentBook"
      class="absolute inset-0 bg-cover bg-center transition-all duration-700"
      :style="{
        backgroundImage: `url(${currentBook.image})`,
        filter: 'blur(18px)',
        transform: 'scale(1.1)',
      }"
    ></div>

    <!-- OVERLAY -->
    <div class="absolute inset-0 bg-black/50"></div>

    <!-- CONTENU -->
    <div class="relative z-10 h-full flex items-center justify-center">
      <Transition name="slide" mode="out-in">
        <div
          v-if="currentBook"
          :key="currentBook.id"
          class="absolute flex flex-col items-center text-center text-white max-w-md"
        >
          <img
            :src="currentBook.image"
            class="w-40 h-56 object-cover rounded-lg shadow-xl mb-4"
          />

          <h2 class="text-xl font-bold mb-1 line-clamp-2">
            {{ currentBook.title }}
          </h2>

          <p class="text-sm text-gray-200 mb-1">
            {{ currentBook.author }}
          </p>

          <NuxtLink
            :to="`/livres/${currentBook.id}`"
            class="px-5 py-2 bg-[#6a0d5f] rounded-full text-sm font-semibold hover:opacity-90 transition"
          >
            Voir plus
          </NuxtLink>
        </div>
      </Transition>
    </div>

    <!-- FLECHES -->
    <button
      @click="prevSlide"
      class="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white px-3 py-1 rounded-full text-2xl"
    >
      <svg
        width="30px"
        height="30px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#ffffff"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M14 8L10 12L14 16"
            stroke="#ffffff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </g>
      </svg>
    </button>

    <button
      @click="nextSlide"
      class="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white px-3 py-1 rounded-full text-2xl"
    >
      <svg
        width="30px"
        height="30px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M10 16L14 12L10 8"
            stroke="#ffffff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </g>
      </svg>
    </button>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useLivreStore } from "~~/stores/livre";
import { useRuntimeConfig } from "#app";

const livreStore = useLivreStore();
const config = useRuntimeConfig();

const currentIndex = ref(0);
let interval = null;

/* LIVRES HERO */
const DEFAULT_IMAGE = "/images/livre.jpg";

/* LIVRES HERO */
const heroBooks = computed(() =>
  livreStore.livres
    .slice(0, 5) // max 5 livres
    .map((livre) => {
      const hasImage = livre.images?.length;

      return {
        id: livre.id,
        title: livre.titre,
        author: livre.auteur,
        image: hasImage
          ? `${config.public.storageBase}/${livre.images[0].path}`
          : DEFAULT_IMAGE,
      };
    }),
);

const currentBook = computed(() => {
  return heroBooks.value.length ? heroBooks.value[currentIndex.value] : null;
});

const nextSlide = () => {
  if (!heroBooks.value.length) return;

  currentIndex.value = (currentIndex.value + 1) % heroBooks.value.length;
};

const prevSlide = () => {
  currentIndex.value =
    currentIndex.value === 0
      ? heroBooks.value.length - 1
      : currentIndex.value - 1;
};

onMounted(async () => {
  if (!livreStore.livres.length) {
    await livreStore.fetchLivres();
  }

  interval = setInterval(nextSlide, 5000);
});

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.6s ease;
  position: absolute;
  width: 100%;
}

/* Le nouveau arrive depuis la droite */
.slide-enter-from {
  opacity: 0;
  transform: translateX(60px);
}

/* L'ancien sort vers la gauche */
.slide-leave-to {
  opacity: 0;
  transform: translateX(-60px);
}

/* état normal */
.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
