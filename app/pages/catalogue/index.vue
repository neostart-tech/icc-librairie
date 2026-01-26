<template>
  <div class="max-w-7xl mx-auto px-12 py-8">

    <section class="bg-[#E1DAF0] rounded-2xl py-12 pb-16 mb-10">
  <div class="max-w-7xl mx-auto px-6 lg:px-12">
    <div class="flex flex-col lg:flex-row items-center gap-8">

      <!-- Texte à gauche -->
      <div class="flex-1">
        <h2 class="text-xl md:text-2xl font-semibold mb-3 text-gray-900">
          {{ heroSlides[currentSlide].title }}
        </h2>
        <p class="text-sm md:text-base text-gray-600 leading-relaxed max-w-lg">
          {{ heroSlides[currentSlide].description }}
        </p>

        <!-- espace avant le bouton -->
        <div class="mt-8">
          <button class="bg-[#6a0d5f] text-white py-2 px-6 rounded-lg font-semibold hover:bg-purple-700 transition cursor-pointer">
            Voir le catalogue
          </button>
        </div>
      </div>

      <!-- Image à droite -->
      <div class="flex-1 flex justify-center">
        <img
          :src="heroSlides[currentSlide].image"
          alt="Livres en vedette"
          class="w-64 md:w-80 h-auto object-contain rounded-xl drop-shadow-xl transition-all duration-500"
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

      <!-- LISTE DES LIVRES -->
      <section class="flex-1">
        <!-- Recherche -->
        <div class="flex justify-end mb-4">
          <input
            v-model="search"
            type="text"
            placeholder="Rechercher un livre..."
            class="border rounded-lg px-3 py-2 w-64 outline-none"
          />
        </div>

        <!-- CARTES LIVRES -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="book in filteredBooks"
            :key="book.id"
            class="group relative bg-white rounded-lg shadow transition overflow-hidden w-full max-w-[220px] mx-auto hover:shadow-lg"
          >
            <!-- WISHLIST -->
            <button
              class="absolute top-2 right-2 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow hover:bg-gray-100 cursor-pointer"
            >
              <img src="/icone/heart.png" alt="wishlist" class="w-4 h-4" />
            </button>

            <!-- BADGE SOLDE -->
            <span
              v-if="book.isPromo"
              class="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full"
            >
              SOLDE
            </span>

            <!-- IMAGE -->
            <img
              :src="book.image"
              alt="livre"
              class="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
            />

            <!-- CONTENU -->
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

              <button
                class="w-full bg-[#6a0d5f] text-white py-1.5 rounded-md text-sm hover:bg-purple-700 transition"
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import SidebarFiltre from "@/components/SidebarFiltre.vue";

/* ================= HERO SLIDER ================= */

const heroSlides = [
  {
    title: "Les livres les plus appréciés par nos lecteurs",
    description:
      "Foi, enseignements, méditation… découvrez les ouvrages qui ont marqué et inspiré notre communauté.",
    image: "/images/i1.jpg", // dans public/images
  },
  {
    title: "Nouveautés fraîchement arrivées",
    description:
      "De nouveaux livres viennent enrichir notre librairie. Prenez le temps de les découvrir.",
    image: "/images/i2.jpg", // dans public/images
  },
];

const currentSlide = ref(0);

onMounted(() => {
  setInterval(() => {
    currentSlide.value =
      (currentSlide.value + 1) % heroSlides.length;
  }, 4500);
});


/* ================= FILTRES ================= */
const search = ref("");
const filters = ref({
  sort: "default",
  onlyPromo: false,
  maxPrice: 20000,
  categories: [],
});

const updateFilters = (newFilters) => {
  filters.value = newFilters;
};

/* ================= LIVRES ================= */
const books = ref([
  { id: 1, title: "Le Pouvoir de la Foi", author: "Joseph K.", price: 7500, oldPrice: 12000, isPromo: true, category: "Spiritualité", image: "/images/livre.jpg" },
  { id: 2, title: "Marcher avec Dieu", author: "Paul N.", price: 9800, isPromo: false, category: "Étude Biblique", image: "/images/livre1.jpg" },
  { id: 3, title: "Prières et Méditations", author: "Marie A.", price: 6500, oldPrice: 9000, isPromo: true, category: "Spiritualité", image: "/images/livre2.jpg" },
  { id: 4, title: "La Parole du Jour", author: "Jean P.", price: 8500, isPromo: false, category: "Théologie", image: "/images/livre.jpg" },
  { id: 5, title: "La Vie en Christ", author: "Anne M.", price: 12000, oldPrice: 15000, isPromo: true, category: "Famille & Éducation", image: "/images/livre1.jpg" },
  { id: 6, title: "Guide de Prière", author: "Pierre L.", price: 7200, isPromo: false, category: "Étude Biblique", image: "/images/livre2.jpg" },
  { id: 7, title: "Lumière du Cœur", author: "Lucie D.", price: 5400, oldPrice: 10000, isPromo: true, category: "Famille & Éducation", image: "/images/livre.jpg" },
  { id: 8, title: "Foi et Espérance", author: "Sophie K.", price: 6900, isPromo: false, category: "Théologie", image: "/images/livre1.jpg" },
]);

/* ================= COMPUTED ================= */
const filteredBooks = computed(() => {
  let result = books.value.filter(
    (b) => b.price <= filters.value.maxPrice
  );

  if (filters.value.onlyPromo) {
    result = result.filter((b) => b.isPromo);
  }

  if (search.value.trim()) {
    const term = search.value.toLowerCase();
    result = result.filter(
      (b) =>
        b.title.toLowerCase().includes(term) ||
        b.author.toLowerCase().includes(term)
    );
  }

  if (filters.value.categories.length > 0) {
    result = result.filter((b) =>
      filters.value.categories.includes(b.category)
    );
  }

  switch (filters.value.sort) {
    case "priceAsc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "priceDesc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "alpha":
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }

  return result;
});
</script>
