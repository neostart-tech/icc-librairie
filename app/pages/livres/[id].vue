<template>
  <div class="min-h-screen bg-[#FDFCFD]">
    <!-- Breadcrumb -->
    <Breadcrumb :items="[
      { label: 'Catalogue', to: '/catalogue' },
      { label: book.title || 'Chargement...', to: '#' },
    ]" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Bouton retour avec animation -->
      <NuxtLink to="/catalogue"
        class="group inline-flex items-center text-sm text-[#6a0d5f]/60 hover:text-[#6a0d5f] transition-all duration-300 font-medium mb-6">
        <div
          class="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center mr-2 group-hover:shadow-md group-hover:-translate-x-1 transition-all duration-300">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        Retour au catalogue
      </NuxtLink>

      <div v-if="book.id" class="relative">
        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <!-- Left Column: Image -->
          <div class="lg:col-span-5 xl:col-span-5 relative group">
            <div class="sticky top-8">
              <!-- Backdrop Blur / Decorative Element -->
              <div
                class="absolute -inset-4 bg-[#6a0d5f]/5 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              </div>

              <div
                class="relative bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden aspect-[3/4] flex items-center justify-center p-4 border border-gray-100">
                <img :src="book.image"
                  class="w-full h-full object-contain transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  :alt="book.title" />

                <div v-if="book.isPromo"
                  class="absolute top-6 right-6 bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-xl animate-pulse">
                  -{{
                    Math.round(
                      ((book.oldPrice - book.price) / book.oldPrice) * 100,
                    )
                  }}%
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Details -->
          <div class="lg:col-span-7 xl:col-span-7 space-y-6">
            <div class="animate-fade-in-up">
              <div class="flex items-center space-x-3 mb-4">
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-[#6a0d5f]/10 text-[#6a0d5f] border border-[#6a0d5f]/10">
                  {{ book.category || "Littérature" }}
                </span>
              </div>

              <h1 class="text-3xl lg:text-4xl font-bold text-[#1a1a1a] leading-tight mb-3">
                {{ book.title }}
              </h1>

              <!-- Stars Rating -->
              <div class="flex items-center gap-3 mb-6">
                <StarRating :rating="book.averageRating" size="lg" show-value />
                <span class="w-1 h-1 rounded-full bg-gray-300"></span>
                <span class="w-1 h-1 rounded-full bg-gray-300"></span>
                <button @click="scrollToReviews" class="text-sm font-medium text-[#6a0d5f] hover:underline cursor-pointer">
                  {{ book.notesCount }} avis clients
                </button>
              </div>

              <div @click="openAuthorModal" class="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer hover:shadow-md hover:border-[#6a0d5f]/30 transition-all group">
                <div class="flex items-center">
                  <div
                    class="w-10 h-10 rounded-full bg-gradient-to-tr from-[#6a0d5f] to-[#8B5A8C] flex items-center justify-center text-white font-bold text-base mr-3">
                    {{ book.authorName ? book.authorName.charAt(0) : "A" }}
                  </div>
                  <div>
                    <p class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                      Auteur de l'œuvre
                    </p>
                    <p class="text-lg font-bold text-gray-900 group-hover:text-[#6a0d5f] transition-colors">
                      {{ book.authorName }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center text-[#6a0d5f] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                  <span class="text-[11px] font-bold uppercase tracking-wider hidden sm:block mr-1.5">En savoir plus</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Stock Status -->
            <div class="animate-fade-in-up flex items-center gap-3 flex-wrap" style="animation-delay: 80ms">

              <!-- Sur commande -->
              <template v-if="book.surCommande">
                <div class="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full">
                  <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  <span class="text-xs font-bold text-amber-700 uppercase tracking-wide">Sur commande</span>
                </div>
                <div class="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                  <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Délai communiqué après réception de votre demande
                </div>
              </template>

              <!-- En stock -->
              <!-- Stock Limité -->
              <template v-else-if="book.stockAvailable > 0 && book.stockAvailable < 5">
                <div class="flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-full">
                  <span class="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                  <span class="text-xs font-bold text-orange-700 uppercase tracking-wide">Stock Limité</span>
                </div>
                <div class="flex items-center gap-1.5 text-xs text-orange-600 font-bold">
                  <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Plus que quelques articles, commandez maintenant !
                </div>
              </template>

              <!-- En stock (Normal) -->
              <template v-else-if="book.stockAvailable >= 5">
                <div class="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
                  <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span class="text-xs font-bold text-green-700 uppercase tracking-wide">En stock</span>
                </div>
                <div class="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                  <svg class="w-3.5 h-3.5 shrink-0 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Disponible · Expédition immédiate
                </div>
              </template>

              <!-- Stock épuisé -->
              <template v-else>
                <div class="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full">
                  <span class="w-2 h-2 rounded-full bg-red-500"></span>
                  <span class="text-xs font-bold text-red-700 uppercase tracking-wide">Stock épuisé</span>
                </div>
                <div class="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                  <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  Retour en stock prochainement
                </div>
              </template>
            </div>

            <!-- Price & Actions -->
            <div
              class="p-6 rounded-2xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-50 animate-fade-in-up"
              style="animation-delay: 100ms">

              <!-- Sur commande -->
              <div v-if="book.surCommande" class="flex flex-col gap-4">
                <div class="space-y-1">
                  <p class="text-xs text-gray-500 font-medium">Prix de vente</p>
                  <p class="text-2xl font-bold text-amber-500">Sur commande</p>
                  <p class="text-xs text-gray-400">Le prix sera communiqué après réception de votre demande.</p>
                </div>
                <button
                  @click="openDevisModal"
                  class="group w-full py-3.5 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-3 shadow-lg bg-amber-500 text-white hover:bg-amber-600 transform hover:-translate-y-1 active:scale-95 overflow-hidden relative">
                  <div class="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Demander un devis</span>
                </button>
              </div>

              <!-- Normal -->
              <div v-else class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div class="space-y-1">
                  <p class="text-xs text-gray-500 font-medium">Prix de vente</p>
                  <div class="flex items-baseline space-x-2">
                    <span class="text-3xl font-bold text-[#6a0d5f]">
                      {{ book.price?.toLocaleString() }}
                      <span class="text-lg">FCFA</span>
                    </span>
                    <span v-if="book.isPromo" class="text-lg text-gray-300 line-through">
                      {{ book.oldPrice?.toLocaleString() }}
                    </span>
                  </div>
                  <p v-if="book.isPromo" class="text-green-600 text-xs font-bold flex items-center mt-1">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd" />
                    </svg>
                    Meilleur prix garanti
                  </p>
                </div>

                <div class="flex-grow max-w-md">
                  <button
                    @click.stop.prevent="cartStore.getQuantity(book.id) > 0 ? navigateTo('/panier') : addToCart(book)"
                    :disabled="!book.stockAvailable && cartStore.getQuantity(book.id) === 0"
                    class="group w-full py-3.5 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 active:scale-95 overflow-hidden relative"
                    :class="[
                      !book.stockAvailable && cartStore.getQuantity(book.id) === 0
                        ? 'bg-gray-100 text-gray-400'
                        : cartStore.getQuantity(book.id) > 0
                          ? 'bg-green-500 text-white shadow-green-200 hover:bg-green-600'
                          : 'bg-[#6a0d5f] text-white shadow-[#6a0d5f]/30 hover:shadow-[#6a0d5f]/50',
                    ]">
                    <div class="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                    <svg v-if="book.stockAvailable && cartStore.getQuantity(book.id) === 0"
                      class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <svg v-else-if="cartStore.getQuantity(book.id) > 0"
                      class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>

                    <span>
                      {{
                        !book.stockAvailable && cartStore.getQuantity(book.id) === 0
                          ? "Épuisé"
                          : cartStore.getQuantity(book.id) > 0
                            ? "Voir le panier"
                            : "Ajouter au panier"
                      }}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Description with tabs-like feel -->
            <div class="animate-fade-in-up" style="animation-delay: 200ms">
              <div class="flex items-center space-x-6 border-b border-gray-100 mb-4">
                <button class="pb-3 text-sm font-bold border-b-2 border-[#6a0d5f] text-[#6a0d5f]">
                  Synopsis
                </button>
              </div>
              <p
                class="text-gray-600 text-base leading-relaxed first-letter:text-3xl first-letter:font-bold first-letter:text-[#6a0d5f] first-letter:mr-1">
                {{ book.description || "Plongez dans cet ouvrage captivant qui explore les thématiques essentielles avec une profondeur inégalée." }}
              </p>
          </div>
        </div>
      </div>
    </div>

      <div v-else class="flex flex-col items-center justify-center py-32 space-y-4">
        <div class="w-20 h-20 border-4 border-[#6a0d5f]/20 border-t-[#6a0d5f] rounded-full animate-spin"></div>
        <p class="text-xl font-medium text-gray-400">Le livre se prépare...</p>
      </div>

      <!-- Reviews Section -->
      <div id="reviews" class="mt-20 py-16 border-t border-gray-100">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <!-- Summary & Form -->
          <div class="lg:col-span-4 space-y-10">
            <div>
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Avis des lecteurs</h2>
              <div class="flex items-center gap-6 p-8 bg-white rounded-3xl shadow-sm border border-gray-50">
                <div class="text-center">
                  <div class="text-5xl font-black text-[#6a0d5f] mb-2">{{ book.averageRating }}</div>
                  <div class="flex justify-center mb-1">
                    <StarRating :rating="book.averageRating" size="md" />
                  </div>
                  <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{{ book.notesCount }} avis</p>
                </div>
                <div class="flex-1 space-y-2">
                  <div v-for="i in 5" :key="i" class="flex items-center gap-3">
                    <span class="text-[10px] font-bold text-gray-400 w-2">{{ 6 - i }}</span>
                    <div class="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div class="h-full bg-amber-400 rounded-full" :style="{ width: `${getRatingPercentage(6 - i)}%` }"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Add Review Form -->
            <div class="p-8 bg-[#6a0d5f]/5 rounded-[2rem] border border-[#6a0d5f]/10 relative overflow-hidden group">
              <div class="absolute -top-12 -right-12 w-32 h-32 bg-[#6a0d5f]/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              
              <h3 class="text-lg font-bold text-gray-900 mb-2 relative z-10">Partagez votre avis</h3>
              <p class="text-sm text-gray-500 mb-6 relative z-10">Comment avez-vous trouvé ce livre ? Votre expérience compte pour nous.</p>
              
              <div v-if="!authStore.isLogged" class="p-6 bg-white rounded-2xl border border-gray-100 text-center space-y-4 relative z-10">
                <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Connectez-vous pour laisser un avis</p>
                <NuxtLink to="/connexion" class="inline-block px-6 py-2.5 bg-[#6a0d5f] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#6a0d5f]/20 hover:scale-105 active:scale-95 transition-all">SE CONNECTER</NuxtLink>
              </div>
              
              <form v-else @submit.prevent="submitReview" class="space-y-6 relative z-10">
                <div class="space-y-2">
                  <label class="text-[10px] font-black uppercase tracking-widest text-gray-400">Note *</label>
                  <div class="flex items-center gap-2">
                    <template v-for="i in 5" :key="i">
                      <button type="button" @click="reviewForm.note = i" class="group/star outline-none">
                        <svg class="w-8 h-8 transition-all duration-300 transform group-active/star:scale-90" 
                             :class="i <= reviewForm.note ? 'text-amber-400 fill-current' : 'text-gray-200 fill-current hover:text-amber-200'" 
                             viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    </template>
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="text-[10px] font-black uppercase tracking-widest text-gray-400">Commentaire (optionnel)</label>
                  <textarea 
                    v-model="reviewForm.commentaire"
                    placeholder="Qu'avez-vous pensé de l'histoire, du style de l'auteur..."
                    rows="4"
                    class="w-full px-4 py-3 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#6a0d5f]/5 focus:border-[#6a0d5f]/20 outline-none text-sm font-medium text-gray-700 resize-none transition-all placeholder:text-gray-300"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  :disabled="reviewSubmitting || !reviewForm.note"
                  class="w-full py-4 bg-[#6a0d5f] text-white rounded-2xl font-bold text-sm shadow-xl shadow-[#6a0d5f]/20 hover:shadow-[#6a0d5f]/40 hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-50 disabled:translate-y-0"
                >
                  {{ reviewSubmitting ? 'Publication...' : 'Publier mon avis' }}
                </button>
              </form>
            </div>
          </div>

          <!-- Reviews List -->
          <div class="lg:col-span-8">
            <div v-if="fetchingNotes" class="flex flex-col items-center justify-center py-20 space-y-4">
              <div class="w-10 h-10 border-4 border-[#6a0d5f]/10 border-t-[#6a0d5f] rounded-full animate-spin"></div>
              <p class="text-sm font-medium text-gray-400">Chargement des avis...</p>
            </div>

            <div v-else class="space-y-8">
              <!-- Filter & Sort Bar -->
              <div v-if="notesWithComments.length > 0" class="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 p-4 bg-white rounded-2xl border border-gray-50 shadow-sm">
                <div class="flex items-center gap-4">
                  <span class="text-[10px] font-black uppercase tracking-widest text-gray-400">Trier par</span>
                  <select v-model="reviewSort" class="bg-gray-50 border-none rounded-xl px-4 py-2 text-xs font-bold text-gray-700 focus:ring-2 focus:ring-[#6a0d5f]/10 outline-none cursor-pointer">
                    <option value="best">Mieux notés</option>
                    <option value="worst">Moins bien notés</option>
                    <option value="newest">Plus récents</option>
                  </select>
                </div>
              </div>

              <!-- Comments List -->
              <div v-if="notesWithComments.length > 0" class="space-y-8">
                <div v-for="note in visibleNotes" :key="note.id" class="p-8 bg-white rounded-3xl border border-gray-50 shadow-sm animate-fade-in-up">
                  <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center gap-4">
                      <div class="w-12 h-12 rounded-full bg-gradient-to-tr from-[#6a0d5f]/10 to-[#6a0d5f]/5 flex items-center justify-center text-[#6a0d5f] font-bold text-lg">
                        {{ note.user?.prenom?.charAt(0) || 'U' }}
                      </div>
                      <div>
                        <h4 class="font-bold text-gray-900">{{ note.user?.prenom }} {{ note.user?.nom }}</h4>
                        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{{ formatDate(note.created_at) }}</p>
                      </div>
                    </div>
                    <StarRating :rating="note.note" size="sm" />
                  </div>
                  <p v-if="note.commentaire" class="text-gray-600 text-sm leading-relaxed">{{ note.commentaire }}</p>
                  <p v-else class="text-gray-400 text-xs italic">Cet utilisateur n'a pas laissé de commentaire.</p>
                </div>

                <!-- Pagination des commentaires -->
                <div v-if="notesWithComments.length > 3" class="flex items-center justify-center gap-4 pt-4">
                  <button 
                    v-if="displayedCommentsCount < notesWithComments.length"
                    @click="showMoreComments"
                    class="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-100 rounded-xl text-xs font-bold text-[#6a0d5f] hover:bg-[#6a0d5f]/5 hover:border-[#6a0d5f]/20 transition-all shadow-sm active:scale-95"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                    Voir plus d'avis
                  </button>
                  
                  <button 
                    v-if="displayedCommentsCount > 3"
                    @click="showLessComments"
                    class="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-400 hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7" />
                    </svg>
                    Voir moins
                  </button>
                </div>
              </div>

              <!-- Only Ratings State -->
              <div v-else-if="notes.length > 0" class="flex flex-col items-center justify-center py-20 bg-gray-50/30 rounded-[2rem] border border-dashed border-gray-100">
                <p class="text-gray-400 text-sm italic">Aucun commentaire écrit pour le moment.</p>
                <p class="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-1">Mais {{ notes.length }} lecteurs ont laissé une note</p>
              </div>

              <!-- Empty State -->
              <div v-else class="flex flex-col items-center justify-center py-32 bg-gray-50/50 rounded-[3rem] border border-dashed border-gray-200">
                <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                  <svg class="w-8 h-8 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p class="text-gray-900 font-bold">Soyez le premier à donner votre avis !</p>
                <p class="text-gray-400 text-sm mt-1">Partagez votre lecture avec la communauté.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lively "Vous aimerez aussi" Section -->
    <div v-if="relatedBooks.length" class="mt-12 py-12 bg-gradient-to-b from-white to-[#f9f5f9] overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-end justify-between mb-8">
          <div class="space-y-1.5">
            <h2 class="text-2xl font-bold text-gray-900 tracking-wide">
              Plus de trésors à découvrir
            </h2>
            <div class="h-1 w-20 bg-gradient-to-r from-[#6a0d5f] to-transparent rounded-full"></div>
            <p class="text-sm text-gray-500 font-medium pt-1">
              Basé sur vos intérêts pour {{ book.category }}
            </p>
          </div>
        </div>

        <div class="relative group/carousel">
          <!-- Navigation Buttons on sides -->
          <div class="absolute top-[40%] -left-4 lg:-left-12 -translate-y-1/2 z-20 transition-all duration-300">
            <button @click="scrollLeft" :disabled="!canScrollLeft"
              class="w-10 h-10 rounded-full border-2 border-gray-100 bg-white shadow-lg flex items-center justify-center hover:border-[#6a0d5f]/30 hover:text-[#6a0d5f] hover:scale-110 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none group">
              <svg class="w-5 h-5 transform group-active:-translate-x-1 transition-transform" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          
          <div class="absolute top-[40%] -right-4 lg:-right-12 -translate-y-1/2 z-20 transition-all duration-300">
            <button @click="scrollRight" :disabled="!canScrollRight"
              class="w-10 h-10 rounded-full border-2 border-gray-100 bg-white shadow-lg flex items-center justify-center hover:border-[#6a0d5f]/30 hover:text-[#6a0d5f] hover:scale-110 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none group">
              <svg class="w-5 h-5 transform group-active:translate-x-1 transition-transform" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div class="overflow-hidden px-1">
            <div ref="carousel" 
              @mouseenter="stopAutoScroll"
              @mouseleave="startAutoScroll"
              class="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 md:gap-8 lg:gap-10 pb-10 scroll-smooth">
              <div v-for="relatedBook in relatedBooks" :key="relatedBook.id" 
                class="flex-shrink-0 w-40 sm:w-48 md:w-[240px] lg:w-[210px] snap-start group perspective-1000 py-4">
                <NuxtLink :to="`/livres/${relatedBook.id}`" class="block">
                  <div
                    class="relative aspect-[2/3] mb-6 rounded-2xl overflow-hidden shadow-md group-hover:shadow-2xl group-hover:-translate-y-3 transition-all duration-500 bg-white border border-gray-50/50">
                    <img :src="relatedBook.image"
                      class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      :alt="relatedBook.title" />
                    <div
                      class="absolute inset-0 bg-gradient-to-t from-[#6a0d5f]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span class="text-white text-xs font-bold uppercase tracking-widest bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full">Explorer</span>
                    </div>
                    <div v-if="relatedBook.isPromo"
                      class="absolute top-4 left-4 bg-red-500 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-lg">
                      PROMO
                    </div>
                  </div>

                  <div class="space-y-2 text-center md:text-left px-1">
                    <h3
                      class="font-bold text-gray-900 leading-tight group-hover:text-[#6a0d5f] transition-colors duration-200 line-clamp-2 min-h-[3rem] text-sm md:text-base">
                      {{ relatedBook.title }}
                    </h3>
                    <p class="text-[11px] md:text-xs text-gray-400 font-bold uppercase tracking-wider truncate">
                      {{ relatedBook.authorName }}
                    </p>
                    <div v-if="!relatedBook.surCommande" class="flex items-center justify-center md:justify-start gap-1.5 mt-1">
                      <div :class="['w-1.5 h-1.5 rounded-full', relatedBook.stockAvailable >= 5 ? 'bg-green-500' : (relatedBook.stockAvailable > 0 ? 'bg-orange-500' : 'bg-red-500')]"></div>
                      <span :class="['text-[10px] font-bold uppercase tracking-widest', relatedBook.stockAvailable >= 5 ? 'text-green-600' : (relatedBook.stockAvailable > 0 ? 'text-orange-600' : 'text-red-600')]">
                        {{ relatedBook.stockAvailable >= 5 ? 'Disponible' : (relatedBook.stockAvailable > 0 ? 'Stock limité' : 'Stock épuisé') }}
                      </span>
                    </div>
                    <div class="flex items-center justify-center md:justify-start space-x-2 pt-1">
                      <span class="text-base md:text-lg font-bold text-[#6a0d5f]">
                        {{ relatedBook.price.toLocaleString() }}
                      </span>
                      <span class="text-[10px] text-[#6a0d5f]/50 font-bold uppercase">FCFA</span>
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Devis Modal -->
    <Teleport to="body">
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="showDevisModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showDevisModal = false"></div>
          <div class="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">
            <!-- Header -->
            <div class="p-6 bg-gradient-to-br from-amber-50 to-white border-b border-amber-100 flex items-start justify-between shrink-0">
              <div>
                <h3 class="text-xl font-bold text-gray-900">Demande de devis</h3>
                <p class="text-sm text-amber-600 font-medium mt-1 line-clamp-1">{{ book.title }}</p>
              </div>
              <button @click="showDevisModal = false" class="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors shrink-0">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <!-- Success state -->
            <div v-if="devisSuccess" class="p-10 text-center space-y-4">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 class="text-lg font-bold text-gray-900">Demande envoyée !</h4>
              <p class="text-sm text-gray-500">Nous avons bien reçu votre demande. Notre équipe vous contactera très prochainement.</p>
              <button @click="showDevisModal = false" class="mt-4 px-8 py-3 bg-[#6a0d5f] text-white rounded-xl font-bold text-sm">Fermer</button>
            </div>

            <!-- Form -->
            <form v-else @submit.prevent="submitDevis" class="p-6 space-y-4 overflow-y-auto">
              <div v-if="authStore.isLogged" class="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-xl">
                <svg class="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <p class="text-xs font-bold text-green-700">Formulaire pré-rempli avec vos informations</p>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="sm:col-span-2 space-y-1">
                  <label class="text-[10px] font-black uppercase tracking-widest text-gray-400">Nom complet *</label>
                  <input
                    v-model="devisForm.nom_complet"
                    type="text"
                    required
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none text-sm font-medium text-gray-700"
                  />
                </div>
                <div class="space-y-1">
                  <label class="text-[10px] font-black uppercase tracking-widest text-gray-400">Téléphone *</label>
                  <input
                    v-model="devisForm.telephone"
                    type="tel"
                    required
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none text-sm font-medium text-gray-700"
                  />
                </div>
                <div class="space-y-1">
                  <label class="text-[10px] font-black uppercase tracking-widest text-gray-400">Email (optionnel)</label>
                  <input
                    v-model="devisForm.email"
                    type="email"
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none text-sm font-medium text-gray-700"
                  />
                </div>
                <div class="space-y-1">
                  <label class="text-[10px] font-black uppercase tracking-widest text-gray-400">Nombre d'exemplaires *</label>
                  <input
                    v-model.number="devisForm.nombre_exemplaires"
                    type="number"
                    required
                    min="1"
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none text-sm font-medium text-gray-700"
                  />
                </div>
                <div class="sm:col-span-2 space-y-1">
                  <label class="text-[10px] font-black uppercase tracking-widest text-gray-400">Message (optionnel)</label>
                  <textarea
                    v-model="devisForm.message"
                    rows="3"
                    placeholder="Informations complémentaires..."
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none text-sm font-medium text-gray-700 resize-none"
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                :disabled="devisSubmitting"
                class="w-full py-3.5 bg-amber-500 text-white rounded-xl font-bold text-sm hover:bg-amber-600 transition-colors disabled:opacity-60 mt-2">
                {{ devisSubmitting ? 'Envoi en cours...' : 'Envoyer la demande' }}
              </button>
            </form>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- Author Modal -->
    <Teleport to="body">
      <div v-if="showAuthorModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" @click="showAuthorModal = false"></div>
        <div class="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">
          
          <!-- Header -->
          <div class="p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100 flex items-start justify-between shrink-0">
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 rounded-full bg-gradient-to-tr from-[#6a0d5f] to-[#8B5A8C] flex items-center justify-center text-white font-bold text-2xl shadow-lg shrink-0">
                {{ book.authorName ? book.authorName.charAt(0) : "A" }}
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-900">{{ book.authorName }}</h3>
                <p class="text-sm text-[#6a0d5f] font-bold uppercase tracking-widest mt-1">Auteur</p>
              </div>
            </div>
            <button @click="showAuthorModal = false" class="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <!-- Body -->
          <div class="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1">
            <div class="mb-8">
              <h4 class="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                <svg class="w-5 h-5 text-[#6a0d5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Biographie
              </h4>
              <p class="text-gray-600 leading-relaxed text-sm whitespace-pre-wrap">
                {{ book.authorBio || "Biographie non disponible pour cet auteur." }}
              </p>
            </div>

            <div>
              <h4 class="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-[#6a0d5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                Ouvrages par {{ book.authorName }}
              </h4>
              
              <div v-if="authorBooks.length > 0" class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <NuxtLink v-for="b in authorBooks" :key="b.id" :to="`/livres/${b.id}`" @click="showAuthorModal = false" class="group block">
                  <div class="aspect-[3/4.2] rounded-xl overflow-hidden bg-gray-100 mb-2 border border-gray-200/50 relative">
                    <img :src="b.image" :alt="b.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div class="absolute inset-0 bg-[#6a0d5f]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <h5 class="text-xs font-bold text-gray-900 line-clamp-2 group-hover:text-[#6a0d5f] transition-colors">{{ b.title }}</h5>
                  <div v-if="!b.surCommande" class="flex items-center gap-1 mt-1">
                    <div :class="['w-1 h-1 rounded-full', b.stockAvailable >= 5 ? 'bg-green-500' : (b.stockAvailable > 0 ? 'bg-orange-500' : 'bg-red-500')]"></div>
                    <span :class="['text-[8px] font-bold uppercase tracking-widest', b.stockAvailable >= 5 ? 'text-green-600' : (b.stockAvailable > 0 ? 'text-orange-600' : 'text-red-600')]">
                      {{ b.stockAvailable >= 5 ? 'Disponible' : (b.stockAvailable > 0 ? 'Limité' : 'Épuisé') }}
                    </span>
                  </div>
                </NuxtLink>
              </div>
              <p v-else class="text-sm text-gray-500 italic">Aucun autre livre trouvé.</p>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import Breadcrumb from "~/components/Breadcrumb.vue";
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from "vue";
import { useRoute } from "#app";
import { useLivreStore } from "~~/stores/livre";
import { useAuteurStore } from "~~/stores/auteur";
import { useCartStore } from "~~/stores/cart";
import { useAuthStore } from "~~/stores/auth";

const cartStore = useCartStore();
const authStore = useAuthStore();
const { $api } = useNuxtApp();

// --- Devis modal ---
const showDevisModal = ref(false);
const devisSubmitting = ref(false);
const devisSuccess = ref(false);

// --- Reviews ---
const notes = ref([]);
const fetchingNotes = ref(true);
const reviewSubmitting = ref(false);
const displayedCommentsCount = ref(3);
const reviewSort = ref('best');

const notesWithComments = computed(() => {
  const filtered = notes.value.filter(n => n.commentaire && n.commentaire.trim() !== "");
  
  return filtered.sort((a, b) => {
    if (reviewSort.value === 'best') return b.note - a.note;
    if (reviewSort.value === 'worst') return a.note - b.note;
    if (reviewSort.value === 'newest') return new Date(b.created_at || 0) - new Date(a.created_at || 0);
    return 0;
  });
});

const visibleNotes = computed(() => notesWithComments.value.slice(0, displayedCommentsCount.value));

const showMoreComments = () => {
  displayedCommentsCount.value += 3;
};

const showLessComments = () => {
  displayedCommentsCount.value = 3;
};

// Reset pagination when sort changes
watch(reviewSort, () => {
  displayedCommentsCount.value = 3;
});
const reviewForm = ref({
  note: 0,
  commentaire: "",
});

const fetchNotes = async () => {
  fetchingNotes.value = true;
  notes.value = await livreStore.fetchNotes(bookId);
  fetchingNotes.value = false;
};

const submitReview = async () => {
  if (!reviewForm.value.note) return;
  reviewSubmitting.value = true;
  try {
    await livreStore.addNote({
      id_livre: bookId,
      note: reviewForm.value.note,
      commentaire: reviewForm.value.commentaire,
    });
    // Reset form and re-fetch notes
    reviewForm.value = { note: 0, commentaire: "" };
    await fetchNotes();
    // Re-fetch book to update average rating
    await livreStore.fetchLivre(bookId);
  } catch (err) {
    console.error(err);
  } finally {
    reviewSubmitting.value = false;
  }
};

const getRatingPercentage = (rating) => {
  if (!notes.value.length) return 0;
  const count = notes.value.filter((n) => n.note === rating).length;
  return (count / notes.value.length) * 100;
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const scrollToReviews = () => {
  const el = document.getElementById("reviews");
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const devisForm = ref({
  nom_complet: "",
  telephone: "",
  email: "",
  nombre_exemplaires: 1,
  message: "",
});

const openDevisModal = () => {
  devisSuccess.value = false;
  const u = authStore.user;
  devisForm.value = {
    nom_complet: u ? `${u.prenom || ""} ${u.nom || ""}`.trim() : "",
    telephone: u?.telephone || "",
    email: u?.email || "",
    nombre_exemplaires: 1,
    message: "",
  };
  showDevisModal.value = true;
};

const submitDevis = async () => {
  devisSubmitting.value = true;
  try {
    await $api("/devis", {
      method: "POST",
      body: {
        livre_id: book.value.id,
        nom_complet: devisForm.value.nom_complet,
        telephone: devisForm.value.telephone,
        email: devisForm.value.email || undefined,
        nombre_exemplaires: devisForm.value.nombre_exemplaires,
        message: devisForm.value.message || undefined,
      },
    });
    devisSuccess.value = true;
  } catch {
    // keep modal open for retry
  } finally {
    devisSubmitting.value = false;
  }
};

const addToCart = (book) => {
  cartStore.add({
    id: book.id,
    title: book.title,
    author: book.author,
    price: book.price,
    image: book.image,
    stockAvailable: book.stockAvailable,
  });
};

const route = useRoute();
const livreStore = useLivreStore();
const auteurStore = useAuteurStore();
const bookId = route.params.id;
const carousel = ref(null);

const showAuthorModal = ref(false);
const openAuthorModal = () => {
  showAuthorModal.value = true;
};
const canScrollLeft = ref(false);
const canScrollRight = ref(false);
let autoScrollInterval = null;

const updateScrollState = () => {
  if (carousel.value) {
    const { scrollLeft, scrollWidth, clientWidth } = carousel.value;
    canScrollLeft.value = scrollLeft > 10;
    canScrollRight.value = scrollLeft + clientWidth < scrollWidth - 20;
  }
};

const startAutoScroll = () => {
  if (autoScrollInterval) return;
  autoScrollInterval = setInterval(() => {
    if (carousel.value) {
      const { scrollLeft, scrollWidth, clientWidth } = carousel.value;
      if (scrollLeft + clientWidth >= scrollWidth - 20) {
        carousel.value.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const item = carousel.value.querySelector('.snap-start');
        const scrollAmount = item ? item.offsetWidth + 24 : 300;
        carousel.value.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  }, 5000);
};

const stopAutoScroll = () => {
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval);
    autoScrollInterval = null;
  }
};

const config = useRuntimeConfig();

onMounted(async () => {
  const promises = [
    livreStore.fetchLivre(bookId),
    fetchNotes()
  ];
  
  if (!livreStore.livres.length) {
    promises.push(livreStore.fetchLivres());
  }
  if (!auteurStore.auteurs.length) {
    promises.push(auteurStore.fetchAuteurs());
  }
  await Promise.all(promises);
  nextTick(() => {
    updateScrollState();
    if (carousel.value) {
      carousel.value.addEventListener('scroll', updateScrollState);
    }
  });
  startAutoScroll();
});

onUnmounted(() => {
  if (carousel.value) {
    carousel.value.removeEventListener('scroll', updateScrollState);
  }
  stopAutoScroll();
});

const book = computed(() => {
  const b = (livreStore.livre && livreStore.livre.id === bookId) 
    ? livreStore.livre 
    : livreStore.livres.find((l) => l.id === bookId);
    
  if (!b) return {};
  return {
    id: b.id,
    title: b.titre,
    authorName: b.auteurRel?.nom || b.auteur || "Auteur Inconnu",
    author: b.auteur,
    surCommande: !!b.sur_commande,
    price: b.prix_promo ?? b.prix,
    oldPrice: b.prix_promo ? b.prix : null,
    isPromo: !!b.prix_promo,
    category: b.categorie?.libelle,
    description: b.description,
    authorBio: b.auteurRel?.biographie || auteurStore.auteurs.find(a => a.nom === (b.auteurRel?.nom || b.auteur))?.biographie || "",
    stockAvailable: b.stock?.quantite ?? 0,
    averageRating: b.average_rating || 0,
    notesCount: b.notes_count || 0,
    image: livreStore.getCoverImage(b),
  };
});

const relatedBooks = computed(() => {
  if (!book.value.category) return [];
  const list = livreStore.livres
    .filter(
      (b) => b.id !== bookId && b.categorie?.libelle === book.value.category,
    )
    .map((b) => ({
      id: b.id,
      title: b.titre,
      authorName: b.auteurRel?.nom || b.auteur || "Auteur Inconnu",
      author: b.auteur,
      price: b.prix_promo ?? b.prix,
      oldPrice: b.prix_promo ? b.prix : null,
      isPromo: !!b.prix_promo,
      category: b.categorie?.libelle,
      surCommande: !!b.sur_commande,
      stockAvailable: b.stock?.quantite ?? 0,
      image: livreStore.getCoverImage(b),
    }));
  nextTick(updateScrollState);
  return list;
});

const authorBooks = computed(() => {
  if (!book.value.authorName) return [];
  return livreStore.livres
    .filter(
      (l) => (l.auteurRel?.nom === book.value.authorName || l.auteur === book.value.authorName)
    )
    .map((b) => ({
      id: b.id,
      title: b.titre,
      surCommande: !!b.sur_commande,
      stockAvailable: b.stock?.quantite ?? 0,
      image: livreStore.getCoverImage(b),
    }));
});

const scrollLeft = () => {
  stopAutoScroll();
  if (carousel.value) {
    const item = carousel.value.querySelector('.snap-start');
    const scrollAmount = item ? item.offsetWidth + 24 : 300;
    carousel.value.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  }
  startAutoScroll();
};

const scrollRight = () => {
  stopAutoScroll();
  if (carousel.value) {
    const item = carousel.value.querySelector('.snap-start');
    const scrollAmount = item ? item.offsetWidth + 24 : 300;
    carousel.value.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
  startAutoScroll();
};
</script>

<style scoped>
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

.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.perspective-1000 {
  perspective: 1000px;
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

.cubic-bezier {
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
