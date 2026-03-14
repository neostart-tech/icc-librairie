<template>
  <!-- Header fixe -->
  <ClientOnly>
    <header class="fixed top-0 left-0 right-0 z-50 h-[80px] lg:h-[95px] bg-[#6a0d5f] flex shadow-md">
      
      <!-- Côté Gauche (Blanc avec la courbe "Bookle") -->
      <!-- Utilisation de z-20 pour que la gauche passe par-dessus la droite -->
      <div class="h-full bg-white flex items-center pl-4 sm:pl-8 lg:pl-12 pr-6 relative w-[220px] sm:w-[280px] lg:w-[340px] flex-shrink-0 z-20">
        <NuxtLink to="/" class="flex items-center z-30">
          <img src="/logo/logo_librairie(1).png" alt="ICC_Librairie" class="h-10 sm:h-12 lg:h-14 w-auto"/>
        </NuxtLink>

        <!-- Courbure SVG exacte calquée sur le design "Bookle" -->
        <svg 
          class="absolute top-0 right-[-59px] h-full w-[60px] text-white pointer-events-none" 
          preserveAspectRatio="none" 
          viewBox="0 0 100 100" 
          fill="currentColor"
        >
          <!-- Courbe paramétrée pour un arrondi parfait et complet (haut en bas) -->
          <path d="M0,0 L0,100 C 130,80 130,20 0,0 Z" />
        </svg>
      </div>

      <!-- Côté Droit (Navigation / Formulaires en Violet) -->
      <div class="flex-1 h-full flex items-center justify-end md:justify-between pr-4 sm:pr-8 lg:pr-12 pl-[30px] sm:pl-[40px] z-10 text-white gap-4">
        
        <!-- Search bar Desktop -->
        <div class="hidden md:flex flex-1 justify-center xl:justify-start px-2 lg:px-8 max-w-[650px]">
          <div class="flex items-center bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-6 py-2.5 w-full backdrop-blur-sm transition-all focus-within:bg-white focus-within:border-white focus-within:shadow-lg group">
            <input
              v-model="search"
              type="text"
              placeholder="Rechercher un livre..."
              class="w-full text-[15px] text-white placeholder-white/80 outline-none bg-transparent group-focus-within:text-gray-800 group-focus-within:placeholder-gray-500"
            />
            <span class="ml-3 text-white group-focus-within:text-[#6a0d5f] transition-colors">
              <svg viewBox="0 0 24 24" fill="none" class="w-5 h-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
          </div>
        </div>

        <!-- Right actions -->
        <div class="flex items-center gap-4 sm:gap-6 ml-auto">
          
          <!-- Login/Account -->
          <div class="hidden lg:block relative" ref="dropdownRef">
            <NuxtLink
              v-if="!isLoggedIn"
              to="/connexion"
              class="flex items-center gap-2 text-white hover:text-white/80 transition-colors font-medium text-[15px]"
            >
              <div class="flex items-center justify-center bg-white/20 rounded-full w-10 h-10 hover:bg-white/30 transition-colors">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <span class="tracking-wide">Connexion</span>
            </NuxtLink>

            <button
              v-else
              class="flex items-center gap-2 text-white hover:text-white/80 transition-colors font-medium text-[15px] focus:outline-none"
              @click.stop="showDropdown = !showDropdown"
            >
              <div class="flex items-center justify-center bg-white/20 rounded-full w-10 h-10 hover:bg-white/30 transition-colors">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <span class="tracking-wide">Mon compte</span>
            </button>

            <!-- Dropdown Menu -->
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                v-if="showDropdown && isLoggedIn"
                class="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100"
              >
                <NuxtLink
                  to="/dashboard"
                  class="flex items-center gap-3 px-5 py-3 text-[#6a0d5f] hover:bg-gray-50 transition-colors font-medium text-[15px]"
                  @click="showDropdown = false"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="7" height="7" rx="2" />
                    <rect x="14" y="3" width="7" height="7" rx="2" />
                    <rect x="14" y="14" width="7" height="7" rx="2" />
                    <rect x="3" y="14" width="7" height="7" rx="2" />
                  </svg>
                  Mon Dashboard
                </NuxtLink>
                <div class="my-1 border-t border-gray-100"></div>
                <button
                  class="flex items-center gap-3 w-full text-left px-5 py-3 text-red-600 hover:bg-red-50 transition-colors font-medium text-[15px]"
                  @click="handleLogout"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"/>
                  </svg>
                  Déconnexion
                </button>
              </div>
            </transition>
          </div>

          <!-- Panier (Bookle style: white exact circle with dark icon) -->
          <NuxtLink to="/panier" class="relative flex items-center justify-center bg-white rounded-full w-[46px] h-[46px] lg:w-[50px] lg:h-[50px] shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 z-20">
            <svg
              class="w-5 h-5 lg:w-6 lg:h-6 text-[#1a1a1a]"
              fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span
              v-if="(cartStore.count ?? 0) > 0"
              class="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] font-bold h-[22px] min-w-[22px] px-1 flex items-center justify-center rounded-full shadow-sm border-2 border-white"
            >
              {{ cartStore.count ?? 0 }}
            </span>
          </NuxtLink>

          <!-- Menu burger mobile et tablet -->
          <button
            class="lg:hidden flex items-center justify-center bg-white rounded-full w-[46px] h-[46px] shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 focus:outline-none z-20"
            @click="isMenuOpen = !isMenuOpen"
          >
            <svg
              class="w-6 h-6 text-[#1a1a1a]"
              fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            >
              <line v-if="!isMenuOpen" x1="3" y1="12" x2="21" y2="12"></line>
              <line v-if="!isMenuOpen" x1="3" y1="6" x2="21" y2="6"></line>
              <line v-if="!isMenuOpen" x1="3" y1="18" x2="21" y2="18"></line>
              <line v-if="isMenuOpen" x1="18" y1="6" x2="6" y2="18"></line>
              <line v-if="isMenuOpen" x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Menu mobile plein écran (s'affiche sous le header) -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-5"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-5"
    >
      <div
        v-if="isMenuOpen"
        class="md:hidden fixed top-[80px] lg:top-[95px] left-0 right-0 bg-[#6a0d5f] shadow-xl z-40 border-t border-white/10"
      >
        <div class="px-6 py-6 space-y-6">
          <div class="flex items-center bg-white rounded-full px-4 py-3 w-full shadow-inner">
            <input
              v-model="search"
              type="text"
              placeholder="Rechercher un livre..."
              class="w-full text-[15px] text-gray-700 outline-none bg-transparent"
            />
            <span class="ml-3 text-[#6a0d5f] font-bold">⌕</span>
          </div>

          <div class="flex flex-col gap-4 pt-2">
            <NuxtLink
              v-if="!isLoggedIn"
              to="/connexion"
              class="bg-white text-[#6a0d5f] px-4 py-3 rounded-full font-bold text-center text-[16px] hover:bg-gray-100 transition-colors shadow-sm"
              @click="isMenuOpen = false"
            >
              Connexion
            </NuxtLink>

            <template v-else>
              <NuxtLink
                to="/dashboard"
                class="bg-white/10 text-white border border-white/20 px-4 py-3 rounded-xl font-medium text-center hover:bg-white/20 transition-colors"
                @click="isMenuOpen = false"
              >
                Dashboard
              </NuxtLink>
              <button
                @click="handleLogout"
                class="bg-red-500 text-white shadow-sm hover:shadow px-4 py-3 rounded-xl font-medium text-center hover:bg-red-600 transition-all font-bold"
                @click.stop="isMenuOpen = false"
              >
                Déconnexion
              </button>
            </template>
          </div>
        </div>
      </div>
    </transition>
  </ClientOnly>

  <!-- Marge pour compenser le header fixe -->
  <div class="h-[80px] lg:h-[95px]"></div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useAuthStore } from "~~/stores/auth";
import { useCartStore } from "~~/stores/cart";

import { useSearch } from "~/composables/useSearch";

import { useRouter } from "vue-router";

const router = useRouter();

router.afterEach(() => {
  isMenuOpen.value = false;
});

const { search } = useSearch();

const isMenuOpen = ref(false);
const showDropdown = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    showDropdown.value = false;
  }
};

const auth = useAuthStore();
const cartStore = useCartStore();

// Initialise le store depuis localStorage
onMounted(() => {
  auth.init();
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

// Computed réactif pour savoir si l’utilisateur est connecté
const isLoggedIn = computed(() => auth.isLogged);
const handleLogout = () => {
  auth.logout();
  isMenuOpen.value = false;
};
</script>

<style scoped>
.badge {
  position: absolute;
  top: -6px;
  right: -10px;
  background: white;
  color: #6a0d5f;
  font-size: 10px;
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
</style>
