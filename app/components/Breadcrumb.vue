<template>
  <nav aria-label="Breadcrumb" class="mt-0 -mt-px">
    <div
      class="
        relative
        h-40
        overflow-hidden
        flex items-center
      "
    >
      <!-- Image de fond -->
      <img
        src="/images/librairie_illustation.jpg"
        alt=""
        class="absolute inset-0 w-full h-full object-cover"
      />

      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/40"></div>

      <!-- Contenu -->
      <ol
        class="
          relative z-10
          flex items-center gap-2
          px-6 sm:px-8 lg:px-12
          text-sm
          text-white
        "
      >
        <!-- Accueil -->
        <li>
          <NuxtLink
            to="/"
            class="opacity-80 hover:opacity-100 transition"
          >
            Accueil
          </NuxtLink>
        </li>

        <!-- Items -->
        <li
          v-for="(item, index) in items"
          :key="index"
          class="flex items-center gap-2"
        >
          <span class="opacity-60">/</span>

          <!-- Page actuelle -->
          <span
            v-if="index === items.length - 1"
            class="font-medium"
          >
            {{ item.label }}
          </span>

          <!-- Lien -->
          <NuxtLink
            v-else
            :to="item.to"
            class="opacity-80 hover:opacity-100 transition"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ol>
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