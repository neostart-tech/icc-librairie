<template>
   <div class="min-h-screen bg-gray-50 pb-20">
      <!-- Hero Section -->
      <section class="relative bg-[#6a0d5f] pt-24 pb-36 overflow-hidden">
         <div class="absolute inset-0 opacity-10">
            <div class="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-[100px]"></div>
            <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-400 rounded-full blur-[100px]"></div>
         </div>

         <div class="max-w-4xl mx-auto px-6 relative z-10 text-center">
            <NuxtLink v-reveal to="/dashboard/commandes"
               class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/80 text-[10px] font-bold uppercase tracking-wide mb-8 hover:bg-white/20 transition-all">
               <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke-width="3" stroke-linecap="round"
                     stroke-linejoin="round" />
               </svg>
               Retour aux commandes
            </NuxtLink>
            <h1 v-reveal class="text-3xl md:text-4xl font-bold text-white uppercase tracking-wide leading-none mb-3">
               Facture <span class="text-orange-400">#{{ commande?.reference }}</span>
            </h1>
            <div v-reveal
               class="flex flex-wrap items-center justify-center gap-4 text-white/60 text-xs font-bold uppercase tracking-widest mt-6">
               <span class="px-3 py-1 bg-white/10 rounded-lg border border-white/10">{{ new
                  Date(commande?.created_at).toLocaleDateString() }}</span>
               <span class="w-1.5 h-1.5 rounded-full bg-white/20"></span>
               <span v-if="commande?.statut === 'traite'"
                  class="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg border border-green-500/20">Commande
                  Livrée</span>
               <span v-else-if="commande?.statut === 'termine'"
                  class="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-lg border border-orange-500/20">En cours de
                  traitement</span>
            </div>
         </div>
      </section>

      <!-- Main Content -->
      <main class="max-w-4xl mx-auto px-6 -mt-16 relative z-20">
         <div v-if="commande" class="space-y-8">
            <!-- Order Items Card -->
            <div v-reveal class="bg-white rounded-xl shadow-2xl p-6 md:p-8 border border-white">
               <div class="flex items-center gap-3 mb-6">
                  <div class="w-12 h-1 text-[#6a0d5f] bg-[#6a0d5f] rounded-full"></div>
                  <h2 class="text-xl font-bold text-gray-900 uppercase tracking-wide">Articles de la commande</h2>
               </div>

               <div class="space-y-6">
                  <div v-for="(detail, idx) in commande.detailcommandes" :key="detail.id"
                     class="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 group hover:border-[#6a0d5f]/20 transition-all cursor-default">
                     <NuxtLink :to="`/livres/${detail.livre?.id}`"
                        class="flex items-center gap-4 w-full md:w-auto hover:opacity-80 transition-opacity">
                        <div
                           class="w-14 h-20 rounded-lg bg-gray-200 overflow-hidden shadow-md border-2 border-white group-hover:scale-110 transition-transform duration-500">
                           <img v-if="detail.livre?.image"
                              :src="`${useRuntimeConfig().public.storageBase}/${detail.livre.image}`"
                              class="w-full h-full object-cover" alt="" />
                        </div>
                        <div class="space-y-1">
                           <h3
                              class="text-sm font-bold text-gray-900 tracking-wide leading-tight group-hover:text-[#6a0d5f] transition-colors">
                              {{ detail.livre?.titre }}</h3>
                           <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">{{
                              detail.livre?.titre }} • Quantité : {{ detail.quantite }} • {{
                                 detail.prix_unitaire.toLocaleString() }} FCFA</p>
                           <div
                              class="inline-flex items-center gap-1 text-[8px] font-black text-orange-500 uppercase tracking-widest mt-2 px-2 py-0.5 bg-orange-50 rounded-md">
                              <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z"
                                    stroke-width="3" />
                              </svg>
                              Voir le livre
                           </div>
                        </div>
                     </NuxtLink>
                     <div
                        class="w-full md:w-auto text-right md:text-right border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                        <span class="text-base font-bold text-[#6a0d5f] tracking-wide">{{ (detail.prix_unitaire *
                           detail.quantite).toLocaleString() }} FCFA</span>
                     </div>
                  </div>
               </div>

               <!-- Totals -->
               <div class="mt-6 pt-6 border-t border-gray-100 space-y-3">
                  <div class="flex justify-between items-center text-gray-400">
                     <span class="text-[10px] font-bold uppercase tracking-widest">Sous-Total</span>
                     <span class="font-bold text-gray-900">{{ commande.prix_total.toLocaleString() }} FCFA</span>
                  </div>

                  <div class="pt-4 flex justify-between items-end">
                     <div class="space-y-1">
                        <p class="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Montant Total Réglé
                        </p>
                        <p class="text-2xl font-bold text-[#6a0d5f] tracking-wide">{{
                           commande.prix_total.toLocaleString() }} <span class="text-sm font-bold ml-1">FCFA</span></p>
                     </div>
                     <div
                        class="hidden sm:block px-4 py-2 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">
                        Statut : {{ commande?.statut === 'traite' ? 'Livrée' : 'En cours de traitement' }}
                     </div>
                  </div>
               </div>
            </div>

            <!-- Payment & Info Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
               <!-- Customer Card -->
               <div v-reveal class="reveal-delay-100 bg-white rounded-xl shadow-xl p-6 border border-white space-y-5">
                  <div class="flex items-center gap-3">
                     <div class="w-10 h-1 text-blue-500 bg-blue-500 rounded-full"></div>
                     <h2 class="text-lg font-bold text-gray-900 uppercase tracking-wide">Client</h2>
                  </div>
                  <div class="space-y-4">
                     <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                           <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                           </svg>
                        </div>
                        <div>
                           <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Nom complet</p>
                           <p class="font-bold text-gray-900 tracking-wide">{{ commande.user?.prenom ||
                              userStore.user?.prenom }} {{ commande.user?.nom || userStore.user?.nom }}</p>
                        </div>
                     </div>
                     <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                           <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                 d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                           </svg>
                        </div>
                        <div>
                           <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Email</p>
                           <p class="font-bold text-gray-900 tracking-wide">{{ commande.user?.email ||
                              userStore.user?.email }}</p>
                        </div>
                     </div>
                  </div>
               </div>

               <!-- Payment Card -->
               <div v-reveal class="reveal-delay-200 bg-white rounded-xl shadow-xl p-6 border border-white space-y-5">
                  <div class="flex items-center gap-3">
                     <div class="w-10 h-1 text-green-500 bg-green-500 rounded-full"></div>
                     <h2 class="text-lg font-bold text-gray-900 uppercase tracking-wide">Paiement</h2>
                  </div>
                  <div class="space-y-6">
                     <div class="p-4 rounded-xl bg-gray-50 border border-gray-100">
                        <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-4">Méthode utilisée
                        </p>
                        <div class="flex items-center gap-4">
                           <img v-if="getMoyenPaiementLogo(commande.paiements?.[0]?.moyen_paiement)"
                              :src="getMoyenPaiementLogo(commande.paiements?.[0]?.moyen_paiement)" class="h-8 w-auto"
                              alt="" />
                           <span class="font-black text-gray-900 text-sm uppercase tracking-widest">{{
                              getMoyenPaiementLabel(commande.paiements?.[0]?.moyen_paiement) }}</span>
                        </div>
                     </div>
                     <div class="px-6 space-y-1">
                        <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest">N° de transaction</p>
                        <p class="font-black text-gray-900 text-[10px] break-all uppercase tracking-tighter">{{
                           commande.paiements?.[0]?.reference_transaction || '---' }}</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </main>

   </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCommandeStore } from "~~/stores/commande";
import { useUserStore } from "~~/stores/user";
import { useGatewayStore } from "~~/stores/gateway";

const route = useRoute();
const commandeStore = useCommandeStore();
const userStore = useUserStore();
const gatewayStore = useGatewayStore();

const commande = ref(null);

// Récupération sécurisée
const fetchCommande = async () => {
   if (!route.params.id) return;
   try {
      const res = await commandeStore.fetchCommande(route.params.id);
      commande.value = res.data;
   } catch (e) {
      console.error("Erreur chargement commande", e);
   }
};

const getMoyenPaiementLabel = (moyen) => {
   if (!moyen) return "—";
   const gateway = gatewayStore.gatewayMap[moyen];
   return gateway?.libelle || moyen;
};

const getMoyenPaiementLogo = (moyen) => {
   const gateway = gatewayStore.gatewayMap[moyen];
   return gateway?.logo_url ?? null;
};

onMounted(async () => {
   await fetchCommande();
   await gatewayStore.fetchGateways();
});

definePageMeta({
   layout: "default",
   middleware: "auth",
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
   transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
   opacity: 0;
}
</style>
