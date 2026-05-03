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

    <!-- LIVRE DU MOIS & LIVRE DUO SECTION -->
    <section v-if="livreDuMois || livreDuo" class="py-24 bg-[#6a0d5f] relative overflow-hidden">
      <!-- Background subtle glow -->
      <div class="absolute top-0 right-0 w-1/2 h-full bg-white/5 blur-[120px] rounded-full translate-x-1/2"></div>
      <div class="absolute bottom-0 left-0 w-1/2 h-full bg-orange-500/5 blur-[120px] rounded-full -translate-x-1/2"></div>
      
      <div class="max-w-7xl mx-auto px-6 relative z-10">
        <div class="text-center mb-20 space-y-4 reveal-up" v-reveal.repeat>
           <h2 class="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
             Les Vedettes de <span class="text-orange-500">ICC Librairie</span>
           </h2>
           <p class="text-white/60 text-lg max-w-2xl mx-auto font-medium">L'essentiel pour votre croissance spirituelle et votre transformation.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          <!-- LIVRE DU MOIS (MAJOR) -->
          <div v-if="livreDuMois" class="lg:col-span-7 xl:col-span-8 relative group reveal-right" v-reveal.repeat>
             <div class="h-full flex flex-col md:flex-row gap-10 items-center bg-white/10 backdrop-blur-2xl p-10 md:p-14 rounded-[3rem] border border-white/20 shadow-2xl relative overflow-hidden group">
                <!-- Decorative background for Livre du mois -->
                <div class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full"></div>
                
                <NuxtLink :to="`/livres/${livreDuMois.id}`" class="w-56 md:w-72 flex-shrink-0 relative group/img">
                   <div class="absolute -inset-6 bg-orange-500/30 blur-3xl rounded-full animate-pulse transition-all group-hover/img:bg-orange-500/40"></div>
                   <img :src="livreDuMois.image" :alt="livreDuMois.titre" class="relative z-10 w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:scale-105 group-hover:-rotate-2" />
                   <div class="absolute top-0 -right-4 z-20 bg-orange-500 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl shadow-orange-500/40 ring-4 ring-[#6a0d5f]">
                      Livre du mois
                   </div>
                </NuxtLink>

                <div class="flex-1 space-y-8 text-center md:text-left relative z-10">
                   <div class="space-y-4">
                      <NuxtLink :to="`/livres/${livreDuMois.id}`" class="block group/title">
                        <h3 class="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-tight group-hover/title:text-orange-500 transition-colors">
                          {{ livreDuMois.titre }}
                        </h3>
                      </NuxtLink>
                      <p class="text-orange-500 font-bold uppercase tracking-[0.2em] text-sm">{{ livreDuMois.auteurRel?.nom || livreDuMois.auteur }}</p>
                   </div>
                   <p class="text-white/70 text-base md:text-lg leading-relaxed line-clamp-4 font-medium">
                      {{ livreDuMois.description || "Une immersion profonde et transformative à ne pas manquer ce mois-ci pour nourrir votre esprit." }}
                   </p>
                   <div class="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-4">
                      <div class="space-y-1">
                        <p class="text-3xl font-black text-white">{{ formatPrice(livreDuMois.prix_promo || livreDuMois.prix) }}</p>
                        <p v-if="livreDuMois.prix_promo" class="text-white/40 line-through text-sm">{{ formatPrice(livreDuMois.prix) }}</p>
                      </div>
                      <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <button @click="addToCart(livreDuMois)" class="w-full sm:w-auto px-8 py-4 bg-orange-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-orange-500 transition-all shadow-xl shadow-orange-500/20 flex items-center justify-center gap-3">
                           <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                           </svg>
                           Ajouter au panier
                        </button>
                        <NuxtLink :to="`/livres/${livreDuMois.id}`" class="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl font-black text-xs uppercase tracking-widest transition-all text-center flex items-center justify-center">
                          Détails
                        </NuxtLink>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <!-- LIVRE DUO (SECONDARY) -->
          <div v-if="livreDuo" class="lg:col-span-5 xl:col-span-4 relative group reveal-left" v-reveal.repeat>
             <div class="h-full flex flex-col items-center justify-center bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 shadow-2xl text-center group">
                <div class="relative mb-10 w-40 md:w-48 group/img">
                   <div class="absolute -inset-4 bg-blue-500/20 blur-2xl rounded-full animate-pulse transition-all group-hover/img:bg-blue-500/30"></div>
                   <NuxtLink :to="`/livres/${livreDuo.id}`" class="block">
                    <img :src="livreDuo.image" :alt="livreDuo.titre" class="relative z-10 w-full h-auto drop-shadow-[0_25px_25px_rgba(0,0,0,0.3)] transition-all duration-700 group-hover:scale-105" />
                   </NuxtLink>
                   <div class="absolute -top-2 -right-2 z-20 bg-blue-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20">
                      Livre Duo
                   </div>
                </div>
                <div class="space-y-6">
                   <div class="space-y-2">
                      <NuxtLink :to="`/livres/${livreDuo.id}`" class="block group/title">
                        <h3 class="text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-tight line-clamp-2 group-hover/title:text-blue-400 transition-colors">{{ livreDuo.titre }}</h3>
                      </NuxtLink>
                      <p class="text-blue-400 font-bold uppercase tracking-widest text-[10px]">{{ livreDuo.auteurRel?.nom || livreDuo.auteur }}</p>
                   </div>
                   <p class="text-white/50 text-sm leading-relaxed line-clamp-3">
                      {{ livreDuo.description || "Le complément idéal pour approfondir votre lecture et maximiser votre impact." }}
                   </p>
                   <div class="space-y-4 pt-4">
                      <p class="text-2xl font-black text-white">{{ formatPrice(livreDuo.prix_promo || livreDuo.prix) }}</p>
                      <div class="flex flex-col gap-3">
                        <button @click="addToCart(livreDuo)" class="w-full px-6 py-4 bg-white text-[#6a0d5f] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-lg flex items-center justify-center gap-2">
                           <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                           </svg>
                           Ajouter au panier
                        </button>
                        <NuxtLink :to="`/livres/${livreDuo.id}`" class="w-full px-6 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all text-center flex items-center justify-center">
                          Détails
                        </NuxtLink>
                      </div>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>


    <!-- SELECTION DE L'ANNEE SECTION (SLIDER) -->
    <section v-if="selectionAnnee.length" class="py-24 bg-white relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-6" v-reveal.repeat>
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div class="space-y-3">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-[#6a0d5f]/5 rounded-lg">
               <span class="w-2 h-2 rounded-full bg-[#6a0d5f] animate-ping"></span>
               <span class="text-[#6a0d5f] text-[10px] font-black uppercase tracking-[0.2em]">Incontournables</span>
            </div>
            <h2 class="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tight">
              Sélection de <span class="text-[#6a0d5f]">l'Année</span>
            </h2>
            <p class="text-gray-400 font-bold uppercase tracking-widest text-xs">Les ouvrages qui ont marqué l'année {{ new Date().getFullYear() }}</p>
          </div>
          
        </div>

        <div class="relative group">
          <!-- Left Button -->
          <button @click="scrollSection('anneeContainer', 'left')"
            class="absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/95 backdrop-blur-sm text-[#6a0d5f] rounded-2xl flex items-center justify-center hover:bg-[#6a0d5f] hover:text-white transition-all shadow-xl border border-gray-100 opacity-100 md:opacity-0 md:group-hover:opacity-100 -mt-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          <div ref="anneeContainer" class="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-8">
            <div v-for="(book, index) in selectionAnnee" :key="book.id"
              v-reveal.repeat :class="`reveal-delay-${index * 100}`"
              @click="navigateTo(`/livres/${book.id}`)"
              class="cursor-pointer w-56 md:w-60 flex-shrink-0 snap-start group/card">
              
              <div class="relative aspect-[3/4.2] mb-5 overflow-hidden rounded-[2rem] bg-gray-100 shadow-xl group-hover/card:shadow-2xl transition-all duration-700">
                 <img :src="book.image" :alt="book.titre" class="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110" />
                 <div class="absolute inset-0 bg-gradient-to-t from-[#6a0d5f]/80 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500">
                    <div class="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                       <span class="px-4 py-2 bg-white text-[#6a0d5f] rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-xl">Voir</span>
                       <button @click.stop="addToCart(book)" class="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-xl">
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" stroke-width="2.5" />
                          </svg>
                       </button>
                    </div>
                 </div>
              </div>

              <div class="space-y-2 px-2">
                 <h3 class="text-base font-black text-gray-900 uppercase tracking-tight line-clamp-1 group-hover/card:text-[#6a0d5f] transition-colors">
                   {{ book.titre }}
                 </h3>
                 <div class="flex items-center justify-between">
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate max-w-[150px]">
                      {{ book.auteurRel?.nom || book.auteur }}
                    </p>
                    <p class="text-sm font-black text-[#6a0d5f]">{{ formatPrice(book.prix_promo || book.prix) }}</p>
                 </div>
              </div>
            </div>
          </div>

          <!-- Right Button -->
          <button @click="scrollSection('anneeContainer', 'right')"
            class="absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/95 backdrop-blur-sm text-[#6a0d5f] rounded-2xl flex items-center justify-center hover:bg-[#6a0d5f] hover:text-white transition-all shadow-xl border border-gray-100 opacity-100 md:opacity-0 md:group-hover:opacity-100 -mt-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

    <!-- HOW IT WORKS -->
    <section class="py-28 bg-gray-50 relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-[#6a0d5f]/3 rounded-full blur-[120px]"></div>
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-400/5 rounded-full blur-[120px]"></div>
      </div>

      <div class="max-w-7xl mx-auto px-6 relative z-10">
        <div class="text-center mb-20 space-y-4" v-reveal>
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-[#6a0d5f]/5 rounded-full">
            <span class="w-2 h-2 rounded-full bg-[#6a0d5f] animate-ping"></span>
            <span class="text-[#6a0d5f] text-[10px] font-black uppercase tracking-[0.25em]">Simple &amp; Rapide</span>
          </div>
          <h2 class="text-2xl md:text-4xl font-black text-gray-900 uppercase tracking-tight">
            Comment <span class="text-[#6a0d5f]">ça marche</span> ?
          </h2>
          <p class="text-gray-400 font-medium text-sm max-w-xl mx-auto">Commandez vos livres en quelques étapes simples, depuis chez vous.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div class="hidden md:block absolute top-16 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px border-t-2 border-dashed border-[#6a0d5f]/15 z-0"></div>

          <div v-reveal class="relative flex flex-col items-center text-center group">
            <div class="relative mb-8 z-10">
              <div class="w-32 h-32 rounded-[2.5rem] bg-white shadow-2xl shadow-[#6a0d5f]/5 border border-gray-100 flex items-center justify-center group-hover:bg-[#6a0d5f] group-hover:shadow-[#6a0d5f]/20 transition-all duration-500">
                <svg class="w-14 h-14 text-[#6a0d5f] group-hover:text-white transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <div class="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-orange-500 text-white text-xs font-black flex items-center justify-center shadow-lg shadow-orange-500/30 border-2 border-white">01</div>
            </div>
            <h3 class="text-xl font-black text-gray-900 uppercase tracking-tight mb-3">Choisissez vos livres</h3>
            <p class="text-gray-400 text-sm leading-relaxed max-w-xs">Parcourez notre catalogue et ajoutez vos coups de cœur dans votre panier.</p>
          </div>

          <div v-reveal class="reveal-delay-100 relative flex flex-col items-center text-center group">
            <div class="relative mb-8 z-10">
              <div class="w-32 h-32 rounded-[2.5rem] bg-white shadow-2xl shadow-[#6a0d5f]/5 border border-gray-100 flex items-center justify-center group-hover:bg-[#6a0d5f] group-hover:shadow-[#6a0d5f]/20 transition-all duration-500">
                <svg class="w-14 h-14 text-[#6a0d5f] group-hover:text-white transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <div class="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-orange-500 text-white text-xs font-black flex items-center justify-center shadow-lg shadow-orange-500/30 border-2 border-white">02</div>
            </div>
            <h3 class="text-xl font-black text-gray-900 uppercase tracking-tight mb-3">Passez commande</h3>
            <p class="text-gray-400 text-sm leading-relaxed max-w-xs">Validez votre panier, choisissez livraison ou retrait et effectuez votre virement.</p>
          </div>

          <div v-reveal class="reveal-delay-200 relative flex flex-col items-center text-center group">
            <div class="relative mb-8 z-10">
              <div class="w-32 h-32 rounded-[2.5rem] bg-white shadow-2xl shadow-[#6a0d5f]/5 border border-gray-100 flex items-center justify-center group-hover:bg-[#6a0d5f] group-hover:shadow-[#6a0d5f]/20 transition-all duration-500">
                <svg class="w-14 h-14 text-[#6a0d5f] group-hover:text-white transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
              </div>
              <div class="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-orange-500 text-white text-xs font-black flex items-center justify-center shadow-lg shadow-orange-500/30 border-2 border-white">03</div>
            </div>
            <h3 class="text-xl font-black text-gray-900 uppercase tracking-tight mb-3">Recevez vos livres</h3>
            <p class="text-gray-400 text-sm leading-relaxed max-w-xs">Après validation de votre paiement, vos livres vous sont livrés ou disponibles au retrait.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS BANNER -->
    <section ref="statsSectionRef" class="py-20 bg-[#6a0d5f] relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 -translate-y-1/2 blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-orange-400 rounded-full -translate-x-1/3 translate-y-1/2 blur-3xl"></div>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-10">

          <div class="text-center space-y-3 group py-6 sm:py-0">
            <p class="text-5xl sm:text-6xl font-black text-white group-hover:text-orange-400 transition-colors duration-300">
              {{ statsStarted ? displayedStats[0] : '0' }}<span class="text-orange-400">+</span>
            </p>
            <div class="w-12 h-1 bg-orange-400/40 rounded-full mx-auto"></div>
            <p class="text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">Références disponibles</p>
          </div>

          <div class="text-center space-y-3 group py-6 sm:py-0 border-t border-b sm:border-t-0 sm:border-b-0 sm:border-l sm:border-r border-white/10">
            <p class="text-5xl sm:text-6xl font-black text-white group-hover:text-orange-400 transition-colors duration-300">
              {{ statsStarted ? displayedStats[1] : '0' }}<span class="text-orange-400">%</span>
            </p>
            <div class="w-12 h-1 bg-orange-400/40 rounded-full mx-auto"></div>
            <p class="text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">Paiement sécurisé</p>
          </div>

          <div class="text-center space-y-3 group py-6 sm:py-0">
            <p class="text-5xl sm:text-6xl font-black text-white group-hover:text-orange-400 transition-colors duration-300">
              7j<span class="text-orange-400">/7</span>
            </p>
            <div class="w-12 h-1 bg-orange-400/40 rounded-full mx-auto"></div>
            <p class="text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">Commande en ligne</p>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import HeroSection from "~/components/HeroSection.vue";
import { computed, onMounted, onBeforeUnmount, ref } from "vue";
import { useLivreStore } from "~~/stores/livre";
import { useCategorieStore } from "~~/stores/categorie";
import { useCartStore } from "~~/stores/cart";

// --- Stats counter ---
const statsSectionRef = ref(null);
const statsStarted = ref(false);
const statsTargets = [500, 100];
const displayedStats = ref([0, 0]);

let statsObserver = null;

function animateCount(index, target, duration = 1800) {
  const start = performance.now();
  const step = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    displayedStats.value[index] = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const livreStore = useLivreStore();
const categorieStore = useCategorieStore();
const cartStore = useCartStore();
const config = useRuntimeConfig();

const scrollContainer = ref(null);
const anneeContainer = ref(null);

onMounted(async () => {
  await Promise.all([
    livreStore.fetchLivres(),
    livreStore.fetchFeaturedLivres(),
    categorieStore.fetchCategories(),
  ]);

  // IntersectionObserver for stats counter
  if (statsSectionRef.value) {
    statsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statsStarted.value) {
          statsStarted.value = true;
          statsTargets.forEach((target, i) => animateCount(i, target));
          statsObserver.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    statsObserver.observe(statsSectionRef.value);
  }
});

onBeforeUnmount(() => {
  if (statsObserver) statsObserver.disconnect();
});

const livreDuMois = computed(() => {
  const book = livreStore.livreDuMois;
  if (!book) return null;
  return {
    ...book,
    image: livreStore.getCoverImage(book),
  };
});

const livreDuo = computed(() => {
  const book = livreStore.livreDuo;
  if (!book) return null;
  return {
    ...book,
    image: livreStore.getCoverImage(book),
  };
});

const selectionAnnee = computed(() => {
  return (livreStore.selectionAnnee || []).map(book => ({
    ...book,
    image: livreStore.getCoverImage(book),
  }));
});

const scrollSection = (refName, direction) => {
  const container = refName === 'anneeContainer' ? anneeContainer.value : null;
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
      return {
        ...book,
        image: livreStore.getCoverImage(book),
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

    return {
      ...cat,
      bookCount: catLivres.length,
      lastBookImage: lastBook ? livreStore.getCoverImage(lastBook) : "/images/livre.jpg"
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