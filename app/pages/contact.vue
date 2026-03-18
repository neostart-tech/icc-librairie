<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="relative h-[50vh] min-h-[340px] overflow-hidden">
      <img
        src="/images/a-propos/img2.jpg"
        alt="Contact Librairie ICC"
        class="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-[#6a0d5f]/80 via-[#6a0d5f]/60 to-[#3a0532]/90"></div>
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <span class="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-[0.25em] px-5 py-2 rounded-full border border-white/30 mb-5">
          Nous sommes à votre écoute
        </span>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
          Contactez-nous
        </h1>
        <p class="text-white/90 text-lg sm:text-xl max-w-xl font-medium">
          La Librairie ICC Hountigomé à Lomé, Togo
        </p>
      </div>
      <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg class="relative block w-[calc(100%+1.3px)] h-[60px]" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120" preserveAspectRatio="none" fill="white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>
    </section>

    <!-- Section Coordonnées + Carte -->
    <section class="py-16 lg:py-24 px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

        <!-- Infos de contact -->
        <div class="lg:col-span-2 space-y-8">
          <div>
            <div class="flex items-center gap-3 mb-2">
              <span class="w-10 h-1 bg-[#6a0d5f] rounded-full inline-block"></span>
              <span class="text-[#6a0d5f] font-bold uppercase text-sm tracking-widest">Nos coordonnées</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mt-3">Trouvez-nous facilement</h2>
          </div>

          <!-- Téléphones -->
          <div class="bg-gray-50 rounded-3xl p-6 space-y-5 border border-gray-100">
            <h3 class="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Téléphone</h3>
            <a v-for="phone in phones" :key="phone.number" :href="'tel:' + phone.raw"
              class="group flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 border border-gray-100 hover:border-[#6a0d5f]/30">
              <div class="w-11 h-11 rounded-xl bg-[#6a0d5f]/10 flex items-center justify-center group-hover:bg-[#6a0d5f] transition-colors duration-300 flex-shrink-0">
                <svg class="w-5 h-5 text-[#6a0d5f] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div>
                <p class="font-bold text-gray-900 text-[15px] group-hover:text-[#6a0d5f] transition-colors">{{ phone.number }}</p>
                <p class="text-gray-400 text-xs font-medium">{{ phone.label }}</p>
              </div>
            </a>
          </div>

          <!-- Email -->
          <a href="mailto:contact@icc-librairie.com"
            class="group flex items-center gap-4 p-5 bg-gray-50 rounded-3xl border border-gray-100 hover:border-[#6a0d5f]/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div class="w-12 h-12 rounded-2xl bg-[#6a0d5f]/10 flex items-center justify-center group-hover:bg-[#6a0d5f] transition-colors duration-300 flex-shrink-0">
              <svg class="w-5 h-5 text-[#6a0d5f] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div>
              <p class="font-bold text-gray-900 text-[15px] group-hover:text-[#6a0d5f] transition-colors">contact@icc-librairie.com</p>
              <p class="text-gray-400 text-xs font-medium">Email</p>
            </div>
          </a>

          <!-- Horaires d'ouverture -->
          <div class="bg-gradient-to-br from-[#6a0d5f] to-[#4a0942] rounded-3xl p-6 text-white">
            <div class="flex items-center gap-3 mb-5">
              <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 class="font-bold text-lg">Horaires d'ouverture</h3>
            </div>
            <div class="space-y-3">
              <div v-for="schedule in schedules" :key="schedule.day"
                class="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                <span class="font-medium text-white/80 text-[15px]">{{ schedule.day }}</span>
                <span class="font-bold text-white text-[15px] bg-white/15 px-3 py-1 rounded-full">{{ schedule.hours }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Carte + Adresse -->
        <div class="lg:col-span-3 space-y-6">
          <div>
            <div class="flex items-center gap-3 mb-2">
              <span class="w-10 h-1 bg-[#6a0d5f] rounded-full inline-block"></span>
              <span class="text-[#6a0d5f] font-bold uppercase text-sm tracking-widest">Localisation</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mt-3">Où nous trouver ?</h2>
          </div>

          <!-- Carte Google Maps intégrée -->
          <div class="relative rounded-3xl overflow-hidden shadow-xl border border-gray-100 h-[350px] sm:h-[430px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d1.2152!3d6.1375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMDgnMTUuMCJOIDHCsDEyJzU0LjciRQ!5e0!3m2!1sfr!2stg!4v1234567890"
              class="w-full h-full border-0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Localisation Librairie ICC Hountigomé Lomé Togo"
            ></iframe>
          </div>

          <!-- Bouton ouvrir dans Maps -->
          <a
            href="https://maps.app.goo.gl/dR4RifFhWgnLxVps6"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center justify-center gap-3 w-full bg-[#6a0d5f] hover:bg-[#4a0942] text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-[15px]"
          >
            <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            Ouvrir dans Google Maps
            <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 6l6 6-6 6" />
            </svg>
          </a>

          <!-- Adresse sous la carte -->
          <div class="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
            <div class="w-10 h-10 rounded-xl bg-[#6a0d5f]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg class="w-5 h-5 text-[#6a0d5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div>
              <p class="font-bold text-gray-900 text-[15px]">Librairie ICC Hountigomé</p>
              <p class="text-gray-500 text-[14px] mt-1 leading-relaxed">Lomé, Togo<br/>À côté de l'Impact Centre Chrétien</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Bannière Catalogue -->
    <section class="py-16 px-6 bg-gradient-to-r from-[#6a0d5f] to-[#4a0942] relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 right-0 w-64 h-64 rounded-full bg-white -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-pink-400 translate-y-1/2 -translate-x-1/4 blur-3xl"></div>
      </div>
      <div class="relative max-w-3xl mx-auto text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">Venez découvrir nos livres</h2>
        <p class="text-white/80 text-lg mb-8">Des centaines d'ouvrages chrétiens, spirituels et de développement personnel vous attendent</p>
        <NuxtLink to="/catalogue"
          class="inline-block bg-white text-[#6a0d5f] font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-[15px]">
          Parcourir le catalogue
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Contact – Librairie ICC Hountigomé',
  meta: [
    { name: 'description', content: 'Contactez la Librairie ICC Hountigomé à Lomé, Togo. Retrouvez nos numéros de téléphone, email, horaires d\'ouverture et notre localisation.' }
  ]
})

const phones = [
  { number: '+228 92 09 02 04', raw: '+22892090204', label: 'Principal' },
  { number: '+228 90 00 94 62', raw: '+22890009462', label: 'Secondaire' },
  { number: '+228 79 76 27 33', raw: '+22879762733', label: 'Secondaire' },
]

const schedules = [
  { day: 'Lundi – Vendredi', hours: '8h00 – 17h00' },
  { day: 'Dimanche', hours: '8h00 – 14h00' },
]
</script>
