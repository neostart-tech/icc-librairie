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
            <a href="tel:+22879762733" class="flex items-center gap-2 mr-2 xl:mr-3 hover:text-pink-300 transition-colors duration-300">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
                </path>
              </svg>
              <span>+228 79 76 27 33</span>
            </a>
            <div class="w-px h-5 bg-white/20"></div>
            <a href="mailto:librairieicclome05gmail.com" class="flex items-center gap-2 mr-2 xl:mr-3 hover:text-pink-300 transition-colors duration-300">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>librairieicclome05gmail.com</span>
            </a>
            <div class="w-px h-5 bg-white/20"></div>
            <div class="flex items-center gap-2 cursor-default mr-2 xl:mr-3">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>Lun-Ven 8h-17h | Dim 8h-14h</span>
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
          <nav class="hidden md:flex flex-1 items-center justify-center xl:justify-start px-4 lg:px-8 gap-6 lg:gap-10">
            <NuxtLink to="/"
              exact-active-class="is-active"
              class="group relative font-bold text-white/90 hover:text-white transition-colors py-2 text-[14px] xl:text-[15px] tracking-wide ml-15 mr-15">
              Accueil
              <span
                class="nav-indicator absolute bottom-0 left-0 w-0 h-[2.5px] bg-white transition-all duration-300 group-hover:w-full rounded-full"></span>
            </NuxtLink>

            <!-- Catalogue avec Dropdown -->
            <div class="group relative py-2">
              <NuxtLink to="/catalogue"
                active-class="is-active"
                class="font-bold text-white/90 hover:text-white transition-colors text-[14px] xl:text-[15px] tracking-wide flex items-center gap-1.5 mr-15">
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
                    <NuxtLink v-for="cat in categorieStore.categories" :key="cat.id"
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
              class="group relative font-bold text-white/90 hover:text-white transition-colors py-2 text-[14px] xl:text-[15px] tracking-wide mr-15">
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
              class="group relative font-bold text-white/90 hover:text-white transition-colors py-2 text-[14px] xl:text-[15px] tracking-wide mr-15">
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

    <!-- Menu mobile plein écran (s'affiche sous le header) -->
    <transition enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-5 scale-95" enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-5 scale-95">
      <div v-if="isMenuOpen"
        class="md:hidden fixed top-[80px] lg:top-[135px] left-0 right-0 bg-gradient-to-b from-[#6a0d5f] to-[#4a0942] shadow-2xl z-40 border-t border-white/10 rounded-b-3xl">
        <div class="px-6 py-8 space-y-6">
          <nav class="flex flex-col gap-3">
            <NuxtLink to="/"
              class="animate-stagger-1 flex items-center justify-between bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-4 rounded-2xl text-white font-bold text-[17px] transition-all backdrop-blur-sm"
              @click="isMenuOpen = false">
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
                  </path>
                </svg>
                Accueil
              </div>
              <svg class="w-5 h-5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
              </svg>
            </NuxtLink>

            <div class="flex flex-col gap-1">
              <div
                class="animate-stagger-1 flex items-center justify-between bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-4 rounded-2xl text-white font-bold text-[17px] transition-all backdrop-blur-sm cursor-pointer"
                @click="isCatalogueExtended = !isCatalogueExtended">
                <div class="flex items-center gap-3">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
                    </path>
                  </svg>
                  Catalogue
                </div>
                <div class="p-1">
                  <svg class="w-6 h-6 transition-transform duration-300" :class="{ 'rotate-180': isCatalogueExtended }"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <!-- Extended Categories Mobile -->
              <div v-show="isCatalogueExtended"
                class="flex flex-col gap-1 pl-6 overflow-hidden transition-all duration-300">
                <NuxtLink to="/catalogue"
                  class="flex items-center uppercase px-5 py-3 bg-white/5 rounded-xl text-white/80 text-[15px] font-medium"
                  @click="isMenuOpen = false">
                  Tous les livres
                </NuxtLink>
                <NuxtLink v-for="cat in categorieStore.categories" :key="cat.id"
                  :to="`/catalogue?category=${cat.libelle}`"
                  class="flex items-center uppercase px-5 py-3 bg-white/5 rounded-xl text-white/80 text-[15px] font-medium"
                  @click="isMenuOpen = false">
                  {{ cat.libelle }}
                </NuxtLink>
              </div>
            </div>

            <NuxtLink v-if="isLoggedIn" to="/dashboard/commandes"
              class="animate-stagger-2 flex items-center justify-between bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-4 rounded-2xl text-white font-bold text-[17px] transition-all backdrop-blur-sm"
              @click="isMenuOpen = false">
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z">
                  </path>
                </svg>
                Mes commandes
              </div>
              <svg class="w-5 h-5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
              </svg>
            </NuxtLink>

            <NuxtLink v-if="isLoggedIn" to="/dashboard"
              class="animate-stagger-3 flex items-center justify-between bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-4 rounded-2xl text-white font-bold text-[17px] transition-all backdrop-blur-sm"
              @click="isMenuOpen = false">
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="7" height="7" rx="2" />
                  <rect x="14" y="3" width="7" height="7" rx="2" />
                  <rect x="14" y="14" width="7" height="7" rx="2" />
                  <rect x="3" y="14" width="7" height="7" rx="2" />
                </svg>
                Mon compte
              </div>
              <svg class="w-5 h-5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
              </svg>
            </NuxtLink>

            <!-- À propos et Contact : visibles uniquement si non connecté -->
            <NuxtLink v-if="!isLoggedIn" to="/a-propos"
              class="animate-stagger-2 flex items-center justify-between bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-4 rounded-2xl text-white font-bold text-[17px] transition-all backdrop-blur-sm"
              @click="isMenuOpen = false">
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                À propos
              </div>
              <svg class="w-5 h-5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
              </svg>
            </NuxtLink>

            <NuxtLink v-if="!isLoggedIn" to="/contact"
              class="animate-stagger-3 flex items-center justify-between bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-4 rounded-2xl text-white font-bold text-[17px] transition-all backdrop-blur-sm"
              @click="isMenuOpen = false">
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Contact
              </div>
              <svg class="w-5 h-5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
              </svg>
            </NuxtLink>

            <div class="h-px bg-white/20 my-2 w-full"></div>

            <NuxtLink v-if="!isLoggedIn" to="/connexion"
              class="animate-stagger-4 bg-white text-[#6a0d5f] px-5 py-4 rounded-2xl font-bold text-[17px] flex items-center justify-between hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              @click="isMenuOpen = false">
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Connexion
              </div>
              <svg class="w-5 h-5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
              </svg>
            </NuxtLink>

            <button v-else @click="handleLogout"
              class="animate-stagger-4 w-full bg-red-500/80 border border-red-400/30 text-white shadow-sm flex items-center justify-between hover:shadow-md px-5 py-4 rounded-2xl font-medium text-[17px] hover:bg-red-500 transition-all transform hover:-translate-y-1 backdrop-blur-sm">
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                </svg>
                Déconnexion
              </div>
            </button>
          </nav>
        </div>
      </div>
    </transition>

    <!-- Backdrop pour menu mobile -->
    <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div v-if="isMenuOpen" class="fixed inset-0 z-30 bg-black/50 md:hidden backdrop-blur-sm"
        @click="isMenuOpen = false">
      </div>
    </transition>
  </ClientOnly>

  <!-- Marge pour compenser le header fixe -->
  <div class="h-[60px] lg:h-[100px]"></div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useAuthStore } from "~~/stores/auth";
import { useCartStore } from "~~/stores/cart";
import { useCategorieStore } from "~~/stores/categorie";

import { useSearch } from "~/composables/useSearch";

import { useRouter } from "vue-router";

const router = useRouter();

router.afterEach(() => {
  isMenuOpen.value = false;
  isCatalogueExtended.value = false;
});

const { search } = useSearch();
const categorieStore = useCategorieStore();

const isMenuOpen = ref(false);
const isCatalogueExtended = ref(false);
const showDropdown = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

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
  await categorieStore.fetchCategories();
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

// Computed réactif pour savoir si l’utilisateur est connecté
const isLoggedIn = computed(() => auth.isLogged);
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
