<template>
  <div class="p-6 max-w-md mx-auto">

    <!-- HEADER -->
    <h1 class="text-2xl font-semibold text-black mb-6 text-center">
      Chiffre d’affaires total
    </h1>

    <!-- TABLEAU MOIS -->
    <div class="bg-white shadow rounded-xl overflow-hidden mb-4">
      <table class="w-full text-sm text-left">
        <thead class="bg-gray-100 text-gray-600">
          <tr>
            <th class="p-3">Mois</th>
            <th class="p-3 text-right">Montant</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mois in moisDisponibles" :key="mois" class="border-t">
            <td class="p-3 font-medium">{{ mois }}</td>
            <td class="p-3 text-right font-semibold text-[#6a0d5f]">
              {{ totalParMois(mois) }} FCFA
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- TOTAL GENERAL -->
    <div class="inline-block bg-[#6a0d5f] text-white rounded-lg px-4 py-2 text-center font-semibold">
      Total général : {{ totalGeneral }} FCFA
    </div>

  </div>
</template>

<script setup>
definePageMeta({
  layout: "dashboard"
})

import { ref, computed } from "vue"

const moisDisponibles = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre"
]

// MOCK COMMANDES (remplaçable par API)
const commandes = ref([
  { id: 1, mois: "Janvier", total: 15000 },
  { id: 2, mois: "Février", total: 12000 },
  { id: 3, mois: "Février", total: 9000 },
  { id: 4, mois: "Mars", total: 20000 },
  { id: 5, mois: "Mars", total: 10000 }
])

const totalParMois = (mois) => {
  return commandes.value
    .filter(c => c.mois === mois)
    .reduce((sum, c) => sum + c.total, 0)
}

const totalGeneral = computed(() => {
  return commandes.value.reduce((sum, c) => sum + c.total, 0)
})
</script>
