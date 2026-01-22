<template>
  <section class="max-w-7xl mx-auto px-8 py-16">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <!-- IMAGE -->
      <img
        :src="book.cover"
        class="w-full max-w-md mx-auto"
      />

      <!-- DETAILS -->
      <div>
        <h1 class="text-2xl font-semibold mb-2">
          {{ book.title }}
        </h1>

        <p class="text-gray-700 mb-4">
          {{ book.author }}
        </p>

        <p class="text-2xl font-bold mb-4">
          {{ book.price }} FCFA
        </p>

        <p class="text-green-600 font-medium mb-6">
          En stock – Livraison gratuite
        </p>

        <button class="bg-[#f28c00] text-white px-8 py-3 rounded-md">
          Ajouter au panier
        </button>

        <p class="mt-8 text-gray-700 leading-relaxed">
          Description du livre.  
          (À remplacer par les données venant de l’API Laravel)
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
const route = useRoute()

const book = {
  title: "Grands classiques spécial débutants Tome 2",
  author: "William Bal",
  price: 17296,
  cover: "/images/books/book1.jpg"
}
</script>
