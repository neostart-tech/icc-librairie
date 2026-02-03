<template>
  <footer class="bg-[#6a0d5f] text-white">
    <!-- Section principale -->
    <div class="px-6 sm:px-10 lg:px-20 xl:px-28 py-20">
      <div
        class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
      >
        <!-- Logo + description -->
        <div class="space-y-6">
          <div class="flex items-center gap-3">
            <img
              src="/logo/logo-icc.jpg"
              alt="Impact Centre Chrétien Togo"
              class="h-12 w-auto"
            />
            <div>
              <p class="font-semibold text-lg">Impact Centre</p>
              <p class="text-sm text-white/70">
                Chrétien <span class="font-semibold">TOGO</span>
              </p>
            </div>
          </div>

          <p class="text-sm text-white/80 leading-relaxed">
            Une plateforme au service de la communauté chrétienne pour une
            meilleure communication, organisation et diffusion.
          </p>

          <!-- Réseaux sociaux -->
          <div class="flex gap-4">
            <a
              v-for="icon in ['facebook', 'tiktok', 'instagram', 'youtube']"
              :key="icon"
              href="#"
              class="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center hover:bg-white/10 transition"
            >
              <img
                :src="`/icone/${icon}.png`"
                :alt="icon"
                class="w-5 h-5 object-contain"
              />
            </a>
          </div>
        </div>

        <!-- Navigation -->
        <div>
          <h4 class="font-semibold text-lg mb-5">Navigation</h4>
          <ul class="space-y-3 text-sm text-white/80">
            <li>
              <NuxtLink class="hover:text-white" to="/">Accueil</NuxtLink>
            </li>
            <li>
              <NuxtLink class="hover:text-white" to="/">
                Fonctionnalités
              </NuxtLink>
            </li>
            <li><NuxtLink class="hover:text-white" to="/">FAQs</NuxtLink></li>
            <li><NuxtLink class="hover:text-white" to="/">Blog</NuxtLink></li>
            <li>
              <NuxtLink class="hover:text-white" to="/">Contact</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Liens utiles -->
        <div>
          <h4 class="font-semibold text-lg mb-5">Liens utiles</h4>
          <ul class="space-y-3 text-sm text-white/80">
            <li>
              <NuxtLink class="hover:text-white" to="/">
                Prise en main
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="hover:text-white" to="/">
                Conditions d’utilisation
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="hover:text-white" to="/">
                Politique de confidentialité
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="hover:text-white" to="/">
                Suppression de compte
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="hover:text-white" to="/">
                Mentions légales
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bas de footer -->
    <div class="bg-[#5a0a50] py-5 text-center text-sm text-white/80">
      © 2025 ICC – TOGO. Tous droits réservés.
      <br class="md:hidden" />
      Développé par
      <a
        href="https://neostart.tech/"
        target="_blank"
        class="font-medium hover:underline"
      >
        Neo Start Technology
      </a>
    </div>
  </footer>
</template>
