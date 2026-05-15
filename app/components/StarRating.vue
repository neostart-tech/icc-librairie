<template>
  <div class="flex items-center gap-1">
    <div class="flex items-center text-amber-400">
      <template v-for="i in 5" :key="i">
        <div class="relative" :class="sizeClass">
          <!-- Background Star (Gray) -->
          <svg :class="sizeClass" class="fill-gray-200" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          
          <!-- Foreground Star (Amber) with Clip Path -->
          <div class="absolute inset-0 overflow-hidden" :style="{ width: getStarFill(i) }">
            <svg :class="sizeClass" class="fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
      </template>
    </div>
    <span v-if="showValue" :class="textClass" class="font-bold text-gray-900 ml-1">{{ rating }}</span>
    <span v-if="count !== undefined" class="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">({{ count }} avis)</span>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  rating: {
    type: Number,
    default: 0
  },
  count: {
    type: Number,
    default: undefined
  },
  size: {
    type: String,
    default: 'sm' // sm, md, lg
  },
  showValue: {
    type: Boolean,
    default: false
  }
});

const sizeClass = computed(() => {
  if (props.size === 'lg') return 'w-5 h-5';
  if (props.size === 'md') return 'w-4 h-4';
  return 'w-3 h-3';
});

const textClass = computed(() => {
  if (props.size === 'lg') return 'text-sm';
  return 'text-[10px]';
});

const getStarFill = (index) => {
  const diff = props.rating - (index - 1);
  if (diff >= 1) return '100%';
  if (diff <= 0) return '0%';
  return `${diff * 100}%`;
};
</script>
