<template>
  <div class="flex min-h-screen">
    
    <Sidebar />

    <div class="flex-1 flex flex-col ml-64">
      <Topbar />

      <main class="flex-1 overflow-y-auto">
        <slot />
      </main>
    </div>

  </div>
</template>

<script setup>
import Sidebar from '~/components/dashboard/Sidebar.vue'
import Topbar from '~/components/dashboard/Topbar.vue'
</script>
