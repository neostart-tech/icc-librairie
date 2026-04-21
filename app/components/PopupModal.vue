<template>
  <ClientOnly>
    <transition
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-400 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="isVisible && popup?.image_url" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-[#1a0117]/70 backdrop-blur-sm"
          @click="close"
        ></div>

        <!-- Modal Content -->
        <div class="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-[0_35px_60px_-15px_rgba(61,2,53,0.5)] group animate-float">
          <!-- Close Button -->
          <button 
            @click="close"
            class="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Image Container -->
          <div class="relative overflow-hidden aspect-square flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <component 
              :is="popup?.link ? 'a' : 'div'"
              :href="popup?.link"
              :target="popup?.link?.startsWith('http') ? '_blank' : '_self'"
              class="block w-full h-full cursor-pointer relative"
              @click="popup?.link ? close() : null"
            >
              <img 
                :src="popup?.image_url" 
                alt="Promotion"
                class="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
              />
              
              <!-- Soft inner shadow -->
              <div class="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.1)] pointer-events-none"></div>

              <!-- Hover Overlay -->
              <div v-if="popup?.link" class="absolute inset-0 bg-gradient-to-t from-[#3d0235]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-10">
                <span class="text-white font-black text-xs uppercase tracking-[0.3em] translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  Découvrir →
                </span>
              </div>
            </component>
          </div>
        </div>
      </div>
    </transition>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePopupStore } from '~~/stores/popup';

const popupStore = usePopupStore();
const isVisible = ref(false);
const popup = ref<any>(null);

const close = () => {
  isVisible.value = false;
  popupStore.markAsShown();
};

onMounted(async () => {
  // Only show if not shown in this session
  if (!popupStore.hasShown) {
    if (!popupStore.activePopup) {
      await popupStore.fetchActivePopup();
    }

    if (popupStore.activePopup) {
      popup.value = popupStore.activePopup;
      // Small delay for better UX
      setTimeout(() => {
        isVisible.value = true;
      }, 1500);
    }
  }
});
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-slide-up {
  animation: slide-up 0.5s ease-out forwards;
}

@keyframes slide-up {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>
