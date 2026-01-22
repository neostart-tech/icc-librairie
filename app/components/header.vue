<template>
  <div>
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm">
      <nav class="py-4 px-8 lg:px-16 xl:px-24 2xl:px-32">
        <div class="flex items-center justify-between">

          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center space-x-3">
            <img src="/logo/logo-icc.jpg" alt="ICC" class="h-12 w-auto" />
            <div class="leading-tight">
              <p class="text-lg font-bold text-[#213061]">Impact Centre</p>
              <p class="text-sm font-semibold text-[#213061]">Chrétien | Togo</p>
            </div>
          </NuxtLink>

          <!-- MENU DESKTOP -->
          <div class="hidden lg:flex items-center space-x-8">
            <!-- Menus existants -->
            <NuxtLink to="/accueil" class="nav-link">Accueil</NuxtLink>
            <NuxtLink to="/catalogue" class="nav-link">Catalogue</NuxtLink>
            <NuxtLink to="/faq" class="nav-link">FAQ</NuxtLink>
            <NuxtLink to="/contact" class="nav-link">Contact</NuxtLink>

            <!-- NOUVEAUTÉS À DROITE -->
            <div class="flex items-center space-x-5 ml-6">

              <!-- Recherche (nouveau style sobre) -->
              <div class="flex items-center border rounded-full px-3 py-1.5">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  class="w-40 text-sm outline-none bg-transparent"
                />
                <span class="text-gray-400 ml-2">⌕</span>
              </div>

              <!-- Wishlist -->
              <NuxtLink to="/wishlist" class="relative text-[#213061] hover:text-[#840B7F]">
                ❤️
                <span class="badge">2</span>
              </NuxtLink>

              <!-- Panier -->
              <NuxtLink to="/cart" class="relative text-[#213061] hover:text-[#840B7F]">
                🛒
                <span class="badge bg-[#213061]">3</span>
              </NuxtLink>
            </div>
          </div>

          <!-- Bouton mobile -->
          <button
            class="lg:hidden text-2xl"
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
      class="fixed inset-0 bg-white z-50 p-6"
    >
      <div class="flex justify-between items-center mb-6">
        <span class="font-bold text-[#213061]">Menu</span>
        <button @click="closeMobile" class="text-2xl">✕</button>
      </div>

      <!-- Recherche mobile -->
      <input
        type="text"
        placeholder="Rechercher..."
        class="w-full border rounded-lg px-4 py-2 mb-6"
      />

      <!-- Menus -->
      <nav class="space-y-4 text-[#213061]">
        <NuxtLink to="/accueil" @click="closeMobile">Accueil</NuxtLink>
        <NuxtLink to="/catalogue" @click="closeMobile">Catalogue</NuxtLink>
        <NuxtLink to="/faq" @click="closeMobile">FAQ</NuxtLink>
        <NuxtLink to="/contact" @click="closeMobile">Contact</NuxtLink>
      </nav>

      <!-- Actions -->
      <div class="mt-6 space-y-3">
        <NuxtLink to="/wishlist" @click="closeMobile">❤️ Liste de souhaits</NuxtLink>
        <NuxtLink to="/cart" @click="closeMobile">🛒 Panier</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const isMobileMenuOpen = ref(false)

const closeMobile = () => {
  isMobileMenuOpen.value = false
}
</script>

<style scoped>
.nav-link {
  font-size: 0.875rem;
  color: #202a50;
}
.nav-link:hover {
  color: #840b7f;
}

.badge {
  position: absolute;
  top: -6px;
  right: -10px;
  background: #840b7f;
  color: white;
  font-size: 10px;
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
