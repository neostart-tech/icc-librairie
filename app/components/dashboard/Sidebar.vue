<template>
  <aside
    class="w-64 bg-white border-r h-screen px-4 py-6 flex flex-col fixed top-0 left-0"
  >
    <div class="mb-8">
      <h1 class="text-xl font-bold text-[#6a0d5f]">ICC- Librairie</h1>
      <p class="text-xs text-gray-500 mt-1">Administration</p>
    </div>

    <nav class="flex-1 space-y-1 text-sm">
      <!-- TABLEAU DE BORD -->
      <NuxtLink
        to="/admin"
        class="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
        active-class="bg-gray-100 text-[#6a0d5f] font-semibold"
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
      <div>
        <button
          @click="openProduits = !openProduits"
          class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition cursor-pointer"
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
          </div>
          <svg
            class="w-4 h-4 transition-transform"
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
      <NuxtLink
        to="/admin/commandes"
        class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
        active-class="bg-gray-100 text-[#6a0d5f] font-semibold"
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
  </aside>
</template>

<script setup>
import { ref } from "vue";
const openProduits = ref(false);
</script>
