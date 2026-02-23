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

  <div class="min-h-screen bg-gray-50">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Section de bienvenue -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800">
          Bonjour, {{ userFullName ?? "cher(e) Client(e)" }}
        </h2>
        <p class="text-gray-600 mt-1">Voici un aperçu de votre compte</p>
      </div>

      <!-- Cartes de statistiques -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8"
      >
        <!-- Commandes en cours -->
        <div
          class="bg-white rounded-xl shadow p-4 sm:p-6 hover:shadow-md transition-shadow"
        >
          <div class="flex items-center">
            <div class="p-2 sm:p-3 bg-blue-100 rounded-lg flex-shrink-0">
              <svg
                class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
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
            <div class="ml-3 sm:ml-4 min-w-0 flex-1">
              <p class="text-xs sm:text-sm font-medium text-gray-600 truncate">
                Commandes en cours
              </p>
              <p class="text-xl sm:text-2xl font-bold text-gray-900">
                {{ ordersInProgress }}
              </p>
            </div>
          </div>
          <div class="mt-3 sm:mt-4">
            <NuxtLink
              to="/dashboard/commandes"
              class="text-blue-600 text-xs sm:text-sm hover:text-blue-800 flex items-center"
            >
              <span class="truncate">Voir les commandes</span>
              <svg
                class="w-3 h-3 sm:w-4 sm:h-4 ml-1 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </NuxtLink>
          </div>
        </div>

        <!-- Livres achetés -->
        <div
          class="bg-white rounded-xl shadow p-4 sm:p-6 hover:shadow-md transition-shadow"
        >
          <div class="flex items-center">
            <div class="p-2 sm:p-3 bg-green-100 rounded-lg flex-shrink-0">
              <svg
                class="w-5 h-5 sm:w-6 sm:h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div class="ml-3 sm:ml-4 min-w-0 flex-1">
              <p class="text-xs sm:text-sm font-medium text-gray-600 truncate">
                Livres achetés
              </p>
              <p class="text-xl sm:text-2xl font-bold text-gray-900">
                {{ booksPurchased }}
              </p>
            </div>
          </div>
        </div>

        <!-- Total dépensé -->
        <div
          class="bg-white rounded-xl shadow p-4 sm:p-6 hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1"
        >
          <div class="flex items-center">
            <div class="p-2 sm:p-3 bg-purple-100 rounded-lg flex-shrink-0">
              <svg
                class="w-5 h-5 sm:w-6 sm:h-6 text-purple-600"
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
            <div class="ml-3 sm:ml-4 min-w-0 flex-1">
              <p class="text-xs sm:text-sm font-medium text-gray-600 truncate">
                Total dépensé
              </p>
              <p class="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                {{ totalSpent }} FCFA
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Commandes récentes -->
      <div class="bg-white rounded-xl shadow overflow-hidden">
        <div
          class="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-2"
        >
          <h3 class="text-base sm:text-lg font-semibold text-gray-800">
            Commandes récentes
          </h3>
          <NuxtLink
            to="/dashboard/commandes"
            class="text-blue-600 text-xs sm:text-sm hover:text-blue-800 font-medium"
          >
            Voir toutes
          </NuxtLink>
        </div>

        <!-- Version mobile (cartes) -->
        <div class="block md:hidden divide-y divide-gray-200">
          <div
            v-for="order in recentOrders"
            :key="order.id"
            class="p-4 space-y-2"
          >
            <div class="flex justify-between items-start">
              <span class="font-medium text-gray-900"
                >#{{ order.reference }}</span
              >
              <span
                class="px-2 py-1 text-xs font-semibold rounded-full"
                :class="
                  order.statut === 'Traitée'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                "
              >
                {{ order.statut }}
              </span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">{{ order.date }}</span>
              <span class="font-medium text-gray-900"
                >{{ order.total }} FCFA</span
              >
            </div>
          </div>
        </div>

        <!-- Version desktop (tableau) -->
        <div class="hidden md:block overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Commande
                </th>
                <th
                  class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Statut
                </th>
                <th
                  class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="order in recentOrders" :key="order.id">
                <td
                  class="px-4 sm:px-6 py-3 sm:py-4 font-medium text-sm sm:text-base whitespace-nowrap"
                >
                  #{{ order.reference }}
                </td>
                <td
                  class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-500 whitespace-nowrap"
                >
                  {{ order.date }}
                </td>
                <td class="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                  <span
                    class="px-2 sm:px-3 py-1 text-xs font-semibold rounded-full"
                    :class="
                      order.statut === 'Livrée'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    "
                  >
                    {{ order.statut }}
                  </span>
                </td>
                <td
                  class="px-4 sm:px-6 py-3 sm:py-4 font-medium text-sm sm:text-base whitespace-nowrap"
                >
                  {{ order.total }} FCFA
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Section de navigation rapide -->
      <div
        class="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
      >
        <NuxtLink
          to="/dashboard/commandes"
          class="bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-md transition-shadow border border-transparent hover:border-blue-200"
        >
          <div class="flex items-center">
            <div class="p-1.5 sm:p-2 bg-blue-50 rounded-lg flex-shrink-0">
              <svg
                class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
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
            <div class="ml-3 sm:ml-4 min-w-0">
              <h4
                class="font-medium text-gray-900 text-sm sm:text-base truncate"
              >
                Mes commandes
              </h4>
              <p class="text-xs sm:text-sm text-gray-600 truncate">
                Consultez vos achats
              </p>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/dashboard/profil"
          class="bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-md transition-shadow border border-transparent hover:border-green-200"
        >
          <div class="flex items-center">
            <div class="p-1.5 sm:p-2 bg-green-50 rounded-lg flex-shrink-0">
              <svg
                class="w-5 h-5 sm:w-6 sm:h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div class="ml-3 sm:ml-4 min-w-0">
              <h4
                class="font-medium text-gray-900 text-sm sm:text-base truncate"
              >
                Mon profil
              </h4>
              <p class="text-xs sm:text-sm text-gray-600 truncate">
                Gérez vos informations
              </p>
            </div>
          </div>
        </NuxtLink>

        <a
          href="/"
          class="bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-md transition-shadow border border-transparent hover:border-purple-200 sm:col-span-2 lg:col-span-1"
        >
          <div class="flex items-center">
            <div class="p-1.5 sm:p-2 bg-purple-50 rounded-lg flex-shrink-0">
              <svg
                class="w-5 h-5 sm:w-6 sm:h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <div class="ml-3 sm:ml-4 min-w-0">
              <h4
                class="font-medium text-gray-900 text-sm sm:text-base truncate"
              >
                Boutique
              </h4>
              <p class="text-xs sm:text-sm text-gray-600 truncate">
                Continuer mes achats
              </p>
            </div>
          </div>
        </a>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useUserStore } from "~~/stores/user";
import { useCommandeStore } from "~~/stores/commande";

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

const userStore = useUserStore();
const commandeStore = useCommandeStore();
const isPageLoading = ref(true);

const userFullName = computed(() =>
  userStore.user ? `${userStore.user.nom} ${userStore.user.prenom}` : null,
);

/* =========================
   STATS
========================= */
const ordersInProgress = computed(
  () => commandeStore.commandes.filter((c) => c.statut === "termine").length,
);

const booksPurchased = computed(() =>
  commandeStore.commandes
    .filter((c) => ["termine", "traite"].includes(c.statut))
    .reduce((sum, c) => {
      c.detailcommandes?.forEach((d) => {
        sum += d.quantite;
      });
      return sum;
    }, 0),
);

const totalSpent = computed(() =>
  commandeStore.commandes
    .filter((c) => ["termine", "traite"].includes(c.statut))
    .reduce((sum, c) => sum + c.prix_total, 0),
);

/* =========================
   COMMANDES RECENTES
========================= */
const recentOrders = computed(() =>
  commandeStore.commandes
    .filter((c) => ["termine", "traite"].includes(c.statut))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5)
    .map((c) => ({
      id: c.id,
      reference: c.reference,
      date: new Date(c.created_at).toLocaleDateString("fr-FR"),
      total: c.prix_total,
      statut: c.statut === "termine" ? "En attente de traitement" : "Livrée",
    })),
);

onMounted(async () => {
  try {
    isPageLoading.value = true;
    await userStore.fetchProfile();
    await commandeStore.fetchMyOrders();
  } finally {
    isPageLoading.value = false;
  }
});
</script>
