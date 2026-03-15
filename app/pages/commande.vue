<template>
  <div class="min-h-screen bg-gray-50/50">
    <Breadcrumb :items="[
      { label: 'Panier', to: '/panier' },
      { label: 'Finaliser ma commande', to: '#' }
    ]" />

    <!-- Page Header -->
    <div class="bg-[#6a0d5f] pt-10 pb-20 px-4 mb-[-2rem]">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="text-3xl md:text-5xl font-black text-white mb-4 italic uppercase tracking-tighter">
          Finaliser la <span class="text-orange-400">commande</span>
        </h1>
        <p class="text-white/80 text-sm md:text-base max-w-2xl mx-auto font-medium">
          Dernière étape pour passer la commande de vos ouvrages.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mt-16">
        <!-- FORMULAIRE DE PAIEMENT -->
        <section class="lg:col-span-8 space-y-8">
          <div
            class="bg-white rounded-[2.5rem] shadow-2xl shadow-[#6a0d5f]/5 p-8 md:p-12 border border-gray-100 animate-fadeInUp">
            <div class="flex items-center gap-4 mb-10">
              <div class="w-12 h-12 bg-[#6a0d5f]/10 rounded-2xl flex items-center justify-center text-[#6a0d5f]">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <h2 class="text-2xl font-black text-gray-900 uppercase italic tracking-tighter">Mode de paiement</h2>
            </div>

            <!-- Gateways Selection Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- LOADING STATE -->
              <div v-if="isPageLoading" class="col-span-full py-10 flex flex-col items-center gap-4">
                <div class="h-10 w-10 border-4 border-[#6a0d5f] border-t-transparent rounded-full animate-spin"></div>
                <p class="text-xs font-black text-gray-400 uppercase tracking-widest">Chargement des options...</p>
              </div>

              <div v-else-if="!gatewayStore.actifs.length" class="col-span-full py-10 text-center">
                <p class="text-gray-400 font-bold uppercase tracking-widest text-sm">Aucun moyen de paiement disponible
                </p>
              </div>

              <div v-else v-for="gateway in gatewayStore.actifs" :key="gateway.id" @click="selectedGateway = gateway"
                class="group relative flex items-center gap-4 p-6 rounded-3xl border-2 transition-all duration-300 cursor-pointer"
                :class="selectedGateway?.id === gateway.id ? 'border-[#6a0d5f] bg-[#6a0d5f]/5' : 'border-gray-50 bg-white hover:border-gray-200'">

                <div
                  class="w-12 h-12 rounded-xl bg-white p-2 shadow-sm border border-gray-100 flex items-center justify-center overflow-hidden">
                  <img :src="gateway.logo_url" :alt="gateway.libelle" class="w-full h-full object-contain" />
                </div>

                <div class="flex-1">
                  <p class="font-black text-gray-900 uppercase tracking-tight">{{ gateway.libelle }}</p>
                  <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Paiement Mobile</p>
                </div>

                <div
                  class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-300"
                  :class="selectedGateway?.id === gateway.id ? 'border-[#6a0d5f] bg-[#6a0d5f]' : 'border-gray-200'">
                  <svg v-if="selectedGateway?.id === gateway.id" class="w-3 h-3 text-white" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- PHONE INPUT SECTION -->
            <div v-if="selectedGateway" class="mt-12 pt-12 border-t border-gray-100 animate-fadeInUp">
              <h3 class="text-sm font-black text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span
                  class="w-6 h-6 rounded-lg bg-orange-400 text-white flex items-center justify-center text-[10px]">!</span>
                Numéro de téléphone
              </h3>

              <div class="max-w-md relative">
                <input v-model="phone" type="text" placeholder="+22890000000" @input="validatePhone"
                  class="w-full bg-gray-50 border-2 border-transparent focus:border-[#6a0d5f] focus:bg-white rounded-2xl px-6 py-4 text-gray-900 font-bold outline-none transition-all placeholder:text-gray-300" />
                <div class="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <img :src="selectedGateway.logo_url" class="h-6 object-contain opacity-50" alt="" />
                </div>
              </div>
              <p v-if="phoneError" class="text-[10px] font-bold text-red-500 mt-2 uppercase tracking-widest">
                {{ phoneError }}
              </p>
              <p class="text-[10px] font-bold text-gray-400 mt-4 uppercase tracking-widest leading-relaxed">
                Veuillez saisir le numéro qui effectuera la transaction. <br />
                Format attendu: <span class="text-gray-900">+228XXXXXXXX</span>
              </p>
            </div>
          </div>
        </section>

        <!-- RECAP COMMANDE -->
        <aside class="lg:col-span-4 lg:sticky lg:top-24 animate-fadeInUp" style="animation-delay: 200ms">
          <div class="bg-white rounded-[2.5rem] shadow-2xl shadow-[#6a0d5f]/10 border border-gray-100 p-8">
            <h2
              class="text-2xl font-black text-gray-900 italic uppercase tracking-tighter mb-8 flex items-center gap-3">
              <svg class="w-7 h-7 text-[#6a0d5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" stroke-width="2.5" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
              Votre Commande
            </h2>

            <!-- Items Brief -->
            <div class="space-y-4 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar mb-8">
              <div v-for="item in cart" :key="item.id"
                class="flex items-center gap-4 py-2 border-b border-gray-50/50 last:border-0 hover:bg-gray-50/50 rounded-xl px-2 transition-colors">
                <img :src="item.image" class="w-10 h-14 object-contain" alt="" />
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-black text-gray-900 truncate uppercase">{{ item.title }}</p>
                  <p class="text-[10px] font-bold text-[#6a0d5f]">
                    {{ item.quantity }} × {{ formatPrice(item.price) }}
                  </p>
                </div>
              </div>
            </div>

            <div class="space-y-4 border-t border-gray-50 pt-6">
              <div class="flex justify-between items-center px-2">
                <span class="text-sm font-bold text-gray-400 uppercase tracking-widest">Total Articles</span>
                <span class="font-black text-gray-800">{{ cartStore.count }}</span>
              </div>

              <div
                class="mt-8 mb-10 p-6 bg-[#6a0d5f]/5 rounded-[2rem] border border-[#6a0d5f]/10 text-center flex flex-col items-center">
                <span class="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-2">Total à payer</span>
                <span class="text-4xl font-black text-[#6a0d5f] italic tracking-tighter">
                  {{ formatPrice(total) }}
                </span>
              </div>

              <button @click="submitCommande" :disabled="!canSubmit || commandeStore.loading"
                class="w-full flex items-center justify-center gap-4 bg-[#6a0d5f] text-white py-6 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-[#6a0d5f]/30 hover:bg-[#851178] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:grayscale disabled:scale-100">
                <span v-if="commandeStore.loading">Traitement...</span>
                <template v-else>
                  Confirmer l'achat
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="3" stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </template>
              </button>

              <NuxtLink to="/panier"
                class="w-full flex items-center justify-center mt-6 text-gray-400 hover:text-[#6a0d5f] font-black text-[10px] uppercase tracking-widest transition-colors duration-300">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke-width="3" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
                Retour au panier
              </NuxtLink>
            </div>
          </div>

          <!-- PAIEMENT SECURISE BADGE -->
          <div class="mt-8 p-4 bg-orange-50 border border-orange-100 rounded-2xl flex items-start gap-3">
            <div class="w-8 h-8 rounded-full bg-orange-400 flex-shrink-0 flex items-center justify-center text-white">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
              </svg>
            </div>
            <div>
              <p class="text-[10px] font-black text-orange-900 uppercase">Transaction Sécurisée</p>
              <p class="text-[9px] text-orange-800/70 font-bold leading-tight">Payez en toute sécurité</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import { useCartStore } from "~~/stores/cart";
import { useGatewayStore } from "~~/stores/gateway";
import { useCommandeStore } from "~~/stores/commande";
import Swal from 'sweetalert2';

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

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
};

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
      Swal.fire({
        title: 'Redirection...',
        text: 'Vous allez être redirigé vers l\'interface de paiement.',
        icon: 'info',
        timer: 2000,
        showConfirmButton: false,
        customClass: {
          popup: 'rounded-[2rem]'
        }
      });
      setTimeout(() => {
        window.location.href = res.payment_url;
      }, 1500);
      return;
    }

    cartStore.clear();
    Swal.fire({
      title: 'Commande validée !',
      text: 'Nous avons bien reçu votre demande.',
      icon: 'success',
      confirmButtonColor: '#6a0d5f',
      customClass: {
        popup: 'rounded-[2rem]',
        confirmButton: 'rounded-xl font-black px-8 py-4 uppercase tracking-widest text-sm'
      }
    });
  } catch (e) {
    console.error("Erreur commande :", e);
    Swal.fire({
      title: 'Oups !',
      text: 'Impossible de créer la commande. Vérifiez votre numéro et vos fonds, puis réessayez.',
      icon: 'error',
      confirmButtonColor: '#6a0d5f',
      customClass: {
        popup: 'rounded-[2rem]',
        confirmButton: 'rounded-xl font-black px-8 py-4 uppercase tracking-widest text-sm'
      }
    });
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
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #6a0d5f;
  border-radius: 10px;
}
</style>
