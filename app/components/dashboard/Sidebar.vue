<template>
  <aside
    :class="[
      'fixed top-0 left-0 h-screen bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 flex flex-col transition-all duration-300 z-50 overflow-y-auto',
      isCollapsed ? 'w-20' : 'w-64'
    ]"
  >
    <!-- Header -->
    <div class="flex items-center justify-between p-4">
      <div class="flex items-center gap-3">
        <img
          src="/logo/logo_librairie(1).png"
          alt="ICC Librairie"
          class="h-10 w-10 object-contain"
        />
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
          <h1 class="text-lg font-bold text-gray-900">ICC Librairie</h1>
          <p class="text-xs text-gray-500">Tableau de bord</p>
        </div>
      </div>

      <button
        @click="toggleSidebar"
        class="p-2 rounded-lg hover:bg-gray-100 transition"
      >
        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-3 space-y-1 mt-4">
      
      <!-- Dashboard -->
      <NuxtLink
        to="/dashboard"
        class="flex items-center px-3 py-3 rounded-xl text-gray-700 hover:bg-white hover:shadow-sm transition group"
        active-class="bg-white shadow font-semibold text-[#6a0d5f]"
      >
        <div class="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center">
          <svg class="w-5 h-5 text-gray-600 group-hover:text-blue-600"
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 3h6"/>
        <div class="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-blue-50 group-[&.active]:bg-blue-50">
          <svg class="w-5 h-5 text-gray-600 group-hover:text-blue-600 group-[&.active]:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
        </div>
        <span v-if="!isCollapsed" class="ml-3">Tableau de bord</span>
      </NuxtLink>

      <!-- Commandes -->
      <div>
        <button
          @click="openCommandes = !openCommandes"
          class="w-full flex items-center justify-between px-3 py-3 rounded-xl text-gray-700 hover:bg-white hover:shadow-sm transition group"
        >
          <div class="flex items-center">
            <div class="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-gray-600 group-hover:text-purple-600"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2"/>
              </svg>
            </div>
            <span v-if="!isCollapsed" class="ml-3">Commandes</span>
            <div class="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-purple-50">
              <svg class="w-5 h-5 text-gray-600 group-hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
            </div>
            <span>Commandes</span>
          </div>

          <svg
            v-if="!isCollapsed"
            class="w-4 h-4 text-gray-400 transition-transform"
            :class="openCommandes ? 'rotate-180' : ''"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- Sous menu -->
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
          <div
            v-show="openCommandes"
            :class="[
              isCollapsed
                ? 'flex flex-col items-center mt-1 space-y-2'
                : 'ml-12 mt-1 space-y-1 overflow-hidden'
            ]"
          >
            <NuxtLink
              to="/dashboard/commandes/liste"
              class="flex items-center px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-[#6a0d5f]"
            >
              Liste
            </NuxtLink>

            <NuxtLink
              to="/dashboard/commandes/details"
              class="flex items-center px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-[#6a0d5f]"
            >
              Détails
            </NuxtLink>
          </div>
        </transition>
      </div>

      <!-- Profil -->
      <NuxtLink
        to="/dashboard/profil"
        class="flex items-center px-3 py-3 rounded-xl text-gray-700 hover:bg-white hover:shadow-sm transition group"
        active-class="bg-white shadow font-semibold text-[#6a0d5f]"
      >
        <div class="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center">
          <svg class="w-5 h-5 text-gray-600 group-hover:text-green-600"
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
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
        <div class="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-yellow-50 group-[&.active]:bg-yellow-50">
          <svg class="w-5 h-5 text-gray-600 group-hover:text-yellow-600 group-[&.active]:text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
        </div>
        <span v-if="!isCollapsed" class="ml-3">Profil</span>
      </NuxtLink>
    </nav>

    <!-- Footer -->
    <div v-if="!isCollapsed" class="p-4 text-xs text-gray-500 border-t">
      © ICC Librairie 2026
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  isCollapsed: Boolean
})

const emit = defineEmits(['update:isCollapsed'])

const openCommandes = ref(false)

const toggleSidebar = () => {
  emit('update:isCollapsed', !props.isCollapsed)
}
import { ref } from 'vue'

const openProduits = ref(false)
</script>

//  Repli automatique sur mobile
const checkScreen = () => {
  if (window.innerWidth < 1024) {
    emit('update:isCollapsed', true)
  } else {
    emit('update:isCollapsed', false)
  }
}

onMounted(() => {
  checkScreen()
  window.addEventListener('resize', checkScreen)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreen)
})
</script>
