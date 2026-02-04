<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <!-- HEADER -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
      <h1 class="text-2xl font-bold text-black mb-3 sm:mb-0">
        Chiffre d'affaires du mois
      </h1>
      <!-- FILTRE MOIS / ANNÉE -->
      <div class="flex gap-2 items-center">
        <label class="text-gray-600 font-medium text-sm">Mois :</label>
        <select v-model="moisSelectionne" class="border rounded-lg px-3 py-1 text-sm">
          <option v-for="(m, i) in mois" :key="i" :value="i+1">{{ m }}</option>
        </select>
        <label class="text-gray-600 font-medium text-sm">Année :</label>
        <select v-model="anneeSelectionnee" class="border rounded-lg px-3 py-1 text-sm">
          <option v-for="y in annees" :key="y" :value="y">{{ y }}</option>
        </select>
      </div>
    </div>
    
    <!-- STATS RAPIDES -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="bg-white p-4 rounded-lg shadow flex flex-col items-center justify-center">
        <p class="text-gray-500 text-sm">Total du mois</p>
        <p class="text-2xl font-bold text-gray-900">{{ totalMoisFormatted }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow flex flex-col items-center justify-center">
        <p class="text-gray-500 text-sm">Nombre de commandes</p>
        <p class="text-2xl font-bold text-gray-900">{{ commandesMois.length }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow flex flex-col items-center justify-center">
        <p class="text-gray-500 text-sm">Moyenne par jour</p>
        <p class="text-2xl font-bold text-gray-900">{{ moyenneParJourFormatted }}</p>
      </div>
    </section>
    
    <!-- GRAPHIQUE JOURNALIER -->
    <section class="bg-white p-6 rounded-lg shadow mb-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-gray-900 font-bold">Ventes par jour - {{ mois[moisSelectionne-1] }} {{ anneeSelectionnee }}</h2>
        <div class="text-sm text-gray-600">
          {{ joursDansMois }} jours
        </div>
      </div>
      
      <!-- Graphique avec échelle et grille -->
      <div class="relative h-72">
        <!-- Grille horizontale -->
        <div class="absolute inset-0 flex flex-col justify-between pt-2 pb-10 pl-12">
          <div v-for="tick in ticks" :key="tick" 
               class="relative border-t border-gray-200">
            <span class="absolute -left-12 -top-2.5 text-xs text-gray-500 w-10 text-right">
              {{ formatMontantAbbrege(tick) }}
            </span>
          </div>
        </div>
        
        <!-- Axe Y -->
        <div class="absolute left-12 top-0 bottom-10 w-px bg-gray-300"></div>
        
        <!-- Graphique -->
        <div class="absolute left-12 top-0 right-0 bottom-10 pl-1 flex items-end gap-1">
          <div v-for="jour in joursDansMois" :key="jour"
               class="relative group flex-1 min-w-[16px]">
            <!-- Barre du graphique -->
            <div class="bg-gradient-to-t from-[#6a0d5f] to-[#8a2c7f] rounded-t transition-all duration-200 hover:from-[#7b1a70] hover:to-[#9a3d8f] cursor-pointer shadow-sm"
                 :style="{ 
                   height: getHauteurBarre(jour) + '%'
                 }"
                 @mouseenter="hoveredDay = jour"
                 @mouseleave="hoveredDay = null">
            </div>
            
            <!-- Jour en bas -->
            <div class="absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
              {{ jour }}
            </div>
            
            <!-- Tooltip au survol -->
            <div v-if="hoveredDay === jour && getVenteJour(jour) > 0"
                 class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg z-10 shadow-lg">
              <div class="font-semibold">Jour {{ jour }}</div>
              <div class="text-[#e2a0d8]">{{ formatMontant(getVenteJour(jour)) }}</div>
            </div>
          </div>
        </div>
        
        <!-- Axe X -->
        <div class="absolute left-12 right-0 bottom-10 h-px bg-gray-300"></div>
        
        <!-- Légende des jours -->
        <div class="absolute -bottom-5 left-12 right-0 flex justify-between text-xs text-gray-400 px-1">
          <span>1</span>
          <span v-if="joursDansMois >= 10">10</span>
          <span v-if="joursDansMois >= 20">20</span>
          <span v-if="joursDansMois >= 30">30</span>
          <span v-if="joursDansMois === 31">31</span>
        </div>
      </div>
    </section>
    
    <!-- TABLEAU DES COMMANDES -->
    <section class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-gray-900 font-bold mb-4">Commandes du mois</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full border border-gray-200">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Client</th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Heure</th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Montant</th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Statut</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="commande in commandesMois" :key="commande.id" class="border-t hover:bg-gray-50">
              <td class="px-4 py-2 text-sm text-gray-800">#{{ commande.id }}</td>
              <td class="px-4 py-2 text-sm text-gray-800">{{ commande.client }}</td>
              <td class="px-4 py-2 text-sm text-gray-800">{{ commande.date }}</td>
              <td class="px-4 py-2 text-sm text-gray-800">{{ commande.heure }}</td>
              <td class="px-4 py-2 text-sm text-gray-800 font-medium">{{ formatMontant(commande.montant) }}</td>
              <td class="px-4 py-2 text-sm font-medium"
                  :class="statusClass(commande.statut)">
                {{ commande.statut }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

definePageMeta({
  layout: "dashboard"
})

// Données de configuration
const mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
              "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
const annees = [2025, 2026]

// Filtres
const moisSelectionne = ref(new Date().getMonth() + 1)
const anneeSelectionnee = ref(new Date().getFullYear())
const hoveredDay = ref(null)

// Nombre de jours dans le mois sélectionné
const joursDansMois = computed(() => {
  const annee = anneeSelectionnee.value
  const mois = moisSelectionne.value
  
  // Février (gestion des années bissextiles)
  if (mois === 2) {
    return ((annee % 4 === 0 && annee % 100 !== 0) || annee % 400 === 0) ? 29 : 28
  }
  
  // Mois avec 31 jours
  if ([1, 3, 5, 7, 8, 10, 12].includes(mois)) {
    return 31
  }
  
  // Mois avec 30 jours
  return 30
})

// Données de vente spécifiques à chaque mois
const ventesParMois = {
  1: [ // Janvier - 31 jours
    52000, 48000, 61000, 59000, 45000, 38000, 42000, 
    68000, 72000, 65000, 58000, 54000, 49000, 51000,
    75000, 82000, 78000, 69000, 63000, 57000, 52000,
    61000, 67000, 71000, 76000, 80000, 74000, 68000,
    62000, 58000, 55000
  ],
  2: [ // Février - 28/29 jours (on génère dynamiquement)
  ],
  3: [ // Mars - 31 jours
    55000, 60000, 65000, 62000, 58000, 54000, 51000,
    71000, 76000, 73000, 68000, 64000, 60000, 56000,
    81000, 86000, 83000, 78000, 74000, 70000, 66000,
    72000, 77000, 82000, 87000, 91000, 85000, 80000,
    75000, 71000, 68000
  ],
  4: [ // Avril - 30 jours
    58000, 63000, 60000, 55000, 52000, 49000, 46000,
    69000, 74000, 71000, 66000, 62000, 58000, 54000,
    78000, 83000, 80000, 75000, 71000, 67000, 63000,
    68000, 73000, 78000, 83000, 88000, 82000, 77000,
    72000, 68000
  ],
  5: [ // Mai - 31 jours
    62000, 67000, 72000, 69000, 65000, 61000, 58000,
    82000, 87000, 84000, 79000, 75000, 71000, 67000,
    92000, 97000, 94000, 89000, 85000, 81000, 77000,
    83000, 88000, 93000, 98000, 102000, 96000, 91000,
    86000, 82000, 79000
  ],
  6: [ // Juin - 30 jours
    65000, 70000, 75000, 72000, 68000, 64000, 61000,
    85000, 90000, 87000, 82000, 78000, 74000, 70000,
    95000, 100000, 97000, 92000, 88000, 84000, 80000,
    86000, 91000, 96000, 101000, 106000, 100000, 95000,
    90000, 86000
  ],
  7: [ // Juillet - 31 jours
    68000, 73000, 70000, 67000, 63000, 59000, 56000,
    78000, 83000, 80000, 75000, 71000, 67000, 63000,
    88000, 93000, 90000, 85000, 81000, 77000, 73000,
    79000, 84000, 89000, 94000, 99000, 93000, 88000,
    83000, 79000, 76000
  ],
  8: [ // Août - 31 jours
    62000, 67000, 72000, 69000, 65000, 61000, 58000,
    82000, 87000, 84000, 79000, 75000, 71000, 67000,
    92000, 97000, 94000, 89000, 85000, 81000, 77000,
    83000, 88000, 93000, 98000, 103000, 97000, 92000,
    87000, 83000, 80000
  ],
  9: [ // Septembre - 30 jours
    70000, 75000, 80000, 77000, 73000, 69000, 66000,
    90000, 95000, 92000, 87000, 83000, 79000, 75000,
    100000, 105000, 102000, 97000, 93000, 89000, 85000,
    91000, 96000, 101000, 106000, 111000, 105000, 100000,
    95000, 91000
  ],
  10: [ // Octobre - 31 jours
    75000, 80000, 85000, 82000, 78000, 74000, 71000,
    95000, 100000, 97000, 92000, 88000, 84000, 80000,
    105000, 110000, 107000, 102000, 98000, 94000, 90000,
    96000, 101000, 106000, 111000, 116000, 110000, 105000,
    100000, 96000, 93000
  ],
  11: [ // Novembre - 30 jours
    78000, 83000, 88000, 85000, 81000, 77000, 74000,
    98000, 103000, 100000, 95000, 91000, 87000, 83000,
    108000, 113000, 110000, 105000, 101000, 97000, 93000,
    99000, 104000, 109000, 114000, 119000, 113000, 108000,
    103000, 99000
  ],
  12: [ // Décembre - 31 jours
    85000, 90000, 95000, 92000, 88000, 84000, 81000,
    105000, 110000, 107000, 102000, 98000, 94000, 90000,
    115000, 120000, 117000, 112000, 108000, 104000, 100000,
    106000, 111000, 116000, 121000, 126000, 120000, 115000,
    110000, 106000, 103000
  ]
}

// Génère des données pour février dynamiquement
const genererVentesFevrier = () => {
  const jours = joursDansMois.value
  const ventes = []
  
  for (let i = 0; i < jours; i++) {
    const base = 45000
    const variation = Math.sin(i * 0.3) * 0.4
    const weekend = (i % 7 === 5 || i % 7 === 6) ? 1.15 : 1
    const random = 0.85 + Math.random() * 0.3
    
    const montant = Math.round(base * (1 + variation) * weekend * random)
    ventes.push(Math.max(30000, Math.min(90000, montant)))
  }
  
  return ventes
}

// Ventes journalières du mois sélectionné
const ventesJournalieres = computed(() => {
  const mois = moisSelectionne.value
  
  if (mois === 2) {
    return genererVentesFevrier()
  }
  
  return ventesParMois[mois] || ventesParMois[1]
})

// Génère des commandes pour chaque mois
const genererCommandesPourMois = () => {
  const baseCommandes = [
    { client: "Marie Martin", montant: 67500, statut: "Livrée" },
    { client: "Pierre Dubois", montant: 42300, statut: "Livrée" },
    { client: "Sophie Leroy", montant: 89900, statut: "Payée" },
    { client: "Jean Petit", montant: 34800, statut: "En attente" },
    { client: "Julie Bernard", montant: 56700, statut: "Livrée" },
    { client: "Thomas Moreau", montant: 78500, statut: "Livrée" },
    { client: "Claire Dupont", montant: 52100, statut: "Payée" },
    { client: "Michel Durand", montant: 61200, statut: "Livrée" },
    { client: "Isabelle Lambert", montant: 45800, statut: "Expédiée" },
    { client: "Philippe Roux", montant: 89200, statut: "Livrée" }
  ]
  
  const commandes = []
  const totalJours = joursDansMois.value
  
  baseCommandes.forEach((base, index) => {
    const jour = Math.min(totalJours, Math.max(1, Math.floor((index + 1) * totalJours / baseCommandes.length)))
    
    commandes.push({
      id: moisSelectionne.value * 1000 + index + 1,
      client: base.client,
      date: `${String(jour).padStart(2, '0')}/${String(moisSelectionne.value).padStart(2, '0')}/${anneeSelectionnee.value}`,
      heure: `${String(8 + index * 2 % 16).padStart(2, '0')}:${String((index * 17) % 60).padStart(2, '0')}`,
      montant: base.montant * (0.8 + Math.random() * 0.4),
      statut: base.statut
    })
  })
  
  return commandes.sort((a, b) => parseInt(a.date.split('/')[0]) - parseInt(b.date.split('/')[0]))
}

// Commandes du mois sélectionné
const commandesMois = computed(() => {
  return genererCommandesPourMois()
})

// Max des ventes pour l'échelle du graphique
const maxVente = computed(() => {
  const max = Math.max(...ventesJournalieres.value)
  // Arrondir au multiple de 20000 supérieur pour une échelle propre
  return Math.ceil(max / 20000) * 20000
})

// Échelle verticale (4 ticks)
const ticks = computed(() => {
  const max = maxVente.value
  const step = max / 4
  return [
    Math.round(max),
    Math.round(step * 3),
    Math.round(step * 2),
    Math.round(step),
    0
  ]
})

// Récupérer la vente d'un jour spécifique
const getVenteJour = (jour) => {
  return ventesJournalieres.value[jour - 1] || 0
}

// Calcul de la hauteur de la barre
const getHauteurBarre = (jour) => {
  const vente = getVenteJour(jour)
  return maxVente.value > 0 ? (vente / maxVente.value) * 100 : 0
}

// Calculs statistiques
const totalMois = computed(() => 
  ventesJournalieres.value.reduce((a, b) => a + b, 0)
)

const moyenneParJour = computed(() => 
  Math.round(totalMois.value / joursDansMois.value)
)

const totalMoisPrecedent = computed(() => {
  const moisPrec = moisSelectionne.value === 1 ? 12 : moisSelectionne.value - 1
  const anneePrec = moisSelectionne.value === 1 ? anneeSelectionnee.value - 1 : anneeSelectionnee.value
  
  if (moisPrec === 2) {
    const joursPrec = ((anneePrec % 4 === 0 && anneePrec % 100 !== 0) || anneePrec % 400 === 0) ? 29 : 28
    let total = 0
    for (let i = 0; i < joursPrec; i++) {
      const base = 45000
      const variation = Math.sin(i * 0.3) * 0.4
      const weekend = (i % 7 === 5 || i % 7 === 6) ? 1.15 : 1
      const random = 0.85 + Math.random() * 0.3
      total += Math.round(base * (1 + variation) * weekend * random)
    }
    return total
  }
  
  const ventesPrec = ventesParMois[moisPrec] || ventesParMois[1]
  return ventesPrec.reduce((a, b) => a + b, 0)
})

const differenceMois = computed(() => 
  totalMois.value - totalMoisPrecedent.value
)

// Formattage des montants
const formatMontant = (montant) => {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Math.round(montant)) + ' FCFA'
}

const formatMontantAbbrege = (montant) => {
  if (montant >= 1000000) {
    return (montant / 1000000).toFixed(1) + 'M'
  } else if (montant >= 1000) {
    return (montant / 1000).toFixed(0) + 'k'
  }
  return montant.toString()
}

const totalMoisFormatted = computed(() => formatMontant(totalMois.value))
const moyenneParJourFormatted = computed(() => formatMontant(moyenneParJour.value))
const differenceMoisFormatted = computed(() => formatMontant(Math.abs(differenceMois.value)))

// Styling statut
const statusClass = (statut) => {
  switch(statut) {
    case "En attente": return "text-yellow-600"
    case "Payée": return "text-blue-600"
    case "Expédiée": return "text-green-600"
    case "Livrée": return "text-green-800"
    case "Annulée": return "text-red-600"
    default: return "text-gray-800"
  }
}
</script>

<style scoped>
/* Animation au survol */
.group:hover .bg-gradient-to-t {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(106, 13, 95, 0.3);
}
</style>