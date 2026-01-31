<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-[#6a0d5f]">
    <nav class="px-4 sm:px-6 lg:px-16 xl:px-24 py-4 text-white">

      <!-- GRID HEADER -->
      <div
        class="grid grid-cols-[auto_1fr_auto] items-center gap-4"
      >

        <!-- GAUCHE : LOGO -->
        <NuxtLink to="/" class="flex items-center">
          <img
            src="/logo/logo_librairie(1).png"
            alt="ICC_Librairie"
            class="h-12 sm:h-14 w-auto"
          />
        </NuxtLink>

        <!-- MILIEU : RECHERCHE (TOUJOURS CENTRÉE) -->
        <div class="flex justify-center">
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

        <!-- DROITE : ICONES -->
        <div class="flex items-center space-x-5 sm:space-x-6">

          <!-- Panier -->
          <NuxtLink to="/panier" class="relative">
            <img src="/icone/panier.png" class="w-5 h-5" />
            <span class="badge">3</span>
          </NuxtLink>

          <!-- Compte -->
          <NuxtLink to="/connexion">
            <img src="/icone/user.png" class="w-6 h-6" />
          </NuxtLink>

        </div>

      </div>
    </nav>
  </header>

  <!-- ESPACE POUR HEADER FIXE -->
  <div class="h-[90px]"></div>
</template>

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
