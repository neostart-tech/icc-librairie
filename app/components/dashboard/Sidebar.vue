<template>
  <aside class="w-64 bg-white border-r h-screen px-4 py-6 flex flex-col fixed top-0 left-0">

    <div class="mb-8">
      <h1 class="text-xl font-bold text-[#6a0d5f]">ICC- Librairie</h1>
      <p class="text-xs text-gray-500 mt-1">Administration</p>
    </div>

    <nav class="flex-1 space-y-1 text-sm">

      <NuxtLink to="/admin" class="flex items-center px-3 py-2 rounded-lg text-black hover:bg-gray-100 transition" active-class="bg-gray-100 text-[#6a0d5f] font-semibold">
        <img src="/icone/dashboard.png" alt="Tableau de bord" class="w-5 h-5 mr-2" />
        <span>Tableau de bord</span>
      </NuxtLink>

      <!-- PRODUITS -->
      <div>
        <button
          @click="openProduits = !openProduits"
          class="w-full flex items-center justify-between px-3 py-2 rounded-lg
                text-black hover:bg-gray-100 transition cursor-pointer"
        >
          <div class="flex items-center">
            <img
              src="/icone/produit.png"
              alt="Produits"
              class="w-5 h-5 mr-2"
            />
            <span>Produits</span>
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
          <NuxtLink
            to="/admin/produits/Liste"
            class="flex items-center px-3 py-1.5 rounded-md text-black
                  hover:bg-black hover:text-[#6a0d5f] transition"
          >
            <img src="/icone/liste.png" class="w-4 h-4 mr-2" />
            Liste
          </NuxtLink>

          <NuxtLink
            to="/admin/produits/ajouter"
            class="flex items-center px-3 py-1.5 rounded-md text-black
                  hover:bg-black hover:text-[#6a0d5f] transition"
          >
            <img src="/icone/add.png" class="w-4 h-4 mr-2" />
            Ajouter
          </NuxtLink>

        </div>
      </div>

      <!-- CATEGORIES -->
      <NuxtLink
        to="/admin/categories"
        class="flex items-center gap-3 px-3 py-2 rounded-lg
               text-gray-700 hover:bg-gray-100 transition"
        active-class="bg-gray-100 text-[#6a0d5f] font-semibold"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span>Catégories</span>
      </NuxtLink>

      <!-- COMMANDES -->
      <NuxtLink
        to="/admin/commandes"
        class="flex items-center gap-3 px-3 py-2 rounded-lg
               text-gray-700 hover:bg-gray-100 transition"
        active-class="bg-gray-100 text-[#6a0d5f] font-semibold"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            d="M3 3h18l-2 13H5L3 3z" />
        </svg>
        <span>Commandes</span>
      </NuxtLink>

      <!-- UTILISATEURS -->
      <NuxtLink
        to="/admin/utilisateurs"
        class="flex items-center gap-3 px-3 py-2 rounded-lg
               text-gray-700 hover:bg-gray-100 transition"
        active-class="bg-gray-100 text-[#6a0d5f] font-semibold"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            d="M12 14a4 4 0 100-8 4 4 0 000 8zM6 20a6 6 0 0112 0" />
        </svg>
        <span>Utilisateurs</span>
      </NuxtLink>

    </nav>

    <!-- FOOTER -->
    <div class="pt-4 border-t text-xs text-gray-400">
      © ICC Librairie
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

const openProduits = ref(false)
</script>
