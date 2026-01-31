<template>
  <aside class="w-56 sm:w-60 md:w-64 shrink-0">
    <div
      class="bg-white rounded-xl shadow p-4 sm:p-5 md:p-6
             sticky top-24
             max-h-[calc(100vh-6rem)] overflow-y-auto"
    >
      <h2 class="text-base sm:text-lg font-bold mb-5 text-gray-800">
        Filtrer & Trier
      </h2>

      <!-- TRI -->
      <div class="mb-5">
        <p class="font-semibold mb-2 text-sm">Trier par</p>
        <select
          v-model="localSort"
          class="w-full border rounded-lg px-3 py-2 text-sm
                 focus:ring-2 focus:ring-purple-500"
        >
          <option value="default">Par défaut</option>
          <option value="priceAsc">Prix croissant</option>
          <option value="priceDesc">Prix décroissant</option>
          <option value="alpha">Ordre alphabétique</option>
        </select>
      </div>

      <!-- PRIX -->
      <div class="mb-5">
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
      <div class="mb-5">
        <label class="flex items-center gap-2 text-sm">
          <input type="checkbox" v-model="localOnlyPromo" />
          <span>Uniquement en solde</span>
        </label>
      </div>

      <!-- CATEGORIES -->
      <div class="mb-6">
        <p class="font-semibold mb-2 text-sm">Catégories</p>
        <div class="space-y-2 text-sm">
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

      <!-- RESET -->
      <button
        @click="resetFilters"
        class="w-full border border-gray-300 text-gray-700
               py-2 rounded-lg hover:bg-gray-100
               transition font-semibold text-sm cursor-pointer"
      >
        Réinitialiser
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref, watch } from "vue"

const props = defineProps({
  minPrice: { type: Number, default: 0 },
  maxPrice: { type: Number, default: 20000 },
})

const emit = defineEmits(["update:filters"])

const localSort = ref("default")
const localOnlyPromo = ref(false)
const localMaxPrice = ref(props.maxPrice)
const localCategories = ref([])

const emitChange = () => {
  emit("update:filters", {
    sort: localSort.value,
    onlyPromo: localOnlyPromo.value,
    maxPrice: localMaxPrice.value,
    categories: localCategories.value,
  })
}

const resetFilters = () => {
  localSort.value = "default"
  localOnlyPromo.value = false
  localMaxPrice.value = props.maxPrice
  localCategories.value = []
  emitChange()
}

watch([localSort, localOnlyPromo, localMaxPrice, localCategories], emitChange)
</script>
