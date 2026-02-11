<template>
  <Breadcrumb :items="[{ label: 'Commande', to: '/commande' }]" />
  <div class="min-h-screen bg-[#F3F0F5] px-6 lg:px-12 py-10">
    <div class="max-w-6xl mx-auto">
      <!-- HEADER -->
      <div class="flex items-center gap-3 mb-8">
        <NuxtLink
          to="/panier"
          class="text-gray-500 hover:text-[#6a0d5f] transition text-xl"
        >
          ←
        </NuxtLink>
        <h1 class="text-2xl font-bold text-gray-800">Commande</h1>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- FORMULAIRE -->
        <div class="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <!-- PAIEMENT -->
          <h2 class="text-lg font-semibold mb-4">Mode de paiement</h2>

          <div class="space-y-3">
            <!-- LOADING -->
            <div
              v-if="isPageLoading"
              class="fixed inset-0 z-50 flex items-center justify-center bg-white/70 dark:bg-gray-900/70"
            >
              <div
                class="h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"
              ></div>
            </div>

            <!-- AUCUN MOYEN -->
            <p
              v-else-if="!gatewayStore.actifs.length"
              class="text-sm text-gray-500"
            >
              Aucun moyen de paiement disponible pour le moment.
            </p>

            <!-- LISTE DES GATEWAYS -->
            <label
              v-else
              v-for="gateway in gatewayStore.actifs"
              :key="gateway.id"
              class="payment-option"
            >
              <input type="radio" v-model="selectedGateway" :value="gateway" />

              <img
                :src="gateway.logo_url"
                class="h-8 object-contain"
                :alt="gateway.libelle"
              />

              <span>{{ gateway.libelle }}</span>
            </label>
          </div>

          <!-- INFOS DE PAIEMENT -->
          <div
            v-if="selectedGateway"
            class="mt-6 bg-gray-50 border rounded-lg p-4"
          >
            <h3 class="font-semibold mb-3 text-gray-700">
              Paiement via {{ selectedGateway.libelle }}
            </h3>

            <input
              v-model="phone"
              class="input"
              placeholder="+22890000000"
              @input="validatePhone"
            />

            <p v-if="phoneError" class="text-sm text-red-500 mt-2">
              {{ phoneError }}
            </p>
          </div>
        </div>

        <!-- RÉCAP COMMANDE -->
        <aside class="bg-white rounded-xl shadow p-6 h-fit sticky top-6">
          <h2 class="text-lg font-bold mb-4">Votre commande</h2>

          <div class="space-y-3 mb-4">
            <div
              v-for="item in cart"
              :key="item.id"
              class="flex justify-between text-sm"
            >
              <span>
                {{ item.title }}
                <span class="text-gray-400">× {{ item.quantity }}</span>
              </span>
              <span class="font-medium">
                {{ item.price * item.quantity }} FCFA
              </span>
            </div>
          </div>

          <hr class="my-4" />

          <div class="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span class="text-[#6a0d5f]">{{ total }} FCFA</span>
          </div>

          <p class="text-sm text-gray-500 mt-3">
            Paiement :
            <span class="font-medium capitalize">{{ payment }}</span>
          </p>

          <button
            class="mt-6 w-full bg-[#6a0d5f] text-white py-3 rounded-lg font-semibold transition"
            :disabled="!canSubmit || commandeStore.loading"
            :class="{
              'opacity-50 cursor-not-allowed':
                !canSubmit || commandeStore.loading,
              'hover:bg-purple-700': canSubmit,
            }"
            @click="submitCommande"
          >
            {{
              commandeStore.loading ? "Traitement..." : "Confirmer la commande"
            }}
          </button>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useCartStore } from "~~/stores/cart";
import { useGatewayStore } from "~~/stores/gateway";
import { useCommandeStore } from "~~/stores/commande";

definePageMeta({
  middleware: "auth",
});

const isPageLoading = ref(true);
const cartStore = useCartStore();
const gatewayStore = useGatewayStore();
const commandeStore = useCommandeStore();

const cart = computed(() => cartStore.items);
const total = computed(() => cartStore.subtotal);

const selectedGateway = ref(null);

const submitCommande = async () => {
  if (!canSubmit.value) return;

  try {
    const payload = {
      phone: phone.value,
      gateway_id: selectedGateway.value.semoa_id, // important
      livres: cart.value.map((item) => ({
        livre_id: item.id,
        quantite: item.quantity,
      })),
    };

    const res = await commandeStore.createCommande(payload);

    if (!res?.success) {
      throw new Error("Commande non confirmée");
    }

    if (res.payment_url) {
      cartStore.clear();
      window.location.href = res.payment_url;
      return;
    }

    cartStore.clear();
  } catch (e) {
    console.error("Erreur commande :", e);
    alert("Impossible de créer la commande");
  }
};

onMounted(async () => {
  try {
    isPageLoading.value = true;
    if (!gatewayStore.hasGateways) {
      await gatewayStore.fetchGateways();
    }
  } finally {
    isPageLoading.value = false;
  }
});

const phone = ref("");
const phoneError = ref(null);

const validatePhone = () => {
  const regex = /^\+228\d{8}$/;

  phoneError.value = regex.test(phone.value)
    ? null
    : "Le numéro doit être au format +228XXXXXXXX";
};

const canSubmit = computed(
  () =>
    cart.value.length > 0 &&
    selectedGateway.value &&
    phone.value &&
    !phoneError.value
);
</script>

<style scoped>
.input {
  width: 100%;
  border: 1px solid #e5e5e5;
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
}

.input:focus {
  outline: none;
  border-color: #6a0d5f;
  box-shadow: 0 0 0 1px #6a0d5f;
}

.payment-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid #e5e5e5;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.payment-option:hover {
  border-color: #6a0d5f;
}

.payment-option input {
  accent-color: #6a0d5f;
}
</style>
