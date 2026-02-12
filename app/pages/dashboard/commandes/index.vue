<template>
  <!-- LOADING -->
  <div
    v-if="isPageLoading"
    class="fixed inset-0 z-50 flex items-center justify-center bg-white/70 dark:bg-gray-900/70"
  >
    <div
      class="h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"
    ></div>
  </div>

  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="mb-10">
        <h1 class="text-2xl sm:text-2xl font-semibold text-gray-900">
          Mes commandes
        </h1>
        <p class="text-gray-600 mt-1 text-sm sm:text-base">
          Historique de tous vos achats
        </p>
      </div>

      <!-- Cartes de statistiques -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Commandes totales</p>
              <p class="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                {{ totalProcessedOrders }}
              </p>
            </div>
            <div class="p-2 bg-blue-50 rounded-lg">
              <svg
                class="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total dépensé</p>
              <p class="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                {{ totalSpent }} FCFA
              </p>
            </div>
            <div class="p-2 bg-green-50 rounded-lg">
              <svg
                class="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Moyenne/commande</p>
              <p class="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                {{ averageOrder }} FCFA
              </p>
            </div>
            <div class="p-2 bg-purple-50 rounded-lg">
              <svg
                class="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Liste des commandes -->
      <div
        class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <!-- En-tête -->
        <div class="px-4 sm:px-6 py-4 border-b border-gray-200">
          <div
            class="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <h2 class="text-lg sm:text-xl font-semibold text-gray-900">
              Toutes vos commandes
            </h2>
            <div class="text-sm text-gray-600">
              {{ processedOrders.length }} commande(s)
            </div>
          </div>
        </div>

        <!-- Tableau avec Vue3Datatable -->
        <div class="p-4 hidden sm:block">
  <Vue3Datatable
    :rows="processedOrders"
    :columns="columns"
    :sortable="true"
    :pagination="true"
    :page-size="8"
    class="!bg-transparent"
    :header-class="'bg-gray-50 text-gray-700 text-xs uppercase cursor-pointer'"
    :row-class="'hover:bg-gray-50 text-gray-700'"
    :cell-class="'px-4 py-2'"
  >
    <template #statut="data">
      <span
        class="px-3 py-1 rounded-full text-xs font-semibold"
        :class="
          data.value.statut === 'traite'
            ? 'bg-green-100 text-green-700'
            : 'bg-yellow-100 text-yellow-700'
        "
      >
        {{ data.value.statut === "traite" ? "Traitée" : "En cours de traitement" }}
      </span>
    </template>

    <template #actions="data">
      <NuxtLink
        :to="`/dashboard/commandes/details/${data.value._raw.id}`"
        class="px-3 py-1.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
      >
        Détails
      </NuxtLink>
    </template>
  </Vue3Datatable>
</div>
<!-- Version mobile : cartes -->
<div class="block sm:hidden p-4 space-y-4">
  <div
    v-for="order in processedOrders"
    :key="order._raw.id"
    class="border border-gray-200 rounded-xl p-4 bg-white shadow-sm"
  >
    <div class="flex justify-between items-center mb-2">
      <span class="text-sm font-semibold text-gray-900">
        {{ order.reference }}
      </span>
      <span
        class="px-3 py-1 rounded-full text-xs font-semibold"
        :class="
          order.statut === 'traite'
            ? 'bg-green-100 text-green-700'
            : 'bg-yellow-100 text-yellow-700'
        "
      >
        {{ order.statut === "traite" ? "Traitée" : "En cours" }}
      </span>
    </div>

    <div class="text-sm text-gray-600 space-y-1">
      <div class="flex justify-between">
        <span>Date</span>
        <span class="font-medium">{{ order.date }}</span>
      </div>
      <div class="flex justify-between">
        <span>Heure</span>
        <span class="font-medium">{{ order.heure }}</span>
      </div>
      <div class="flex justify-between">
        <span>Total</span>
        <span class="font-semibold text-gray-900">
          {{ order.montant }}
        </span>
      </div>
    </div>

    <NuxtLink
      :to="`/dashboard/commandes/details/${order._raw.id}`"
      class="mt-4 block w-full text-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
    >
      Voir les détails
    </NuxtLink>
  </div>
</div>

      </div>

      <!-- Aucune commande -->
      <div
        v-if="processedOrders.length === 0"
        class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center"
      >
        <svg
          class="w-16 h-16 text-gray-300 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          Aucune commande trouvée
        </h3>
        <p class="text-gray-600 mb-6">
          Aucune commande ne correspond à vos critères de recherche.
        </p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Vue3Datatable from "@bhplugin/vue3-datatable";
import '@bhplugin/vue3-datatable/dist/style.css'
import { useCommandeStore } from "~~/stores/commande";

const commandeStore = useCommandeStore();
const isPageLoading = ref(true);

// Filtres
const filters = ref({
  status: "",
  period: "all",
});

// Colonnes pour Vue3Datatable
const columns = [
  { field: "reference", title: "N° Commande", sortable: true },
  { field: "date", title: "Date", sortable: true },
  { field: "heure", title: "Heure", sortable: true },
  { field: "statut", title: "Statut" },
  { field: "montant", title: "Total", sortable: true },
  { field: "actions", title: "Actions" },
];

// Commandes traitées et terminées
const processedOrders = computed(() =>
  commandeStore.commandes
    .filter((c) => ["termine", "traite"].includes(c.statut))
    .map((c) => {
      const d = new Date(c.created_at);
      return {
        reference: c.reference,
        date: d.toLocaleDateString("fr-FR"),
        heure: d.toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        statut: c.statut,
        montant: c.prix_total.toLocaleString() + " FCFA",
        _raw: c,
      };
    })
);

// Statistiques
const totalProcessedOrders = computed(() =>
  commandeStore.commandes.filter((c) => ["termine", "traite"].includes(c.statut)).length
);

const totalSpent = computed(() =>
  commandeStore.commandes
    .filter((c) => ["termine", "traite"].includes(c.statut))
    .reduce((sum, c) => sum + c.prix_total, 0)
    .toLocaleString()
);

const averageOrder = computed(() => {
  const orders = commandeStore.commandes.filter((c) => ["termine", "traite"].includes(c.statut));
  if (orders.length === 0) return 0;
  const total = orders.reduce((sum, c) => sum + c.prix_total, 0);
  return Math.round(total / orders.length).toLocaleString();
});

// Chargement des commandes
onMounted(async () => {
  try {
    isPageLoading.value = true;
  await commandeStore.fetchMyOrders();
  } finally {
    isPageLoading.value = false;
  }
});

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});
</script>
