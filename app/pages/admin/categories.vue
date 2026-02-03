<template>
  <div class="p-6">

    <!-- HEADER -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-black">Gestion des catégories</h1>
        <p class="text-sm text-gray-500">Gérer les catégories de livres</p>
      </div>

      <button
        @click="openAddModal"
        class="bg-[#6a0d5f] text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition"
      >
        + Ajouter catégorie
      </button>
    </div>

    <!-- TABLE -->
    <div class="bg-white shadow rounded-xl overflow-hidden">
      <table class="w-full text-sm text-left">
        <thead class="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th class="px-6 py-3">Nom</th>
            <th class="px-6 py-3">Description</th>
            <th class="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="categorie in categories"
            :key="categorie.id"
            class="border-b hover:bg-gray-50"
          >
            <td class="px-6 py-4 font-medium">
              {{ categorie.nom }}
            </td>

            <td class="px-6 py-4 text-gray-500">
              {{ categorie.description }}
            </td>

            <td class="px-6 py-4 text-right space-x-2">

              <!-- MODIFIER -->
              <button
                @click="openEditModal(categorie)"
                class="bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200 transition cursor-pointer"
              >
                Modifier
              </button>

              <!-- SUPPRIMER -->
              <button
                @click="deleteCategorie(categorie.id)"
                class="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition cursor-pointer"
              >
                Supprimer
              </button>

            </td>
          </tr>

          <tr v-if="categories.length === 0">
            <td colspan="3" class="text-center py-6 text-gray-400">
              Aucune catégorie trouvée
            </td>
          </tr>

        </tbody>
      </table>
    </div>

    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div class="bg-white w-full max-w-md rounded-xl shadow-lg p-6">

        <h2 class="text-lg font-semibold mb-4">
          {{ isEditing ? 'Modifier catégorie' : 'Ajouter catégorie' }}
        </h2>

        <form @submit.prevent="saveCategorie" class="space-y-4">

          <!-- NOM -->
          <div>
            <label class="block text-sm font-medium mb-1">Nom</label>
            <input
              v-model="form.nom"
              type="text"
              required
              class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#6a0d5f] outline-none"
            />
          </div>

          <!-- DESCRIPTION -->
          <div>
            <label class="block text-sm font-medium mb-1">Description</label>
            <textarea
              v-model="form.description"
              rows="3"
              class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#6a0d5f] outline-none"
            ></textarea>
          </div>

          <!-- ACTIONS -->
          <div class="flex justify-end gap-3 pt-2">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 border rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              Annuler
            </button>

            <button
              type="submit"
              class="bg-[#6a0d5f] text-white px-4 py-2 rounded-lg hover:bg-purple-800 cursor-pointer"
            >
              {{ isEditing ? 'Mettre à jour' : 'Ajouter' }}
            </button>
          </div>

        </form>

      </div>
    </div>

  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard'
})

import { ref } from 'vue'

const categories = ref([
  { id: 1, nom: "Foi Chrétienne", description: "Livres pour renforcer la foi et mieux connaître les enseignements chrétiens." },
  { id: 2, nom: "Méditation Biblique", description: "Livres pour méditer la Parole de Dieu et nourrir sa vie spirituelle." }
])

const showModal = ref(false)
const isEditing = ref(false)
const editingId = ref(null)

const form = ref({
  nom: '',
  description: ''
})

const openAddModal = () => {
  isEditing.value = false
  form.value = { nom: '', description: '' }
  showModal.value = true
}

const openEditModal = (categorie) => {
  isEditing.value = true
  editingId.value = categorie.id

  form.value = {
    nom: categorie.nom,
    description: categorie.description
  }

  showModal.value = true
}

const saveCategorie = () => {

  if (isEditing.value) {
    // UPDATE
    const index = categories.value.findIndex(
      cat => cat.id === editingId.value
    )

    categories.value[index] = {
      id: editingId.value,
      ...form.value
    }

  } else {
    // CREATE
    categories.value.push({
      id: Date.now(),
      ...form.value
    })
  }

  closeModal()
}

const deleteCategorie = (id) => {
  categories.value = categories.value.filter(cat => cat.id !== id)
}

const closeModal = () => {
  showModal.value = false
}
</script>
