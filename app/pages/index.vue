<template>
  <div>
    <!-- HERO -->
    <HeroSection />

    <!-- Top Categories Section -->
    <section class="bg-gray-50 py-20 px-4 overflow-hidden">
      <div class="max-w-7xl mx-auto" v-reveal.repeat>
        <div class="relative border-2 border-[#6a0d5f]/10 rounded-[3rem] p-8 md:p-16 bg-white/50 backdrop-blur-sm">
          <!-- Section Title -->
          <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-50 px-6">
            <h2 class="text-2xl md:text-3xl font-bold text-[#6a0d5f] uppercase tracking-wide whitespace-nowrap">
              Catégories en vogue
            </h2>
          </div>

          <div class="relative flex items-center overflow-hidden w-full">
            <!-- Categories Marquee Wrapper -->
            <div class="w-full py-12 -my-12">
              <div class="flex w-max animate-marquee hover:[animation-play-state:paused]">
                
                <!-- Set 1 -->
                <div class="flex gap-6 mt-5 md:gap-8 px-3 md:px-4">
                  <div v-for="(cat, index) in topCategories" :key="'orig-'+cat.id"
                    class="group flex flex-col items-center text-center w-64 md:w-72 lg:w-80 flex-shrink-0">

                    <!-- Circular Image Container -->
                    <NuxtLink :to="`/catalogue?category=${cat.libelle}`" class="relative mb-8 block">
                      <!-- Permanent Rotating Decorative Border -->
                      <div
                        class="dashed-border absolute -inset-5 border-2 border-dashed border-[#6a0d5f]/20 rounded-full group-hover:border-[#6a0d5f]/50 transition-colors duration-1000">
                      </div>

                      <!-- Main Circle -->
                      <div
                        class="relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-white p-6 shadow-2xl shadow-[#6a0d5f]/5 overflow-hidden ring-4 ring-white group-hover:shadow-[#6a0d5f]/20 transition-all duration-500">
                        <img :src="cat.lastBookImage" :alt="cat.libelle"
                          class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                      </div>

                      <!-- Badge Number -->
                      <div
                        class="absolute top-4 -right-1 w-8 h-8 md:w-10 md:h-10 bg-[#6a0d5f] text-white rounded-full flex items-center justify-center font-bold text-xs md:text-sm shadow-xl border-4 border-white group-hover:scale-110 transition-transform duration-300">
                        0{{ index + 1 }}
                      </div>
                    </NuxtLink>

                    <!-- Label & Count -->
                    <NuxtLink :to="`/catalogue?category=${cat.libelle}`" class="group/link">
                      <h3
                        class="font-bold text-gray-900 group-hover/link:text-[#6a0d5f] text-sm md:text-base mb-1 uppercase tracking-tight transition-colors">
                        {{ cat.libelle }}
                      </h3>
                      <span
                        class="text-[10px] font-bold bg-[#6a0d5f]/5 text-[#6a0d5f] px-3 py-1 rounded-full uppercase tracking-widest">
                        {{ cat.bookCount }} Livres
                      </span>
                    </NuxtLink>
                  </div>
                </div>

                <!-- Set 2 (Duplicate for infinite marquee) -->
                <div class="flex gap-6 md:gap-8 px-3 md:px-4" aria-hidden="true">
                  <div v-for="(cat, index) in topCategories" :key="'dup-'+cat.id"
                    class="group flex flex-col items-center text-center w-64 md:w-72 lg:w-80 flex-shrink-0">

                    <!-- Circular Image Container -->
                    <NuxtLink :to="`/catalogue?category=${cat.libelle}`" class="relative mb-8 block">
                      <!-- Permanent Rotating Decorative Border -->
                      <div
                        class="dashed-border absolute -inset-5 border-2 border-dashed border-[#6a0d5f]/20 rounded-full group-hover:border-[#6a0d5f]/50 transition-colors duration-1000">
                      </div>

                      <!-- Main Circle -->
                      <div
                        class="relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-white p-6 shadow-2xl shadow-[#6a0d5f]/5 overflow-hidden ring-4 ring-white group-hover:shadow-[#6a0d5f]/20 transition-all duration-500">
                        <img :src="cat.lastBookImage" :alt="cat.libelle"
                          class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                      </div>

                      <!-- Badge Number -->
                      <div
                        class="absolute top-4 -right-1 w-8 h-8 md:w-10 md:h-10 bg-[#6a0d5f] text-white rounded-full flex items-center justify-center font-bold text-xs md:text-sm shadow-xl border-4 border-white group-hover:scale-110 transition-transform duration-300">
                        0{{ index + 1 }}
                      </div>
                    </NuxtLink>

                    <!-- Label & Count -->
                    <NuxtLink :to="`/catalogue?category=${cat.libelle}`" class="group/link">
                      <h3
                        class="font-bold text-gray-900 group-hover/link:text-[#6a0d5f] text-sm md:text-base mb-1 uppercase tracking-tight transition-colors">
                        {{ cat.libelle }}
                      </h3>
                      <span
                        class="text-[10px] font-bold bg-[#6a0d5f]/5 text-[#6a0d5f] px-3 py-1 rounded-full uppercase tracking-widest">
                        {{ cat.bookCount }} Livres
                      </span>
                    </NuxtLink>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
    <!-- Recent Books Section -->
    <section class="py-24 px-4 bg-white overflow-hidden">
      <div class="max-w-7xl mx-auto" v-reveal.repeat>
        <!-- Section Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div class="space-y-2">
            <h2 class="text-2xl md:text-3xl font-bold text-gray-900 uppercase">
              Nos livres <span class="text-[#6a0d5f]">récents</span>
            </h2>
            <div class="flex items-center gap-4">
              <div class="h-1.5 w-24 bg-[#6a0d5f] rounded-full relative overflow-hidden animate-pulse-slow">
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer-fast"></div>
              </div>
              <p class="text-gray-500 font-medium uppercase tracking-[0.1em] text-xs">
                Découvrez les dernières pépites de notre collection
              </p>
            </div>
          </div>
          <NuxtLink to="/catalogue"
            class="group flex items-center gap-3 px-8 py-4 bg-gray-50 hover:bg-[#6a0d5f] text-[#6a0d5f] hover:text-white rounded-full font-bold text-sm transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-[#6a0d5f]/20 uppercase border border-gray-100">
            Explorer tout le catalogue
            <svg class="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div class="lg:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div v-for="(book, index) in recentBooks" :key="book.id" 
              v-reveal.repeat :class="`reveal-delay-${index * 100}`"
              class="group flex flex-col">
              <NuxtLink :to="`/livres/${book.id}`"
                class="relative aspect-[3/4] rounded-3xl bg-gray-50 p-6 mb-6 overflow-hidden transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-[#6a0d5f]/10 block group-hover:-translate-y-2">
                <img :src="book.image" :alt="book.titre" class="w-full h-full object-contain drop-shadow-2xl transition-all duration-700 group-hover:scale-110" />
              </NuxtLink>
              <div class="space-y-2 px-2">
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{{ book.categorie?.libelle || 'Inspirant' }}</span>
                <h3 class="font-bold text-gray-900 text-sm line-clamp-1 group-hover:text-[#6a0d5f] transition-colors">{{ book.titre }}</h3>
                <p class="text-lg font-bold text-[#6a0d5f]">{{ formatPrice(book.prix_promo || book.prix) }}</p>
              </div>
            </div>
          </div>
          <div class="lg:col-span-3 reveal-left" v-reveal.repeat>
            <div class="relative h-full rounded-3xl overflow-hidden group shadow-2xl shadow-[#6a0d5f]/10">
              <img src="/images/ban-cote.webp" alt="Promotion" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#6a0d5f]/90 via-[#6a0d5f]/20 to-transparent p-10 flex flex-col justify-end items-start gap-6">
                 <h3 class="text-3xl font-bold text-white leading-tight uppercase tracking-wide">Trouvez votre <br />meilleur livre</h3>
                 <NuxtLink to="/catalogue" class="px-8 py-4 bg-white text-[#6a0d5f] rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl">Acheter plus</NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- LIVRE EN VOGUE SECTION (SIMPLE & DETAILED) -->
    <section v-if="enVogue" class="py-20 bg-[#6a0d5f] relative overflow-hidden">
      <!-- Background subtle glow -->
      <div class="absolute top-0 right-0 w-1/2 h-full bg-white/5 blur-[120px] rounded-full translate-x-1/2"></div>
      
      <div class="max-w-5xl mx-auto px-6 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <!-- Text Content (7 cols) -->
          <div class="lg:col-span-7 space-y-8 reveal-right" v-reveal.repeat>
            <div class="inline-flex items-center gap-3 px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg border border-white/10">
              <span class="text-white text-[9px] font-black uppercase tracking-[0.2em]">Ouvrage du moment</span>
            </div>

            <div class="space-y-4">
               <h2 class="text-3xl md:text-5xl font-black text-white leading-tight uppercase tracking-tight">
                 {{ enVogue.titre }}
               </h2>
               <p class="text-white/60 text-base leading-relaxed max-w-lg">
                 {{ enVogue.description || "Une immersion profonde et transformative à ne pas manquer. Découvrez l'ouvrage qui captive tous nos lecteurs ce mois-ci." }}
               </p>
            </div>

            <!-- Image Preview (Mobile Only: appears after paragraph) -->
            <div class="lg:hidden relative">
              <div class="relative bg-white/5 backdrop-blur-sm p-4 rounded-3xl border border-white/10 shadow-2xl overflow-hidden group">
                  <img :src="enVogue.image" :alt="enVogue.titre"
                    class="w-full h-auto rounded-2xl shadow-2xl transition-transform duration-700 group-hover:scale-105" />
                  
                  <div v-if="enVogue.prix_promo" class="absolute top-6 right-6 px-4 py-2 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-xl">
                     -{{ Math.round((1 - enVogue.prix_promo/enVogue.prix) * 100) }}% Off
                  </div>
              </div>
            </div>

            <!-- Details Grid -->
            <div class="grid grid-cols-2 gap-y-6 gap-x-8 py-8 border-y border-white/10">
               <div class="space-y-1">
                  <p class="text-white/30 text-[10px] font-black uppercase tracking-widest">Auteur</p>
                  <p class="text-white font-bold text-lg">{{ enVogue.auteurRel?.nom || enVogue.auteur || 'Inconnu' }}</p>
               </div>
               <div class="space-y-1">
                  <p class="text-white/30 text-[10px] font-black uppercase tracking-widest">Catégorie</p>
                  <p class="text-white font-bold text-lg">{{ enVogue.categorie?.libelle || 'Inspiration' }}</p>
               </div>
               <div class="space-y-1">
                  <p class="text-white/30 text-[10px] font-black uppercase tracking-widest">Disponibilité</p>
                  <p class="text-green-400 font-bold text-sm flex items-center gap-2">
                     <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                     En stock
                  </p>
               </div>
               <div class="space-y-1">
                  <p class="text-white/30 text-[10px] font-black uppercase tracking-widest">Prix Spécial</p>
                  <div class="flex items-baseline gap-2">
                     <p class="text-white font-black text-2xl">{{ formatPrice(enVogue.prix_promo || enVogue.prix) }}</p>
                     <p v-if="enVogue.prix_promo" class="text-white/30 line-through text-xs italic">{{ formatPrice(enVogue.prix) }}</p>
                  </div>
               </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-4 pt-2">
              <NuxtLink :to="`/livres/${enVogue.id}`"
                class="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all hover:-translate-y-1 text-center shadow-lg shadow-orange-500/20">
                Fiche détaillée
              </NuxtLink>
              <button @click="addToCart(enVogue)"
                class="px-8 py-4 bg-white/10 hover:bg-white text-white hover:text-[#6a0d5f] rounded-xl font-bold text-xs uppercase tracking-widest backdrop-blur-md border border-white/20 transition-all text-center">
                Ajouter au panier
              </button>
            </div>
          </div>

          <!-- Image Preview (Desktop Only: 5 cols) -->
          <div class="hidden lg:block lg:col-span-5 relative reveal-left" v-reveal.repeat>
            <div class="relative bg-white/5 backdrop-blur-sm p-4 rounded-3xl border border-white/10 shadow-2xl overflow-hidden group">
                <img :src="enVogue.image" :alt="enVogue.titre"
                  class="w-full h-auto rounded-2xl shadow-2xl transition-transform duration-700 group-hover:scale-105" />
                
                <!-- Promo Overlay -->
                <div v-if="enVogue.prix_promo" class="absolute top-6 right-6 px-4 py-2 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-xl">
                   -{{ Math.round((1 - enVogue.prix_promo/enVogue.prix) * 100) }}% Off
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- LIVRES DU MOIS SECTION (COMPACT GRID) -->
    <section v-if="selectionMois.length" class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-6" v-reveal.repeat>
        <div class="text-center mb-16 space-y-3">
          <div class="inline-block px-3 py-1 bg-[#6a0d5f]/5 rounded-lg">
             <span class="text-[#6a0d5f] text-[9px] font-black uppercase tracking-widest">Nouveautés</span>
          </div>
          <h2 class="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tight">
            Sélection du <span class="text-[#6a0d5f]">Mois</span>
          </h2>
          <p class="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Ouvrages triés sur le volet pour votre croissance</p>
        </div>

        <div class="relative flex items-center group/section">
          <!-- Navigation Arrow Left -->
          <button @click="scrollSection('moisContainer', 'left')"
            class="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6 w-10 h-10 md:w-12 md:h-12 bg-white text-[#6a0d5f] border border-gray-100 rounded-full flex items-center justify-center shadow-lg hover:bg-[#6a0d5f] hover:text-white transition-all z-30 opacity-0 group-hover/section:opacity-100 focus:opacity-100">
            <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          
          <div class="w-full relative overflow-hidden px-2 py-4">
            <div ref="moisContainer" class="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory">
              <div v-for="(book, index) in selectionMois" :key="book.id"
                v-reveal.repeat :class="`reveal-delay-${index * 100}`"
                @click="navigateTo(`/livres/${book.id}`)"
                class="cursor-pointer w-56 md:w-64 flex-shrink-0 snap-start group bg-gray-50 rounded-2xl p-4 transition-all duration-500 hover:bg-white hover:shadow-xl border border-transparent hover:border-gray-100 flex flex-col h-full">
                
                <div class="relative aspect-[2.5/3.5] mb-6 overflow-hidden rounded-xl bg-gray-200">
                   <img :src="book.image" :alt="book.titre" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span class="px-4 py-2 bg-white text-[#6a0d5f] rounded-lg font-bold text-[10px] uppercase tracking-widest transition-transform -translate-y-2 group-hover:translate-y-0 duration-500">
                         Aperçu
                      </span>
                   </div>
                </div>

                <div class="space-y-2 flex-1">
                   <span class="text-[9px] font-bold uppercase text-[#6a0d5f]/60 tracking-widest block">
                     {{ book.categorie?.libelle || 'Essentiel' }}
                   </span>
                   <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight line-clamp-2 leading-tight h-10">
                     {{ book.titre }}
                   </h3>
                   <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest truncate">
                     {{ book.auteurRel?.nom || book.auteur || 'Anonyme' }}
                   </p>
                </div>
                
                <div class="flex items-center justify-between pt-4 mt-auto">
                   <p class="text-lg font-black text-[#6a0d5f] tracking-tighter">{{ formatPrice(book.prix_promo || book.prix) }}</p>
                   <button @click.stop="addToCart(book)" class="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-[#6a0d5f] hover:bg-[#6a0d5f] hover:text-white transition-all shadow-sm">
                     <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" stroke-width="2.5" />
                     </svg>
                   </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation Arrow Right -->
          <button @click="scrollSection('moisContainer', 'right')"
            class="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-6 w-10 h-10 md:w-12 md:h-12 bg-white text-[#6a0d5f] border border-gray-100 rounded-full flex items-center justify-center shadow-lg hover:bg-[#6a0d5f] hover:text-white transition-all z-30 opacity-0 group-hover/section:opacity-100 focus:opacity-100">
            <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- LIVRES DU MOIS PRECEDENT SECTION (COMPACT) -->
    <section v-if="selectionMoisPrecedent.length" class="py-20 bg-gray-50/50">
      <div class="max-w-6xl mx-auto px-6" v-reveal.repeat>
        <div class="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 pb-8 border-b border-gray-200">
          <div class="space-y-1">
            <h2 class="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tight">
              Vous avez manqué : <span class="text-[#6a0d5f]">Mois précédent</span>
            </h2>
            <p class="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Les favoris du cycle écoulé</p>
          </div>
          <NuxtLink to="/catalogue" class="text-[10px] font-black text-[#6a0d5f] uppercase tracking-[0.2em] flex items-center gap-2 group hover:gap-4 transition-all">
             Toute la collection
             <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path d="M9 5l7 7-7 7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
             </svg>
          </NuxtLink>
        </div>

        <div class="relative flex items-center group/section">
          <!-- Navigation Arrow Left -->
          <button @click="scrollSection('precedentContainer', 'left')"
            class="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6 w-10 h-10 md:w-12 md:h-12 bg-white text-[#6a0d5f] border border-gray-100 rounded-full flex items-center justify-center shadow-lg hover:bg-[#6a0d5f] hover:text-white transition-all z-30 opacity-0 group-hover/section:opacity-100 focus:opacity-100">
            <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          
          <div class="w-full relative overflow-hidden px-2 py-4">
            <div ref="precedentContainer" class="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory">
              <div v-for="book in selectionMoisPrecedent" :key="book.id" @click="navigateTo(`/livres/${book.id}`)" class="cursor-pointer w-40 md:w-48 flex-shrink-0 snap-start group space-y-4">
                 <div class="relative block aspect-[3/4.2] overflow-hidden rounded-xl shadow-lg transition-all duration-500 group-hover:shadow-2xl">
                    <img :src="book.image" :alt="book.titre" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div class="absolute inset-0 bg-[#6a0d5f]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 </div>
                 <div class="space-y-1">
                    <h4 class="text-[11px] font-black text-gray-900 uppercase tracking-tight line-clamp-1 group-hover:text-[#6a0d5f] transition-colors leading-tight">{{ book.titre }}</h4>
                    <p class="text-[9px] font-bold text-gray-400 uppercase">{{ book.auteurRel?.nom || book.auteur }}</p>
                    <p class="text-xs font-black text-[#6a0d5f] pt-1 tracking-tighter">{{ formatPrice(book.prix) }}</p>
                 </div>
              </div>
            </div>
          </div>

          <!-- Navigation Arrow Right -->
          <button @click="scrollSection('precedentContainer', 'right')"
            class="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-6 w-10 h-10 md:w-12 md:h-12 bg-white text-[#6a0d5f] border border-gray-100 rounded-full flex items-center justify-center shadow-lg hover:bg-[#6a0d5f] hover:text-white transition-all z-30 opacity-0 group-hover/section:opacity-100 focus:opacity-100">
            <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
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
  </div>
</template>

<script setup>
import HeroSection from "~/components/HeroSection.vue";
import { computed, onMounted, ref } from "vue";
import { useLivreStore } from "~~/stores/livre";
import { useCategorieStore } from "~~/stores/categorie";
import { useCartStore } from "~~/stores/cart";

const livreStore = useLivreStore();
const categorieStore = useCategorieStore();
const cartStore = useCartStore();
const config = useRuntimeConfig();

const scrollContainer = ref(null);
const moisContainer = ref(null);
const precedentContainer = ref(null);

onMounted(async () => {
  await Promise.all([
    livreStore.fetchLivres(),
    livreStore.fetchFeaturedLivres(),
    categorieStore.fetchCategories(),
  ]);
});

const enVogue = computed(() => {
  const book = livreStore.enVogue;
  if (!book) return null;
  return {
    ...book,
    image: book.images?.length
      ? `${config.public.storageBase}/${book.images[0].path}`
      : "/images/livre.jpg",
  };
});

const selectionMois = computed(() => {
  return (livreStore.selectionMois || []).map(book => ({
    ...book,
    image: book.images?.length
      ? `${config.public.storageBase}/${book.images[0].path}`
      : "/images/livre.jpg",
  }));
});

const selectionMoisPrecedent = computed(() => {
  return (livreStore.selectionMoisPrecedent || []).map(book => ({
    ...book,
    image: book.images?.length
      ? `${config.public.storageBase}/${book.images[0].path}`
      : "/images/livre.jpg",
  }));
});

const scroll = (direction) => {
  if (!scrollContainer.value) return;
  const container = scrollContainer.value;
  const scrollAmount = window.innerWidth < 1024 ? container.clientWidth * 0.8 : 500;

  if (direction === 'right') {
    const isAtEnd = Math.ceil(container.scrollLeft + container.clientWidth) >= container.scrollWidth - 10;
    if (isAtEnd) {
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  } else {
    const isAtStart = container.scrollLeft <= 10;
    if (isAtStart) {
      container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }
};

const scrollSection = (refName, direction) => {
  const container = refName === 'moisContainer' ? moisContainer.value : precedentContainer.value;
  if (!container) return;
  
  const scrollAmount = window.innerWidth < 1024 ? container.clientWidth * 0.8 : container.clientWidth * 0.5;

  if (direction === 'right') {
    const isAtEnd = Math.ceil(container.scrollLeft + container.clientWidth) >= container.scrollWidth - 10;
    if (isAtEnd) {
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  } else {
    const isAtStart = container.scrollLeft <= 10;
    if (isAtStart) {
      container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }
};

const formatPrice = (price) => {
  if (price === undefined || price === null) return '0 FCFA';
  return new Intl.NumberFormat('fr-FR').format(Number(price)) + ' FCFA';
};

const addToCart = (book) => {
  cartStore.add({
    id: book.id,
    title: book.titre,
    price: book.prix_promo || book.prix,
    image: book.image,
    stockAvailable: book.stock?.quantite || 1
  });
};

const recentBooks = computed(() => {
  return [...livreStore.livres]
    .sort((a, b) => b.id - a.id)
    .slice(0, 4)
    .map(book => {
      const imagePath = book.images?.length
        ? `${config.public.storageBase}/${book.images[0].path}`
        : "/images/livre.jpg";
      return {
        ...book,
        image: imagePath,
        categorie: book.categorie || categorieStore.categories.find(c => c.id === book.categorie_id),
        isPromo: !!book.prix_promo
      };
    });
});

const topCategories = computed(() => {
  const cats = [...categorieStore.categories]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  return cats.map((cat) => {
    const catLivres = livreStore.livres.filter(l => l.categorie_id === cat.id);
    const lastBook = catLivres[0];
    const imagePath = lastBook?.images?.length
      ? `${config.public.storageBase}/${lastBook.images[0].path}`
      : "/images/livre.jpg";

    return {
      ...cat,
      bookCount: catLivres.length,
      lastBookImage: imagePath
    };
  });
});
</script>

<style scoped>
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
}

/* Continuous rotation for dashed borders */
@keyframes spinDashedPermanent {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.dashed-border {
  animation: spinDashedPermanent 15s linear infinite;
}

@keyframes shimmer-fast {
  from { transform: translateX(-100%); }
  to { transform: translateX(100%); }
}

@keyframes pulse-slow {
  0%, 100% { transform: scaleX(1); opacity: 1; }
  50% { transform: scaleX(1.1); opacity: 0.8; }
}

.animate-shimmer-fast {
  animation: shimmer-fast 2s infinite linear;
}

.animate-pulse-slow {
  animation: pulse-slow 3s infinite ease-in-out;
  transform-origin: left;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>