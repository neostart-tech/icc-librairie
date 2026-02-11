<template>
  <div class="flex min-h-screen">
   
    <Sidebar v-model:isCollapsed="isCollapsed" />

    <div
      class="flex-1 flex flex-col transition-all duration-300"
      :class="isCollapsed ? 'ml-20' : 'ml-64'"
    >
      <Topbar />
      <main class="flex-1 overflow-y-auto">
        <slot />
      </main>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '~/components/dashboard/Sidebar.vue'
import Topbar from '~/components/dashboard/Topbar.vue'

const isCollapsed = ref(false)
</script>
