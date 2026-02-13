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
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Breadcrumb -->
      <div class="mb-6">
        <nav class="flex items-center text-sm text-gray-500">
          <NuxtLink to="/dashboard" class="hover:text-gray-700">
            Tableau de bord
          </NuxtLink>
          <span class="mx-2">/</span>
          <NuxtLink to="/dashboard/commandes" class="hover:text-gray-700">
            Mes commandes
          </NuxtLink>
          <span class="mx-2">/</span>
          <span class="text-gray-700 font-medium">Détails</span>
        </nav>

        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
          Commande #{{ commande?.reference }}
        </h1>
      </div>

      <!-- Contenu principal -->
      <div
        v-if="commande"
        class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <!-- SECTION CLIENT -->
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center mb-4">
            <div class="p-2 bg-blue-50 rounded-lg mr-3">
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h2 class="text-lg font-bold text-gray-900">
              Informations client
            </h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">Nom complet</p>
              <p class="font-medium text-gray-900">
                {{ commande.user?.prenom }} {{ commande.user?.nom }}
              </p>
            </div>

            <div>
              <p class="text-sm text-gray-500">Email</p>
              <p class="font-medium text-gray-900">
                {{ commande.user?.email }}
              </p>
            </div>

            <div>
              <p class="text-sm text-gray-500">Téléphone</p>
              <p class="font-medium text-gray-900">
                {{ commande.user?.telephone || "—" }}
              </p>
            </div>
          </div>
        </div>

        <!-- SECTION COMMANDE -->
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center mb-4">
            <div class="p-2 bg-purple-50 rounded-lg mr-3">
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
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <h2 class="text-lg font-bold text-gray-900">
              Détails de la commande
            </h2>
          </div>

          <!-- Liste des livres -->
          <div class="space-y-4 mb-6">
            <div
              v-for="detail in commande.detailcommandes"
              :key="detail.id"
              class="flex justify-between items-start py-2 border-b border-gray-100 last:border-0"
            >
              <div class="flex-1">
                <p class="font-medium text-gray-900">
                  {{ detail.livre?.titre }}
                </p>
                <p class="text-sm text-gray-500">
                  {{ detail.quantite }} ×
                  {{ detail.prix_unitaire.toLocaleString() }} FCFA
                </p>
              </div>

              <span class="font-bold text-gray-900">
                {{
                  (detail.prix_unitaire * detail.quantite).toLocaleString()
                }}
                FCFA
              </span>
            </div>
          </div>

          <!-- Total -->
          <div class="pt-4 border-t border-gray-200">
            <div class="flex justify-between items-center">
              <span class="text-lg font-bold text-gray-900">Total</span>
              <span class="text-xl font-bold text-purple-600">
                {{ commande.prix_total.toLocaleString() }} FCFA
              </span>
            </div>
          </div>
        </div>

        <!-- SECTION PAIEMENT -->
        <div v-if="commande.paiements?.length" class="p-6">
          <div class="flex items-center mb-4">
            <div class="p-2 bg-green-50 rounded-lg mr-3">
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
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <h2 class="text-lg font-bold text-gray-900">Paiement</h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">Méthode</p>
              <p class="font-medium text-gray-900">
                {{
                  getMoyenPaiementLabel(
                    commande.paiements[0].moyen_paiement
                  )
                }}
              </p>
            </div>

            <div>
              <p class="text-sm text-gray-500">Référence</p>
              <p class="font-medium text-gray-900">
                {{ commande.paiements[0].reference_transaction || "—" }}
              </p>
            </div>
          </div>
        </div>

        <!-- Bouton retour -->
        <div class="p-6 bg-gray-50">
          <NuxtLink
            to="/dashboard/commandes"
            class="px-5 py-2.5 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-medium transition-colors"
          >
            Retour aux commandes
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCommandeStore } from "~~/stores/commande";
import { useGatewayStore } from "~~/stores/gateway";

const route = useRoute();
const commandeStore = useCommandeStore();
const gatewayStore = useGatewayStore();

const isPageLoading = ref(true);
const commande = ref(null);

// Récupération sécurisée
const fetchCommande = async () => {
  if (!route.params.id) return;

  try {
    isPageLoading.value = true;
    const res = await commandeStore.fetchCommande(route.params.id);
    commande.value = res.data;
  } catch (e) {
    console.error("Erreur chargement commande", e);
  } finally {
    isPageLoading.value = false;
  }
};

const getMoyenPaiementLabel = (moyen) => {
  if (!moyen) return "—";
  const gateway = gatewayStore.gatewayMap[moyen];
  return gateway?.libelle || moyen;
};

onMounted(async () => {
  await fetchCommande();
  await gatewayStore.fetchGateways();
});

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});
</script>
