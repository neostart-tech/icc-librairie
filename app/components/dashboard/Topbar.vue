<template>
  <header class="h-16 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-40">
    <!-- Bouton menu mobile (seulement sur mobile) -->
    <button
      @click="$emit('toggle-sidebar')"
      class="lg:hidden h-10 w-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors duration-200"
    >
      <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>

    <!-- Titre de la page -->
    <div class="flex-1 ml-4 lg:ml-0">
      <h1 class="text-lg font-semibold text-gray-900 truncate">
        {{ pageTitle }}
      </h1>
      <p class="text-xs text-gray-500 truncate hidden sm:block">
        {{ pageDescription }}
      </p>
    </div>

    <!-- Actions droite -->
    <div class="flex items-center space-x-3 sm:space-x-4">
      <!-- Bouton recherche (desktop) -->
      <button class="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors duration-200">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <span class="text-sm">Rechercher</span>
      </button>

      <!-- Bouton notifications avec dropdown -->
      <div class="relative" ref="notificationsDropdown">
        <button
          @click.stop="toggleNotifications"
          class="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors duration-200 relative"
        >
          <!-- Icône alerte -->
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
          </svg>
          <span v-if="hasNotifications" class="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
      </div>

      <!-- Séparateur -->
      <div class="h-6 w-px bg-gray-200 hidden sm:block"></div>

      <!-- Profil utilisateur -->
      <div class="relative" ref="profileDropdown">
        <button
          @click.stop="toggleProfileDropdown"
          class="flex items-center gap-3 bg-white hover:bg-gray-50 px-3 py-2 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 cursor-pointer"
        >
          <!-- Avatar -->
          <div class="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          
          <!-- Info utilisateur -->
          <div class="hidden lg:block text-left">
            <p class="text-sm font-medium text-gray-900">Anna Lorena</p>
            <p class="text-xs text-gray-500">Utilisateur</p>
          </div>
          
          <!-- Flèche dropdown -->
          <svg
            class="w-4 h-4 text-gray-400 transition-transform duration-200"
            :class="profileDropdownOpen ? 'rotate-180' : ''"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>

        <!-- Dropdown menu -->
        <transition
          enter-active-class="transition-all duration-200 ease-out"
          leave-active-class="transition-all duration-150 ease-in"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-2"
        >
          <div
            v-if="profileDropdownOpen"
            class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50"
          >
            <!-- En-tête dropdown -->
            <div class="px-4 py-3 border-b border-gray-100">
              <p class="text-sm font-medium text-gray-900">Anna Lorena</p>
              <p class="text-xs text-gray-500 mt-0.5">anna.lorena@example.com</p>
            </div>

            <!-- Liens dropdown -->
            <div class="py-1">
              <NuxtLink
                to="/dashboard/profil"
                @click="closeDropdowns"
                class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
              >
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                <span>Mon profil</span>
              </NuxtLink>

              <NuxtLink
                to="/dashboard/parametres"
                @click="closeDropdowns"
                class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
              >
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>Paramètres</span>
              </NuxtLink>

              <div class="border-t border-gray-100 my-1"></div>

              <button
                @click="logout"
                class="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from '#imports'

const emit = defineEmits(['toggle-sidebar'])
const route = useRoute()

// Références pour les dropdowns
const profileDropdown = ref(null)
const notificationsDropdown = ref(null)

// États des dropdowns
const profileDropdownOpen = ref(false)
const notificationsOpen = ref(false)

// Notifications
const notifications = ref([
  {
    id: 1,
    title: 'Commande expédiée',
    message: 'Votre commande #ORD-7892 a été expédiée',
    time: 'Il y a 2 heures',
    type: 'order',
    read: false
  },
  {
    id: 2,
    title: 'Promotion spéciale',
    message: '20% de réduction sur les livres de science-fiction',
    time: 'Il y a 1 jour',
    type: 'alert',
    read: false
  },
  {
    id: 3,
    title: 'Commande livrée',
    message: 'Votre commande #ORD-7885 a été livrée',
    time: 'Il y a 3 jours',
    type: 'order',
    read: true
  }
])

// Computed properties
const hasNotifications = computed(() => {
  return notifications.value.some(n => !n.read)
})

// Fonctions pour les dropdowns
const toggleProfileDropdown = () => {
  profileDropdownOpen.value = !profileDropdownOpen.value
  if (profileDropdownOpen.value) {
    notificationsOpen.value = false
  }
}

const toggleNotifications = () => {
  notificationsOpen.value = !notificationsOpen.value
  if (notificationsOpen.value) {
    profileDropdownOpen.value = false
  }
}

const closeDropdowns = () => {
  profileDropdownOpen.value = false
  notificationsOpen.value = false
}

// Gestion des notifications
const markAllAsRead = () => {
  notifications.value = notifications.value.map(n => ({ ...n, read: true }))
}

const handleNotificationClick = (notification) => {
  // Marquer comme lu
  notification.read = true
  
  // Navigation selon le type
  if (notification.type === 'order') {
    navigateTo('/dashboard/commandes/liste')
  }
  
  // Fermer le dropdown
  notificationsOpen.value = false
}

const logout = () => {
  alert('Déconnexion effectuée')
  closeDropdowns()
}

// Fermer les dropdowns en cliquant à l'extérieur
const handleClickOutside = (event) => {
  if (profileDropdown.value && !profileDropdown.value.contains(event.target)) {
    profileDropdownOpen.value = false
  }
  
  if (notificationsDropdown.value && !notificationsDropdown.value.contains(event.target)) {
    notificationsOpen.value = false
  }
}

// Empêcher la propagation des clics à l'intérieur des dropdowns
const handleDropdownClick = (event) => {
  event.stopPropagation()
}

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  // Ajouter les listeners pour les dropdowns
  if (profileDropdown.value) {
    profileDropdown.value.addEventListener('click', handleDropdownClick)
  }
  if (notificationsDropdown.value) {
    notificationsDropdown.value.addEventListener('click', handleDropdownClick)
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  // Retirer les listeners
  if (profileDropdown.value) {
    profileDropdown.value.removeEventListener('click', handleDropdownClick)
  }
  if (notificationsDropdown.value) {
    notificationsDropdown.value.removeEventListener('click', handleDropdownClick)
  }
})
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}

/* Scrollbar personnalisée pour les notifications */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>