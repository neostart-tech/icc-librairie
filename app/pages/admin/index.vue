<template>
  <div class="p-6 bg-gray-50 min-h-full">

    <!-- PAGE TITLE (TOPBAR DÉJÀ EXISTANTE) -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-900">
        Tableau de bord
      </h1>
      <p class="text-sm text-gray-500">
        Vue d’ensemble de l’activité de la librairie
      </p>
    </div>

    <!-- GRID DES INDICATEURS -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

      <NuxtLink
        v-for="item in cards"
        :key="item.label"
        :to="item.link"
        class="bg-white border border-gray-200 rounded-lg
               h-[120px] p-4
               flex flex-col justify-between
               hover:border-[#6a0d5f] hover:shadow-sm
               transition"
      >
        <!-- TITRE -->
        <div class="text-sm font-medium text-gray-500 truncate">
          {{ item.label }}
        </div>

        <!-- VALEUR -->
        <div class="flex items-end justify-between">
          <span class="text-2xl font-bold text-gray-900">
            {{ item.value }}
          </span>
          <i :class="item.icon + ' text-lg text-[#6a0d5f]'" />
        </div>
      </NuxtLink>

    </section>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "dashboard"
})

const cards = [
  {
    label: "Chiffre d’affaires du mois",
    value: "320 000 FCFA",
    icon: "fas fa-coins",
    link: "/admin/chiffre-affaires-mois"
  },
  {
    label: "Chiffre d’affaires total",
    value: "2 450 000 FCFA",
    icon: "fas fa-chart-line",
    link: "/admin/chiffre-affaires-total"
  },
  {
    label: "Liste des commandes",
    value: 48,
    icon: "fas fa-cart-shopping",
    link: "/admin/commandes?periode=mois"
  },
  {
    label: "Commandes en attente",
    value: 3,
    icon: "fas fa-clock",
    link: "/admin/commandes?statut=attente"
  },
  {
    label: "Livres vendus",
    value: 120,
    icon: "fas fa-book",
    link: "/admin/livres/vendus"
  },
  {
    label: "Livres disponibles",
    value: 80,
    icon: "fas fa-boxes-stacked",
    link: "/admin/livres/disponibles"
  },
  {
    label: "Livres en rupture de stock",
    value: 7,
    icon: "fas fa-star",
    link: "/admin/livres/rupture-stock"
  },
  {
    label: "Clients actifs",
    value: 95,
    icon: "fas fa-users"
  }
  
]
</script>
