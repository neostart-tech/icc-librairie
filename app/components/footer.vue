<template>
  <footer
    class="relative bg-gradient-to-b from-[#6a0d5f] to-[#3a0532] text-white pt-24 mt-12 overflow-hidden shadow-[0_-10px_40px_rgba(106,13,95,0.1)]">
    <!-- Décoration d'arrière-plan avec cercles flous (Glassmorphism effect) -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div
        class="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-white/5 blur-[100px] animate-pulse"
        style="animation-duration: 4s;"></div>
      <div
        class="absolute bottom-[10%] -right-[10%] w-[600px] h-[600px] rounded-full bg-pink-500/10 blur-[120px] animate-pulse"
        style="animation-duration: 6s; animation-delay: 1s;"></div>

      <!-- Lignes de grille décoratives -->
      <div
        class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBoNDBWMEgwem0yMCAyMGgyMHYyMEgyMHoiIGZpbGw9IiNmZmZmZmYwMyIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==')] opacity-20 hidden md:block">
      </div>
    </div>

    <!-- Séparateur vague en haut -->
    <div
      class="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 text-white transform rotate-180 drop-shadow-sm">
      <svg class="relative block w-[calc(110%+1.3px)] h-[40px] md:h-[60px]" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor">
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z">
        </path>
      </svg>
    </div>

    <!-- Container principal -->
    <div class="relative z-20 container mx-auto px-6 sm:px-10 lg:px-20 py-12 md:py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

        <!-- Colonne 1 : Brand & Description (Prend plus de place) -->
        <div class="lg:col-span-4 space-y-8 lg:pr-4">
          <!-- Logo -->
          <div class="flex items-center gap-4 group cursor-pointer inline-flex w-fit">
            <div class="relative">
              <div
                class="absolute -inset-2 rounded-full bg-white/90 group-hover:opacity-100 transition duration-500">
              </div>
              <img src="/logo/logo_librairie(1).png" alt="Librairie ICC Lomé"
                class="relative hover:rotate-6 transition-transform duration-500 h-16 sm:h-20 w-auto rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.2)] border border-white/20" />
            </div>
            <div>
              <h3
                class="font-bold text-xl sm:text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-200 group-hover:translate-x-1 transition-transform duration-300">
                Librairie ICC</h3>
              <p
                class="text-xl sm:text-2xl text-white/80 font-bold tracking-[0.2em] uppercase group-hover:translate-x-1 transition-transform duration-300 delay-75">
                <span class="text-pink-300">LOMÉ</span></p>
            </div>
          </div>

          <!-- Description -->
          <p class="text-white/70 leading-relaxed text-[15px] sm:text-[16px] font-medium max-w-sm">
            Une plateforme moderne au service de la communauté chrétienne pour une meilleure communication, organisation
            et diffusion.
          </p>

          <!-- Réseaux Sociaux Animés -->
          <div class="flex gap-4 pt-2">
            <a v-for="social in [
              { icon: 'facebook', url: 'https://web.facebook.com/icclome.librairie' },
              { icon: 'tiktok', url: 'https://www.tiktok.com/@librairie.icc.lome' },
              { icon: 'instagram', url: 'https://www.instagram.com/egliseicc_lome/' },
              { icon: 'youtube', url: 'https://www.youtube.com/@icctvlome' }
            ]" :key="social.icon" :href="social.url" target="_blank" rel="noopener noreferrer"
              class="group relative flex items-center justify-center w-12 h-12 rounded-[16px] bg-white/5 border border-white/20 hover:border-transparent overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.4)] hover:bg-white/10 backdrop-blur-sm">
              <!-- Fond interactif qui monte au survol -->
              <div
                class="absolute inset-0 bg-gradient-to-tr from-[#6a0d5f] to-pink-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0">
              </div>

              <!-- Icone dynamique -->
              <img :src="`/icone/${social.icon}.png`" :alt="social.icon"
                class="w-5 h-5 object-contain relative z-10 transition-all duration-300 group-hover:scale-125 group-hover:brightness-0 group-hover:invert" />
            </a>
          </div>
        </div>

        <!-- Colonne 2 : Navigation -->
        <div class="lg:col-span-2">
          <h4 class="font-bold text-xl mb-6 sm:mb-8 flex items-center gap-3 text-white">
            <span class="w-8 h-1 bg-gradient-to-r from-pink-400 to-transparent rounded-full inline-block"></span>
            Navigation
          </h4>
          <ul class="space-y-4 ml-10 lg:ml-0">
            <li v-for="link in [
              { name: 'Accueil', path: '/' },
              { name: 'Catalogue', path: '/catalogue' },
              { name: 'Mes commandes', path: '/dashboard/commandes' },
              { name: 'Mon compte', path: '/dashboard/profil' },
              { name: 'Contact', path: '/contact' }
            ]" :key="link.name">
              <NuxtLink :to="link.path"
                class="group flex items-center text-white/70 hover:text-white transition-all duration-300 text-[15px] sm:text-[16px] font-medium w-fit">
                <span
                  class="w-0 h-[2px] bg-pink-400 mr-0 transition-all duration-300 group-hover:w-4 group-hover:mr-3 opacity-0 group-hover:opacity-100"></span>
                <span class="group-hover:translate-x-1 transition-transform duration-300">{{ link.name }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Colonne 3 : Contact -->
        <div class="lg:col-span-3 lg:ml-5">
          <h4 class="font-bold text-xl mb-6 sm:mb-8 flex items-center gap-3 text-white">
            <span class="w-8 h-1 bg-gradient-to-r from-pink-400 to-transparent rounded-full inline-block"></span>
            Contact
          </h4>
          <ul class="space-y-5">
            <!-- Téléphones -->
            <li class="flex items-start gap-3 text-white/70 group">
              <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-pink-500/20 transition-colors">
                <svg class="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div class="flex flex-col font-medium text-[15px]">
                <a href="tel:+22892090204" class="hover:text-white transition-colors duration-300 block">+228 92 09 02 04</a>
                <a href="tel:+22890009462" class="hover:text-white transition-colors duration-300 block mt-0.5">+228 90 00 94 62</a>
              </div>
            </li>
            
            <!-- Email -->
            <li class="flex items-center gap-3 text-white/70 group">
              <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-pink-500/20 transition-colors">
                <svg class="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <a href="mailto:contact@icc-librairie.com" class="hover:text-white transition-colors duration-300 font-medium text-[15px]">contact@icc-librairie.com</a>
            </li>

            <!-- Adresse -->
            <li class="flex items-start gap-3 text-white/70 group">
              <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-pink-500/20 transition-colors">
                <svg class="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div class="flex flex-col font-medium">
                <span class="text-[15px] text-white">Librairie ICC Hountigomé</span>
                <span class="text-[14px] mt-0.5">Lomé, Togo</span>
              </div>
            </li>
          </ul>
        </div>

        <!-- Colonne 4 : Localisation (Carte) -->
        <div class="lg:col-span-3">
          <h4 class="font-bold text-xl mb-6 sm:mb-8 flex items-center gap-3 text-white">
            <span class="w-8 h-1 bg-gradient-to-r from-pink-400 to-transparent rounded-full inline-block"></span>
            Localisation
          </h4>
          <div class="rounded-2xl overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.2)] border border-white/10 h-[200px] relative group">
            <a href="https://maps.app.goo.gl/dR4RifFhWgnLxVps6" target="_blank" rel="noopener noreferrer" 
               class="absolute inset-0 bg-transparent transition-all duration-500 z-10 cursor-pointer flex items-center justify-center hover:bg-black/20">
               <div class="bg-[#6a0d5f] text-white text-sm px-4 py-2 rounded-full font-bold shadow-lg opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2">
                 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                   <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                   <circle cx="12" cy="10" r="3"></circle>
                 </svg>
                 Ouvrir dans Google Maps
               </div>
            </a>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d1.2152!3d6.1375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMDgnMTUuMCJOIDHCsDEyJzU0LjciRQ!5e0!3m2!1sfr!2stg!4v1234567890"
              class="w-full h-full border-0 transition-all duration-500"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Localisation Librairie ICC Hountigomé Lomé Togo"
            ></iframe>
          </div>
        </div>

      </div>
    </div>

    <!-- Ligne de séparation et Copyright -->
    <div class="relative z-20 border-t border-white/10 mt-6 bg-black/20 backdrop-blur-md">
      <div
        class="container mx-auto px-6 sm:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] sm:text-[14px] text-white/70 font-medium">
        <p class="flex items-center gap-2">
          © {{ new Date().getFullYear() }}
          <span class="text-white font-bold tracking-wider">ICC – TOGO</span>.
          <span class="hidden sm:inline">Tous droits réservés.</span>
        </p>

        <p
          class="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
          Développé par
          <a href="https://neostart.tech/" target="_blank"
            class="text-white font-bold hover:text-pink-300 transition-colors duration-300 relative group overflow-hidden">
            <span class="relative z-10">Neo Start Technology</span>
            <span
              class="absolute bottom-0 left-0 w-full h-[2px] bg-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Aucun script additionnel n'est nécessaire
</script>

<style scoped>
/* Keyframes pour de légères animations de flottaison si besoin */
@keyframes float {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(0px);
  }
}
</style>
