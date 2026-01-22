<template>
  <section class="max-w-7xl mx-auto px-16 py-20">
    <!-- TITRE -->
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-2xl font-semibold text-[#4A2B69]">
        Dernières parutions
      </h2>

      <NuxtLink
        to="/livres"
        class="text-sm font-medium text-gray-600 hover:underline"
      >
        Voir tout
      </NuxtLink>
    </div>

    <!-- LISTE -->
    <div class="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
      <BookCard
        v-for="book in books"
        :key="book.slug"
        :book="book"
        class="min-w-[220px]"
      />

    </div>
  </section>
</template>

<script setup>
import BookCard from '~/components/BookCard.vue'

const books = [
  {
    title: 'Marcher dans la foi',
    author: 'Jean Dupont',
    price: 8500,
    slug: 'marcher-dans-la-foi',
    image: '/images/i1.jpg'
  },
  {
    title: 'Puissance de la prière',
    author: 'Marie K.',
    price: 9200,
    slug: 'puissance-priere',
    image: '/images/i1.jpg'
  },
  {
    title: 'Espoir & renaissance',
    author: 'Paul A.',
    price: 11000,
    slug: 'espoir-renaissance',
    image: '/images/i1.jpg'
  },
  {
    title: 'Vivre par la foi',
    author: 'David N.',
    price: 7800,
    slug: 'vivre-par-la-foi',
    image: '/images/i1.jpg'
  },
  {
    title: 'Vivre par la foi',
    author: 'David N.',
    price: 7800,
    slug: 'vivre-par-la-foi',
    image: '/images/i1.jpg'
  },
  {
    title: 'Vivre par la foi',
    author: 'David N.',
    price: 7800,
    slug: 'vivre-par-la-foi',
    image: '/images/i1.jpg'
  },
  {
    title: 'Vivre par la foi',
    author: 'David N.',
    price: 7800,
    slug: 'vivre-par-la-foi',
    image: '/images/i1.jpg'
  }
]
</script>
