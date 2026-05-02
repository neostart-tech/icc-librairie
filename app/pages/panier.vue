<template>
  <div class="min-h-screen bg-gray-50/50">
    <Breadcrumb :items="[{ label: 'Mon Panier', to: '#' }]" />

    <!-- Page Header -->
    <div class="bg-[#6a0d5f] pt-10 pb-20 px-4 mb-[4rem]">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="text-xl md:text-3xl font-bold text-white mb-4 uppercase tracking-wide">
          Votre <span class="text-orange-400">Sélection</span>
        </h1>
        <p class="text-white/80 text-sm md:text-base max-w-2xl mx-auto font-medium">
          Gérez vos coups de cœur et finalisez votre commande pour nourrir votre esprit.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <!-- EMPTY CART STATE -->
      <div v-if="cart.length === 0"
        class="bg-white rounded-2xl shadow-2xl shadow-[#6a0d5f]/5 p-8 md:p-12 text-center animate-fadeInUp relative overflow-hidden border border-gray-100 mt-8">
        <div class="absolute -top-12 -right-12 w-64 h-64 bg-[#6a0d5f]/5 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-12 -left-12 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl"></div>

        <div class="relative z-10">
          <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
            <svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-3 uppercase tracking-wide">Votre panier est vide</h2>
          <p class="text-gray-500 max-w-md mx-auto mb-6 font-medium">
            Il semblerait que vous n'ayez pas encore trouvé votre prochain compagnon de lecture.
          </p>
          <NuxtLink to="/catalogue"
            class="inline-flex items-center gap-3 bg-[#6a0d5f] text-white px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-[#851178] transition-all duration-300 shadow-xl shadow-[#6a0d5f]/20 hover:scale-105 active:scale-95">
            Explorer le catalogue
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- CART CONTENT -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-8">
        <section class="lg:col-span-8 space-y-6">
          <!-- Clear Cart Header -->
          <div class="flex items-center justify-between px-4 mb-2 animate-fadeInUp">
            <span class="text-sm font-bold text-gray-400 uppercase tracking-widest">
              {{ cart.length }} {{ cart.length > 1 ? 'Articles' : 'Article' }}
            </span>
            <button @click="clearCart"
              class="text-xs font-bold text-red-500 hover:text-red-700 uppercase tracking-widest flex items-center gap-2 transition-colors group">
              <svg class="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              Vider le panier
            </button>
          </div>

          <!-- Items List -->
          <div v-for="(item, index) in cart" :key="item.id"
            class="group bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col md:flex-row gap-5 transition-all duration-500 hover:shadow-2xl hover:shadow-[#6a0d5f]/5 animate-fadeInUp"
            :style="{ animationDelay: `${index * 100}ms` }">

            <!-- Book Image -->
            <div
              class="relative w-full md:w-20 aspect-[3/4] rounded-xl bg-gray-50 flex-shrink-0 overflow-hidden group-hover:scale-105 transition-transform duration-500 shadow-md">
              <img :src="item.image" :alt="item.title" class="w-full h-full object-contain p-2" />
            </div>

            <div class="flex-1 flex flex-col justify-between py-2">
              <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h3
                    class="text-gray-900 text-base md:text-lg leading-tight group-hover:text-[#6a0d5f] transition-colors">
                    {{ item.title }}
                  </h3>
                  <p v-if="item.author" class="text-gray-400 text-xs tracking-widest mt-1">
                    {{ item.author }}
                  </p>
                </div>

                <button @click="removeItem(item.id)"
                  class="w-10 h-10 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all duration-300 md:self-start">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
              </div>

              <div class="flex flex-wrap items-center justify-between gap-4 mt-4 md:mt-0">
                <!-- Quantity Controls -->
                <div class="flex items-center gap-1 p-1 bg-gray-50 rounded-2xl border border-gray-100">
                  <button @click="decreaseQty(item)" :disabled="item.quantity <= 1"
                    class="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-gray-500 hover:bg-white hover:text-[#6a0d5f] hover:shadow-sm disabled:opacity-30 transition-all">
                    ー
                  </button>
                  <span class="w-12 text-center font-bold text-gray-900">{{ item.quantity }}</span>
                  <button @click="increaseQty(item)" :disabled="item.quantity >= item.stockAvailable"
                    class="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-gray-500 hover:bg-white hover:text-[#6a0d5f] hover:shadow-sm disabled:opacity-30 transition-all">
                    ＋
                  </button>
                </div>

                <!-- Prices -->
                <div class="flex flex-col items-end">
                  <span class="text-xs font-bold text-gray-300 tracking-widest mb-1">Total Article</span>
                  <span class="text-sm font-semibold text-[#6a0d5f] tracking-wide">
                    {{ formatPrice(item.price * item.quantity) }}
                  </span>
                  <span v-if="item.quantity > 1" class="text-[10px] font-bold text-gray-400">
                    {{ formatPrice(item.price) }} / unité
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ORDER SUMMARY -->
        <aside class="lg:col-span-4 lg:sticky lg:top-24 animate-fadeInUp" style="animation-delay: 400ms">
          <div class="bg-white rounded-2xl shadow-2xl shadow-[#6a0d5f]/10 border border-gray-100 p-5">
            <h2
              class="text-lg font-bold text-gray-900 uppercase tracking-wide mb-5 flex items-center gap-3">
              <svg class="w-5 h-5 text-[#6a0d5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              Récapitulatif
            </h2>

            <div class="space-y-4">
              <div class="flex justify-between items-center py-2 border-b border-gray-50">
                <span class="text-sm font-bold text-gray-400 tracking-widest">Sous-total</span>
                <span class="font-bold text-gray-800">{{ formatPrice(subtotal) }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-50">
                <span class="text-sm font-bold text-gray-400 tracking-widest">Articles</span>
                <span class="font-bold text-gray-800">{{ cartStore.count }}</span>
              </div>
            </div>

            <div
              class="mt-4 mb-5 p-4 bg-[#6a0d5f]/5 rounded-xl border border-[#6a0d5f]/10 text-center flex flex-col items-center">
               <span class="text-xs font-bold text-gray-400 uppercase tracking-[0.3em] mb-2">Total à payer</span>
              <span class="text-3xl font-bold text-[#6a0d5f] tracking-wide">
                {{ formatPrice(subtotal) }}
              </span>
            </div>

            <NuxtLink to="/commande"
              class="w-full flex items-center justify-center gap-3 bg-[#6a0d5f] text-white py-4 rounded-xl font-bold text-sm tracking-[0.2em] shadow-2xl shadow-[#6a0d5f]/30 hover:bg-[#851178] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
              Passer la commande
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M13 7l5 5m0 0l-5 5m5-5H6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </NuxtLink>

            <NuxtLink to="/catalogue"
              class="w-full flex items-center justify-center mt-6 text-gray-400 hover:text-[#6a0d5f] font-bold text-[10px] uppercase tracking-widest transition-colors duration-300">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              Continuer mes achats
            </NuxtLink>
          </div>


        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import Breadcrumb from "~/components/Breadcrumb.vue";
import { useCartStore } from "~~/stores/cart";
import Swal from 'sweetalert2';

const cartStore = useCartStore();

const cart = computed(() => cartStore.items);
const subtotal = computed(() => cartStore.subtotal);

const increaseQty = (item) => cartStore.increase(item.id);
const decreaseQty = (item) => cartStore.decrease(item.id);

const removeItem = (id) => {
  Swal.fire({
    title: 'Retirer l\'article ?',
    text: "Cet ouvrage va quitter votre sélection.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#6a0d5f',
    cancelButtonColor: '#f3f4f6',
    cancelButtonText: '<span style="color: #9ca3af; font-weight: bold;">Annuler</span>',
    confirmButtonText: 'Oui, retirer',
    reverseButtons: true,
    customClass: {
      popup: 'rounded-[2rem]',
      confirmButton: 'rounded-xl font-bold px-6 py-3 uppercase tracking-widest text-sm',
      cancelButton: 'rounded-xl font-bold px-6 py-3 uppercase tracking-widest text-sm'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      cartStore.remove(id);
    }
  });
};

const clearCart = () => {
  Swal.fire({
    title: 'Vider le panier ?',
    text: "Tous vos trésors sélectionnés seront retirés.",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#6a0d5f',
    cancelButtonColor: '#f3f4f6',
    cancelButtonText: '<span style="color: #9ca3af; font-weight: bold;">Garder mes articles</span>',
    confirmButtonText: 'Oui, vider tout',
    reverseButtons: true,
    showClass: {
      popup: 'animate__animated animate__fadeInUp animate__faster'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutDown animate__faster'
    },
    customClass: {
      popup: 'rounded-[2.5rem] p-12',
      confirmButton: 'rounded-2xl font-bold px-8 py-4 uppercase tracking-widest text-sm shadow-xl shadow-[#6a0d5f]/20',
      cancelButton: 'rounded-2xl font-bold px-8 py-4 uppercase tracking-widest text-sm'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      cartStore.clear();
      Swal.fire({
        title: 'Panier vide',
        text: 'Votre sélection a été réinitialisée.',
        icon: 'success',
        confirmButtonColor: '#6a0d5f',
        customClass: {
          popup: 'rounded-[2rem]',
          confirmButton: 'rounded-xl font-bold px-6 py-3 uppercase tracking-widest text-sm'
        }
      });
    }
  });
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
};
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
</style>
