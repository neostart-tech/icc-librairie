<template>
  <div class="min-h-screen bg-gray-50">

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Section de bienvenue -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800">Bonjour, {{ userName }}</h2>
        <p class="text-gray-600 mt-1">Voici un aperçu de votre compte</p>
      </div>

      <!-- Cartes de statistiques -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Commande en cours -->
        <div class="bg-white rounded-xl shadow p-6 hover:shadow-md transition-shadow">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Commandes en cours</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.ordersInProgress }}</p>
            </div>
          </div>
          <div class="mt-4">
            <NuxtLink to="/dashboard/commandes/liste" class="text-blue-600 text-sm hover:text-blue-800 flex items-center">
              Voir les commandes
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>
        </div>

        <!-- Livres achetés -->
        <div class="bg-white rounded-xl shadow p-6 hover:shadow-md transition-shadow">
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Livres achetés</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.booksPurchased }}</p>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-xs text-gray-500">{{ stats.lastPurchaseDate }}</p>
          </div>
        </div>

        <!-- Prix total dépensé -->
        <div class="bg-white rounded-xl shadow p-6 hover:shadow-md transition-shadow">
          <div class="flex items-center">
            <div class="p-3 bg-purple-100 rounded-lg">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total dépensé</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.totalSpent }} FCFA</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Section commandes récentes -->
      <div class="bg-white rounded-xl shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 class="text-lg font-semibold text-gray-800">Commandes récentes</h3>
          <NuxtLink to="/dashboard/commandes/liste" class="text-blue-600 text-sm hover:text-blue-800 font-medium">
            Voir toutes
          </NuxtLink>
        </div>
        
        <!-- Sur mobile : vue en cartes -->
        <div class="md:hidden">
          <div v-for="order in recentOrders" :key="order.id" class="border-b border-gray-200 p-6">
            <div class="flex justify-between items-start">
              <div>
                <p class="font-medium text-gray-900">Commande #{{ order.id }}</p>
                <p class="text-sm text-gray-500 mt-1">{{ order.date }}</p>
                <p class="text-sm text-gray-500 mt-1">{{ order.heure }}</p>
              </div>
              <div class="text-right">
                <span :class="`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(order.status)}`">
                  {{ order.status }}
                </span>
                <p class="text-lg font-bold text-gray-900 mt-2">{{ order.total }} FCFA</p>
              </div>
            </div>
            <div class="mt-4 flex justify-end">
              <NuxtLink :to="`/commande/details/${order.id}`" class="text-blue-600 text-sm hover:text-blue-800 font-medium">
                Voir détails
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Sur desktop : vue en tableau -->
        <div class="hidden md:block overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commande</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heure</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="order in recentOrders" :key="order.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">#{{ order.id }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ order.date }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ order.heure }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(order.status)}`">
                    {{ order.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {{ order.total }} FCFA
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <NuxtLink 
                    :to="`/dashboard/commandes/details/${order.id}`"
                    class="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors duration-200"
                  >
                    Détails
                  </NuxtLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Section de navigation rapide -->
      <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <NuxtLink to="/dashboard/commandes/liste" class="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow border border-transparent hover:border-blue-200">
          <div class="flex items-center">
            <div class="p-2 bg-blue-50 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div class="ml-4">
              <h4 class="font-medium text-gray-900">Mes commandes</h4>
              <p class="text-sm text-gray-600">Consultez vos achats</p>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink to="/dashboard/profil" class="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow border border-transparent hover:border-green-200">
          <div class="flex items-center">
            <div class="p-2 bg-green-50 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div class="ml-4">
              <h4 class="font-medium text-gray-900">Mon profil</h4>
              <p class="text-sm text-gray-600">Gérez vos informations</p>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink to="/adresses" class="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow border border-transparent hover:border-yellow-200">
          <div class="flex items-center">
            <div class="p-2 bg-yellow-50 rounded-lg">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <h4 class="font-medium text-gray-900">Mes adresses</h4>
              <p class="text-sm text-gray-600">Adresses de livraison</p>
            </div>
          </div>
        </NuxtLink>

        <a href="/" class="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow border border-transparent hover:border-purple-200">
          <div class="flex items-center">
            <div class="p-2 bg-purple-50 rounded-lg">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div class="ml-4">
              <h4 class="font-medium text-gray-900">Boutique</h4>
              <p class="text-sm text-gray-600">Continuer mes achats</p>
            </div>
          </div>
        </a>
      </div>
    </main>
  </div>
</template>

<script setup>

definePageMeta({
  layout: 'dashboard'
})

const userName = "Anna Lorena";

// Statistiques
const stats = {
  ordersInProgress: 2,
  booksPurchased: 42,
  totalSpent: "150000",
  averageOrder: "31,20",
  lastPurchaseDate: "Dernier achat: 15/11/2025"
};

// Commandes récentes
const recentOrders = [
  { id: "ORD-7892", date: "15/11/2023", heure: "14:30", status: "Expédiée", total: "12000" },
  { id: "ORD-7885", date: "12/11/2023", heure: "09:15", status: "Livrée", total: "1699" },
  { id: "ORD-7871", date: "05/11/2023", heure: "16:45", status: "En préparation", total: "2850" },
  { id: "ORD-7854", date: "28/10/2023", heure: "11:20", status: "Livrée", total: "6420" }
];

// Fonction pour obtenir les classes CSS selon le statut
const getStatusClass = (status) => {
  switch(status) {
    case 'Expédiée':
      return 'bg-green-100 text-green-800';
    case 'En préparation':
      return 'bg-yellow-100 text-yellow-800';
    case 'Livrée':
      return 'bg-blue-100 text-blue-800';
    case 'Annulée':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
</script>