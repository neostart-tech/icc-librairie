<template>
  <main class="pt-28">
    <section class="max-w-6xl mx-auto px-8">
      <div v-if="book" class="grid md:grid-cols-2 gap-12">
        <img
          :src="book.image"
          class="w-full h-[520px] object-cover rounded-xl"
        />

        <div>
          <h1 class="text-3xl font-bold mb-2">
            {{ book.title }}
          </h1>
          <p class="text-gray-500 mb-4">
            {{ book.author }}
          </p>

          <p class="text-2xl font-bold text-[#8C6239] mb-6">
            {{ book.price }} FCFA
          </p>

          <p class="text-gray-700 mb-8">
            Livre inspirant pour nourrir votre foi et votre croissance spirituelle.
          </p>

          <div class="flex gap-4">
            <button class="bg-[#8C6239] text-white px-6 py-3 rounded-lg">
              Ajouter au panier
            </button>
            <button class="border px-4 py-3 rounded-lg">
              ❤️ Wishlist
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const books = [
  {
    title: 'Marcher dans la foi',
    author: 'Jean Dupont',
    price: 8500,
    slug: 'marcher-dans-la-foi',
    image: '/images/books/book1.jpg'
  },
  {
    title: 'Puissance de la prière',
    author: 'Marie K.',
    price: 9200,
    slug: 'puissance-priere',
    image: '/images/books/book2.jpg'
  }
]

const book = books.find(b => b.slug === route.params.slug)
</script>
