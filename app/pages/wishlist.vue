<template>
  <main class="pt-28">
    <section class="max-w-7xl mx-auto px-8">
      <h1 class="text-3xl font-bold mb-10">
        Ma wishlist
      </h1>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <BookCard
          v-for="book in books"
          :key="book.slug"
          :book="book"
        />
      </div>
    </section>
  </main>
</template>

<script setup>
import BookCard from '~/components/BookCard.vue'

const books = [
  {
    title: 'Marcher dans la foi',
    author: 'Jean Dupont',
    price: 8500,
    slug: 'marcher-dans-la-foi',
    image: '/images/books/book1.jpg'
  }
]
</script>
