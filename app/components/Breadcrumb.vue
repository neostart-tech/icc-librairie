<template>
  <nav aria-label="Breadcrumb" class="relative overflow-hidden z-20 py-8 px-6 sm:px-8 lg:px-12 bg-white border-b border-gray-100">
    <!-- Decorative background elements -->
    <div class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-[#6a0d5f]/5 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-[#6a0d5f]/5 rounded-full blur-3xl pointer-events-none"></div>
    
    <div class="max-w-7xl mx-auto relative z-10">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <!-- Breadcrumb path -->
        <ol class="flex items-center flex-wrap gap-3">
          <!-- Accueil -->
          <li class="flex items-center group">
            <NuxtLink
              to="/"
              class="flex items-center gap-2 text-gray-400 hover:text-[#6a0d5f] transition-all duration-300"
            >
              <div class="p-2 rounded-xl bg-gray-50 group-hover:bg-[#6a0d5f]/10 transition-all duration-300 group-hover:scale-110">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span class="font-bold text-sm tracking-tight hidden sm:inline">Accueil</span>
            </NuxtLink>
          </li>

          <!-- Items loop -->
          <li
            v-for="(item, index) in items"
            :key="index"
            class="flex items-center gap-3 animate-slideIn"
            :style="{ animationDelay: `${(index + 1) * 100}ms` }"
          >
            <!-- Arrow Separator with more character -->
            <div class="text-gray-200">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </div>

            <!-- Page actuelle (last item) -->
            <div
              v-if="index === items.length - 1"
              class="flex items-center px-4 py-2 bg-gradient-to-r from-[#6a0d5f] to-[#8a1d7f] text-white font-bold rounded-xl shadow-lg shadow-[#6a0d5f]/20 scale-105"
            >
              {{ item.label }}
            </div>

            <!-- Intermediary Link -->
            <NuxtLink
              v-else
              :to="item.to"
              class="text-gray-500 hover:text-[#6a0d5f] hover:translate-x-1 transition-all duration-300 font-bold text-sm tracking-tight"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ol>

        <!-- Right side badge/status (Decorative) -->
        <div class="hidden md:flex items-center gap-2">
          <div class="h-1.5 w-1.5 rounded-full bg-[#6a0d5f] animate-pulse"></div>
          <span class="text-[10px] uppercase tracking-widest font-bold text-gray-300">Librairie Spirituelle</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-15px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slideIn {
  animation: slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Texture subtile */
nav::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.02;
  pointer-events: none;
}
</style>