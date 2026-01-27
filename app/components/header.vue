<template>
  <div>
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-[#6a0d5f]">
      <nav class="py-4 px-6 lg:px-16 xl:px-24 text-white">
        <div class="flex items-center justify-between gap-6">

          <!-- GAUCHE : Logo -->
          <NuxtLink to="/" class="flex items-center">
            <img
              src="/logo/logo_librairie(1).png"
              alt="ICC_Librairie"
              class="h-14 w-auto"
            />
          </NuxtLink>

          <!-- MILIEU : Recherche -->
          <div class="flex-1 flex justify-center">
            <div class="flex items-center bg-white rounded-full px-5 py-2 w-full max-w-xl">
              <input
                type="text"
                placeholder="Rechercher un livre..."
                class="w-full text-sm text-gray-700 outline-none bg-transparent"
              />
              <span class="ml-3 text-gray-500">⌕</span>
            </div>
          </div>

          <!-- DROITE : Icônes -->
          <div class="flex items-center space-x-6">
            <!-- Wishlist -->
            <NuxtLink to="/wishlist" class="relative cursor-pointer">
              <img src="/icone/wishlist.png" class="w-5 h-5" />
              <span class="badge">2</span>
            </NuxtLink>

            <!-- Panier -->
            <NuxtLink to="/panier" class="relative cursor-pointer">
              <img src="/icone/panier.png" class="w5 h-5" />
              <span class="badge">3</span>
            </NuxtLink>

            <!-- Connexion -->
            <NuxtLink to="/login" class="cursor-pointer">
              <img src="/icone/user.png" class="w-6 h-6" />
            </NuxtLink>

            <!-- Bouton mobile -->
            <button
              class="lg:hidden text-2xl"
              @click="isMobileMenuOpen = true"
            >
              ☰
            </button>
          </div>

        </div>
      </nav>
    </header>

    <!-- Spacer -->
    <div class="h-[90px]"></div>

    <!-- MENU MOBILE -->
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 z-50 bg-[#6a0d5f] p-6 text-white"
    >
      <div class="flex justify-between items-center mb-6">
        <span class="font-bold text-lg">Menu</span>
        <button @click="closeMobile" class="text-2xl">✕</button>
      </div>

      <nav class="space-y-4 text-lg">
        <NuxtLink to="/" @click="closeMobile">Accueil</NuxtLink>
        <NuxtLink to="/catalogue" @click="closeMobile">Catalogue</NuxtLink>
        <NuxtLink to="/wishlist" @click="closeMobile">Wishlist</NuxtLink>
        <NuxtLink to="/cart" @click="closeMobile">Panier</NuxtLink>
        <NuxtLink to="/login" @click="closeMobile">Connexion</NuxtLink>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)
const closeMobile = () => {
  isMobileMenuOpen.value = false
}
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
