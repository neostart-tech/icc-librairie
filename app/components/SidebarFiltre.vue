<template>
  <aside class="w-64 hidden md:block">
    <div class="bg-white rounded-xl shadow p-6 sticky top-28">
      <h2 class="text-lg font-bold mb-6 text-gray-800">
        Filtrer & Trier
      </h2>

      <!-- TRI -->
      <div class="mb-6">
        <p class="font-semibold mb-2">Trier par</p>
        <select
          v-model="localSort"
          class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
        >
          <option value="default">Par défaut</option>
          <option value="priceAsc">Prix croissant</option>
          <option value="priceDesc">Prix décroissant</option>
          <option value="alpha">Ordre alphabétique</option>
        </select>
      </div>

      <!-- FILTRE PRIX -->
      <div class="mb-6">
        <p class="font-semibold mb-3">Prix maximum</p>
        <input
          type="range"
          :min="minPrice"
          :max="maxPrice"
          v-model="localMaxPrice"
          class="w-full accent-[#6a0d5f]"
        />
        <div class="flex justify-between text-sm text-gray-600 mt-2">
          <span>{{ minPrice }} FCFA</span>
          <span>{{ localMaxPrice }} FCFA</span>
        </div>
      </div>

      <!-- FILTRE PROMO -->
      <div class="mb-6">
        <label class="flex items-center gap-2">
          <input type="checkbox" v-model="localOnlyPromo" />
          <span>Uniquement en solde</span>
        </label>
      </div>

      <!-- FILTRE CATEGORIES -->
      <div class="mb-6">
        <p class="font-semibold mb-2">Catégories</p>
        <div class="space-y-2">
          <label class="flex items-center gap-2">
            <input type="checkbox" value="Spiritualité" v-model="localCategories" />
            <span>Spiritualité</span>
          </label>
          <label class="flex items-center gap-2">
            <input type="checkbox" value="Étude Biblique" v-model="localCategories" />
            <span>Étude Biblique</span>
          </label>
          <label class="flex items-center gap-2">
            <input type="checkbox" value="Théologie" v-model="localCategories" />
            <span>Théologie</span>
          </label>
          <label class="flex items-center gap-2">
            <input type="checkbox" value="Famille & Éducation" v-model="localCategories" />
            <span>Famille & Éducation</span>
          </label>
        </div>
      </div>

      <!-- BOUTON RESET -->
      <button
        @click="resetFilters"
        class="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition font-semibold"
      >
        Réinitialiser
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  minPrice: {
    type: Number,
    default: 0,
  },
  maxPrice: {
    type: Number,
    default: 20000,
  },
});

const emit = defineEmits(["update:filters"]);

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
