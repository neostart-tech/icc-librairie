<template>
  <div class="p-6">

    <!-- HEADER -->
    <div class="flex flex-col gap-4 mb-6">

      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-semibold text-black">
          Gestion des commandes
        </h1>

        <!-- RECHERCHE -->
        <input
          v-model="search"
          type="text"
          placeholder="Rechercher..."
          class="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#6a0d5f] outline-none"
        />
      </div>

      <!-- FILTRE MOIS + TOTAL -->
      <div class="flex flex-wrap gap-4 items-center">
        <div>
          <label class="text-sm font-medium text-gray-600 mr-2">Mois :</label>
          <select v-model="moisSelectionne" class="border px-3 py-1 rounded">
            <option v-for="(m, i) in mois" :key="i" :value="i + 1">
              {{ m }}
            </option>
          </select>
        </div>

        <div class="bg-white px-4 py-2 rounded-lg shadow text-sm">
          <span class="text-gray-500">Montant total :</span>
          <span class="font-semibold text-[#6a0d5f]">
            {{ montantTotal }} FCFA
          </span>
        </div>

        <div class="text-sm text-gray-500">
          {{ joursDansMois }} jours
        </div>
      </div>

    </div>

    <!-- TABLEAU -->
    <div class="bg-white shadow rounded-xl overflow-hidden">
      <table class="w-full text-sm text-left">

        <thead class="bg-gray-100 text-gray-600">
          <tr>
            <th class="p-4">Commande</th>
            <th class="p-4">Client</th>
            <th class="p-4">Date</th>
            <th class="p-4">Heure</th>
            <th class="p-4">Montant</th>
            <th class="p-4">Statut</th>
            <th class="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="commande in commandesFiltrees"
            :key="commande.id"
            class="border-t hover:bg-gray-50"
          >
            <td class="p-4 font-medium">#{{ commande.numero }}</td>
            <td class="p-4">{{ commande.client }}</td>
            <td class="p-4">{{ commande.date }}</td>
            <td class="p-4">{{ commande.heure }}</td>

            <td class="p-4 font-semibold text-[#6a0d5f]">
              {{ commande.total }} FCFA
            </td>

            <td class="p-4">
              <span
                class="px-3 py-1 rounded-full text-xs font-semibold"
                :class="badgeStatut(commande.statut)"
              >
                {{ commande.statut }}
              </span>
            </td>

            <td class="p-4 text-center space-x-2">
              <button
                @click="voirDetails(commande)"
                class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                Détails
              </button>

              <button
                @click="changerStatut(commande)"
                class="px-3 py-1 bg-[#6a0d5f] text-white rounded hover:bg-purple-800"
              >
                Modifier
              </button>
            </td>
          </tr>
        </tbody>

      </table>
    </div>

    <!-- MODAL DETAILS -->
    <div
      v-if="commandeSelectionnee"
      class="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
    >
      <div class="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6">

        <div class="flex justify-between mb-4">
          <h2 class="text-xl font-semibold">
            Détails commande #{{ commandeSelectionnee.numero }}
          </h2>

          <button
            @click="commandeSelectionnee = null"
            class="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        <div class="mb-4 space-y-1">
          <p><strong>Client :</strong> {{ commandeSelectionnee.client }}</p>
          <p><strong>Date :</strong> {{ commandeSelectionnee.date }}</p>
          <p><strong>Heure :</strong> {{ commandeSelectionnee.heure }}</p>
          <p><strong>Total :</strong> {{ commandeSelectionnee.total }} FCFA</p>
        </div>

        <div>
          <h3 class="font-semibold mb-2">Articles</h3>
          <div
            v-for="article in commandeSelectionnee.articles"
            :key="article.id"
            class="flex justify-between border-b py-2"
          >
            <span>{{ article.titre }}</span>
            <span>x{{ article.quantite }}</span>
            <span>{{ article.prix }} FCFA</span>
          </div>
        </div>

        <div class="mt-6">
          <label class="block text-sm font-medium mb-2">Modifier statut</label>
          <select v-model="commandeSelectionnee.statut" class="border px-3 py-2 rounded w-full">
            <option>En attente</option>
            <option>Validée</option>
            <option>Livrée</option>
            <option>Annulée</option>
          </select>

          <button
            @click="sauvegarderStatut"
            class="mt-4 w-full bg-[#6a0d5f] text-white py-2 rounded hover:bg-purple-800"
          >
            Enregistrer
          </button>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from "vue"

definePageMeta({ layout: "dashboard" })

const mois = [
  "Janvier","Février","Mars","Avril","Mai","Juin",
  "Juillet","Août","Septembre","Octobre","Novembre","Décembre"
]

const moisSelectionne = ref(2)

const commandes = ref([
  {
    id: 1,
    numero: "CMD001",
    client: "Jean Paul",
    date: "02/02/2026",
    heure: "14:30",
    total: 12000,
    statut: "En attente",
    articles: [
      { id: 1, titre: "Livre la Foi Chrétienne", quantite: 1, prix: 8000 },
      { id: 2, titre: "Livre apprendre la Bible", quantite: 1, prix: 4000 }
    ]
  },
  {
    id: 2,
    numero: "CMD002",
    client: "Ana Maria",
    date: "01/02/2026",
    heure: "09:15",
    total: 9000,
    statut: "Validée",
    articles: [
      { id: 3, titre: "Livre la Foi Chrétienne", quantite: 1, prix: 9000 }
    ]
  },
  {
    id: 3,
    numero: "CMD003",
    client: "Paul Koffi",
    date: "30/01/2026",
    heure: "18:40",
    total: 15000,
    statut: "Livrée",
    articles: [
      { id: 4, titre: "Livre Méditation Biblique", quantite: 1, prix: 15000 }
    ]
  }
])

const search = ref("")
const commandeSelectionnee = ref(null)

const commandesFiltrees = computed(() => {
  return commandes.value.filter(c => {
    const [, mois] = c.date.split("/").map(Number)
    return (
      mois === moisSelectionne.value &&
      (
        c.client.toLowerCase().includes(search.value.toLowerCase()) ||
        c.numero.toLowerCase().includes(search.value.toLowerCase())
      )
    )
  })
})

const montantTotal = computed(() =>
  commandesFiltrees.value.reduce((t, c) => t + c.total, 0)
)

const joursDansMois = computed(() => {
  if (moisSelectionne.value === 2) return 28
  if ([4, 6, 9, 11].includes(moisSelectionne.value)) return 30
  return 31
})

const voirDetails = (commande) => {
  commandeSelectionnee.value = JSON.parse(JSON.stringify(commande))
}

const changerStatut = (commande) => {
  commandeSelectionnee.value = JSON.parse(JSON.stringify(commande))
}

const sauvegarderStatut = () => {
  const index = commandes.value.findIndex(
    c => c.id === commandeSelectionnee.value.id
  )
  if (index !== -1) {
    commandes.value[index].statut = commandeSelectionnee.value.statut
  }
  commandeSelectionnee.value = null
}

const badgeStatut = (statut) => {
  switch (statut) {
    case "En attente": return "bg-yellow-100 text-yellow-700"
    case "Validée": return "bg-blue-100 text-blue-700"
    case "Livrée": return "bg-green-100 text-green-700"
    case "Annulée": return "bg-red-100 text-red-700"
  }
}
</script>
