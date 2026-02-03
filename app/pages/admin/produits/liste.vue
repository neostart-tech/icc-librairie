<template>
  <section class="p-6">
    <!-- HEADER -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold text-black">
        Liste des livres
      </h1>

      <NuxtLink
        to="/dashboard/produits/ajouter"
        class="bg-[#6a0d5f] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
      >
        + Ajouter un livre
      </NuxtLink>
    </div>

    <!-- CONTAINER TABLEAU -->
    <div class="bg-white shadow rounded-xl overflow-hidden">
      <table class="w-full text-sm table-fixed">

        <!-- HEADER -->
        <thead class="bg-gray-100 text-gray-600">
          <tr>
            <th class="p-4 text-left w-[25%]">Livre</th>
            <th class="p-4 text-left w-[15%]">Auteur</th>
            <th class="p-4 text-left w-[15%]">Catégorie</th>
            <th class="p-4 text-left w-[10%]">Prix</th>
            <th class="p-4 text-left w-[10%]">Stock</th>
            <th class="p-4 text-left w-[10%]">Statut</th>
            <th class="p-4 text-right w-[15%]">Actions</th>
          </tr>
        </thead>

        <!-- BODY -->
        <tbody>
          <tr
            v-for="livre in livres"
            :key="livre.id"
            class="border-t hover:bg-gray-50 transition"
          >

            <!-- LIVRE -->
            <td class="p-4">
              <div class="flex items-center gap-3">
                <img
                  :src="livre.image || '/images/default-livre.jpg'"
                  class="w-12 h-16 object-cover rounded border"
                />
                <p class="font-medium text-gray-800 truncate">
                  {{ livre.titre }}
                </p>
              </div>
            </td>

            <!-- AUTEUR -->
            <td class="p-4 truncate">
              {{ livre.auteur }}
            </td>

            <!-- CATEGORIE -->
            <td class="p-4 truncate">
              {{ livre.categorie }}
            </td>

            <!-- PRIX -->
            <td class="p-4 font-medium whitespace-nowrap">
              {{ livre.prix ? `${livre.prix.toFixed(0)} FCFA` : '0 FCFA' }}
            </td>

            <!-- STOCK -->
            <td class="p-4">
              <span
                :class="[
                  'font-medium',
                  livre.stock > 10 ? 'text-green-600' :
                  livre.stock > 0 ? 'text-yellow-600' :
                  'text-red-600'
                ]"
              >
                {{ livre.stock > 0 ? livre.stock : 'Rupture' }}
              </span>
            </td>

            <!-- STATUT -->
            <td class="p-4">
              <span
                :class="[
                  'px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap',
                  livre.actif
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-200 text-gray-600'
                ]"
              >
                {{ livre.actif ? 'En ligne' : 'Hors ligne' }}
              </span>
            </td>

            <!-- ACTIONS (CORRIGÉ) -->
            <td class="p-4 text-right">
              <div class="flex flex-col items-end gap-2">

                <NuxtLink
                  :to="`/dashboard/produits/modifier/${livre.id}`"
                  class="bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200 transition text-sm font-medium"
                >
                  Modifier
                </NuxtLink>

                <button
                  @click="deleteLivre(livre.id)"
                  class="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition text-sm font-medium"
                >
                  Supprimer
                </button>

              </div>
            </td>

          </tr>

          <!-- VIDE -->
          <tr v-if="livres.length === 0">
            <td colspan="7" class="text-center py-6 text-gray-500">
              Aucun livre disponible
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'dashboard'
})

const livres = ref([
  {
    id: 1,
    titre: 'La Parole Vivante',
    auteur: 'Jean Dupont',
    categorie: 'Foi Chrétienne',
    prix: 19.99,
    stock: 12,
    actif: true,
    image: '/images/livre1.jpg'
  },
  {
    id: 2,
    titre: 'Apprendre la Bible',
    auteur: 'Marie Koffi',
    categorie: 'Méditation Biblique',
    prix: 24.5,
    stock: 0,
    actif: false,
    image: '/images/livre2.jpg'
  }
])

const deleteLivre = (id) => {
  if (confirm('Voulez-vous vraiment supprimer ce livre ?')) {
    livres.value = livres.value.filter(l => l.id !== id)
  }
}
</script>
