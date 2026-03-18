<template>
  <div class="min-h-screen flex flex-col">
    <!-- Global Loading Overlay -->
    <Transition name="global-fade">
      <div v-if="isGlobalLoading" class="fixed inset-0 z-[1000] bg-white/80 backdrop-blur-3xl flex flex-col items-center justify-center pointer-events-auto">
        <div class="relative flex items-center justify-center">
          <!-- Spinning Ring (Purple) -->
          <div class="w-48 h-48 rounded-full border-[3px] border-gray-100 border-t-[#6a0d5f] animate-[spin_1.2s_linear_infinite]"></div>
          
          <!-- Logo Case (Centered inside the circle) -->
          <div class="absolute inset-0 flex items-center justify-center p-6">
             <div class="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center">
                <img src="/logo/logo_librairie.png" class="w-full h-full object-cover scale-150" alt="ICC Librairie" />
             </div>
          </div>
        </div>
      </div>
    </Transition>

    <Header />

    <main class="flex-1 overflow-x-hidden">
      <!-- Page Transition (Accumulation / Reveal style) -->
      <Transition name="page-reveal" mode="out-in" appear>
        <div :key="$route.fullPath" class="page-container">
          <slot />
        </div>
      </Transition>
    </main>

    <Footer />

    <!-- Custom Cursor Follower -->
    <div
      v-if="isDesktop"
      class="cursor-follower hidden lg:block"
      :style="{ transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)` }"
      :class="{ 'cursor-hover': isHovering }"
    ></div>

    <!-- Bouton Retour en Haut -->
    <Transition
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="translate-y-20 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-20 opacity-0"
    >
      <button
        v-if="showScrollTop"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-[#6a0d5f] text-white rounded-2xl shadow-2xl flex items-center justify-center hover:bg-[#8B5A8C] hover:-translate-y-2 active:scale-90 transition-all duration-300 group"
        aria-label="Retour en haut"
      >
        <div class="absolute inset-0 bg-white/20 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-500"></div>
        <svg class="w-6 h-6 transform group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </Transition>
  </div>
</template>

<script setup>
import Header from "~/components/header.vue";
import Footer from "~/components/footer.vue";
import { ref, onMounted, onUnmounted, reactive, watch } from 'vue';
import { useNuxtApp, useRoute } from '#app';

const showScrollTop = ref(false);
const isDesktop = ref(false);
const isHovering = ref(false);
const cursorPos = reactive({ x: -100, y: -100 });
const isGlobalLoading = ref(true); // Initial loading
const route = useRoute();

const updateCursor = (e) => {
  cursorPos.x = e.clientX;
  cursorPos.y = e.clientY;
  
  const target = e.target;
  const isInteractive = target.closest('a, button, input, select, label, .cursor-pointer');
  isHovering.value = !!isInteractive;
};

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 400;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Nuxt Loading Hooks
const nuxtApp = useNuxtApp();

onMounted(() => {
  // Simulate initial load finish
  setTimeout(() => {
    isGlobalLoading.value = false;
  }, 800);

  isDesktop.value = window.matchMedia('(hover: hover)').matches;
  window.addEventListener('scroll', handleScroll);
  if (isDesktop.value) {
    window.addEventListener('mousemove', updateCursor);
  }

  // Handle Nuxt Page Hooks
  nuxtApp.hook('page:start', () => {
    isGlobalLoading.value = true;
  });
  nuxtApp.hook('page:finish', () => {
    setTimeout(() => {
      isGlobalLoading.value = false;
    }, 600); // Small delay for smoothness
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('mousemove', updateCursor);
});
</script>

<style>
/* Global Transitions */
.global-fade-enter-active, .global-fade-leave-active {
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 0.8s ease;
}
.global-fade-enter-from, .global-fade-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
}

/* Page Reveal - Cutaway Style */
.page-reveal-enter-active {
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.page-reveal-leave-active {
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.page-reveal-enter-from {
  opacity: 0;
  transform: scale(1.02) translateY(15px);
  filter: blur(4px);
}
.page-reveal-leave-to {
  opacity: 0;
  transform: scale(0.98) translateY(-15px);
  filter: blur(4px);
}

/* Style global pour le curseur car il doit être au-dessus de tout */
.cursor-follower {
  position: fixed;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  background-color: #6a0d5f;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: multiply;
  transition: transform 0.1s ease-out, width 0.3s ease, height 0.3s ease, background-color 0.3s ease, border 0.3s ease;
  transform-origin: center center;
  margin-top: -5px;
  margin-left: -5px;
}

.cursor-hover {
  width: 40px;
  height: 40px;
  margin-top: -20px;
  margin-left: -20px;
  background-color: rgba(106, 13, 95, 0.15);
  border: 2px solid #6a0d5f;
  mix-blend-mode: normal;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
