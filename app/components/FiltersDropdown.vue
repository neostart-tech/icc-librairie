<template>
  <div class="mb-6 relative" ref="dropdownContainer">
    <!-- Bouton pour ouvrir/fermer le dropdown -->
    <button
      @click="toggleDropdown"
      class="w-full md:w-auto flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
    >
      <span>Filtres & Trier</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 ml-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <!-- Dropdown des filtres (affiché conditionnellement) -->
    <div
      v-if="isOpen"
      class="mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-full md:absolute md:w-[300px] md:mt-1"
    >
      <!-- TRI -->
      <div class="mb-4">
        <p class="font-semibold mb-2 text-sm">Trier par</p>
        <select
          v-model="localSort"
          class="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
        >
          <option value="default">Par défaut</option>
          <option value="priceAsc">Prix croissant</option>
          <option value="priceDesc">Prix décroissant</option>
          <option value="alpha">Ordre alphabétique</option>
        </select>
      </div>

      <!-- PRIX -->
      <div class="mb-4">
        <p class="font-semibold mb-2 text-sm">Prix maximum</p>
        <input
          type="range"
          :min="minPrice"
          :max="maxPrice"
          v-model="localMaxPrice"
          class="w-full accent-[#6a0d5f] cursor-pointer"
        />
        <div class="flex justify-between text-xs text-gray-600 mt-1">
          <span>{{ minPrice }} FCFA</span>
          <span>{{ localMaxPrice }} FCFA</span>
        </div>
      </div>

      <!-- PROMO -->
      <div class="mb-4">
        <label class="flex items-center gap-2 text-sm">
          <input type="checkbox" v-model="localOnlyPromo" />
          <span>Uniquement en solde</span>
        </label>
      </div>

      <!-- CATEGORIES -->
      <div class="mb-4" v-if="categories.length">
        <p class="font-semibold mb-2 text-sm">Catégories</p>
        <div class="space-y-2 text-sm max-h-40 overflow-y-auto">
          <label
            v-for="cat in categories"
            :key="cat.id"
            class="flex items-center gap-2"
          >
            <input
              type="checkbox"
              :value="cat.libelle"
              v-model="localCategories"
            />
            <span>{{ cat.libelle }}</span>
          </label>
        </div>
      </div>

      <!-- RESET -->
      <button
        @click="resetFilters"
        class="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition font-semibold text-sm cursor-pointer"
      >
        Réinitialiser
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  minPrice: { type: Number, default: 0 },
  maxPrice: { type: Number, default: 20000 },
  categories: { type: Array, default: () => [] },
});

const emit = defineEmits(["update:filters"]);

const isOpen = ref(false);
const dropdownContainer = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const handleClickOutside = (event) => {
  // Ferme le dropdown si le clic est en dehors du conteneur
  if (
    dropdownContainer.value &&
    !dropdownContainer.value.contains(event.target)
  ) {
    isOpen.value = false;
  }
};

onMounted(() => {
  // Ajoute l'écouteur d'événement global
  document.addEventListener("mousedown", handleClickOutside);
});

onBeforeUnmount(() => {
  // Supprime l'écouteur d'événement global
  document.removeEventListener("mousedown", handleClickOutside);
});

const localSort = ref("default");
const localOnlyPromo = ref(false);
const localMaxPrice = ref(props.maxPrice);
const localCategories = ref([]);

const emitChange = () => {
  emit("update:filters", {
    sort: localSort.value,
    onlyPromo: localOnlyPromo.value,
    maxPrice: localMaxPrice.value,
    categories: localCategories.value,
  });
};

const resetFilters = () => {
  localSort.value = "default";
  localOnlyPromo.value = false;
  localMaxPrice.value = props.maxPrice;
  localCategories.value = [];
  emitChange();
};

watch([localSort, localOnlyPromo, localMaxPrice, localCategories], emitChange);
</script>
