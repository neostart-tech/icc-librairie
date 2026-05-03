<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="relative h-[55vh] min-h-[380px] overflow-hidden">
      <!-- Image de fond avec parallaxe -->
      <img
        src="/images/a-propos/img1.jpg"
        alt="Librairie ICC Hountigomé"
        class="absolute inset-0 w-full h-full object-cover object-center scale-105"
      />
      <!-- Overlay dégradé violet -->
      <div class="absolute inset-0 bg-gradient-to-b from-[#6a0d5f]/80 via-[#6a0d5f]/60 to-[#3a0532]/90"></div>

      <!-- Contenu Hero -->
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <span class="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-[0.25em] px-5 py-2 rounded-full border border-white/30 mb-5">
          Depuis décembre 2025
        </span>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
          À propos de nous
        </h1>
        <p class="text-white/90 text-lg sm:text-xl max-w-2xl font-medium leading-relaxed">
          Un espace dédié à la littérature chrétienne, spirituelle et au développement personnel
        </p>
      </div>

      <!-- Vague en bas -->
      <!-- <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg class="relative block w-[calc(100%+1.3px)] h-[60px]" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120" preserveAspectRatio="none" fill="white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div> -->
    </section>

    <!-- Section principale : Qui sommes-nous -->
    <section class="py-16 lg:py-24 px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <!-- Texte -->
        <div class="space-y-6">
          <div class="flex items-center gap-3">
            <span class="w-10 h-1 bg-[#6a0d5f] rounded-full inline-block"></span>
            <span class="text-[#6a0d5f] font-bold uppercase text-sm tracking-widest">Notre histoire</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            La Librairie ICC<br/>
            <span class="text-[#6a0d5f]">Hountigomé</span>
          </h2>
          <p class="text-gray-600 leading-relaxed text-[16px] text-justify">
            La <strong class="text-gray-800">Librairie ICC Hountigomé</strong>, ouverte en <strong class="text-[#6a0d5f]">décembre 2025</strong> à Lomé (Togo), est bien plus qu'un simple espace de vente de livres. C'est un lieu de rencontre, d'édification et de croissance fondé par l'<strong class="text-gray-800">Impact Centre Chrétien (ICC) Togo</strong>.
          </p>
          <p class="text-gray-600 leading-relaxed text-[16px] text-justify">
            Notre librairie propose une sélection soigneusement choisie de <strong class="text-gray-800">livres chrétiens, d'ouvrages de développement personnel, de supports spirituels et d'inspirations</strong> pour accompagner votre foi et votre épanouissement au quotidien.
          </p>
          <p class="text-gray-600 leading-relaxed text-[16px] text-justify">
            Que vous soyez croyant de longue date ou en quête de réponses, notre espace vous accueille dans un cadre chaleureux et bienveillant.
          </p>

          <!-- Tags -->
          <div class="flex flex-wrap gap-3 pt-2">
            <span v-for="tag in ['Livres chrétiens', 'Développement personnel', 'Spiritualité', 'Littérature', 'Supports d\'édification']"
              :key="tag"
              class="px-4 py-1.5 bg-[#6a0d5f]/8 text-[#6a0d5f] text-sm font-semibold rounded-full border border-[#6a0d5f]/20">
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- Image principale -->
        <div class="relative">
          <div class="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
            <img src="/images/a-propos/img2.jpg" alt="Intérieur de la librairie" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#6a0d5f]/30 to-transparent"></div>
          </div>
          <!-- Badge flottant -->
          <div class="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl px-6 py-4 border border-gray-100">
            <p class="text-3xl font-bold text-[#6a0d5f]">2025</p>
            <p class="text-gray-500 text-sm font-medium">Ouverture</p>
          </div>
          <!-- Badge flottant 2 -->
          <div class="absolute -top-5 -right-5 bg-[#6a0d5f] rounded-2xl shadow-xl px-6 py-4">
            <p class="text-2xl font-bold text-white">Lomé</p>
            <p class="text-white/70 text-sm font-medium">Togo</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Galerie -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
        <div class="text-center mb-12">
          <div class="flex items-center justify-center gap-3 mb-3">
            <span class="w-10 h-1 bg-[#6a0d5f] rounded-full inline-block"></span>
            <span class="text-[#6a0d5f] font-bold uppercase text-sm tracking-widest">Notre espace</span>
            <span class="w-10 h-1 bg-[#6a0d5f] rounded-full inline-block"></span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900">Un lieu inspirant</h2>
        </div>

        <!-- Grille de photos -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          <div v-for="(img, i) in galleryImages" :key="i"
            class="group relative overflow-hidden rounded-2xl shadow-md cursor-pointer"
            :class="i === 0 ? 'col-span-2 row-span-2' : ''"
            @click="openLightbox(img)">
            <img :src="img" :alt="'Photo librairie ' + (i + 1)"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              :class="i === 0 ? 'h-[300px] sm:h-[400px]' : 'h-[140px] sm:h-[190px]'" />
            <div class="absolute inset-0 bg-[#6a0d5f]/0 group-hover:bg-[#6a0d5f]/30 transition-all duration-300 flex items-center justify-center">
              <svg class="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Valeurs -->
    <section class="py-16 lg:py-24 px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto">
      <div class="text-center mb-14">
        <div class="flex items-center justify-center gap-3 mb-3">
          <span class="w-10 h-1 bg-[#6a0d5f] rounded-full inline-block"></span>
          <span class="text-[#6a0d5f] font-bold uppercase text-sm tracking-widest">Nos valeurs</span>
          <span class="w-10 h-1 bg-[#6a0d5f] rounded-full inline-block"></span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900">Ce qui nous anime</h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="value in values" :key="value.title"
          class="group bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-[#6a0d5f]/20">
          <div class="w-14 h-14 rounded-2xl bg-[#6a0d5f]/10 flex items-center justify-center mb-5 group-hover:bg-[#6a0d5f] transition-colors duration-300">
            <UIcon :name="value.icon" class="w-7 h-7 text-[#6a0d5f] group-hover:text-white transition-colors duration-300" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">{{ value.title }}</h3>
          <p class="text-gray-500 leading-relaxed text-[15px]">{{ value.desc }}</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 px-6 bg-gradient-to-r from-[#6a0d5f] to-[#4a0942] relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 right-0 w-64 h-64 rounded-full bg-white -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-pink-400 translate-y-1/2 -translate-x-1/4 blur-3xl"></div>
      </div>
      <div class="relative max-w-3xl mx-auto text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">Venez nous rendre visite</h2>
        <p class="text-white/80 text-lg mb-8">Découvrez notre sélection unique de livres et supports spirituels à Lomé</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/catalogue"
            class="bg-white text-[#6a0d5f] font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-[15px]">
            Parcourir le catalogue
          </NuxtLink>
          <NuxtLink to="/contact"
            class="bg-white/10 text-white font-bold px-8 py-4 rounded-full border border-white/30 hover:bg-white/20 transition-all hover:-translate-y-0.5 text-[15px]">
            Nous contacter
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <div v-if="lightboxImg" class="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4" @click="lightboxImg = null">
        <img :src="lightboxImg" alt="Photo agrandie" class="max-w-full max-h-full rounded-2xl shadow-2xl object-contain" @click.stop />
        <button @click="lightboxImg = null"
          class="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all">
          ✕
        </button>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

useHead({
  title: 'À propos – Librairie ICC Hountigomé',
  meta: [
    { name: 'description', content: 'Découvrez la Librairie ICC Hountigomé à Lomé, ouverte en décembre 2025. Un espace dédié à la littérature chrétienne, spirituelle et au développement personnel.' }
  ]
})

const lightboxImg = ref<string | null>(null)

const galleryImages = [
  '/images/a-propos/img1.jpg',
  '/images/a-propos/img3.jpg',
  '/images/a-propos/img4.jpg',
  '/images/a-propos/img5.jpg',
  '/images/a-propos/img6.jpg',
  '/images/a-propos/img7.jpg',
  '/images/a-propos/img8.jpg',
  '/images/a-propos/img9.jpg',
]

function openLightbox(img: string) {
  lightboxImg.value = img
}

const values = [
  {
    icon: 'i-lucide-flame',
    title: 'Foi & Spiritualité',
    desc: 'Nous sélectionnons des ouvrages qui nourrissent la foi, approfondissent la connaissance biblique et renforcent la relation avec Dieu.'
  },
  {
    icon: 'i-lucide-book-open',
    title: 'Littérature de qualité',
    desc: 'Chaque livre de notre catalogue est soigneusement choisi pour sa valeur éducative, spirituelle et édifiante.'
  },
  {
    icon: 'i-lucide-sprout',
    title: 'Croissance personnelle',
    desc: 'Nous croyons que chaque lecteur mérite d\'être équipé pour grandir dans tous les aspects de sa vie.'
  },
  {
    icon: 'i-lucide-users',
    title: 'Communauté',
    desc: 'La librairie est un espace de rencontre et d\'échange pour toute la communauté chrétienne de Lomé et du Togo.'
  },
  {
    icon: 'i-lucide-heart',
    title: 'Bienveillance',
    desc: 'Un accueil chaleureux pour tous, qu\'ils soient croyants de longue date ou en quête de réponses spirituelles.'
  },
  {
    icon: 'i-lucide-globe',
    title: 'Impact local',
    desc: 'Fondée par l\'ICC Togo, notre librairie s\'inscrit dans la mission d\'évangélisation et d\'édification au Togo et en Afrique.'
  },
]
</script>
