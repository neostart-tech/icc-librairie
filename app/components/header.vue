<template>
  <!-- Header fixe -->
  <HeaderBar class="fixed top-0 left-0 right-0 z-50 bg-[#6a0d5f]">
    <nav class="px-4 sm:px-6 lg:px-16 xl:px-24 py-4 text-white">
      <div class="grid grid-cols-[auto_1fr_auto] items-center gap-4">
        <!-- LOGO -->
        <NuxtLink to="/" class="flex items-center">
          <img
            src="/logo/logo_librairie(1).png"
            alt="ICC_Librairie"
            class="h-12 sm:h-14 w-auto"
          />
        </NuxtLink>

        <!-- Barre de recherche (desktop) -->
        <div class="hidden md:flex justify-center">
          <div
            class="flex items-center bg-white rounded-full px-4 py-2 w-full max-w-xl"
          >
            <input
              type="text"
              placeholder="Rechercher un livre..."
              class="w-full text-sm text-gray-700 outline-none bg-transparent"
            />
            <span class="ml-3 text-gray-500">⌕</span>
          </div>
        </div>

        <!-- Actions utilisateur -->
        <div class="flex items-center space-x-3 sm:space-x-4 ml-auto">
          <!-- Panier -->
          <NuxtLink to="/panier" class="relative mr-10">
            <img src="/icone/panier.png" class="w-5 h-5" />
            <span class="badge">3</span>
          </NuxtLink>

          <!-- Connexion si non connecté -->
          <NuxtLink
            v-if="!isLoggedIn"
            to="/connexion"
            class="bg-white text-[#6a0d5f] px-3 py-1 rounded-full font-medium text-sm hover:bg-gray-100 transition-colors"
          >
            Connexion
          </NuxtLink>

          <!-- Dashboard si connecté -->
          <div v-else class="relative">
            <button
              class="flex items-center focus:outline-none"
              @click="showDropdown = !showDropdown"
            >
              <img src="/icone/user.png" alt="Compte" class="w-6 h-6" />
            </button>

            <div
              v-if="showDropdown"
              class="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg py-2 z-50"
            >
              <NuxtLink
                to="/dashboard"
                class="flex items-center gap-2 px-4 py-2 text-[#6a0d5f] hover:bg-gray-100"
              >
                Mon Dashboard
              </NuxtLink>
              <button
                @click="handleLogout"
                class="flex items-center gap-2 w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 border-t border-gray-100 mt-1"
              >
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
        class="md:hidden mt-2 bg-[#6a0d5f] rounded-lg p-4 space-y-3"
      >
        <div class="flex items-center bg-white rounded-full px-4 py-2 w-full">
          <input
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

        <NuxtLink
          v-else
          to="/dashboard"
          class="block bg-white text-[#6a0d5f] px-3 py-2 rounded-full font-medium text-center hover:bg-gray-100 transition-colors"
        >
          Dashboard
        </NuxtLink>
      </div>
    </nav>
  </HeaderBar>

  <!-- Marge pour compenser le header fixe -->
  <div class="h-[90px] md:h-[90px]"></div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "~~/stores/auth";

const isMenuOpen = ref(false);
const showDropdown = ref(false);

const auth = useAuthStore();

// Initialise le store depuis localStorage
onMounted(() => {
  auth.init();
});

// Computed réactif pour savoir si l’utilisateur est connecté
const isLoggedIn = computed(() => auth.isLogged);
const handleLogout = () => auth.logout();
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
