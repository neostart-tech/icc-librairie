<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- En-tête -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div class="flex items-center gap-3 mb-2">
              <NuxtLink 
                to="/dashboard/commandes/liste" 
                class="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
              </NuxtLink>
              <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Détails de la commande</h1>
            </div>
            <p class="text-gray-600">Commande #{{ order.id }}</p>
          </div>
          <div class="flex items-center gap-3">
            <span :class="`px-4 py-2 text-sm font-medium rounded-full ${getStatusClass(order.status)}`">
              {{ order.status }}
            </span>
            <button @click="printOrder" class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Informations générales -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <!-- Informations de la commande -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 lg:col-span-2">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Informations de la commande</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p class="text-sm font-medium text-gray-600">Numéro de commande</p>
              <p class="text-gray-900 font-medium">{{ order.id }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-600">Date de commande</p>
              <p class="text-gray-900">{{ order.date }} à {{ order.time }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-600">Méthode de paiement</p>
              <p class="text-gray-900">Carte bancaire •••• 4242</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-600">Statut du paiement</p>
              <p class="text-green-600 font-medium">Payé</p>
            </div>
          </div>
        </div>

        <!-- Résumé -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Résumé</h2>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600">Sous-total</span>
              <span class="text-gray-900">{{ order.subtotal }} FCFA</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Frais de livraison</span>
              <span class="text-gray-900">{{ order.shipping }} FCFA</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Réduction</span>
              <span class="text-green-600">{{ order.discount }} FCFA</span>
            </div>
            <div class="border-t pt-3">
              <div class="flex justify-between">
                <span class="text-lg font-semibold text-gray-900">Total</span>
                <span class="text-lg font-bold text-gray-900">{{ order.total }} FCFA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Livres commandés -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div class="px-5 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">Livres commandés</h2>
        </div>
        
        <!-- Vue mobile -->
        <div class="block sm:hidden divide-y divide-gray-200">
          <div v-for="book in order.books" :key="book.name" class="p-4 hover:bg-gray-50 transition-colors duration-150">
            <div class="flex items-start justify-between mb-3">
              <div class="flex-1">
                <p class="font-medium text-gray-900">{{ book.name }}</p>
                <p class="text-sm text-gray-500 mt-1">Quantité: {{ book.quantity }}</p>
              </div>
              <div class="text-right">
                <p class="font-medium text-gray-900">{{ book.price }} FCFA</p>
                <p class="text-sm text-gray-500">Prix unitaire</p>
              </div>
            </div>
            <div class="flex justify-between pt-3 border-t border-gray-100">
              <span class="text-sm text-gray-600">Sous-total</span>
              <span class="font-medium text-gray-900">{{ (book.price * book.quantity).toFixed(0) }} FCFA</span>
            </div>
          </div>
        </div>

        <!-- Vue desktop -->
        <div class="hidden sm:block overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Livre
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix unitaire
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantité
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sous-total
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="book in order.books" :key="book.name" class="hover:bg-gray-50 transition-colors duration-150">
                <td class="px-6 py-4">
                  <div class="text-sm font-medium text-gray-900">{{ book.name }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ book.price }} FCFA</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ book.quantity }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ (book.price * book.quantity).toFixed(0) }} FCFA</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Informations de livraison -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Adresse de livraison -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            Adresse de livraison
          </h2>
          <div class="space-y-2">
            <p class="text-gray-900 font-medium">{{ order.shippingAddress }}</p>
            <p class="text-gray-600">{{ order.phone }}</p>
            <p class="text-gray-600">{{ order.email }}</p>
          </div>
        </div>

        <!-- Suivi de livraison -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Suivi de livraison
          </h2>
          <div class="space-y-4">
            <div v-for="step in shippingSteps" :key="step.name" class="flex items-start gap-3">
              <div :class="`h-6 w-6 rounded-full flex items-center justify-center ${step.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`">
                <svg v-if="step.completed" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <div>
                <p :class="`text-sm font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`">
                  {{ step.name }}
                </p>
                <p class="text-xs text-gray-500">{{ step.date }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard'
})

import { ref, onMounted } from 'vue'
import { useRoute } from '#imports'

const route = useRoute()
const orderId = route.params.id

// Données de la commande (simulées)
const order = ref({
  id: "",
  date: "",
  time: "",
  status: "",
  items: 0,
  total: "0,00",
  subtotal: "0,00",
  shipping: "0,00",
  discount: "0,00",
  shippingAddress: "",
  phone: "",
  email: "",
  books: []
})

// Étapes de livraison
const shippingSteps = ref([
  { name: "Commande confirmée", date: order.value.date, completed: true },
  { name: "Préparation en cours", date: order.value.date, completed: order.value.status !== "En préparation" },
  { name: "Expédiée", date: order.value.date, completed: ["Expédiée", "Livrée"].includes(order.value.status) },
  { name: "Livrée", date: order.value.date, completed: order.value.status === "Livrée" }
])

// Données simulées des commandes
const ordersData = [
  { 
    id: "ORD-7892", 
    date: "15/11/2023", 
    time: "14:30", 
    status: "Expédiée", 
    items: 3, 
    total: "42000",
    subtotal: "3900",
    shipping: "300",
    discount: "0",
    shippingAddress: "Rue 22 Totsi, Lomé, Togo",
    phone: "+228 90 12 34 56",
    email: "anna.lorena@example.com",
    books: [
      { name: "L'Étranger - Albert Camus", quantity: 1, price: 4000 },
      { name: "1984 - George Orwell", quantity: 1, price: 5000 },
      { name: "Le Petit Prince - Antoine de Saint-Exupéry", quantity: 1, price: 8000 }
    ]
  },
  { 
    id: "ORD-7885", 
    date: "12/11/2023", 
    time: "09:15", 
    status: "Livrée", 
    items: 1, 
    total: "15000",
    subtotal: "15000",
    shipping: "0",
    discount: "0",
    shippingAddress: "Rue 22 Totsi, Lomé, Togo",
    phone: "+228 90 12 34 56",
    email: "anna.lorena@example.com",
    books: [
      { name: "Harry Potter à l'école des sorciers - J.K. Rowling", quantity: 1, price: 15000 }
    ]
  },
  { 
    id: "ORD-7871", 
    date: "05/11/2023", 
    time: "16:45", 
    status: "En préparation", 
    items: 2, 
    total: "28000",
    subtotal: "25000",
    shipping: "300",
    discount: "0",
    shippingAddress: "Rue 22 Totsi, Lomé, Togo",
    phone: "+228 90 12 34 56",
    email: "anna.lorena@example.com",
    books: [
      { name: "Le Seigneur des Anneaux - Tome 1", quantity: 1, price: 19000 },
      { name: "Le Hobbit - J.R.R. Tolkien", quantity: 1, price: 8500 }
    ]
  },
  { 
    id: "ORD-7854", 
    date: "28/10/2023", 
    time: "11:20", 
    status: "Livrée", 
    items: 4, 
    total: "64200",
    subtotal: "61200",
    shipping: "300",
    discount: "0",
    shippingAddress: "Rue 22 Totsi, Lomé, Togo",
    phone: "+228 90 12 34 56",
    email: "anna.lorena@example.com",
    books: [
      { name: "Dune - Frank Herbert", quantity: 1, price: 14000 },
      { name: "Fondation - Isaac Asimov", quantity: 1, price: 12000 },
      { name: "Le Meilleur des mondes - Aldous Huxley", quantity: 1, price: 9000 },
      { name: "Fahrenheit 451 - Ray Bradbury", quantity: 1, price: 8000 }
    ]
  }
]

onMounted(() => {
  // Trouver la commande correspondante
  const foundOrder = ordersData.find(o => o.id === orderId)
  if (foundOrder) {
    order.value = foundOrder
    
    // Mettre à jour les étapes de livraison
    shippingSteps.value = [
      { 
        name: "Commande confirmée", 
        date: order.value.date, 
        completed: true 
      },
      { 
        name: "Préparation en cours", 
        date: order.value.date, 
        completed: order.value.status !== "En préparation" 
      },
      { 
        name: "Expédiée", 
        date: order.value.date, 
        completed: ["Expédiée", "Livrée"].includes(order.value.status) 
      },
      { 
        name: "Livrée", 
        date: order.value.date, 
        completed: order.value.status === "Livrée" 
      }
    ]
  }
})

// Fonction pour obtenir les classes CSS selon le statut
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

// Actions
const printOrder = () => {
  alert('Impression de la commande')
}

</script>