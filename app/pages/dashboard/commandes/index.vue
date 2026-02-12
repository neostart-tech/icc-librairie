<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

      <div class=" mb-10">
        <h1 class="text-2xl sm:text-2xl font-semibold text-gray-900">Mes commandes</h1>
        <p class="text-gray-600 mt-1 text-sm sm:text-base">Historique de tous vos achats</p>
      </div>

      <!-- Cartes de statistiques -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Commandes totales</p>
              <p class="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{{ allOrders.length }}</p>
            </div>
            <div class="p-2 bg-blue-50 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total dépensé</p>
              <p class="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{{ totalSpent }} FCFA</p>
            </div>
            <div class="p-2 bg-green-50 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Moyenne/commande</p>
              <p class="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{{ averageOrder }} FCFA</p>
            </div>
            <div class="p-2 bg-purple-50 rounded-lg">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Filtres -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700 mb-2">Statut</label>
              <select v-model="filters.status" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Tous les statuts</option>
                <option value="En préparation">En préparation</option>
                <option value="Expédiée">Expédiée</option>
                <option value="Livrée">Livrée</option>
                <option value="Annulée">Annulée</option>
              </select>
            </div>
            
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700 mb-2">Période</label>
              <select v-model="filters.period" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="all">Toutes les périodes</option>
                <option value="month">Ce mois</option>
                <option value="3months">3 derniers mois</option>
                <option value="year">Cette année</option>
              </select>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <button @click="resetFilters" class="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              Réinitialiser
            </button>
            <button @click="applyFilters" class="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Appliquer
            </button>
          </div>
        </div>
      </div>

      <!-- Liste des commandes -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <!-- En-tête -->
        <div class="px-4 sm:px-6 py-4 border-b border-gray-200">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 class="text-lg sm:text-xl font-semibold text-gray-900">Toutes vos commandes</h2>
            <div class="text-sm text-gray-600">
              {{ filteredOrders.length }} commande(s)
            </div>
          </div>
        </div>

        <!-- Vue mobile -->
        <div class="block sm:hidden divide-y divide-gray-200">
          <div v-for="order in paginatedOrders" :key="order.id" class="p-4 hover:bg-gray-50 transition-colors duration-150">
            <div class="flex justify-between items-start mb-3">
              <div>
                <p class="font-semibold text-gray-900">#{{ order.id }}</p>
                <div class="flex items-center gap-2 mt-1">
                  <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <span class="text-xs text-gray-500">{{ order.date }} • {{ order.time }}</span>
                </div>
              </div>
              <span :class="`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusClass(order.status)}`">
                {{ order.status }}
              </span>
            </div>
            
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Articles</span>
                <span class="font-medium">{{ order.items }} article(s)</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Total</span>
                <span class="font-bold text-gray-900">{{ order.total }} FCFA</span>
              </div>
            </div>

            <div class="flex justify-end gap-3 mt-4">

              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <NuxtLink 
                :to="`/dashboard/commandes/details/${order.id}`"
                class="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors duration-200"
              >
                Détails
              </NuxtLink>
              </td>

            </div>
          </div>
        </div>

        <!-- Vue desktop -->
        <div class="hidden sm:block overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  N° Commande
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Heure
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="order in paginatedOrders" :key="order.id" class="hover:bg-gray-50 transition-colors duration-150">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-semibold text-gray-900">#{{ order.id }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ order.date }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ order.time }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="`px-3 py-1.5 text-xs font-medium rounded-full ${getStatusClass(order.status)}`">
                    {{ order.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-semibold text-gray-900">{{ order.total }} FCFA</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-3">
                    
                    <td class="px-0 py-2 whitespace-nowrap text-sm font-medium">
                    <NuxtLink 
                      :to="`/dashboard/commandes/details/${order.id}`"
                      class="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors duration-200"
                    >
                      Détails
                    </NuxtLink>
                </td>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="filteredOrders.length > itemsPerPage" class="px-4 sm:px-6 py-4 border-t border-gray-200">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div class="text-sm text-gray-700">
              Affichage de <span class="font-medium">{{ startIndex + 1 }}</span> à 
              <span class="font-medium">{{ Math.min(endIndex, filteredOrders.length) }}</span> sur 
              <span class="font-medium">{{ filteredOrders.length }}</span> commandes
            </div>
            
            <div class="flex items-center gap-1">
              <button
                @click="previousPage"
                :disabled="currentPage === 1"
                :class="`p-2 rounded-lg ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              
              <button
                v-for="page in totalPages"
                :key="page"
                @click="goToPage(page)"
                :class="`h-10 w-10 flex items-center justify-center rounded-lg text-sm font-medium ${currentPage === page ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`"
              >
                {{ page }}
              </button>
              
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                :class="`p-2 rounded-lg ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Aucune commande -->
      <div v-if="filteredOrders.length === 0" class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Aucune commande trouvée</h3>
        <p class="text-gray-600 mb-6">Aucune commande ne correspond à vos critères de recherche.</p>
        <button @click="resetFilters" class="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
          Voir toutes les commandes
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: "auth",
})

import { ref, computed } from 'vue'

// Filtres
const filters = ref({
  status: '',
  period: 'all'
})

// Pagination
const currentPage = ref(1)
const itemsPerPage = 8

// Données des commandes
const allOrders = ref([
  { 
    id: "ORD-7892", 
    date: "15/11/2023", 
    time: "14:30", 
    status: "Expédiée", 
    items: 3, 
    total: "14000", 
    shippingAddress: "12 Rue des Lilas, 75020 Paris",
    books: [
      { name: "L'Étranger", quantity: 1, price: 8.99 },
      { name: "1984", quantity: 1, price: 12.99 },
      { name: "Le Petit Prince", quantity: 1, price: 6.99 }
    ]
  },
  { 
    id: "ORD-7885", 
    date: "12/11/2023", 
    time: "09:15", 
    status: "Livrée", 
    items: 1, 
    total: "12000", 
    shippingAddress: "12 Rue des Lilas, 75020 Paris",
    books: [
      { name: "Harry Potter à l'école des sorciers", quantity: 1, price: 16.99 }
    ]
  },
  { 
    id: "ORD-7871", 
    date: "05/11/2023", 
    time: "16:45", 
    status: "En préparation", 
    items: 2, 
    total: "22000", 
    shippingAddress: "12 Rue des Lilas, 75020 Paris",
    books: [
      { name: "Le Seigneur des Anneaux", quantity: 1, price: 19.99 },
      { name: "Le Hobbit", quantity: 1, price: 8.51 }
    ]
  },
  { 
    id: "ORD-7854", 
    date: "28/10/2023", 
    time: "11:20", 
    status: "Livrée", 
    items: 4, 
    total: "18000", 
    shippingAddress: "12 Rue des Lilas, 75020 Paris",
    books: [
      { name: "Dune", quantity: 1, price: 14.99 },
      { name: "Fondation", quantity: 1, price: 12.99 },
      { name: "Le Meilleur des mondes", quantity: 1, price: 9.99 },
      { name: "Fahrenheit 451", quantity: 1, price: 8.99 }
    ]
  },
  { 
    id: "ORD-7832", 
    date: "15/10/2023", 
    time: "13:10", 
    status: "Livrée", 
    items: 2, 
    total: "5000", 
    shippingAddress: "12 Rue des Lilas, 75020 Paris",
    books: [
      { name: "Chroniques martiennes", quantity: 1, price: 18.90 },
      { name: "Les Robots", quantity: 1, price: 16.90 }
    ]
  },
  { 
    id: "ORD-7815", 
    date: "02/10/2023", 
    time: "10:05", 
    status: "Livrée", 
    items: 5, 
    total: "10000", 
    shippingAddress: "12 Rue des Lilas, 75020 Paris",
    books: [
      { name: "Cent ans de solitude", quantity: 1, price: 22.50 },
      { name: "L'Amour aux temps du choléra", quantity: 1, price: 19.99 },
      { name: "Le Vieil Homme et la Mer", quantity: 1, price: 9.99 },
      { name: "Pour qui sonne le glas", quantity: 1, price: 14.99 },
      { name: "Les Raisins de la colère", quantity: 1, price: 22.03 }
    ]
  },
  { 
    id: "ORD-7798", 
    date: "20/09/2023", 
    time: "15:30", 
    status: "Livrée", 
    items: 1, 
    total: "7000", 
    shippingAddress: "12 Rue des Lilas, 75020 Paris",
    books: [
      { name: "Le Nom de la rose", quantity: 1, price: 19.99 }
    ]
  },
  { 
    id: "ORD-7776", 
    date: "10/09/2023", 
    time: "17:25", 
    status: "Livrée", 
    items: 3, 
    total: "12000", 
    shippingAddress: "12 Rue des Lilas, 75020 Paris",
    books: [
      { name: "Guerre et Paix", quantity: 1, price: 25.99 },
      { name: "Anna Karénine", quantity: 1, price: 18.99 },
      { name: "Crime et Châtiment", quantity: 1, price: 7.42 }
    ]
  }
])

const filteredOrders = computed(() => {
  let filtered = [...allOrders.value]
  
  // Filtrer par statut
  if (filters.value.status) {
    filtered = filtered.filter(order => order.status === filters.value.status)
  }
  
  const now = new Date()
  if (filters.value.period === 'month') {
    filtered = filtered.filter(order => {
      const orderDate = parseDate(order.date)
      const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
      return orderDate >= monthAgo
    })
  } else if (filters.value.period === '3months') {
    filtered = filtered.filter(order => {
      const orderDate = parseDate(order.date)
      const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate())
      return orderDate >= threeMonthsAgo
    })
  } else if (filters.value.period === 'year') {
    filtered = filtered.filter(order => {
      const orderDate = parseDate(order.date)
      const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
      return orderDate >= yearAgo
    })
  }
  
  return filtered
})

const parseDate = (dateString) => {
  const [day, month, year] = dateString.split('/')
  return new Date(`${year}-${month}-${day}`)
}

// Statistiques
const totalSpent = computed(() => {
  const total = filteredOrders.value.reduce((sum, order) => {
    return sum + parseFloat(order.total.replace(',', '.'))
  }, 0)
  return Math.round(total)
})

const averageOrder = computed(() => {
  if (filteredOrders.value.length === 0) return 0
  const total = filteredOrders.value.reduce((sum, order) => {
    return sum + parseFloat(order.total.replace(',', '.'))
  }, 0)
  return Math.round(total / filteredOrders.value.length)
})


const totalPages = computed(() => Math.ceil(filteredOrders.value.length / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => startIndex.value + itemsPerPage)
const paginatedOrders = computed(() => {
  return filteredOrders.value.slice(startIndex.value, endIndex.value)
})

const goToPage = (page) => {
  currentPage.value = page
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const applyFilters = () => {
  currentPage.value = 1
}

const resetFilters = () => {
  filters.value.status = ''
  filters.value.period = 'all'
  currentPage.value = 1
}

const duplicateOrder = (order) => {
  alert(`Commande #${order.id} ajoutée au panier`)
}

const getStatusClass = (status) => {
  switch(status) {
    case 'Expédiée':
      return 'bg-green-100 text-green-800'
    case 'En préparation':
      return 'bg-yellow-100 text-yellow-800'
    case 'Livrée':
      return 'bg-blue-100 text-blue-800'
    case 'Annulée':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>