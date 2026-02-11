<template>
  <section class="relative w-full h-[320px] overflow-hidden">
    <!-- BANNIÈRE STATIQUE -->
    <div
      class="absolute inset-0 bg-cover bg-center"
      :style="{
        backgroundImage: `url(/images/default-banniere.jpg)`,
      }"
    ></div>

    <!-- OVERLAY -->
    <div class="absolute inset-0 bg-black/50"></div>

    <!-- CONTENU (optionnel) -->
    <div class="relative z-10 h-full flex items-center justify-center">
      <div class="text-center text-white max-w-md px-4">
        <h1 class="text-3xl font-bold mb-8">
          Bienvenue dans notre bibliothèque
        </h1>
        <button
          @click="scrollToSection('livres-list', 100)"
          class="px-5 py-4 bg-[#6a0d5f] rounded-full text-sm font-semibold hover:opacity-90 transition"
        >
          Découvrir nos livres
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
const scrollToSection = (id, offset = 100) => {
  const element = document.getElementById(id);
  if (element) {
    // Calcule la position de l'élément moins l'offset
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};
</script>
