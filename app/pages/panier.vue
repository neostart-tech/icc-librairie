<template>
  <div class="bg-[#F3F0F5] max-w-7xl mx-auto px-6 lg:px-12 py-10 mb-24">

    <div class="flex items-center gap-3 mb-8">
      <NuxtLink
        to="/"
        class="text-gray-500 hover:text-[#6a0d5f] transition text-xl"
        aria-label="Retour à l'accueil"
      >
        ←
      </NuxtLink>
      <h1 class="text-2xl font-bold text-gray-800">Panier</h1>
    </div>

    <!-- PANIER VIDE -->
    <div
      v-if="cart.length === 0"
      class="bg-white rounded-xl shadow p-12 text-center"
    >
      <p class="text-lg font-semibold text-gray-700 mb-2">
        Votre panier est vide
      </p>
      <p class="text-sm text-gray-500 mb-6">
        Ajoutez des livres pour les retrouver ici.
      </p>
      <NuxtLink
        to="/catalogue"
        class="inline-block bg-[#6a0d5f] text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
      >
        Retour au catalogue
      </NuxtLink>
    </div>

    <!-- PANIER REMPLI -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- TABLE PRODUITS -->
      <section class="lg:col-span-2 bg-white rounded-xl shadow">
        <table class="w-full">
          <thead class="border-b text-sm text-gray-500">
            <tr>
              <th class="p-4 text-left">Produit</th>
              <th class="p-4 text-left">Prix</th>
              <th class="p-4 text-left">Quantité</th>
              <th class="p-4 text-left">Total</th>
              <th class="p-4"></th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="item in cart"
              :key="item.id"
              class="border-b last:border-b-0"
            >
              <!-- PRODUIT -->
              <td class="p-4">
                <div class="flex gap-4 items-center">
                  <img
                    :src="item.image"
                    class="w-6 h-9 object-cover border rounded"
                  />
                  <div>
                    <p class="font-semibold text-gray-800">
                      {{ item.title }}
                    </p>
                    <p class="text-sm text-gray-500">
                      {{ item.author }}
                    </p>
                  </div>
                </div>
              </td>

              <!-- PRIX -->
              <td class="p-4 text-sm">
                <span class="font-semibold text-gray-800">
                  {{ item.price }} FCFA
                </span>
              </td>

              <!-- QUANTITÉ -->
              <td class="p-4">
                <div class="flex items-center border rounded-lg w-fit">
                  <button
                    @click="decreaseQty(item)"
                    class="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span class="px-4 text-sm font-medium">
                    {{ item.quantity }}
                  </span>
                  <button
                    @click="increaseQty(item)"
                    class="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </td>

              <!-- TOTAL -->
              <td class="p-4 font-semibold">
                {{ item.price * item.quantity }} FCFA
              </td>

              <!-- SUPPRIMER -->
              <td class="p-4 text-center">
                <button
                  @click="removeItem(item.id)"
                  class="text-gray-400 hover:text-red-500 text-lg font-semibold"
                >
                  ✕
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- RÉCAP -->
      <aside class="bg-white rounded-xl shadow p-6 h-fit sticky top-28">
        <h2 class="text-lg font-bold mb-6 text-gray-800">
          Récapitulatif
        </h2>

        <div class="flex justify-between text-sm mb-3">
          <span>Sous-total</span>
          <span>{{ subtotal }} FCFA</span>
        </div>

        <div class="flex justify-between text-sm mb-3">
          <span>Livraison</span>
          <span class="text-green-600">Gratuite</span>
        </div>

        <hr class="my-4" />

        <div class="flex justify-between font-bold text-lg mb-6">
          <span>Total</span>
          <span class="text-[#6a0d5f]">{{ subtotal }} FCFA</span>
        </div>

        <!-- BOUTON -->
        <NuxtLink
          to="/commande"
          class="block text-center w-full bg-[#6a0d5f] text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
        >
          Passer au paiement
        </NuxtLink>

        <NuxtLink
          to="/"
          class="block text-center text-sm text-gray-500 mt-4 hover:underline"
        >
          Continuer mes achats
        </NuxtLink>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const cart = ref([
  {
    id: 1,
    title: 'Le Pouvoir de la Foi',
    author: 'Joseph K.',
    price: 7500,
    quantity: 1,
    image: '/images/livre.jpg',
  },
  {
    id: 2,
    title: 'Marcher avec Dieu',
    author: 'Paul N.',
    price: 9800,
    quantity: 2,
    image: '/images/livre1.jpg',
  },
])

const subtotal = computed(() =>
  cart.value.reduce((s, i) => s + i.price * i.quantity, 0)
)

const increaseQty = (item) => item.quantity++
const decreaseQty = (item) => item.quantity > 1 && item.quantity--
const removeItem = (id) =>
  (cart.value = cart.value.filter(i => i.id !== id))
</script>
