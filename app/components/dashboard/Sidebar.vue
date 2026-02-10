<template>
  <aside
    class="w-64 bg-white border-r h-screen px-4 py-6 flex flex-col fixed top-0 left-0"
  >

  <aside class="w-64 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 h-screen px-4 py-6 flex flex-col fixed top-0 left-0 z-50 overflow-y-auto">
    <!-- Logo et utilisateur -->

    <div class="mb-8">
      <div class="flex items-center gap-3 mb-4">
        <div class="h-10 w-10 flex-shrink-0">
          <img 
            src="/logo/logo_librairie(1).png" 
            alt="ICC Librairie"
            class="h-full w-full object-contain"
          />
        </div>
        <div v-if="!isCollapsed">
          <h1 class="text-xl font-bold text-gray-900">ICC Librairie</h1>
          <p class="text-xs text-gray-500 mt-0.5">Tableau de bord</p>
        </div>
      </div>
   
    </div>

    <!-- Navigation -->
    <nav class="flex-1 space-y-1">
      <!-- Tableau de bord -->
      <NuxtLink
        to="/dashboard"
        class="flex items-center px-3 py-3 rounded-xl text-gray-700 hover:bg-white hover:shadow-sm hover:border hover:border-gray-200 transition-all duration-200 group"
        active-class="bg-white shadow-sm border border-gray-200 text-[#6a0d5f] font-semibold"
      >

        <svg
          class="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
            ry="2"
            stroke-width="2"
          />
          <path d="M3 9h18M9 21V9" stroke-width="2" stroke-linecap="round" />
        </svg>
        <span>Tableau de bord</span>
      </NuxtLink>

      <!-- CATEGORIES -->
      <NuxtLink
        to="/admin/categories"
        class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
        active-class="bg-gray-100 text-[#6a0d5f] font-semibold"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <rect
            x="4"
            y="6"
            width="16"
            height="4"
            rx="1"
            ry="1"
            stroke-width="2"
          />
          <rect
            x="4"
            y="14"
            width="16"
            height="4"
            rx="1"
            ry="1"
            stroke-width="2"
          />
        </svg>
        <span>Catégories</span>
      </NuxtLink>

      <!-- Livres -->

        <div class="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-blue-50 group-[&.active]:bg-blue-50">
          <svg class="w-5 h-5 text-gray-600 group-hover:text-blue-600 group-[&.active]:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
        </div>
        <span>Tableau de bord</span>
      </NuxtLink>

      <!-- Commandes -->

      <div>
        <button
          @click="openProduits = !openProduits"
          class="w-full flex items-center justify-between px-3 py-3 rounded-xl text-gray-700 hover:bg-white hover:shadow-sm hover:border hover:border-gray-200 transition-all duration-200 cursor-pointer group"
        >
          <div class="flex items-center">

            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <rect
                x="3"
                y="7"
                width="18"
                height="12"
                rx="2"
                ry="2"
                stroke-width="2"
              />
              <path d="M3 13h18" stroke-width="2" stroke-linecap="round" />
            </svg>
            <span>Livres</span>

            <div class="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-purple-50">
              <svg class="w-5 h-5 text-gray-600 group-hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
            </div>
            <span>Commandes</span>

          </div>
          <svg
            class="w-4 h-4 text-gray-400 transition-transform duration-200"
            :class="openProduits ? 'rotate-180' : ''"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >

            <path
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <!-- SOUS-MENU PRODUITS -->
        <div v-show="openProduits" class="ml-9 mt-1">
          <!-- Liste -->
          <NuxtLink
            to="/admin/produits/Liste"
            class="flex items-center px-3 py-1.5 rounded-md text-gray-700 hover:bg-[#6a0d5f] hover:text-white transition"
          >
            <svg
              class="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Liste
          </NuxtLink>

          <!-- Ajouter -->
          <NuxtLink
            to="/admin/produits/ajouter"
            class="flex items-center px-3 py-1.5 rounded-md text-gray-700 hover:bg-[#6a0d5f] hover:text-white transition"
          >
            <svg
              class="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 4v16m8-8H4"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            Ajouter
          </NuxtLink>
        </div>
      </div>

      <!-- COMMANDES -->

            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        
        <!-- Sous-menu Commandes -->
        <transition
          enter-active-class="transition-all duration-200 ease-out"
          leave-active-class="transition-all duration-150 ease-in"
          enter-from-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-40"
          leave-from-class="opacity-100 max-h-40"
          leave-to-class="opacity-0 max-h-0"
        >
          <div v-show="openProduits" class="ml-12 mt-1 space-y-1 overflow-hidden">
            <NuxtLink
              to="/dashboard/commandes/Liste"
              class="flex items-center px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-[#6a0d5f] transition-all duration-150 text-sm"
              active-class="bg-gray-100 text-[#6a0d5f] font-medium"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              Liste
            </NuxtLink>
            <NuxtLink
              to="/dashboard/commandes/details"
              class="flex items-center px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-[#6a0d5f] transition-all duration-150 text-sm"
              active-class="bg-gray-100 text-[#6a0d5f] font-medium"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Détails
            </NuxtLink>
          </div>
        </transition>
      </div>

      <!-- Profil -->
      <NuxtLink
        to="/dashboard/profil"
        class="flex items-center px-3 py-3 rounded-xl text-gray-700 hover:bg-white hover:shadow-sm hover:border hover:border-gray-200 transition-all duration-200 group"
        active-class="bg-white shadow-sm border border-gray-200 text-[#6a0d5f] font-semibold"
      >
        <div class="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-green-50 group-[&.active]:bg-green-50">
          <svg class="w-5 h-5 text-gray-600 group-hover:text-green-600 group-[&.active]:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
        </div>
        <span>Profil</span>
      </NuxtLink>

      <!-- Paramètres -->

      <NuxtLink
        to="/dashboard/parametres"
        class="flex items-center px-3 py-3 rounded-xl text-gray-700 hover:bg-white hover:shadow-sm hover:border hover:border-gray-200 transition-all duration-200 group"
        active-class="bg-white shadow-sm border border-gray-200 text-[#6a0d5f] font-semibold"
      >

        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M3 3h18l-2 13H5L3 3z"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path d="M16 11H8" stroke-width="2" stroke-linecap="round" />
        </svg>
        <span>Commandes</span>
      </NuxtLink>

      <!-- UTILISATEURS -->
      <NuxtLink
        to="/admin/utilisateurs"
        class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
        active-class="bg-gray-100 text-[#6a0d5f] font-semibold"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="8" r="4" stroke-width="2" />
          <path
            d="M6 20c0-3.333 2.667-6 6-6s6 2.667 6 6"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        <span>Utilisateurs</span>
      </NuxtLink>
    </nav>

    <!-- FOOTER -->
    <div class="pt-4 border-t text-xs text-gray-400">© ICC Librairie</div>

        <div class="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-yellow-50 group-[&.active]:bg-yellow-50">
          <svg class="w-5 h-5 text-gray-600 group-hover:text-yellow-600 group-[&.active]:text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
        </div>
        <span>Paramètres</span>
      </NuxtLink>
    </nav>

    <!-- Footer -->
    <div class="pt-4 mt-4 border-t border-gray-200">
      <div class="flex items-center justify-between text-xs text-gray-500 mb-2">
        <span>© ICC Librairie</span>
        <span>2026</span>
      </div>
    </div>

  </aside>
</template>

<script setup>
<<<<<<< HEAD
import { ref } from "vue";
const openProduits = ref(false);
=======
import { ref } from 'vue'

const openProduits = ref(false)

</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>