<template>
  <div class="min-h-screen bg-gray-50/50">
    <Breadcrumb :items="[
      { label: 'Panier', to: '/panier' },
      { label: 'Finaliser ma commande', to: '#' }
    ]" />

    <!-- Page Header -->
    <div class="bg-[#6a0d5f] pt-10 pb-20 px-4 mb-[-2rem]">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="text-xl md:text-3xl font-bold text-white mb-4 uppercase tracking-wide">
          Finaliser la <span class="text-orange-400">commande</span>
        </h1>
        <p class="text-white/80 text-sm md:text-base max-w-2xl mx-auto font-medium">
          Choisissez votre mode de livraison et validez votre commande.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mt-16">
        <!-- FORMULAIRE DE COMMANDE -->
        <section class="lg:col-span-8 space-y-8">
          <div
            class="bg-white rounded-[2.5rem] shadow-2xl shadow-[#6a0d5f]/5 p-8 md:p-12 border border-gray-100 animate-fadeInUp">
            <div class="flex items-center gap-4 mb-10">
              <div class="w-12 h-12 bg-[#6a0d5f]/10 rounded-2xl flex items-center justify-center text-[#6a0d5f]">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <h2 class="text-xl font-semibold text-gray-900 uppercase tracking-wide">Mode de récupération</h2>
            </div>

            <!-- Delivery Selection Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div @click="typeLivraison = 'retrait'"
                class="group relative flex items-center gap-4 p-6 rounded-3xl border-2 transition-all duration-300 cursor-pointer"
                :class="typeLivraison === 'retrait' ? 'border-[#6a0d5f] bg-[#6a0d5f]/5' : 'border-gray-50 bg-white hover:border-gray-200'">
                <div class="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="font-bold text-gray-900 tracking-wide">Retrait sur place</p>
                  <p class="text-[10px] font-bold text-gray-400 tracking-wide">À la librairie ICC</p>
                </div>
                <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                  :class="typeLivraison === 'retrait' ? 'border-[#6a0d5f] bg-[#6a0d5f]' : 'border-gray-200'">
                  <svg v-if="typeLivraison === 'retrait'" class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
              </div>

              <div @click="typeLivraison = 'livraison'"
                class="group relative flex items-center gap-4 p-6 rounded-3xl border-2 transition-all duration-300 cursor-pointer"
                :class="typeLivraison === 'livraison' ? 'border-[#6a0d5f] bg-[#6a0d5f]/5' : 'border-gray-50 bg-white hover:border-gray-200'">
                <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M3 10h11m0 0l-4-4m4 4l-4 4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M13 18h7l2-4h-7m-4 4h1a2 2 0 100-4h-1m-7 4h1a2 2 0 100-4H7m3-4V7a2 2 0 012-2h6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="font-bold text-gray-900 tracking-wide">Livraison à domicile</p>
                  <p class="text-[10px] font-bold text-gray-400 tracking-wide">+ {{ formatPrice(deliveryFee) }} de frais</p>
                </div>
                <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                  :class="typeLivraison === 'livraison' ? 'border-[#6a0d5f] bg-[#6a0d5f]' : 'border-gray-200'">
                  <svg v-if="typeLivraison === 'livraison'" class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- DELIVERY DETAILS SECTION -->
            <div v-if="typeLivraison === 'livraison'" class="mt-12 pt-12 border-t border-gray-100 animate-fadeInUp">
              <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide mb-6 flex items-center gap-2">
                Coordonnées de livraison
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="text-[10px] font-bold text-gray-400 uppercase tracking-wide px-2">Adresse complète</label>
                  <input v-model="adresse" type="text" placeholder="Quartier, Rue, Maison..."
                    class="w-full bg-gray-50 border-2 border-transparent focus:border-[#6a0d5f] focus:bg-white rounded-2xl px-6 py-4 text-gray-900 font-bold outline-none transition-all placeholder:text-gray-300" />
                </div>
                <div class="space-y-2">
                  <label class="text-[10px] font-bold text-gray-400 uppercase tracking-wide px-2">Numéro de contact</label>
                  <input v-model="phone" type="text" placeholder="+22890000000"
                    class="w-full bg-gray-50 border-2 border-transparent focus:border-[#6a0d5f] focus:bg-white rounded-2xl px-6 py-4 text-gray-900 font-bold outline-none transition-all placeholder:text-gray-300" />
                </div>
              </div>
              <p class="text-[10px] font-bold text-gray-400 mt-4 uppercase tracking-wide leading-relaxed">
                Notre livreur vous contactera sur ce numéro pour coordonner la livraison.
              </p>
            </div>
          </div>
        </section>

        <!-- RECAP COMMANDE -->
        <aside class="lg:col-span-4 lg:sticky lg:top-24 animate-fadeInUp" style="animation-delay: 200ms">
          <div class="bg-white rounded-[2.5rem] shadow-2xl shadow-[#6a0d5f]/10 border border-gray-100 p-8">
            <h2
              class="text-xl font-semibold text-gray-900 uppercase tracking-wide mb-8 flex items-center gap-3">
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
                  <p class="text-xs font-bold text-gray-900 truncate">{{ item.title }}</p>
                  <p class="text-[10px] font-bold text-[#6a0d5f]">
                    {{ item.quantity }} × {{ formatPrice(item.price) }}
                  </p>
                </div>
              </div>
            </div>

            <div class="space-y-4 border-t border-gray-50 pt-6">
              <div class="flex justify-between items-center px-2">
                <span class="text-sm font-bold text-gray-400 tracking-wide">Sous-total</span>
                <span class="font-bold text-gray-800">{{ formatPrice(total) }}</span>
              </div>
              
              <div v-if="typeLivraison === 'livraison'" class="flex justify-between items-center px-2">
                <span class="text-sm font-bold text-gray-400 tracking-wide">Frais de livraison</span>
                <span class="font-bold text-blue-600">+ {{ formatPrice(deliveryFee) }}</span>
              </div>

              <div
                class="mt-8 mb-10 p-6 bg-[#6a0d5f]/5 rounded-[2rem] border border-[#6a0d5f]/10 text-center flex flex-col items-center">
                <span class="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Total à payer</span>
                <span class="text-3xl font-bold text-[#6a0d5f] tracking-wide">
                  {{ formatPrice(grandTotal) }}
                </span>
              </div>

              <button @click="submitCommande" :disabled="!canSubmit || commandeStore.loading"
                class="w-full flex items-center justify-center gap-4 bg-[#6a0d5f] text-white py-6 rounded-2xl font-bold text-sm uppercase tracking-wide shadow-2xl shadow-[#6a0d5f]/30 hover:bg-[#851178] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:grayscale disabled:scale-100">
                <span v-if="commandeStore.loading">Traitement...</span>
                <template v-else>
                  Confirmer la commande
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="3" stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </template>
              </button>

              <NuxtLink to="/panier"
                class="w-full flex items-center justify-center mt-6 text-gray-400 hover:text-[#6a0d5f] font-bold text-[10px] uppercase tracking-wide transition-colors duration-300">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke-width="3" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
                Retour au panier
              </NuxtLink>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import Breadcrumb from "~/components/Breadcrumb.vue";
import { useCartStore } from "~~/stores/cart";
import { useCommandeStore } from "~~/stores/commande";
import Swal from 'sweetalert2';

definePageMeta({
  middleware: "auth",
});

const cartStore = useCartStore();
const commandeStore = useCommandeStore();
const { $api } = useNuxtApp();

const cart = computed(() => cartStore.items);
const total = computed(() => cartStore.subtotal);
const deliveryFee = ref(0);
const typeLivraison = ref('retrait');
const adresse = ref("");
const phone = ref("");

const grandTotal = computed(() => {
  return total.value + (typeLivraison.value === 'livraison' ? deliveryFee.value : 0);
});

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
};

const fetchSettings = async () => {
  try {
    const res = await $api('/settings');
    const data = res?.data;
    deliveryFee.value = parseInt(data?.delivery_fee || 0);
  } catch (e) {
    console.error("Erreur settings:", e);
  }
};

const submitCommande = async () => {
  if (!canSubmit.value) return;

  try {
    const payload = {
      type_livraison: typeLivraison.value,
      adresse_livraison: typeLivraison.value === 'livraison' ? adresse.value : null,
      numero_livraison: typeLivraison.value === 'livraison' ? phone.value : null,
      livres: cart.value.map((item) => ({
        livre_id: item.id,
        quantite: item.quantity,
      })),
    };

    const res = await commandeStore.createCommande(payload);

    if (!res?.success) {
      throw new Error("Commande non confirmée");
    }

    cartStore.clear();

    // Show custom HTML for payment instructions
    Swal.fire({
      title: 'Commande reçue !',
      html: `
        <div class="text-left space-y-4">
          <p class="text-sm text-gray-600 font-medium">${res.payment_instructions || 'Veuillez procéder au paiement pour valider votre commande.'}</p>
          <div class="p-4 bg-orange-50 rounded-2xl border border-orange-100 text-center">
            <span class="text-xs font-bold text-gray-400 uppercase block mb-1">Montant à envoyer</span>
            <span class="text-2xl font-bold text-[#6a0d5f]">${formatPrice(res.total_a_payer)}</span>
          </div>
          <p class="text-[11px] text-gray-400 text-center italic">Une fois le paiement effectué, rendez-vous dans "Mes Commandes" pour déclarer votre paiement avec la référence ou une capture d'écran.</p>
        </div>
      `,
      icon: 'success',
      confirmButtonText: 'Aller à mes commandes',
      confirmButtonColor: '#6a0d5f',
      allowOutsideClick: false,
      customClass: {
        popup: 'rounded-[2rem] p-8',
        confirmButton: 'rounded-xl font-bold px-8 py-4 uppercase tracking-wide text-sm w-full'
      }
    }).then(() => {
      useRouter().push('/dashboard/commandes');
    });

  } catch (e) {
    console.error("Erreur commande :", e);
    Swal.fire({
      title: 'Oups !',
      text: e.message || 'Impossible de créer la commande. Veuillez réessayer.',
      icon: 'error',
      confirmButtonColor: '#6a0d5f',
      customClass: {
        popup: 'rounded-[2rem]',
        confirmButton: 'rounded-xl font-bold px-8 py-4 uppercase tracking-wide text-sm'
      }
    });
  }
};

onMounted(() => {
  fetchSettings();
});

const canSubmit = computed(() => {
  if (typeLivraison.value === 'livraison') {
    return cart.value.length > 0 && adresse.value && phone.value;
  }
  return cart.value.length > 0;
});
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
