<template>
  <!-- Header fixe -->
  <ClientOnly>
    <header class="fixed top-0 left-0 right-0 z-50 h-[60px] lg:h-[100px] bg-[#6a0d5f] flex shadow-md">

      <!-- Côté Gauche (Blanc avec la courbe "Bookle") -->
      <!-- Utilisation de z-20 pour que la gauche passe par-dessus la droite -->
      <div
        class="h-full bg-white flex items-center justify-center relative w-[110px] sm:w-[260px] lg:w-[340px] flex-shrink-0 z-20 transition-all duration-300">
        <NuxtLink to="/"
          class="flex items-center justify-center z-30 transform hover:scale-105 transition-transform duration-300">
          <img src="/logo/logo_librairie(1).png" alt="ICC_Librairie"
            class="h-[3.5rem] sm:h-[5.5rem] lg:h-[6.5rem] w-auto drop-shadow-md" />
        </NuxtLink>

        <!-- Courbure SVG exacte calquée sur le design "Bookle" -->
        <svg class="absolute top-0 right-[-39px] sm:right-[-59px] h-full w-[40px] sm:w-[60px] text-white pointer-events-none transition-all duration-300"
          preserveAspectRatio="none" viewBox="0 0 100 100" fill="currentColor">
          <!-- Courbe paramétrée pour garder l'arrondi parfait du haut et tomber droit en bas -->
          <path d="M0,0 L0,100 L97.5,100 L97.5,50 C97.5,30 65,10 0,0 Z" />
        </svg>
      </div>

      <!-- Côté Droit (Navigation / Formulaires en Violet) -->
      <div class="flex-1 h-full flex flex-col z-10">

        <!-- Top Contact Bar (Desktop Only) -->
        <div
          class="hidden lg:flex h-[48px] border-b border-white/10 items-center justify-between pr-4 sm:pr-8 lg:pr-12 pl-[65px] xl:pl-[80px] text-[12px] xl:text-[13px] text-white/90 bg-[#4a0942] ml-[35px]"
          style="clip-path: polygon(0 0, 100% 0, 100% 100%, 45px 100%);">
          <!-- Left spacing and clip-path create a slanted edge parallel to the white curve with a violet gap -->
          <div class="flex items-center gap-3 xl:gap-4 font-medium tracking-wide whitespace-nowrap">
            <a v-if="settingsStore.settings?.contact_phone_primary" :href="`tel:${settingsStore.settings.contact_phone_primary.replace(/\s+/g, '')}`" class="flex items-center gap-2 mr-2 xl:mr-3 hover:text-pink-300 transition-colors duration-300">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
                </path>
              </svg>
              <span>{{ settingsStore.settings.contact_phone_primary }}</span>
            </a>
            <div v-if="settingsStore.settings?.contact_phone_primary && settingsStore.settings?.contact_email" class="w-px h-5 bg-white/20"></div>
            <a v-if="settingsStore.settings?.contact_email" :href="`mailto:${settingsStore.settings.contact_email}`" class="flex items-center gap-2 mr-2 xl:mr-3 hover:text-pink-300 transition-colors duration-300">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>{{ settingsStore.settings.contact_email }}</span>
            </a>
            <div v-if="settingsStore.settings?.contact_email && (settingsStore.settings?.opening_hours_weekday || settingsStore.settings?.opening_hours_sunday)" class="w-px h-5 bg-white/20"></div>
            <div v-if="settingsStore.settings?.opening_hours_weekday || settingsStore.settings?.opening_hours_sunday" class="flex items-center gap-2 cursor-default mr-2 xl:mr-3">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>{{ settingsStore.settings.opening_hours_weekday }}{{ settingsStore.settings.opening_hours_weekday && settingsStore.settings.opening_hours_sunday ? ' | ' : '' }}{{ settingsStore.settings.opening_hours_sunday }}</span>
            </div>
          </div>

          <div class="flex items-center gap-3 font-medium tracking-wide z-10">
            <template v-if="!isLoggedIn">
              <NuxtLink to="/connexion"
                class="group flex items-center gap-2.5 bg-white text-[#6a0d5f] hover:bg-gray-100 px-5 py-2 rounded-full font-bold text-[13px] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
                <svg class="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none"
                  stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5" stroke-linecap="round"
                  stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Connexion
              </NuxtLink>
            </template>
            <template v-else>
              <button @click="handleLogout"
                class="group flex items-center gap-2.5 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full font-bold text-[13px] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 focus:outline-none">
                <svg class="w-4 h-4 text-white transition-transform duration-300 group-hover:-translate-x-0.5"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5" stroke-linecap="round"
                  stroke-linejoin="round">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                </svg>
                Déconnexion
              </button>
            </template>
          </div>
        </div>

        <!-- Main Navigation Bar -->
        <div
          class="flex-1 w-full flex items-center justify-end md:justify-between pr-4 sm:pr-8 lg:pr-12 pl-[30px] sm:pl-[40px] text-white gap-4">

          <!-- Main Navigation Links (Desktop) -->
          <nav class="hidden md:flex flex-1 items-center justify-center px-4 lg:px-8 gap-8 lg:gap-14 xl:gap-20">
            <NuxtLink to="/"
              exact-active-class="is-active"
              class="group relative font-bold text-white/90 hover:text-white transition-colors py-2 text-[14px] xl:text-[15px] tracking-wide">
              Accueil
              <span
                class="nav-indicator absolute bottom-0 left-0 w-0 h-[2.5px] bg-white transition-all duration-300 group-hover:w-full rounded-full"></span>
            </NuxtLink>

            <!-- Catalogue avec Dropdown -->
            <div class="group relative py-2">
              <NuxtLink to="/catalogue"
                active-class="is-active"
                class="font-bold text-white/90 hover:text-white transition-colors text-[14px] xl:text-[15px] tracking-wide flex items-center gap-1.5">
                Catalogue
                <svg class="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none"
                  stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
                </svg>
                <span
                  class="nav-indicator absolute bottom-0 left-0 w-0 h-[2.5px] bg-white transition-all duration-300 group-hover:w-full rounded-full"></span>
              </NuxtLink>

              <!-- Dropdown Menu -->
              <div
                class="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 min-w-[220px]">
                <div
                  class="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden py-2">
                  <!-- Tous les livres -->
                  <NuxtLink to="/catalogue"
                    class="flex items-center gap-3 px-5 py-3 text-gray-700 uppercase hover:text-[#6a0d5f] hover:bg-gray-50 transition-colors font-semibold text-sm border-b border-gray-100">
                    <svg class="w-4 h-4 text-[#6a0d5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Tous les livres
                  </NuxtLink>

                  <!-- Dynamic Categories -->
                  <div class="max-h-[300px] overflow-y-auto custom-scrollbar">
                    <NuxtLink v-for="cat in sortedCategories" :key="cat.id"
                      :to="`/catalogue?category=${cat.libelle}`"
                      class="flex uppercase items-center px-5 py-2.5 text-gray-600 hover:text-[#6a0d5f] hover:bg-gray-50 transition-all text-sm font-medium">
                      {{ cat.libelle }}
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>

            <NuxtLink v-if="isLoggedIn" to="/dashboard/commandes"
              active-class="is-active"
              class="group relative font-bold text-white/90 hover:text-white transition-colors py-2 text-[14px] xl:text-[15px] tracking-wide">
              Mes commandes
              <span
                class="nav-indicator absolute bottom-0 left-0 w-0 h-[2.5px] bg-white transition-all duration-300 group-hover:w-full rounded-full"></span>
            </NuxtLink>

            <NuxtLink v-if="isLoggedIn" to="/dashboard"
              exact-active-class="is-active"
              class="group relative font-bold text-white/90 hover:text-white transition-colors py-2 text-[14px] xl:text-[15px] tracking-wide">
              Mon compte
              <span
                class="nav-indicator absolute bottom-0 left-0 w-0 h-[2.5px] bg-white transition-all duration-300 group-hover:w-full rounded-full"></span>
            </NuxtLink>

            <!-- À propos et Contact : visibles uniquement si non connecté -->
            <NuxtLink v-if="!isLoggedIn" to="/a-propos"
              active-class="is-active"
              class="group relative font-bold text-white/90 hover:text-white transition-colors py-2 text-[14px] xl:text-[15px] tracking-wide">
              À propos
              <span
                class="nav-indicator absolute bottom-0 left-0 w-0 h-[2.5px] bg-white transition-all duration-300 group-hover:w-full rounded-full"></span>
            </NuxtLink>

            <NuxtLink v-if="!isLoggedIn" to="/contact"
              active-class="is-active"
              class="group relative font-bold text-white/90 hover:text-white transition-colors py-2 text-[14px] xl:text-[15px] tracking-wide">
              Contact
              <span
                class="nav-indicator absolute bottom-0 left-0 w-0 h-[2.5px] bg-white transition-all duration-300 group-hover:w-full rounded-full"></span>
            </NuxtLink>
          </nav>

          <!-- Right actions -->
          <div class="flex items-center gap-4 sm:gap-6 ml-auto">

            <!-- Panier moved to end -->

            <!-- Recherche -->
            <button
              @click="isSearchOpen = true"
              class="group relative flex items-center justify-center bg-white rounded-full w-[46px] h-[46px] lg:w-[40px] lg:h-[40px] shadow-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300 hover:-translate-y-1 z-20">
              <svg
                class="w-5 h-5 lg:w-5 lg:h-5 text-[#1a1a1a] transition-all duration-300 group-hover:text-[#6a0d5f] group-hover:scale-110"
                fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>

            <!-- Panier (Bookle style: white exact circle with dark icon) -->
            <NuxtLink to="/panier"
              class="group relative flex items-center justify-center bg-white rounded-full w-[46px] h-[46px] lg:w-[40px] lg:h-[40px] shadow-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300 hover:-translate-y-1 z-20">
              <svg
                class="w-5 h-5 lg:w-5 lg:h-5 text-[#1a1a1a] transition-all duration-300 group-hover:text-[#6a0d5f] group-hover:rotate-[-8deg] group-hover:scale-110"
                fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span v-if="(cartStore.count ?? 0) > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] font-bold h-[22px] min-w-[22px] px-1 flex items-center justify-center rounded-full shadow-sm border-2 border-white transition-all duration-300 group-hover:scale-110 group-hover:bg-red-600">
                {{ cartStore.count ?? 0 }}
              </span>
            </NuxtLink>

            <!-- Menu burger mobile et tablet -->
            <button
              class="lg:hidden flex items-center justify-center bg-white rounded-full w-[46px] h-[46px] shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 focus:outline-none z-20"
              @click="isMenuOpen = !isMenuOpen">
              <svg class="w-6 h-6 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <line v-if="!isMenuOpen" x1="3" y1="12" x2="21" y2="12"></line>
                <line v-if="!isMenuOpen" x1="3" y1="6" x2="21" y2="6"></line>
                <line v-if="!isMenuOpen" x1="3" y1="18" x2="21" y2="18"></line>
                <line v-if="isMenuOpen" x1="18" y1="6" x2="6" y2="18"></line>
                <line v-if="isMenuOpen" x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Menu mobile (Drawer) -->
    <transition 
      enter-active-class="transition duration-500 ease-in-out transform"
      enter-from-class="translate-x-full" 
      enter-to-class="translate-x-0"
      leave-active-class="transition duration-400 ease-in-out transform" 
      leave-from-class="translate-x-0" 
      leave-to-class="translate-x-full">
      <div v-if="isMenuOpen"
        class="lg:hidden fixed inset-y-0 right-0 w-[85%] sm:w-[400px] bg-gradient-to-br from-[#6a0d5f] to-[#3a0532] shadow-[0_0_50px_rgba(0,0,0,0.5)] z-[100] flex flex-col border-l border-white/10">
        
        <!-- Drawer Header -->
        <div class="p-6 flex items-center justify-between border-b border-white/5 bg-white/5 backdrop-blur-md">
           <NuxtLink to="/" @click="isMenuOpen = false">
             <img src="/logo/logo_librairie(1).png" alt="ICC" class="h-12 w-auto bg-white p-1.5 rounded-xl shadow-lg" />
           </NuxtLink>
           <button @click="isMenuOpen = false" class="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-all">
             <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
           </button>
        </div>

        <!-- Scrollable Content -->
        <div class="flex-1 overflow-y-auto custom-scrollbar px-6 py-8">
          <nav class="flex flex-col gap-3">
            <NuxtLink to="/"
              class="flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/5 px-5 py-4 rounded-2xl text-white font-bold text-[17px] transition-all"
              @click="isMenuOpen = false">
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
                  </path>
                </svg>
                Accueil
              </div>
              <svg class="w-5 h-5 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
              </svg>
            </NuxtLink>

            <div class="flex flex-col gap-1">
              <div
                class="flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/5 px-5 py-4 rounded-2xl text-white font-bold text-[17px] transition-all cursor-pointer"
                @click="isCatalogueExtended = !isCatalogueExtended">
                <div class="flex items-center gap-3">
                  <svg class="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
                    </path>
                  </svg>
                  Catalogue
                </div>
                <div class="p-1">
                  <svg class="w-5 h-5 transition-transform duration-300 opacity-50" :class="{ 'rotate-180': isCatalogueExtended }"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <!-- Extended Categories Mobile -->
              <div v-show="isCatalogueExtended"
                class="flex flex-col gap-1 pl-4 mt-1 overflow-hidden transition-all duration-300">
                <NuxtLink to="/catalogue"
                  class="flex items-center uppercase px-5 py-3 hover:bg-white/5 rounded-xl text-white/60 hover:text-white text-[14px] font-medium transition-colors"
                  @click="isMenuOpen = false">
                  Tous les livres
                </NuxtLink>
                <NuxtLink v-for="cat in sortedCategories" :key="cat.id"
                  :to="`/catalogue?category=${cat.libelle}`"
                  class="flex items-center uppercase px-5 py-3 hover:bg-white/5 rounded-xl text-white/60 hover:text-white text-[14px] font-medium transition-colors"
                  @click="isMenuOpen = false">
                  {{ cat.libelle }}
                </NuxtLink>
              </div>
            </div>

            <div class="h-px bg-white/5 my-2 w-full"></div>

            <NuxtLink v-if="isLoggedIn" to="/dashboard/commandes"
              class="flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/5 px-5 py-4 rounded-2xl text-white font-bold text-[17px] transition-all"
              @click="isMenuOpen = false">
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z">
                  </path>
                </svg>
                Mes commandes
              </div>
              <svg class="w-5 h-5 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
              </svg>
            </NuxtLink>

            <NuxtLink v-if="isLoggedIn" to="/dashboard"
              class="flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/5 px-5 py-4 rounded-2xl text-white font-bold text-[17px] transition-all"
              @click="isMenuOpen = false">
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="7" height="7" rx="2" />
                  <rect x="14" y="3" width="7" height="7" rx="2" />
                  <rect x="14" y="14" width="7" height="7" rx="2" />
                  <rect x="3" y="14" width="7" height="7" rx="2" />
                </svg>
                Mon compte
              </div>
              <svg class="w-5 h-5 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
              </svg>
            </NuxtLink>

            <NuxtLink v-if="!isLoggedIn" to="/a-propos"
              class="flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/5 px-5 py-4 rounded-2xl text-white font-bold text-[17px] transition-all"
              @click="isMenuOpen = false">
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                À propos
              </div>
              <svg class="w-5 h-5 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
              </svg>
            </NuxtLink>

            <NuxtLink v-if="!isLoggedIn" to="/contact"
              class="flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/5 px-5 py-4 rounded-2xl text-white font-bold text-[17px] transition-all"
              @click="isMenuOpen = false">
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Contact
              </div>
              <svg class="w-5 h-5 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
              </svg>
            </NuxtLink>

            <div class="h-px bg-white/5 my-4 w-full"></div>

            <NuxtLink v-if="!isLoggedIn" to="/connexion"
              class="bg-white text-[#6a0d5f] px-5 py-5 rounded-2xl font-bold text-[18px] flex items-center justify-between hover:bg-gray-100 transition-all shadow-xl shadow-[#000]/20 transform active:scale-95"
              @click="isMenuOpen = false">
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Connexion
              </div>
              <svg class="w-6 h-6 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
              </svg>
            </NuxtLink>

            <button v-else @click="handleLogout"
              class="w-full bg-red-500 text-white shadow-lg flex items-center justify-between px-5 py-5 rounded-2xl font-bold text-[18px] hover:bg-red-600 transition-all active:scale-95">
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                </svg>
                Déconnexion
              </div>
            </button>
          </nav>
          
          <!-- Bottom Info -->
          <div class="mt-8 pt-8 border-t border-white/5 space-y-4">
             <div class="flex flex-col gap-2 text-white/40 text-sm font-medium">
                <div v-if="settingsStore.settings?.contact_phone_primary" class="flex items-center gap-3">
                   <svg class="w-5 h-5 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                   {{ settingsStore.settings.contact_phone_primary }}
                </div>
                 <div v-if="settingsStore.settings?.contact_email" class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    {{ settingsStore.settings.contact_email }}
                 </div>
             </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Overlay de Recherche (Modal) -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95">
      <div v-if="isSearchOpen" class="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-[#6a0d5f]/40 backdrop-blur-md" @click="isSearchOpen = false"></div>
        
        <!-- Modal Container -->
        <div class="relative w-full max-w-4xl bg-white rounded-[2rem] lg:rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(106,13,95,0.2)] flex flex-col overflow-hidden max-h-[80vh] lg:max-h-[85vh] border border-white/20">
          
          <!-- Header Overlay -->
          <div class="flex items-center px-6 lg:px-10 py-6 lg:py-8 border-b border-gray-50 bg-white sticky top-0 z-10">
            <div class="flex-1 flex items-center gap-4 lg:gap-6">
              <svg class="w-6 h-6 lg:w-8 lg:h-8 text-[#6a0d5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                v-model="searchQuery"
                ref="searchInput"
                type="text"
                placeholder="Rechercher un livre, un auteur..."
                class="w-full text-xl lg:text-3xl font-bold text-gray-900 placeholder-gray-200 outline-none bg-transparent"
                @keyup.esc="isSearchOpen = false"
              />
              <button @click="isSearchOpen = false" class="p-2 hover:bg-gray-100 rounded-full transition-all group">
                <svg class="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Results Area -->
          <div class="flex-1 overflow-y-auto custom-scrollbar bg-white p-6 lg:p-10">
            <div class="max-w-4xl mx-auto">
              <div v-if="searchQuery.length > 0">
                <!-- Authors Results -->
                <div v-if="filteredSearchAuthors.length > 0" class="mb-10">
                  <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Auteurs</h3>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <NuxtLink
                      v-for="auteur in filteredSearchAuthors"
                      :key="auteur.id"
                      :to="`/catalogue?author=${auteur.nom}`"
                      @click="isSearchOpen = false"
                      class="flex items-center gap-4 p-3 bg-gray-50/50 hover:bg-white rounded-2xl border border-transparent hover:border-[#6a0d5f]/10 hover:shadow-lg transition-all group"
                    >
                      <div class="w-10 h-10 rounded-full bg-[#6a0d5f] text-white flex items-center justify-center font-bold text-sm">
                        {{ auteur.nom.charAt(0) }}
                      </div>
                      <div>
                        <p class="font-bold text-gray-900 group-hover:text-[#6a0d5f] transition-colors line-clamp-1">{{ auteur.nom }}</p>
                        <p class="text-[10px] text-gray-400 font-bold uppercase">Auteur</p>
                      </div>
                    </NuxtLink>
                  </div>
                </div>

                <!-- Books Results -->
                <div v-if="filteredSearchBooks.length > 0">
                  <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Livres</h3>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <NuxtLink
                      v-for="book in filteredSearchBooks"
                      :key="book.id"
                      :to="`/livres/${book.id}`"
                      @click="isSearchOpen = false"
                      class="flex gap-4 p-3 bg-gray-50/50 hover:bg-white rounded-2xl border border-transparent hover:border-[#6a0d5f]/10 hover:shadow-lg transition-all group"
                    >
                      <div class="w-16 aspect-[3/4] flex-shrink-0 rounded-lg overflow-hidden shadow-md">
                        <img :src="livreStore.getCoverImage(book)" :alt="book.titre" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div class="flex flex-col justify-center py-1">
                        <h4 class="font-bold text-sm text-gray-900 group-hover:text-[#6a0d5f] transition-colors line-clamp-2 leading-tight mb-1">{{ book.titre }}</h4>
                        <p class="text-[11px] font-bold text-gray-400 mb-2">{{ book.auteurRel?.nom || book.auteur || '--' }}</p>
                        <p class="text-sm font-black text-[#6a0d5f]">{{ formatPrice(book.prix_promo ?? book.prix) }} FCFA</p>
                      </div>
                    </NuxtLink>
                  </div>
                  
                  <!-- View all results -->
                  <div class="mt-8 text-center">
                    <NuxtLink 
                      :to="`/catalogue`"
                      @click="handleSeeAll"
                      class="inline-flex items-center gap-2 bg-[#6a0d5f] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#6a0d5f]/20 hover:scale-105 transition-all active:scale-95"
                    >
                      VOIR TOUT LE CATALOGUE
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                    </NuxtLink>
                  </div>
                </div>

                <!-- No Results -->
                <div v-if="filteredSearchBooks.length === 0 && filteredSearchAuthors.length === 0" class="py-12 text-center">
                  <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-200">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  </div>
                  <p class="text-lg font-bold text-gray-900">Aucun résultat pour "{{ searchQuery }}"</p>
                  <p class="text-sm text-gray-400 mt-1">Essayez d'autres mots-clés ou parcourez le catalogue.</p>
                </div>
              </div>

              <!-- Suggestions Area -->
              <div v-else class="space-y-10">
                <!-- Popular Categories -->
                <div>
                  <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Catégories populaires</h3>
                  <div class="flex flex-wrap gap-2">
                    <NuxtLink 
                      v-for="cat in categoriesWithBooks.slice(0, 10)" 
                      :key="cat.id"
                      :to="`/catalogue?category=${cat.libelle}`"
                      @click="isSearchOpen = false"
                      class="px-4 py-2 bg-gray-50 hover:bg-[#6a0d5f] hover:text-white rounded-full font-bold text-[12px] text-gray-600 transition-all border border-gray-100 hover:border-[#6a0d5f]"
                    >
                      {{ cat.libelle }}
                    </NuxtLink>
                  </div>
                </div>
                
                <!-- Special Selection -->
                <div v-if="livreDuMois">
                  <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Coup de cœur</h3>
                  <NuxtLink 
                    :to="`/livres/${livreDuMois.id}`"
                    @click="isSearchOpen = false"
                    class="group flex gap-6 p-4 bg-gray-50/50 hover:bg-white rounded-[2rem] border border-transparent hover:border-[#6a0d5f]/10 hover:shadow-xl transition-all duration-500"
                  >
                    <div class="w-24 lg:w-32 aspect-[3/4] flex-shrink-0 rounded-2xl overflow-hidden shadow-xl group-hover:-translate-y-2 transition-transform duration-700">
                      <img :src="livreStore.getCoverImage(livreDuMois)" class="w-full h-full object-cover" />
                    </div>
                    <div class="flex flex-col justify-center">
                      <span class="text-[9px] font-black text-orange-500 uppercase tracking-widest mb-2">Sélection Spéciale</span>
                      <h4 class="font-bold text-lg text-gray-900 group-hover:text-[#6a0d5f] transition-colors leading-tight mb-1">{{ livreDuMois.titre }}</h4>
                      <p class="text-[12px] font-bold text-gray-400 mb-3">{{ livreDuMois.auteurRel?.nom || livreDuMois.auteur || '--' }}</p>
                      <p class="text-base font-black text-[#6a0d5f]">{{ formatPrice(livreDuMois.prix_promo ?? livreDuMois.prix) }} FCFA</p>
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Backdrop pour menu mobile -->
    <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div v-if="isMenuOpen" class="fixed inset-0 z-[90] bg-black/60 lg:hidden backdrop-blur-md"
        @click="isMenuOpen = false">
      </div>
    </transition>
  </ClientOnly>

  <!-- Marge pour compenser le header fixe -->
  <div class="h-[60px] lg:h-[100px]"></div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { useAuthStore } from "~~/stores/auth";
import { useCartStore } from "~~/stores/cart";
import { useCategorieStore } from "~~/stores/categorie";
import { useLivreStore } from "~~/stores/livre";
import { useAuteurStore } from "~~/stores/auteur";
import { useSettingsStore } from "~~/stores/settings";

import { useSearch } from "~/composables/useSearch";

import { useRouter } from "vue-router";

const router = useRouter();

router.afterEach(() => {
  isMenuOpen.value = false;
  isCatalogueExtended.value = false;
});

const { search } = useSearch();
const categorieStore = useCategorieStore();
const livreStore = useLivreStore();
const auteurStore = useAuteurStore();
const settingsStore = useSettingsStore();

const isMenuOpen = ref(false);
const isCatalogueExtended = ref(false);
const showDropdown = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

// Search State
const isSearchOpen = ref(false);
const searchQuery = ref("");
const searchInput = ref<HTMLInputElement | null>(null);

// Focus input when search opens
watch(isSearchOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      searchInput.value?.focus();
    }, 100);
  } else {
    document.body.style.overflow = '';
  }
});

const filteredSearchBooks = computed(() => {
  if (searchQuery.value.length < 2) return [];
  const q = searchQuery.value.toLowerCase();
  return livreStore.livres.filter(b => 
    b.titre.toLowerCase().includes(q) || 
    (b.auteurRel?.nom || b.auteur || "").toLowerCase().includes(q)
  ).slice(0, 8);
});

const filteredSearchAuthors = computed(() => {
  if (searchQuery.value.length < 2) return [];
  const q = searchQuery.value.toLowerCase();
  return auteurStore.auteurs.filter(a => 
    a.nom.toLowerCase().includes(q)
  ).slice(0, 6);
});

const categoriesWithBooks = computed(() => {
  return categorieStore.categories.filter(cat => 
    livreStore.livres.some(livre => livre.categorie_id === cat.id)
  );
});

const livreDuMois = computed(() => livreStore.livreDuMois);

const handleSeeAll = () => {
  search.value = searchQuery.value;
  isSearchOpen.value = false;
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR').format(price);
};

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    showDropdown.value = false;
  }
};

const auth = useAuthStore();
const cartStore = useCartStore();
import Swal from 'sweetalert2';

// Initialise le store depuis localStorage
onMounted(async () => {
  auth.init();
  document.addEventListener("click", handleClickOutside);
  
  // Fetch missing data
  const promises = [categorieStore.fetchCategories()];
  if (livreStore.livres.length === 0) promises.push(livreStore.fetchLivres());
  if (auteurStore.auteurs.length === 0) promises.push(auteurStore.fetchAuteurs());
  if (!livreStore.livreDuMois) promises.push(livreStore.fetchFeaturedLivres());
  if (!settingsStore.settings) promises.push(settingsStore.fetchSettings());
  
  await Promise.all(promises);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

// Computed réactif pour savoir si l’utilisateur est connecté
const isLoggedIn = computed(() => auth.isLogged);

const sortedCategories = computed(() =>
  [...categorieStore.categories].sort((a, b) =>
    a.libelle.localeCompare(b.libelle, 'fr', { sensitivity: 'base' })
  )
);
const handleLogout = () => {
  Swal.fire({
    title: 'Déconnexion ?',
    text: "Souhaitez-vous vraiment quitter votre session ?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#ef4444', // Red for logout
    cancelButtonColor: '#f3f4f6',
    cancelButtonText: '<span style="color: #9ca3af; font-weight: bold;">Rester</span>',
    confirmButtonText: 'Oui, me déconnecter',
    reverseButtons: true,
    customClass: {
      popup: 'rounded-[2rem]',
      confirmButton: 'rounded-xl font-bold px-6 py-3 uppercase tracking-widest text-sm',
      cancelButton: 'rounded-xl font-bold px-6 py-3 uppercase tracking-widest text-sm'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      auth.logout();
      isMenuOpen.value = false;
      Swal.fire({
        title: 'À bientôt !',
        text: 'Vous avez été déconnecté avec succès.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        customClass: {
          popup: 'rounded-[2rem]'
        }
      });
    }
  });
};
</script>

<style scoped>
.is-active {
  color: white !important;
}

.is-active .nav-indicator {
  width: 100% !important;
}

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

@keyframes slideInUp {
  0% {
    opacity: 0;
    transform: translateY(15px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-stagger-1 {
  opacity: 0;
  animation: slideInUp 0.4s ease-out 0.1s forwards;
}

.animate-stagger-2 {
  opacity: 0;
  animation: slideInUp 0.4s ease-out 0.2s forwards;
}

.animate-stagger-3 {
  opacity: 0;
  animation: slideInUp 0.4s ease-out 0.3s forwards;
}

/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
</style>
