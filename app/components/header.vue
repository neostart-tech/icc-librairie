<template>
  <div>
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-[#6a0d5f]">
      <nav class="py-4 px-8 lg:px-16 xl:px-24 2xl:px-32 text-white">
        <div class="flex items-center justify-between">

          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center">
            <img
              src="/logo/logo_librairie(1).png"
              alt="ICC_Librairie"
              class="h-16 w-auto"
            />
          </NuxtLink>

          <!-- MENU DESKTOP -->
          <div class="hidden lg:flex items-center space-x-8">
            <NuxtLink
              to="/"
              :class="navClass('/')"
            >
              Accueil
            </NuxtLink>

            <NuxtLink
              to="/catalogue"
              :class="navClass('/catalogue')"
            >
              Catalogue
            </NuxtLink>

            <NuxtLink
              to="/faq"
              :class="navClass('/faq')"
            >
              FAQ
            </NuxtLink>

            <NuxtLink
              to="/contact"
              :class="navClass('/contact')"
            >
              Contact
            </NuxtLink>

            <!-- Actions -->
            <div class="flex items-center space-x-5 ml-6">
              <!-- Recherche -->
              <div class="flex items-center border border-white/40 rounded-full px-3 py-1.5">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  class="w-40 text-sm outline-none bg-transparent text-white placeholder-white/70"
                />
                <span class="ml-2">⌕</span>
              </div>

              <!-- Wishlist -->
              <NuxtLink to="/wishlist" class="relative cursor-pointer">
                <img src="/icone/wishlist.png" class="w-5 h-5" />
                <span class="badge">2</span>
              </NuxtLink>

              <!-- Panier -->
              <NuxtLink to="/cart" class="relative cursor-pointer">
                <img src="/icone/panier.png" class="w-7 h-7" />
                <span class="badge">3</span>
              </NuxtLink>
            </div>
          </div>

          <!-- Bouton mobile -->
          <button
            class="lg:hidden text-2xl cursor-pointer"
            @click="isMobileMenuOpen = true"
          >
            ☰
          </button>
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
        <button @click="closeMobile" class="text-2xl cursor-pointer">✕</button>
      </div>

      <nav class="space-y-4 text-lg">
        <NuxtLink to="/" @click="closeMobile" class="block">Accueil</NuxtLink>
        <NuxtLink to="/catalogue" @click="closeMobile" class="block">Catalogue</NuxtLink>
        <NuxtLink to="/faq" @click="closeMobile" class="block">FAQ</NuxtLink>
        <NuxtLink to="/contact" @click="closeMobile" class="block">Contact</NuxtLink>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from '#imports'

const isMobileMenuOpen = ref(false)
const route = useRoute()

const closeMobile = () => {
  isMobileMenuOpen.value = false
}

/**
 * Ajoute un trait en bas si la route est active
 */
const navClass = (path) => {
  const isActive =
    route.path === path || route.path.startsWith(path + '/')

  return [
    'nav-link relative pb-1',
    isActive ? 'nav-active' : ''
  ]
}
</script>

<style scoped>
.nav-link {
  font-size: 0.875rem;
  color: white;
  transition: color 0.2s ease;
}
.nav-link:hover {
  color: #f3c1ea;
}

/* TRAIT ACTIF */
.nav-active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 100%;
  height: 2px;
  background-color: #f3c1ea;
  border-radius: 9999px;
}

/* Badge */
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
