<template>
  <div class="min-h-screen bg-gray-50/50">
    <Breadcrumb :items="[
      { label: 'Panier', to: '/panier' },
      { label: 'Finaliser ma commande', to: '#' }
    ]" />

    <!-- Page Header -->
    <div class="bg-[#6a0d5f] pt-8 pb-16 px-4 mb-[-1rem]">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="text-xl md:text-2xl font-bold text-white mb-3 uppercase tracking-wide">
          Finaliser la <span class="text-orange-400">commande</span>
        </h1>
        <p class="text-white/80 text-xs md:text-sm max-w-2xl mx-auto font-medium">
          Choisissez votre mode de livraison et validez votre commande.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mt-16">
        <!-- FORMULAIRE DE COMMANDE -->
        <section class="lg:col-span-8 space-y-6">
          <div
            class="bg-white rounded-3xl shadow-2xl shadow-[#6a0d5f]/5 p-5 md:p-10 border border-gray-100 animate-fadeInUp">
            <div class="flex items-center gap-4 mb-8">
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
                class="group relative flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer"
                :class="typeLivraison === 'retrait' ? 'border-[#6a0d5f] bg-[#6a0d5f]/5' : 'border-gray-50 bg-white hover:border-gray-200'">
                <div class="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="font-bold text-gray-900 tracking-wide">Retrait sur place</p>
                  <p class="text-[10px] font-bold text-gray-400 tracking-wide">À la librairie ICC</p>
                </div>
                <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                  :class="typeLivraison === 'retrait' ? 'border-[#6a0d5f] bg-[#6a0d5f]' : 'border-gray-200'">
                  <svg v-if="typeLivraison === 'retrait'" class="w-3 h-3 text-white" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
              </div>

              <div @click="typeLivraison = 'livraison'"
                class="group relative flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer"
                :class="typeLivraison === 'livraison' ? 'border-[#6a0d5f] bg-[#6a0d5f]/5' : 'border-gray-50 bg-white hover:border-gray-200'">
                <div class="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M3 10h11m0 0l-4-4m4 4l-4 4" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round" />
                    <path d="M13 18h7l2-4h-7m-4 4h1a2 2 0 100-4h-1m-7 4h1a2 2 0 100-4H7m3-4V7a2 2 0 012-2h6"
                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="font-bold text-gray-900 tracking-wide">Livraison à domicile</p>
                  <p class="text-[10px] font-bold text-orange-500 tracking-wide">Frais de livraison à régler au livreur</p>
                </div>
                <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                  :class="typeLivraison === 'livraison' ? 'border-[#6a0d5f] bg-[#6a0d5f]' : 'border-gray-200'">
                  <svg v-if="typeLivraison === 'livraison'" class="w-3 h-3 text-white" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
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
                  <label class="text-[10px] font-bold text-gray-400 uppercase tracking-wide px-2">Adresse
                    complète</label>
                  <input v-model="adresse" type="text" placeholder="Quartier, Rue, Maison..."
                    class="w-full bg-gray-50 border-2 border-transparent focus:border-[#6a0d5f] focus:bg-white rounded-2xl px-6 py-4 text-gray-900 font-bold outline-none transition-all placeholder:text-gray-300" />
                </div>
                <div class="space-y-2">
                  <label class="text-[10px] font-bold text-gray-400 uppercase tracking-wide px-2">Numéro de
                    contact</label>
                  <input v-model="phone" type="text" placeholder="+22890000000"
                    class="w-full bg-gray-50 border-2 border-transparent focus:border-[#6a0d5f] focus:bg-white rounded-2xl px-6 py-4 text-gray-900 font-bold outline-none transition-all placeholder:text-gray-300" />
                </div>
              </div>
              <p class="text-[10px] font-bold text-gray-400 mt-4 uppercase tracking-wide leading-relaxed">
                Notre livreur vous contactera sur ce numéro pour coordonner la livraison.
              </p>
              <!-- Frais de livraison info -->
              <div class="mt-4 flex items-start gap-3 p-4 bg-orange-50 border border-orange-100 rounded-2xl">
                <svg class="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-[11px] font-bold text-orange-600 leading-relaxed uppercase tracking-wide">
                  Les frais de livraison sont pris en charge par le client et seront réglés directement au livreur à la réception.
                </p>
              </div>
            </div>
          </div>

          <!-- RETRAIT SUR PLACE : coordonnées librairie -->
          <div v-if="typeLivraison === 'retrait'" class="mt-12 pt-12 border-t border-gray-100 animate-fadeInUp">
            <!-- Header cliquable -->
            <button
              @click="showPickupInfo = !showPickupInfo"
              class="w-full flex items-center justify-between"
              type="button"
            >
              <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                <svg class="w-5 h-5 text-[#6a0d5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Où nous trouver ?
              </h3>
              <!-- Chevron -->
              <svg
                class="w-5 h-5 text-[#6a0d5f] transition-transform duration-300"
                :class="showPickupInfo ? 'rotate-180' : ''"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Contenu : toujours visible sur md+, déroulable sur mobile -->
            <div
              class="space-y-4 overflow-hidden transition-all duration-500"
              :class="showPickupInfo ? 'mt-6 max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'"
            >
              <!-- Adresse -->
              <div class="flex items-start gap-4 p-4 bg-[#6a0d5f]/5 rounded-2xl border border-[#6a0d5f]/10">
                <div class="w-10 h-10 rounded-xl bg-[#6a0d5f]/10 flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-[#6a0d5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p class="font-bold text-gray-900 text-sm">Librairie ICC Hountigomé</p>
                  <p class="text-gray-500 text-xs mt-0.5 leading-relaxed">Lomé, Togo — À côté de l'Impact Centre Chrétien</p>
                </div>
              </div>

              <!-- Téléphones -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a href="tel:+22892090204" class="group flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl hover:border-[#6a0d5f]/30 hover:shadow-md transition-all">
                  <div class="w-9 h-9 rounded-xl bg-[#6a0d5f]/10 flex items-center justify-center group-hover:bg-[#6a0d5f] transition-colors flex-shrink-0">
                    <svg class="w-4 h-4 text-[#6a0d5f] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <p class="font-bold text-gray-900 text-xs group-hover:text-[#6a0d5f] transition-colors">+228 92 09 02 04</p>
                    <p class="text-gray-400 text-[10px]">Principal</p>
                  </div>
                </a>
                <a href="tel:+22879762733" class="group flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl hover:border-[#6a0d5f]/30 hover:shadow-md transition-all">
                  <div class="w-9 h-9 rounded-xl bg-[#6a0d5f]/10 flex items-center justify-center group-hover:bg-[#6a0d5f] transition-colors flex-shrink-0">
                    <svg class="w-4 h-4 text-[#6a0d5f] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <p class="font-bold text-gray-900 text-xs group-hover:text-[#6a0d5f] transition-colors">+228 79 76 27 33</p>
                    <p class="text-gray-400 text-[10px]">Secondaire</p>
                  </div>
                </a>
                <a href="tel:+22890009462" class="group flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl hover:border-[#6a0d5f]/30 hover:shadow-md transition-all">
                  <div class="w-9 h-9 rounded-xl bg-[#6a0d5f]/10 flex items-center justify-center group-hover:bg-[#6a0d5f] transition-colors flex-shrink-0">
                    <svg class="w-4 h-4 text-[#6a0d5f] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <p class="font-bold text-gray-900 text-xs group-hover:text-[#6a0d5f] transition-colors">+228 90 00 94 62</p>
                    <p class="text-gray-400 text-[10px]">Secondaire</p>
                  </div>
                </a>
              </div>

              <!-- Email -->
              <a href="mailto:librairieicclome05@gmail.com" class="group flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl hover:border-[#6a0d5f]/30 hover:shadow-md transition-all">
                <div class="w-9 h-9 rounded-xl bg-[#6a0d5f]/10 flex items-center justify-center group-hover:bg-[#6a0d5f] transition-colors flex-shrink-0">
                  <svg class="w-4 h-4 text-[#6a0d5f] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p class="font-bold text-gray-900 text-xs group-hover:text-[#6a0d5f] transition-colors">librairieicclome05@gmail.com</p>
                  <p class="text-gray-400 text-[10px]">Email</p>
                </div>
              </a>

              <!-- Horaires -->
              <div class="p-4 bg-gradient-to-br from-[#6a0d5f] to-[#4a0942] rounded-2xl text-white">
                <div class="flex items-center gap-2 mb-3">
                  <svg class="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span class="text-xs font-black uppercase tracking-widest">Horaires d'ouverture</span>
                </div>
                <div class="space-y-2">
                  <div class="flex justify-between items-center py-1.5 border-b border-white/10">
                    <span class="text-white/80 text-xs font-medium">Lundi – Vendredi</span>
                    <span class="text-white font-bold text-xs bg-white/15 px-3 py-1 rounded-full">8h00 – 17h00</span>
                  </div>
                  <div class="flex justify-between items-center py-1.5">
                    <span class="text-white/80 text-xs font-medium">Dimanche</span>
                    <span class="text-white font-bold text-xs bg-white/15 px-3 py-1 rounded-full">8h00 – 14h00</span>
                  </div>
                </div>
              </div>

              <!-- Lien Maps -->
              <a href="https://maps.app.goo.gl/dR4RifFhWgnLxVps6" target="_blank" rel="noopener noreferrer"
                class="group flex items-center justify-center gap-2 w-full border-2 border-[#6a0d5f]/20 hover:border-[#6a0d5f] text-[#6a0d5f] font-bold py-3 px-6 rounded-2xl transition-all duration-300 text-xs uppercase tracking-widest hover:bg-[#6a0d5f]/5">
                <svg class="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Voir sur Google Maps
              </a>
            </div>
          </div>
        </section>

        <!-- RECAP COMMANDE -->
        <aside class="lg:col-span-4 lg:sticky lg:top-24 animate-fadeInUp" style="animation-delay: 200ms">
          <div class="bg-white rounded-3xl shadow-2xl shadow-[#6a0d5f]/10 border border-gray-100 p-5 md:p-6">
            <h2 class="text-lg font-bold text-gray-900 uppercase tracking-wide mb-6 flex items-center gap-3">
              <svg class="w-7 h-7 text-[#6a0d5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" stroke-width="2.5" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
              Votre Commande
            </h2>

            <!-- Items Brief -->
            <div class="space-y-4 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar mb-8">
              <div v-for="item in cart" :key="item.id"
                class="flex items-center gap-4 py-2 border-b border-gray-50/50 last:border-0 hover:bg-gray-50/50 rounded-xl px-1 transition-colors">
                <img :src="item.image" class="w-8 h-12 object-contain" alt="" />
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


              <div
                class="mt-6 mb-8 p-4 bg-[#6a0d5f]/5 rounded-[1.5rem] border border-[#6a0d5f]/10 text-center flex flex-col items-center">
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Total à payer</span>
                <span class="text-xl md:text-2xl font-black text-[#6a0d5f]">
                  {{ formatPrice(grandTotal) }}
                </span>
              </div>

              <button @click="submitCommande" :disabled="!canSubmit || commandeStore.loading"
                class="w-full flex items-center justify-center gap-4 bg-[#6a0d5f] text-white py-4 rounded-xl font-bold text-sm uppercase tracking-wide shadow-2xl shadow-[#6a0d5f]/30 hover:bg-[#851178] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:grayscale disabled:scale-100">
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
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
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
const showPickupInfo = ref(false);
const isDesktop = ref(false);

const updateIsDesktop = () => {
  isDesktop.value = window.innerWidth >= 768;
};

onMounted(() => {
  updateIsDesktop();
  window.addEventListener('resize', updateIsDesktop);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIsDesktop);
});

const grandTotal = computed(() => total.value);

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
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
