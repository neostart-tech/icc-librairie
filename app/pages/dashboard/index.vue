<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <!-- Hero Section -->
    <section class="relative bg-[#6a0d5f] pt-24 pb-36 overflow-hidden">
       <!-- Decorative elements -->
       <div class="absolute inset-0 opacity-10">
         <div class="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-[100px]"></div>
         <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-400 rounded-full blur-[100px]"></div>
       </div>

       <div class="max-w-7xl mx-auto px-6 relative z-10">
          <div v-reveal class="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div class="space-y-4">
              <span class="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/80 text-[10px] font-bold uppercase tracking-wide">
                Tableau de bord
              </span>
               <h1 class="text-3xl md:text-4xl font-bold text-white uppercase tracking-wide leading-none">
                Bonjour, <br/>
                <span class="text-orange-400">{{ userFirstName ?? "Cher Client" }}</span>
              </h1>
              <p class="text-white/60 text-sm font-medium max-w-md">Ravi de vous revoir ! Voici un aperçu de vos activités et de vos lectures récentes.</p>
            </div>
            
            <div class="flex gap-4">
               <NuxtLink to="/dashboard/profil" class="px-8 py-4 bg-white text-[#6a0d5f] rounded-2xl font-bold text-xs uppercase tracking-wide hover:bg-orange-400 hover:text-white transition-all duration-500 shadow-xl">
                 Mon Profil
               </NuxtLink>
            </div>
          </div>
       </div>
    </section>

    <!-- Content Grid -->
       <main class="max-w-7xl mx-auto px-6 -mt-16 relative z-20 space-y-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div v-reveal class="bg-white/80 backdrop-blur-xl rounded-xl p-5 shadow-2xl border border-white hover:-translate-y-2 transition-transform duration-500">
          <div class="flex items-center gap-6">
              <div class="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#6a0d5f]">
                 <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
             </div>
             <div>
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Commandes</p>
                  <p class="text-2xl font-bold text-gray-900 tracking-wide">{{ commandeStore.commandes.length }}</p>
             </div>
          </div>
        </div>

         <div v-reveal class="reveal-delay-100 bg-white/80 backdrop-blur-xl rounded-xl p-5 shadow-2xl border border-white hover:-translate-y-2 transition-transform duration-500">
          <div class="flex items-center gap-6">
              <div class="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500">
                 <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
             </div>
             <div>
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Livres achetés</p>
                  <p class="text-2xl font-bold text-gray-900 tracking-wide">{{ booksPurchased }}</p>
             </div>
          </div>
        </div>

         <div v-reveal class="reveal-delay-200 bg-white/80 backdrop-blur-xl rounded-xl p-5 shadow-2xl border border-white hover:-translate-y-2 transition-transform duration-500">
          <div class="flex items-center gap-6">
              <div class="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-500">
                 <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
             </div>
             <div>
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Total dépensé</p>
                <div class="flex items-baseline gap-1">
                    <p class="text-2xl font-bold text-gray-900 tracking-wide">{{ totalSpent.toLocaleString() }}</p>
                   <span class="text-[10px] font-bold text-gray-400">FCFA</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      <!-- Recent Orders Section -->
       <section v-reveal class="bg-white rounded-xl shadow-2xl p-6 border border-white">
           <div class="flex items-center justify-between mb-6">
             <div class="flex items-center gap-3">
                <div class="w-12 h-1 text-[#6a0d5f] bg-[#6a0d5f] rounded-full"></div>
                  <h2 class="text-lg font-bold text-gray-900 uppercase tracking-wide">Commandes Récentes</h2>
             </div>
             <NuxtLink to="/dashboard/commandes" class="group flex items-center gap-2 text-[10px] font-bold text-[#6a0d5f] uppercase tracking-wide border-b-2 border-transparent hover:border-[#6a0d5f] transition-all pb-1">
                Toutes les commandes
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
             </NuxtLink>
          </div>

          <div class="space-y-4">
              <div v-for="order in recentOrders" :key="order.id" class="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#6a0d5f]/20 transition-all group">
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-xl bg-white shadow-inner flex items-center justify-center text-[#6a0d5f]">
                       <span class="text-sm font-bold">#</span>
                   </div>
                   <div>
                       <h3 class="font-bold text-gray-900 tracking-wide uppercase">{{ order.reference }}</h3>
                      <p class="text-[9px] font-bold text-gray-400 uppercase tracking-wide">{{ order.date }}</p>
                   </div>
                </div>
                
                <div class="flex items-center gap-10">
                   <div class="hidden sm:block text-right">
                      <p class="text-[9px] font-bold text-gray-400 uppercase tracking-wide mb-1">Total</p>
                       <p class="font-bold text-gray-900 tracking-wide">{{ order.total.toLocaleString() }} FCFA</p>
                   </div>
                   
                   <div class="flex items-center gap-4">
                      <span class="px-5 py-2 text-[9px] font-bold uppercase tracking-wide rounded-xl" :class="order.statut === 'Livrée' ? 'bg-green-500/10 text-green-600' : 'bg-orange-500/10 text-orange-600'">
                         {{ order.statut }}
                      </span>
                      <NuxtLink :to="`/dashboard/commandes/details/${order.id}`" class="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white hover:bg-[#6a0d5f] hover:scale-110 transition-all">
                         <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      </NuxtLink>
                   </div>
                </div>
             </div>
             
             <div v-if="recentOrders.length === 0" class="py-20 text-center">
                <p class="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Aucune commande récente</p>
             </div>
          </div>
      </section>

      <!-- Quick Actions -->
      <section v-reveal class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <NuxtLink to="/catalogue" class="relative group h-44 rounded-xl overflow-hidden shadow-2xl">
            <div class="absolute inset-0 bg-gradient-to-br from-[#6a0d5f] to-[#4a0942] group-hover:scale-110 transition-transform duration-700"></div>
            <div class="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
             <div class="relative h-full flex flex-col justify-center px-8 space-y-3">
                 <h3 class="text-xl font-bold text-white uppercase tracking-wide leading-none">Découvrir <br/> le Catalogue</h3>
                <p class="text-white/60 text-xs font-bold uppercase tracking-wide">Trouvez votre prochaine lecture</p>
               <div class="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#6a0d5f] group-hover:translate-x-4 transition-transform">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
               </div>
            </div>
         </NuxtLink>

          <NuxtLink to="/panier" class="relative group h-44 rounded-xl overflow-hidden shadow-2xl">
            <div class="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 group-hover:scale-110 transition-transform duration-700"></div>
            <div class="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
             <div class="relative h-full flex flex-col justify-center px-8 space-y-3">
                 <h3 class="text-xl font-bold text-white uppercase tracking-wide leading-none">Mon Panier <br/> & Souhaits</h3>
                <p class="text-white/60 text-xs font-bold uppercase tracking-wide">Finalisez vos achats en un clic</p>
               <div class="w-9 h-9 rounded-full bg-white flex items-center justify-center text-orange-500 group-hover:translate-x-4 transition-transform">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
               </div>
            </div>
         </NuxtLink>
      </section>
    </main>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "~~/stores/user";
import { useCommandeStore } from "~~/stores/commande";

const userStore = useUserStore();
const commandeStore = useCommandeStore();

const userFirstName = computed(() => userStore.user?.prenom);

const booksPurchased = computed(() =>
  commandeStore.commandes
    .filter((c) => c.statut === "termine" || c.statut === "traite")
    .reduce((sum, c) => {
      c.detailcommandes?.forEach((d) => {
        sum += d.quantite;
      });
      return sum;
    }, 0),
);

const totalSpent = computed(() =>
  commandeStore.commandes
    .filter((c) => c.statut === "termine" || c.statut === "traite")
    .reduce((sum, c) => sum + (c.prix_total || 0), 0),
);

const recentOrders = computed(() =>
  commandeStore.commandes
    .filter((c) => c.statut === "termine" || c.statut === "traite")
    .slice()
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5)
    .map((c) => ({
      id: c.id,
      reference: c.reference,
      date: new Date(c.created_at).toLocaleDateString("fr-FR"),
      total: c.prix_total,
      statut: c.statut === "traite" ? "Livr\xE9e" : "En cours de traitement",
    })),
);

onMounted(async () => {
  await Promise.all([
    userStore.fetchProfile(),
    commandeStore.fetchMyOrders()
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
.reveal-delay-100 { animation-delay: 0.1s; }
.reveal-delay-200 { animation-delay: 0.2s; }
</style>

