<template>
  <section class="max-w-7xl mx-auto px-6 py-16">
    <h1 class="text-3xl font-bold mb-10">
      Tous les livres
    </h1>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
      <BookCard
        v-for="book in books"
        :key="book.id"
        :book="book"
      />
    </div>
  </section>
</template>

<script setup>
import BookCard from "~/components/BookCard.vue"

const books = [
  {
    id: 1,
    title: "Marcher dans la foi",
    author: "Jean Dupont",
    price: 12.99,
    image: "/images/i1.jpg",
    slug: "marcher-dans-la-foi"
  },
  {
    id: 2,
    title: "La puissance de la prière",
    author: "Marie K.",
    price: 15.5,
    image: "/images/books/book2.jpg",
    slug: "puissance-de-la-priere"
  },
  {
    id: 3,
    title: "Espoir et renaissance",
    author: "Paul A.",
    price: 18,
    image: "/images/books/book3.jpg",
    slug: "espoir-et-renaissance"
  }
]
</script>
