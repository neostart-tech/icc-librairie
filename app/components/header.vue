<template>
  <!-- Header fixe -->
  <HeaderBar class="fixed top-0 left-0 right-0 z-50 bg-[#6a0d5f]">
    <nav class="px-4 sm:px-6 lg:px-16 xl:px-24 py-4 text-white">
      <div class="flex items-center justify-between gap-4">
        <!-- LOGO -->
        <NuxtLink to="/" class="flex items-center">
          <img
            src="/logo/logo_librairie(1).png"
            alt="ICC_Librairie"
            class="h-10 sm:h-12 lg:h-14 w-auto"
          />
        </NuxtLink>

        <!-- Barre de recherche (desktop) -->
        <div class="hidden md:flex justify-center">
          <div
            class="flex items-center bg-white rounded-full px-4 py-2 w-100 max-w-xl"
          >
            <input
              v-model="search"
              type="text"
              placeholder="Rechercher un livre..."
              class="w-full text-sm text-gray-700 outline-none bg-transparent"
            />

            <span class="ml-3 text-gray-500">⌕</span>
          </div>
        </div>

        <!-- Actions utilisateur -->
        <div class="flex items-center gap-3 sm:gap-4">
          <!-- Panier -->
          <NuxtLink to="/panier" class="relative">
            <svg
              fill="#ffffff"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="25px"
              height="25px"
              viewBox="0 0 902.86 902.86"
              xml:space="preserve"
              stroke="#ffffff"
              stroke-width="0.009028600000000001"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <g>
                  <g>
                    <path
                      d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z"
                    ></path>
                    <path
                      d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717 c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744 c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742 C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744 c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742 S619.162,694.432,619.162,716.897z"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>

            <span
              class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2"
            >
              {{ cartStore.count ?? 0 }}
            </span>
          </NuxtLink>

          <!-- Connexion si non connecté -->
          <NuxtLink
            v-if="!isLoggedIn"
            to="/connexion"
            class="bg-white text-[#6a0d5f] px-3 py-1 rounded-full font-medium text-sm hover:bg-gray-100 transition-colors"
          >
            Connexion
          </NuxtLink>

          <!-- Dashboard (desktop uniquement) -->
          <div v-else class="relative hidden md:block" ref="dropdownRef">
            <button
              class="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-white/10 transition focus:outline-none"
              @click.stop="showDropdown = !showDropdown"
            >
              <svg
                class="w-6 h-6 ml-2"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
              </svg>
              Mon compte
            </button>

            <div
              v-if="showDropdown"
              class="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg py-2 z-50"
            >
              <NuxtLink
                to="/dashboard"
                class="flex items-center gap-2 px-4 py-2 text-[#6a0d5f] hover:bg-gray-100"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="3" width="7" height="7" rx="2" />
                  <rect x="14" y="3" width="7" height="7" rx="2" />
                  <rect x="14" y="14" width="7" height="7" rx="2" />
                  <rect x="3" y="14" width="7" height="7" rx="2" />
                </svg>
                Mon Dashboard
              </NuxtLink>
              <button
                class="flex items-center gap-2 w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 border-t border-gray-100 mt-1"
                @click="handleLogout"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
                  />
                </svg>
                Déconnexion
              </button>
            </div>
          </div>

          <!-- Menu burger mobile -->
          <button
            class="md:hidden focus:outline-none"
            @click="isMenuOpen = !isMenuOpen"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Menu mobile -->
      <div
        v-if="isMenuOpen"
        class="md:hidden mt-4 bg-[#6a0d5f] rounded-2xl p-5 space-y-4 shadow-lg"
      >
        <div class="flex items-center bg-white rounded-full px-4 py-2 w-full">
          <input
            v-model="search"
            type="text"
            placeholder="Rechercher un livre..."
            class="w-full text-sm text-gray-700 outline-none bg-transparent"
          />

          <span class="ml-3 text-gray-500">⌕</span>
        </div>

        <NuxtLink
          v-if="!isLoggedIn"
          to="/connexion"
          class="block bg-white text-[#6a0d5f] px-3 py-2 rounded-full font-medium text-center hover:bg-gray-100 transition-colors"
        >
          Connexion
        </NuxtLink>

        <!-- Utilisateur connecté -->
        <div v-else class="space-y-3">
          <NuxtLink
            to="/dashboard"
            class="block bg-white text-[#6a0d5f] px-3 py-2 rounded-full font-medium text-center hover:bg-gray-100 transition-colors"
          >
            Dashboard
          </NuxtLink>

          <button
            @click="handleLogout"
            class="w-full bg-red-500 text-white px-3 py-2 rounded-full font-medium text-center hover:bg-red-600 transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  </HeaderBar>

  <!-- Marge pour compenser le header fixe -->
  <div class="h-[90px] md:h-[90px]"></div>
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
