<template>
  <div class="min-h-screen bg-gray-50">
    <!-- En-tête -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-2xl font-semibold text-gray-900">Détails de la commande</h1>
            <p class="text-gray-600 mt-1">Commande #{{ order.id }}</p>
          </div>
          <div class="flex space-x-4">
            <NuxtLink to="/dashboard/commandes" class="text-blue-600 hover:text-blue-800 flex items-center">
              <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour aux commandes
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Boutons d'action -->
      <div class="mb-6 flex flex-wrap gap-4">
        <button @click="printOrder" class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Imprimer
        </button>
        <button @click="duplicateOrder" class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          Commander à nouveau
        </button>
        <button v-if="order.status === 'Expédiée'" @click="trackOrder" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Suivre le colis
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Colonne de gauche : Détails de la commande -->
        <div class="lg:col-span-2">
          <!-- Carte d'information de la commande -->
          <div class="bg-white rounded-xl shadow mb-6">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-800">Résumé de la commande</h3>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 class="text-sm font-medium text-gray-500 mb-2">INFORMATIONS</h4>
                  <div class="space-y-2">
                    <div class="flex justify-between">
                      <span class="text-gray-600">N° de commande</span>
                      <span class="font-medium">#{{ order.id }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Date de commande</span>
                      <span class="font-medium">{{ order.date }} à {{ order.time }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Statut</span>
                      <span :class="`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(order.status)}`">
                        {{ order.status }}
                      </span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Méthode de paiement</span>
                      <span class="font-medium">{{ order.paymentMethod }}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 class="text-sm font-medium text-gray-500 mb-2">FACTURATION & LIVRAISON</h4>
                  <div class="space-y-2">
                    <div>
                      <p class="text-gray-600 mb-1">Adresse de livraison</p>
                      <p class="font-medium">{{ order.shippingAddress }}</p>
                    </div>
                    <div>
                      <p class="text-gray-600 mb-1">Adresse de facturation</p>
                      <p class="font-medium">{{ order.billingAddress }}</p>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Mode de livraison</span>
                      <span class="font-medium">{{ order.shippingMethod }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Articles de la commande -->
          <div class="bg-white rounded-xl shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-800">Articles commandés</h3>
            </div>
            <div class="p-6">
              <div class="space-y-6">
                <div v-for="item in order.items" :key="item.id" class="flex items-start border-b border-gray-100 pb-6 last:border-0">
                  <div class="h-24 w-16 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                    <div class="h-full w-full flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
                      <span class="text-lg font-bold text-gray-700">{{ item.title.charAt(0) }}</span>
                    </div>
                  </div>
                  <div class="ml-4 flex-grow">
                    <div class="flex justify-between">
                      <div>
                        <h4 class="font-medium text-gray-900">{{ item.title }}</h4>
                        <p class="text-sm text-gray-600 mt-1">{{ item.author }}</p>
                        <p class="text-sm text-gray-500 mt-1">ISBN: {{ item.isbn }}</p>
                      </div>
                      <div class="text-right">
                        <p class="font-bold text-gray-900">{{ item.price }}€</p>
                        <p class="text-sm text-gray-600 mt-1">Quantité: {{ item.quantity }}</p>
                        <p class="text-sm text-gray-600 mt-1">Sous-total: {{ item.subtotal }}€</p>
                      </div>
                    </div>
                    <div class="mt-4 flex space-x-4">
                      <button @click="addToWishlist(item)" class="text-gray-600 hover:text-gray-900 text-sm flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Ajouter à la liste de souhaits
                      </button>
                      <button @click="writeReview(item)" class="text-gray-600 hover:text-gray-900 text-sm flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        Écrire un avis
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Suivi de la commande -->
          <div class="bg-white rounded-xl shadow mt-6">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-800">Suivi de la commande</h3>
            </div>
            <div class="p-6">
              <div class="relative">
                <!-- Barre de progression -->
                <div class="h-2 bg-gray-200 rounded-full mb-8">
                  <div :style="`width: ${getProgressWidth()}%`" class="h-full bg-green-600 rounded-full transition-all duration-500"></div>
                </div>
                
                <!-- Étapes -->
                <div class="flex justify-between relative">
                  <div v-for="(step, index) in trackingSteps" :key="index" class="flex flex-col items-center">
                    <div :class="`w-8 h-8 rounded-full flex items-center justify-center ${step.active ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`">
                      <svg v-if="step.completed" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span v-else class="text-sm font-medium">{{ index + 1 }}</span>
                    </div>
                    <span class="text-xs mt-2 text-center max-w-24">{{ step.label }}</span>
                    <span v-if="step.date" class="text-xs text-gray-500 mt-1">{{ step.date }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Colonne de droite : Récapitulatif -->
        <div class="space-y-6">
          <!-- Récapitulatif du prix -->
          <div class="bg-white rounded-xl shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-800">Récapitulatif</h3>
            </div>
            <div class="p-6">
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">Sous-total</span>
                  <span class="font-medium">{{ order.summary.subtotal }}€</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Frais de livraison</span>
                  <span class="font-medium">{{ order.summary.shipping }}€</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Remise</span>
                  <span class="font-medium text-green-600">-{{ order.summary.discount }}€</span>
                </div>
                <div class="border-t border-gray-200 pt-3">
                  <div class="flex justify-between">
                    <span class="text-gray-900 font-semibold">Total</span>
                    <span class="text-2xl font-bold text-gray-900">{{ order.summary.total }}€</span>
                  </div>
                </div>
              </div>
              
              <!-- Informations de paiement -->
              <div class="mt-6 pt-6 border-t border-gray-200">
                <h4 class="text-sm font-medium text-gray-500 mb-3">INFORMATIONS DE PAIEMENT</h4>
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Montant payé</span>
                    <span class="font-medium">{{ order.summary.total }}€</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Date de paiement</span>
                    <span class="font-medium">{{ order.date }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Référence de paiement</span>
                    <span class="font-medium">PAY-{{ order.id.replace('ORD-', '') }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Support client -->
          <div class="bg-white rounded-xl shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-800">Besoin d'aide ?</h3>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <button @click="contactSupport" class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Contacter le support
                </button>
                
                <div class="text-sm text-gray-600">
                  <p class="font-medium mb-1">Informations utiles</p>
                  <ul class="space-y-2 mt-2">
                    <li class="flex items-start">
                      <svg class="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Retour possible sous 30 jours</span>
                    </li>
                    <li class="flex items-start">
                      <svg class="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Livraison gratuite à partir de 25€</span>
                    </li>
                    <li class="flex items-start">
                      <svg class="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Service client 7j/7</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const orderId = route.params.id;

// Données de la commande (simulées)
const order = ref({
  id: orderId,
  date: "15/11/2023",
  time: "14:30",
  status: "Expédiée",
  paymentMethod: "Carte bancaire",
  shippingAddress: "12 Rue des Lilas, 75020 Paris",
  billingAddress: "12 Rue des Lilas, 75020 Paris",
  shippingMethod: "Livraison standard (3-5 jours)",
  items: [
    {
      id: 1,
      title: "L'Étranger",
      author: "Albert Camus",
      isbn: "978-2070360024",
      price: "6,90",
      quantity: 1,
      subtotal: "6,90"
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      isbn: "978-2070368228",
      price: "8,40",
      quantity: 2,
      subtotal: "16,80"
    },
    {
      id: 3,
      title: "Le Petit Prince",
      author: "Antoine de Saint-Exupéry",
      isbn: "978-2070612758",
      price: "5,90",
      quantity: 1,
      subtotal: "5,90"
    }
  ],
  summary: {
    subtotal: "29,60",
    shipping: "4,99",
    discount: "3,00",
    total: "31,59"
  }
});

// Étapes de suivi
const trackingSteps = ref([
  { label: "Commande confirmée", completed: true, active: false, date: "15/11 14:30" },
  { label: "Préparation en cours", completed: true, active: false, date: "15/11 16:45" },
  { label: "Expédiée", completed: true, active: true, date: "16/11 09:15" },
  { label: "En transit", completed: false, active: false },
  { label: "Livrée", completed: false, active: false }
]);

// Fonctions
const getProgressWidth = () => {
  const completedSteps = trackingSteps.value.filter(step => step.completed).length;
  const totalSteps = trackingSteps.value.length;
  return (completedSteps / totalSteps) * 100;
};

const printOrder = () => {
  window.print();
};

const duplicateOrder = () => {
  alert(`Commande #${order.value.id} ajoutée au panier`);
};

const trackOrder = () => {
  alert("Ouverture du suivi de colis");
};

const addToWishlist = (item) => {
  alert(`${item.title} ajouté à votre liste de souhaits`);
};

const writeReview = (item) => {
  alert(`Écrire un avis pour ${item.title}`);
};

const contactSupport = () => {
  alert("Redirection vers le support client");
};

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

definePageMeta({
  layout: 'dashboard',
  middleware: "auth",
})
</script>