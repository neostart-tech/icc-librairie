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
            Suivez l'état de vos commandes et déclarez vos paiements en quelques clics.
          </p>
       </div>
    </section>

    <!-- Stats Section -->
     <div class="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div v-reveal class="bg-white shadow-2xl shadow-purple-900/5 rounded-xl p-5 border border-white flex items-center justify-between group hover:scale-[1.02] transition-all duration-500">
           <div class="space-y-1">
             <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Commandes</p>
               <p class="text-2xl font-bold text-[#6a0d5f] tracking-wide">{{ commandeStore.commandes.length }}</p>
           </div>
            <div class="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center text-[#6a0d5f] group-hover:bg-[#6a0d5f] group-hover:text-white transition-all duration-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
           </div>
        </div>

         <div v-reveal class="bg-white shadow-2xl shadow-purple-900/5 rounded-xl p-5 border border-white flex items-center justify-between group hover:scale-[1.02] transition-all duration-500">
           <div class="space-y-1">
             <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">En attente de paiement</p>
               <p class="text-2xl font-bold text-orange-500 tracking-wide">{{ pendingPaymentCount }}</p>
           </div>
            <div class="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
           </div>
        </div>

         <div v-reveal class="bg-white shadow-2xl shadow-purple-900/5 rounded-xl p-5 border border-white flex items-center justify-between group hover:scale-[1.02] transition-all duration-500">
           <div class="space-y-1">
             <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Commandes livrées</p>
               <p class="text-2xl font-bold text-green-500 tracking-wide">{{ deliveredCount }}</p>
           </div>
            <div class="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
           </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
     <main class="max-w-7xl mx-auto px-6 mt-8">
       <div v-reveal class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div class="space-y-1">
           <h2 class="text-lg font-bold text-gray-900 uppercase tracking-wide">Historique des commandes</h2>
          <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">{{ commandeStore.commandes.length }} commandes enregistrées</p>
        </div>
      </div>

      <!-- Orders List -->
      <div v-if="paginatedOrders.length > 0" class="space-y-4">
        <div 
          v-for="(order, idx) in paginatedOrders" 
          :key="order.reference"
          v-reveal
           class="bg-white rounded-2xl p-6 shadow-xl shadow-purple-900/5 border border-white flex flex-col lg:flex-row items-center justify-between gap-6 hover:shadow-2xl hover:border-[#6a0d5f]/10 transition-all duration-500 group"
        >
          <!-- Order Info -->
           <div class="flex items-center gap-5 w-full lg:w-auto">
              <div class="w-14 h-14 rounded-2xl bg-[#6a0d5f]/5 flex items-center justify-center text-[#6a0d5f] font-black text-sm group-hover:bg-[#6a0d5f] group-hover:text-white transition-all duration-500">
               {{ (currentPage - 1) * itemsPerPage + idx + 1 }}
             </div>
             <div class="space-y-1 flex-1">
               <div class="flex flex-wrap items-center gap-3">
                  <span class="text-lg font-bold text-gray-900 tracking-wide">#{{ order.reference }}</span>
                  <span 
                    class="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm border"
                    :class="getStatusClasses(order.statut)"
                  >
                    {{ getStatusLabel(order.statut) }}
                  </span>
               </div>
               <div class="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke-width="2"/></svg>
                    {{ formatDate(order.created_at) }}
                  </p>
                  <p v-if="order.type_livraison === 'livraison'" class="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-2">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 18h7l2-4h-7m-4 4h1a2 2 0 100-4h-1m-7 4h1a2 2 0 100-4H7m3-4V7a2 2 0 012-2h6" stroke-width="2" /></svg>
                    Livraison à domicile
                  </p>
               </div>
             </div>
          </div>

          <!-- Price -->
          <div class="w-full lg:w-auto flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-2 px-4 py-2 bg-gray-50 rounded-xl lg:bg-transparent">
              <span class="lg:hidden text-[10px] font-black text-gray-400 uppercase tracking-widest">Montant Total</span>
              <div class="text-xl font-bold text-[#6a0d5f] tracking-wide">{{ formatPrice((order.prix_total || 0) + (order.frais_livraison || 0)) }}</div>
          </div>

          <!-- Actions -->
          <div class="w-full lg:w-auto flex flex-wrap gap-3">
            <button 
              v-if="order.statut === 'en_cours' || order.statut === 'paiement_refuse'"
              @click="openDeclarationModal(order)"
              class="flex-1 lg:flex-none bg-orange-500 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-orange-600 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-orange-500/20"
            >
              Déclarer le paiement
            </button>
            <button 
              @click="openDetails(order)"
               class="flex-1 lg:flex-none bg-gray-900 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#6a0d5f] hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-black/10"
            >
              Détails
            </button>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-12 pt-10 border-t border-gray-100">
           <button @click="currentPage > 1 && (currentPage--)" :disabled="currentPage === 1" class="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#6a0d5f] disabled:opacity-30">
             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
           </button>
           <button v-for="p in totalPages" :key="p" @click="currentPage = p" class="w-12 h-12 rounded-2xl font-black text-[10px] transition-all" :class="currentPage === p ? 'bg-[#6a0d5f] text-white shadow-xl' : 'bg-white border border-gray-100 text-gray-400'">
             {{ p }}
           </button>
           <button @click="currentPage < totalPages && (currentPage++)" :disabled="currentPage === totalPages" class="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#6a0d5f] disabled:opacity-30">
             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
           </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="bg-white rounded-2xl p-20 text-center border-4 border-dashed border-gray-100 mt-10">
        <div class="w-32 h-32 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-8">
           <svg class="w-16 h-16 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" stroke-width="2"/></svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 uppercase mb-4">Aucune commande</h3>
        <NuxtLink to="/catalogue" class="inline-block bg-[#6a0d5f] text-white px-10 py-5 rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl">
          Découvrir le catalogue
        </NuxtLink>
      </div>
    </main>

    <!-- Modal Détails -->
    <Transition name="modal">
      <div v-if="showDetailsModal" class="fixed inset-0 z-[100] flex items-center justify-center px-6 py-10" @click.self="showDetailsModal = false">
        <div class="absolute inset-0 bg-[#6a0d5f]/60 backdrop-blur-md"></div>
        <div class="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
           <div class="p-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
             <div>
               <h3 class="text-lg font-bold text-gray-900 uppercase tracking-wide">Commande #{{ selectedOrder?.reference }}</h3>
               <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Effectuée le {{ formatDate(selectedOrder?.created_at) }}</p>
             </div>
             <button @click="showDetailsModal = false" class="p-2 hover:bg-white rounded-xl transition-all"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
           </div>

           <div class="flex-1 overflow-y-auto p-6 space-y-6">
             <!-- Items -->
             <div class="space-y-4">
               <div v-for="d in selectedOrder?.detailcommandes" :key="d.id" class="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4">
                 <div class="w-12 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 shadow-sm border border-white">
                   <img :src="d.livre?.image ? `${useRuntimeConfig().public.storageBase}/${d.livre.image}` : '/images/livre.jpg'" class="w-full h-full object-cover" alt="" />
                 </div>
                 <div class="flex-1 min-w-0">
                   <h5 class="font-bold text-gray-900 text-sm truncate">{{ d.livre?.titre }}</h5>
                   <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">{{ d.quantite }} × {{ formatPrice(d.prix_unitaire) }}</p>
                 </div>
                 <div class="font-black text-[#6a0d5f] text-sm">{{ formatPrice(d.prix_unitaire * d.quantite) }}</div>
               </div>
             </div>

             <!-- Delivery Info -->
             <div v-if="selectedOrder?.type_livraison === 'livraison'" class="p-5 bg-blue-50 rounded-2xl border border-blue-100 space-y-2">
               <p class="text-[10px] font-black text-blue-600 uppercase tracking-widest">Informations de livraison</p>
               <p class="text-sm font-bold text-gray-800">{{ selectedOrder.adresse_livraison }}</p>
               <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Contact : {{ selectedOrder.numero_livraison }}</p>
             </div>

             <!-- Summary -->
             <div class="bg-gray-900 rounded-2xl p-6 text-white space-y-3">
               <div class="flex justify-between text-white/50 text-[10px] font-bold uppercase tracking-widest">
                 <span>Sous-Total</span>
                 <span>{{ formatPrice(selectedOrder?.prix_total) }}</span>
               </div>
               <div v-if="selectedOrder?.frais_livraison > 0" class="flex justify-between text-white/50 text-[10px] font-bold uppercase tracking-widest">
                 <span>Frais de livraison</span>
                 <span>{{ formatPrice(selectedOrder?.frais_livraison) }}</span>
               </div>
               <div class="h-px bg-white/10 my-2"></div>
               <div class="flex justify-between items-center">
                 <span class="text-sm font-black text-orange-400 uppercase tracking-widest">Total</span>
                 <span class="text-2xl font-bold">{{ formatPrice((selectedOrder?.prix_total || 0) + (selectedOrder?.frais_livraison || 0)) }}</span>
               </div>
             </div>
           </div>
        </div>
      </div>
    </Transition>

    <!-- Modal Déclaration Paiement -->
    <Transition name="modal">
      <div v-if="showDeclarationModal" class="fixed inset-0 z-[110] flex items-center justify-center px-6 py-10" @click.self="showDeclarationModal = false">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-md"></div>
        <div class="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 animate-fadeInUp">
          <button @click="showDeclarationModal = false" class="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>

          <h3 class="text-xl font-bold text-gray-900 uppercase tracking-wide mb-2">Déclarer mon paiement</h3>
          <p class="text-xs text-gray-400 font-medium mb-8">Veuillez fournir la référence ou une capture d'écran de votre transaction.</p>

          <form @submit.prevent="submitDeclaration" class="space-y-6">
            <div class="space-y-2">
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Référence de transaction</label>
              <input v-model="declarationRef" type="text" placeholder="Ex: TXN123456789" class="w-full bg-gray-50 border-2 border-transparent focus:border-[#6a0d5f] focus:bg-white rounded-2xl px-6 py-4 text-gray-900 font-bold outline-none transition-all placeholder:text-gray-300" />
            </div>

            <div class="space-y-2">
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Capture d'écran (Optionnel)</label>
              <div class="relative group">
                <input type="file" @change="handleFileChange" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer z-10" />
                <div class="w-full bg-gray-50 border-2 border-dashed border-gray-200 group-hover:border-[#6a0d5f] rounded-2xl p-8 text-center transition-all">
                  <svg v-if="!declarationFile" class="w-10 h-10 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" stroke-width="2" /></svg>
                  <p v-if="!declarationFile" class="text-[10px] font-bold text-gray-400 uppercase">Cliquez pour ajouter une image</p>
                  <p v-else class="text-[10px] font-bold text-[#6a0d5f] uppercase">{{ declarationFile.name }}</p>
                </div>
              </div>
            </div>

            <div class="flex gap-3 pt-2">
              <button type="button" @click="showDeclarationModal = false" class="flex-1 bg-gray-100 text-gray-500 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all">
                Annuler
              </button>
              <button type="submit" :disabled="loadingDeclaration || (!declarationRef && !declarationFile)" class="flex-[2] bg-[#6a0d5f] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-[#851178] disabled:opacity-50 transition-all">
                <span v-if="loadingDeclaration">Envoi en cours...</span>
                <span v-else>Envoyer</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCommandeStore } from "~~/stores/commande";
import Swal from 'sweetalert2';

const commandeStore = useCommandeStore();
const currentPage = ref(1);
const itemsPerPage = 8;

const showDetailsModal = ref(false);
const selectedOrder = ref(null);

const showDeclarationModal = ref(false);
const selectedOrderForDecl = ref(null);
const declarationRef = ref("");
const declarationFile = ref(null);
const loadingDeclaration = ref(false);

const formatPrice = (price) => {
  const amount = parseFloat(price);
  if (isNaN(amount)) return '0 FCFA';
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
};

const getStatusLabel = (statut) => {
  const labels = {
    'en_cours': 'En attente de paiement',
    'en_attente_validation': 'Paiement en attente de validation',
    'valide': 'Payée & En préparation',
    'traite': 'Livrée / Terminée',
    'paiement_refuse': 'Paiement refusé'
  };
  return labels[statut] || statut;
};

const getStatusClasses = (statut) => {
  const classes = {
    'en_cours': 'bg-orange-50 text-orange-500 border-orange-100',
    'en_attente_validation': 'bg-blue-50 text-blue-500 border-blue-100',
    'valide': 'bg-green-50 text-green-500 border-green-100',
    'traite': 'bg-gray-50 text-gray-500 border-gray-100',
    'paiement_refuse': 'bg-red-50 text-red-500 border-red-100'
  };
  return classes[statut] || '';
};

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return commandeStore.commandes.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => Math.ceil(commandeStore.commandes.length / itemsPerPage));

const pendingPaymentCount = computed(() => commandeStore.commandes.filter(c => c.statut === 'en_cours' || c.statut === 'paiement_refuse').length);
const deliveredCount = computed(() => commandeStore.commandes.filter(c => c.statut === 'traite').length);

const openDetails = (order) => {
  selectedOrder.value = order;
  showDetailsModal.value = true;
};

const openDeclarationModal = (order) => {
  selectedOrderForDecl.value = order;
  declarationRef.value = "";
  declarationFile.value = null;
  showDeclarationModal.value = true;
};

const handleFileChange = (e) => {
  declarationFile.value = e.target.files[0];
};

const submitDeclaration = async () => {
  if (!selectedOrderForDecl.value) return;
  
  loadingDeclaration.value = true;
  try {
    const formData = new FormData();
    if (declarationRef.value) formData.append('reference_paiement_client', declarationRef.value);
    if (declarationFile.value) formData.append('preuve_paiement', declarationFile.value);

    await commandeStore.declarerPaiement(selectedOrderForDecl.value.id, formData);
    
    showDeclarationModal.value = false;
    Swal.fire({
      title: 'Déclaration envoyée !',
      text: 'Votre paiement est en cours de vérification par nos administrateurs. Vous recevrez une notification dès validation.',
      icon: 'success',
      confirmButtonColor: '#6a0d5f',
      customClass: { popup: 'rounded-[2rem]' }
    });
  } catch (e) {
    console.error(e);
    Swal.fire({
      title: 'Erreur',
      text: 'Impossible d\'envoyer la déclaration. Veuillez vérifier vos fichiers.',
      icon: 'error',
      confirmButtonColor: '#6a0d5f'
    });
  } finally {
    loadingDeclaration.value = false;
  }
};

onMounted(() => {
  commandeStore.fetchMyOrders();
});

definePageMeta({
  layout: "default",
  middleware: "auth",
});
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.95) translateY(20px); }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeInUp { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

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
