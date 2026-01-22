<template>
  <section class="py-8 px-4 sm:px-6 lg:px-16">
    <div class="max-w-7xl mx-auto">
      <!-- En-tête -->
      <div class="flex items-center justify-center mb-8">
        <div class="relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-900 to-black rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div class="relative px-5 py-2 bg-white ring-1 ring-gray-900/5 rounded-full leading-none flex items-center justify-center space-x-4">
            <span class="flex items-center space-x-2">
              <span class="w-3 h-3 bg-purple-600 rounded-full animate-pulse"></span>
              <span class="text-purple-800 font-bold text-base">DISPONIBLE</span>
            </span>
            <span class="text-gray-800 font-bold text-base">dès maintenant !</span>
          </div>
        </div>
      </div>

      <!-- Contenu -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <!-- Image -->
        <div class="relative">
          <div class="relative group cursor-pointer">
            <div class="absolute inset-0 bg-gradient-to-tr from-purple-100/20 to-cyan-100/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 shadow-2xl w-full max-w-[450px]">
              <div class="relative aspect-[3/4] md:aspect-[4/5] lg:aspect-[4/5] bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl overflow-hidden shadow-inner">
                <div class="absolute inset-0 flex items-center justify-center">
                  <img
                    src="/images/l.jpg"
                    alt="Livre"
                    class="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </div>

              <div class="absolute top-5 right-5">
                <div class="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1.5 rounded-full font-bold shadow-lg animate-bounce text-sm">
                  -25%
                </div>
              </div>

              <div class="absolute bottom-5 left-5">
                <div class="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                  <div class="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span class="font-semibold text-emerald-700 text-sm">En stock</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Détails -->
        <div class="flex flex-col justify-center">
          <div class="mb-5">
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">
            Le Voyage des Pages
            </h1>

            <div class="flex items-center space-x-3">
              <div class="flex items-center">
                <div class="flex text-amber-400">
                  <span v-for="i in 5" :key="i" class="text-lg">★</span>
                </div>
                <span class="ml-2 text-gray-600 text-sm">4.8 (342 avis)</span>
              </div>
              <span class="text-gray-400">•</span>
              <span class="text-gray-600 text-sm">Roman contemporain</span>
            </div>
          </div>

          <div class="mb-6">
            <p class="text-gray-600 text-sm mb-2">Par</p>
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full"></div>
              <div>
                <p class="font-bold text-gray-900 text-sm">Marie Laurent</p>
                <p class="text-xs text-gray-600">Auteure best-seller</p>
              </div>
            </div>
          </div>

          <div class="mb-6">
            <p class="text-gray-700 text-sm leading-relaxed">
              Une histoire captivante qui vous transporte à travers les pages du temps.
              Découvrez l'aventure extraordinaire de personnages inoubliables dans
              un récit maîtrisé qui a conquis des milliers de lecteurs.
            </p>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="space-y-2">
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span class="text-purple-600">📖</span>
                </div>
                <div>
                  <p class="text-xs text-gray-600">Pages</p>
                  <p class="font-semibold text-sm">320 pages</p>
                </div>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span class="text-blue-600">📅</span>
                </div>
                <div>
                  <p class="text-xs text-gray-600">Parution</p>
                  <p class="font-semibold text-sm">Mai 2024</p>
                </div>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <span class="text-emerald-600">🛒</span>
                </div>
                <div>
                  <p class="text-xs text-gray-600">Format</p>
                  <p class="font-semibold text-sm">Broché</p>
                </div>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                  <span class="text-amber-600">🚚</span>
                </div>
                <div>
                  <p class="text-xs text-gray-600">Livraison</p>
                  <p class="font-semibold text-sm">24-48h</p>
                </div>
              </div>
            </div>
          </div>

          <div class="border-t border-gray-200 pt-6">
            <div class="flex items-end mb-5">
              <div>
                <p class="text-sm text-gray-600 mb-1">Prix actuel</p>
                <div class="flex items-baseline space-x-2">
                  <span class="text-2xl md:text-3xl font-bold text-gray-900">10000 FCFA</span>
                  <span class="text-base md:text-lg text-gray-400 line-through">15000 FCFA</span>

                </div>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-3">
              <button
                @click="ajouterAuPanier"
                class="flex-1 group relative overflow-hidden bg-[#4A2B69] text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                <span class="relative flex items-center justify-center gap-2 text-sm">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                    Ajouter au panier
                </span>
                </button>

                <button
                @click="acheterMaintenant"
                class="flex-1 bg-white border-2 border-[#4A2B69] text-[#4A2B69] font-bold py-3 px-6 rounded-xl hover:bg-[#F4ECFF] transition-colors duration-300 text-sm"
                >
                Acheter maintenant
                </button>


            </div>

            <div class="mt-5 flex justify-center space-x-5">
              <button class="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors text-sm">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                <span>Ajouter à la liste</span>
              </button>

              <button class="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors text-sm">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                </svg>
                <span>Poser une question</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Bandeau -->
      <div class="mt-10 pt-6 border-t border-gray-200">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <span class="text-emerald-600">✓</span>
            </div>
            <div>
              <p class="font-semibold text-gray-900 text-sm">Garantie 30 jours</p>
              <p class="text-xs text-gray-600">Satisfait ou remboursé</p>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span class="text-blue-600">🚚</span>
            </div>
            <div>
              <p class="font-semibold text-gray-900 text-sm">Livraison rapide</p>
              <p class="text-xs text-gray-600">Expédition sous 24h</p>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <span class="text-purple-600">🔒</span>
            </div>
            <div>
              <p class="font-semibold text-gray-900 text-sm">Paiement sécurisé</p>
              <p class="text-xs text-gray-600">Cryptage SSL</p>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <span class="text-amber-600">📞</span>
            </div>
            <div>
              <p class="font-semibold text-gray-900 text-sm">Support client</p>
              <p class="text-xs text-gray-600">7j/7 par chat</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const ajouterAuPanier = () => {
  console.log("Ajouter au panier");
  // ici tu mets ta logique
};

const acheterMaintenant = () => {
  console.log("Acheter maintenant");
  // redirection checkout
};
</script>

<style scoped>
@keyframes pulse-subtle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.animate-pulse {
  animation: pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
