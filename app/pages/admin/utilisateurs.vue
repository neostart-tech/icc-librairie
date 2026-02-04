<template>
  <div class="p-6">

    <!-- HEADER -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold text-black">
        Gestion des utilisateurs
      </h1>

      <!-- RECHERCHE -->
      <input
        v-model="search"
        type="text"
        placeholder="Rechercher utilisateur..."
        class="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#6a0d5f] outline-none"
      />
    </div>

    <!-- TABLEAU -->
    <div class="bg-white shadow rounded-xl overflow-hidden">
      <div class="overflow-x-auto">

        <table class="w-full text-sm text-left">
          
          <thead class="bg-gray-100 text-gray-600">
            <tr>
              <th class="p-4">Nom</th>
              <th class="p-4">Email</th>
              <th class="p-4">Téléphone</th>
              <th class="p-4">Date inscription</th>
              <th class="p-4">Type d'utilisateur</th>
              <th class="p-4">Statut</th>
              <th class="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="user in utilisateursFiltres"
              :key="user.id"
              class="border-t hover:bg-gray-50"
            >
              <td class="p-4 font-medium">
                {{ user.nom }}
              </td>

              <td class="p-4">
                {{ user.email }}
              </td>

              <td class="p-4">
                {{ user.telephone }}
              </td>

              <td class="p-4">
                {{ user.date }}
              </td>

              <td class="p-4">
                {{ user.type }}
              </td>

              <!-- BADGE STATUT -->
              <td class="p-4">
                <span
                  class="px-3 py-1 rounded-full text-xs font-semibold"
                  :class="badgeStatut(user.statut)"
                >
                  {{ user.statut }}
                </span>
              </td>

              <!-- ACTIONS -->
              <td class="p-4 text-center space-x-2">

                <button
                  @click="voirDetails(user)"
                  class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                >
                  Détails
                </button>

                <button
                  @click="toggleStatut(user)"
                  class="px-3 py-1 text-white rounded"
                  :class="user.statut === 'Actif'
                    ? 'bg-red-500 hover:bg-red-600 cursor-pointer'
                    : 'bg-green-500 hover:bg-green-600 cursor-pointer'"
                >
                  {{ user.statut === 'Actif' ? 'Bloquer' : 'Activer' }}
                </button>

              </td>
            </tr>
          </tbody>

        </table>
      </div>
    </div>

    <!-- MODAL DETAILS -->
    <div
      v-if="utilisateurSelectionne"
      class="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
    >
      <div class="bg-white w-full max-w-lg rounded-xl shadow-lg p-6">

        <div class="flex justify-between mb-4">
          <h2 class="text-xl font-semibold">
            Détails utilisateur
          </h2>

          <button
            @click="utilisateurSelectionne = null"
            class="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        <div class="space-y-2">
          <p><strong>Nom :</strong> {{ utilisateurSelectionne.nom }}</p>
          <p><strong>Email :</strong> {{ utilisateurSelectionne.email }}</p>
          <p><strong>Téléphone :</strong> {{ utilisateurSelectionne.telephone }}</p>
          <p><strong>Date inscription :</strong> {{ utilisateurSelectionne.date }}</p>
          <p><strong>Type d'utilisateur :</strong> {{ utilisateurSelectionne.type }}</p>
          <p><strong>Statut :</strong> {{ utilisateurSelectionne.statut }}</p>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from "vue"

definePageMeta({
  layout: 'dashboard'
})

const utilisateurs = ref([
  {
    id: 1,
    nom: "Jean Paul",
    email: "jean@mail.com",
    telephone: "90112233",
    date: "02/02/2026",
    type: "compte synchronisé à l'app mobile",
    statut: "Actif"
  },
  {
    id: 2,
    nom: "Anne Marie",
    email: "marie@mail.com",
    telephone: "99887766",
    date: "01/02/2026",
    type:"compte créé sur le site de la librairie",
    statut: "Bloqué"
  }
])

const search = ref("")

const utilisateursFiltres = computed(() =>
  utilisateurs.value.filter(u =>
    u.nom.toLowerCase().includes(search.value.toLowerCase()) ||
    u.email.toLowerCase().includes(search.value.toLowerCase())
  )
)

const utilisateurSelectionne = ref(null)

const voirDetails = (user) => {
  utilisateurSelectionne.value = user
}

const badgeStatut = (statut) => {
  return statut === "Actif"
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-700"
}

const toggleStatut = (user) => {
  user.statut = user.statut === "Actif" ? "Bloqué" : "Actif"
}
</script>