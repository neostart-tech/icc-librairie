<template>
  <div>
    <HeroSection />
    <DernieresParutions />
    <MeilleurVente />
    <disponible />
  </div>
</template>

<script setup>
import HeroSection from '~/components/HeroSection.vue'
import DernieresParutions from '~/components/DernieresParutions.vue'
import MeilleurVente from '~/components/MeilleurVente.vue'
import disponible from '~/components/disponible.vue'
</script>
