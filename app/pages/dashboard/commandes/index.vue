<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <!-- Hero Section -->
    <section class="relative bg-[#6a0d5f] pt-24 pb-36 overflow-hidden">
      <!-- Decor -->
       <div class="absolute inset-0 opacity-10">
         <div class="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-[100px]"></div>
         <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-400 rounded-full blur-[100px]"></div>
       </div>

       <div class="max-w-7xl mx-auto px-6 relative z-10 text-center md:text-left">
          <div v-reveal class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/80 text-xs font-black uppercase tracking-[0.2em] mb-6">
            <svg class="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Espace Personnel
          </div>
           <h1 v-reveal class="text-3xl md:text-4xl font-bold text-white uppercase tracking-wide leading-none mb-3">
            Mes <span class="text-orange-400">Commandes</span>
          </h1>
          <p v-reveal class="text-white/60 text-lg font-medium max-w-2xl">
            Retrouvez l'historique complet de vos acquisitions littéraires et suivez l'évolution de vos lectures.
          </p>
       </div>
    </section>

    <!-- Stats Section (Floated) -->
     <div class="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div v-reveal class="reveal-delay-100 bg-white shadow-2xl shadow-purple-900/5 rounded-xl p-5 border border-white flex items-center justify-between group hover:scale-[1.02] transition-all duration-500">
           <div class="space-y-1">
             <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Commandes</p>
               <p class="text-2xl font-bold text-[#6a0d5f] tracking-wide">{{ totalProcessedOrders }}</p>
           </div>
            <div class="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center text-[#6a0d5f] group-hover:bg-[#6a0d5f] group-hover:text-white transition-all duration-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
           </div>
        </div>

         <div v-reveal class="reveal-delay-200 bg-white shadow-2xl shadow-purple-900/5 rounded-xl p-5 border border-white flex items-center justify-between group hover:scale-[1.02] transition-all duration-500">
           <div class="space-y-1">
             <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Investissement Total</p>
               <p class="text-2xl font-bold text-orange-500 tracking-wide">{{ totalSpent }} <span class="text-sm font-bold ml-1">FCFA</span></p>
           </div>
            <div class="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
           </div>
        </div>

         <div v-reveal class="reveal-delay-300 bg-white shadow-2xl shadow-purple-900/5 rounded-xl p-5 border border-white flex items-center justify-between group hover:scale-[1.02] transition-all duration-500">
           <div class="space-y-1">
             <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Panier Moyen</p>
               <p class="text-2xl font-bold text-blue-500 tracking-wide">{{ averageOrder }} <span class="text-sm font-bold ml-1">FCFA</span></p>
           </div>
            <div class="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
           </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
     <main class="max-w-7xl mx-auto px-6 mt-8">
       <div v-reveal class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div class="space-y-1">
           <h2 class="text-lg font-bold text-gray-900 uppercase tracking-wide">Historique des transactions</h2>
          <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">{{ processedOrders.length }} commandes enregistrées</p>
        </div>
      </div>

      <!-- Orders List -->
      <div v-if="paginatedOrders.length > 0" class="space-y-4">
        <div 
          v-for="(order, idx) in paginatedOrders" 
          :key="order.reference"
          v-reveal
           class="bg-white rounded-xl p-4 md:p-5 shadow-xl shadow-purple-900/5 border border-white flex flex-col md:flex-row items-center justify-between gap-4 hover:shadow-2xl hover:border-[#6a0d5f]/10 transition-all duration-500 group"
        >
          <!-- Order Info -->
           <div class="flex items-center gap-4 w-full md:w-auto">
              <div class="w-12 h-12 rounded-xl bg-[#6a0d5f]/5 flex items-center justify-center text-[#6a0d5f] font-black text-sm group-hover:bg-[#6a0d5f] group-hover:text-white transition-colors duration-500">
               {{ (currentPage - 1) * itemsPerPage + idx + 1 }}
             </div>
             <div class="space-y-1">
               <div class="flex items-center gap-3">
                  <span class="text-base font-bold text-gray-900 tracking-wide">#{{ order.reference }}</span>
                   <span 
                    class="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-sm"
                    :class="order.statut === 'traite' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'"
                  >
                    {{ order.statut === 'traite' ? 'Livr\xE9e' : 'En cours de traitement' }}
                  </span>
               </div>
               <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                 <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke-width="2"/></svg>
                 {{ order.date }} à {{ order.heure }}
               </p>
             </div>
          </div>

          <!-- Price & Payment -->
          <div class="w-full md:w-auto flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2">
              <div class="text-lg font-bold text-[#6a0d5f] tracking-wide">{{ order.montant }}</div>
             <div class="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-lg text-gray-400">
                <span class="text-[8px] font-bold uppercase tracking-widest items-center flex gap-1">
                  <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" stroke-width="3"/></svg>
                  Paiement Rapide
                </span>
             </div>
          </div>

          <!-- Action -->
          <button 
            @click="openDetails(order._raw)"
             class="w-full md:w-auto bg-gray-900 text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#6a0d5f] hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-black/10"
          >
            Détails Commande
          </button>
        </div>

        <!-- Pagination Controls -->
        <div v-if="totalPages > 1" v-reveal class="flex justify-center items-center gap-2 mt-12 pt-10 border-t border-gray-100">
           <button 
             @click="currentPage > 1 && (currentPage--)" 
             :disabled="currentPage === 1"
             class="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#6a0d5f] hover:border-[#6a0d5f] hover:shadow-xl transition-all disabled:opacity-30 disabled:hover:shadow-none active:scale-90"
           >
             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
           </button>

           <div class="flex items-center gap-2 px-3">
             <button 
               v-for="p in totalPages" :key="p"
               @click="currentPage = p"
               class="w-12 h-12 rounded-2xl font-black text-[10px] transition-all duration-500"
               :class="currentPage === p ? 'bg-[#6a0d5f] text-white shadow-xl shadow-purple-900/20 scale-110' : 'bg-white border border-gray-100 text-gray-400 hover:text-[#6a0d5f] hover:border-[#6a0d5f]'"
             >
               {{ p < 10 ? '0' + p : p }}
             </button>
           </div>

           <button 
             @click="currentPage < totalPages && (currentPage++)" 
             :disabled="currentPage === totalPages"
             class="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#6a0d5f] hover:border-[#6a0d5f] hover:shadow-xl transition-all disabled:opacity-30 disabled:hover:shadow-none active:scale-90"
           >
             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
           </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else v-reveal class="bg-white rounded-xl p-20 text-center border-4 border-dashed border-gray-100 mt-10">
        <div class="w-32 h-32 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-8 animate-bounce">
           <svg class="w-16 h-16 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" stroke-width="2"/></svg>
        </div>
        <h3 class="text-3xl font-bold text-gray-900 tracking-wide mb-4 uppercase">Aucune commande</h3>
        <p class="text-gray-400 font-medium max-w-sm mx-auto mb-10">
          Vous n'avez pas encore effectué d'achats. Une multitude de trésors littéraires vous attendent !
        </p>
        <NuxtLink to="/catalogue" class="inline-block bg-[#6a0d5f] text-white px-10 py-5 rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-[#851178] transition-all">
          Découvrir le catalogue
        </NuxtLink>
      </div>
    </main>

    <!-- Modal Détails -->
    <Transition name="modal">
      <div 
        v-if="showDetailsModal" 
        class="fixed inset-0 z-[100] flex items-center justify-center px-6 py-10 overflow-hidden"
        @click.self="showDetailsModal = false"
      >
        <div class="absolute inset-0 bg-[#6a0d5f]/60 backdrop-blur-md"></div>
        
        <div v-reveal class="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          <!-- Header Modal -->
           <div class="p-5 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
            <div class="space-y-1">
               <h3 class="text-lg font-bold text-gray-900 uppercase tracking-wide">Facture #{{ selectedCommande?.reference }}</h3>
              <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-green-500"></span>
                Commande payée le {{ new Date(selectedCommande?.created_at).toLocaleDateString() }}
              </p>
            </div>
            <button @click="showDetailsModal = false" class="p-4 bg-white rounded-2xl shadow-lg border border-gray-100 text-gray-400 hover:text-red-500 transition-all active:scale-90">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>

          <!-- Body Modal -->
           <div class="flex-1 overflow-y-auto p-5 space-y-6">
            <div class="space-y-6">
              <div class="flex items-center gap-3">
                 <div class="w-10 h-1 text-orange-400 bg-orange-400 rounded-full"></div>
                 <h4 class="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Articles commandés</h4>
              </div>
              <div class="space-y-4">
                <div v-for="d in selectedCommande?.detailcommandes" :key="d.id" class="p-5 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between gap-4 group hover:border-[#6a0d5f]/20 transition-all">
                  <NuxtLink :to="`/livres/${d.livre?.id}`" class="flex items-center gap-4 hover:opacity-80 transition-opacity flex-1">
                    <div class="w-12 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 shadow-sm border border-white group-hover:scale-105 transition-transform">
                       <img v-if="d.livre?.image" :src="`${useRuntimeConfig().public.storageBase}/${d.livre.image}`" class="w-full h-full object-cover" alt="" />
                    </div>
                    <div>
                      <h5 class="font-bold text-gray-900 text-sm tracking-wide group-hover:text-[#6a0d5f] transition-colors">{{ d.livre?.titre }}</h5>
                      <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest">{{ d.livre?.titre }} • Qté : {{ d.quantite }} • {{ d.prix_unitaire.toLocaleString() }} FCFA / u</p>
                    </div>
                  </NuxtLink>
                  <div class="font-black text-[#6a0d5f] text-sm">{{ (d.prix_unitaire * d.quantite).toLocaleString() }} FCFA</div>
                </div>
              </div>
            </div>

            <!-- Summary -->
             <div class="bg-gray-900 rounded-xl p-5 text-white space-y-4 shadow-2xl">
               <div class="flex justify-between items-center text-white/50">
                 <span class="text-[10px] font-bold uppercase tracking-widest">Sous-Total</span>
                 <span class="font-bold">{{ selectedCommande?.prix_total.toLocaleString() }} FCFA</span>
               </div>
               <div class="h-px bg-white/10"></div>
               <div class="flex justify-between items-end">
                 <div class="space-y-1">
                   <p class="text-[10px] font-black text-orange-400 uppercase tracking-widest">Montant Total Payé</p>
                     <p class="text-xl font-bold tracking-wide">{{ selectedCommande?.prix_total.toLocaleString() }} <span class="text-sm border-l border-white/20 ml-2 pl-2">FCFA</span></p>
                 </div>
                 <div class="bg-white/10 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-white/10">Facture Payée</div>
               </div>
            </div>

            <!-- Payment Info -->
            <div class="space-y-4">
               <div class="flex items-center gap-3">
                 <div class="w-10 h-1 text-blue-400 bg-blue-400 rounded-full"></div>
                 <h4 class="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Mode de règlement</h4>
               </div>
               <div class="grid grid-cols-2 gap-4">
                  <div class="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col gap-2">
                   <span class="text-[8px] font-black text-gray-400 uppercase tracking-widest">Processeur</span>
                   <div class="flex items-center gap-3">
                      <img v-if="getMoyenPaiementLogo(selectedCommande?.paiements?.[0]?.moyen_paiement)" :src="getMoyenPaiementLogo(selectedCommande?.paiements?.[0]?.moyen_paiement)" class="h-6 w-auto" alt="" />
                      <span class="font-black text-gray-900 text-[10px] uppercase tracking-widest">{{ getMoyenPaiementLabel(selectedCommande?.paiements?.[0]?.moyen_paiement) }}</span>
                   </div>
                 </div>
                  <div class="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col gap-2 overflow-hidden">
                   <span class="text-[8px] font-black text-gray-400 uppercase tracking-widest">N° Transaction</span>
                   <span class="font-black text-gray-900 text-[10px] uppercase tracking-tighter break-all truncate">{{ selectedCommande?.paiements?.[0]?.reference_transaction || '---' }}</span>
                 </div>
               </div>
            </div>
          </div>

          <!-- Footer Modal -->
           <div class="p-4 bg-white border-t border-gray-100 flex justify-center">
             <button @click="showDetailsModal = false" class="w-full bg-gray-900 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#6a0d5f] transition-all duration-300">
              Fermer la visualisation
            </button>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCommandeStore } from "~~/stores/commande";
import { useGatewayStore } from "~~/stores/gateway";
import Swal from 'sweetalert2';

const gatewayStore = useGatewayStore();
const commandeStore = useCommandeStore();

// Pagination
const itemsPerPage = 5;
const currentPage = ref(1);

// Modale
const showDetailsModal = ref(false);
const selectedCommande = ref(null);

// Fonction pour ouvrir la modale
const openDetails = (commande) => {
  selectedCommande.value = commande;
  showDetailsModal.value = true;
};

const getMoyenPaiementLabel = (moyen) => {
  if (!moyen) return "-";
  const gateway = gatewayStore.gatewayMap[moyen];
  if (!gateway) return moyen;
  return gateway.libelle;
};

const getMoyenPaiementLogo = (moyen) => {
  const gateway = gatewayStore.gatewayMap[moyen];
  return gateway?.logo_url ?? null;
};

// Commandes traitées et terminées
const processedOrders = computed(() =>
  commandeStore.commandes
    .filter((c) => c.statut === "termine" || c.statut === "traite")
    .slice() // Copy to avoid mutating store if needed
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Most recent first
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

// Unified Pagination Logic
const totalPages = computed(() => Math.ceil(processedOrders.value.length / itemsPerPage));

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return processedOrders.value.slice(start, start + itemsPerPage);
});

// Statistiques
const totalProcessedOrders = computed(
  () => processedOrders.value.length
);

const totalSpent = computed(() =>
  processedOrders.value
    .reduce((sum, o) => sum + o._raw.prix_total, 0)
    .toLocaleString()
);

const averageOrder = computed(() => {
  if (processedOrders.value.length === 0) return 0;
  const total = processedOrders.value.reduce((sum, o) => sum + o._raw.prix_total, 0);
  return Math.round(total / processedOrders.value.length).toLocaleString();
});

// Chargement des commandes
onMounted(async () => {
  await Promise.all([
    commandeStore.fetchMyOrders(),
    gatewayStore.fetchGateways(),
  ]);
});

definePageMeta({
  layout: "default",
  middleware: "auth",
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.modal-enter-active { transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
.modal-leave-active { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.modal-enter-from { opacity: 0; transform: scale(0.9) translateY(20px); }
.modal-leave-to { opacity: 0; transform: scale(0.9) translateY(20px); }

/* Hide scrollbar for the items list in modal if needed */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #eee;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #ddd;
}
</style>
