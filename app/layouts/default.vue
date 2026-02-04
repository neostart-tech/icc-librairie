<template>
  <div class="min-h-screen flex flex-col">
    <Header />

    <main class="flex-1">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Header from "~/components/header.vue";
import Footer from "~/components/footer.vue";
</script>
