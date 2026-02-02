<template>
  <div>
    <Breadcrumb :items="[{ label: 'Panier', to: '/panier' }]" />

    <div class="bg-[#F3F0F5]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 lg:py-10 mb-20">
        <!-- Titre -->
        <div class="flex items-center gap-3 mb-6 lg:mb-8">
          <NuxtLink
            to="/"
            class="text-gray-500 hover:text-[#6a0d5f] transition text-xl"
          >
            ←
          </NuxtLink>
          <h1 class="text-xl sm:text-2xl font-bold text-gray-800">Panier</h1>
        </div>

        <!-- PANIER VIDE -->
        <div
          v-if="cart.length === 0"
          class="bg-white rounded-xl shadow p-8 sm:p-12 text-center"
        >
          <p class="text-lg font-semibold text-gray-700 mb-2">
            Votre panier est vide
          </p>
          <p class="text-sm text-gray-500 mb-6">
            Ajoutez des livres pour les retrouver ici.
          </p>
          <NuxtLink
            to="/"
            class="inline-block bg-[#6a0d5f] text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Retour au catalogue
          </NuxtLink>
        </div>

        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <section class="lg:col-span-2 space-y-4">
            <div
              v-for="item in cart"
              :key="item.id"
              class="bg-white rounded-xl shadow p-4 flex gap-4 lg:hidden"
            >
              <img
                :src="item.image"
                class="w-16 h-24 object-cover rounded border"
              />

              <div class="flex-1">
                <p class="font-semibold text-gray-800">
                  {{ item.title }}
                </p>
                <p class="text-sm text-gray-500 mb-2">
                  {{ item.author }}
                </p>

                <div class="flex items-center justify-between">
                  <div class="flex items-center border rounded-lg">
                    <button
                      class="w-8 h-8 hover:bg-gray-100 cursor-pointer"
                      @click="decreaseQty(item)"
                      :disabled="item.quantity <= 1"
                    >
                      -
                    </button>

                    <span class="px-4 text-sm font-medium">
                      {{ item.quantity }}
                    </span>

                    <button
                      class="w-8 h-8 hover:bg-gray-100 cursor-pointer"
                      @click="increaseQty(item)"
                      :disabled="item.quantity >= item.stockAvailable"
                    >
                      +
                    </button>
                  </div>

                  <span class="font-semibold text-[#6a0d5f]">
                    {{ item.price * item.quantity }} FCFA
                  </span>
                </div>
              </div>

              <button
                class="text-gray-400 hover:text-red-500 text-lg"
                @click="removeItem(item.id)"
              >
                ✕
              </button>
            </div>

            <!-- DESKTOP : table -->
            <div
              class="hidden lg:block bg-white rounded-xl shadow overflow-x-auto"
            >
              <table class="w-full min-w-[700px]">
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
                    <td class="p-4">
                      <div class="flex gap-4 items-center">
                        <img
                          :src="item.image"
                          class="w-10 h-16 object-cover rounded border"
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

                    <td class="p-4 font-semibold">{{ item.price }} FCFA</td>

                    <td class="p-4">
                      <div class="flex items-center border rounded-lg w-fit">
                        <button
                          class="w-8 h-8 hover:bg-gray-100 cursor-pointer"
                          @click="decreaseQty(item)"
                          :disabled="item.quantity <= 1"
                        >
                          -
                        </button>

                        <span class="px-4 text-sm font-medium">
                          {{ item.quantity }}
                        </span>

                        <button
                          class="w-8 h-8 hover:bg-gray-100 cursor-pointer"
                          @click="increaseQty(item)"
                          :disabled="item.quantity >= item.stockAvailable"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td class="p-4 font-semibold">
                      {{ item.price * item.quantity }} FCFA
                    </td>

                    <td class="p-4 text-center">
                      <button
                        class="text-gray-400 hover:text-red-500 text-lg cursor-pointer"
                        @click="removeItem(item.id)"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- RÉCAP -->
          <aside
            class="bg-white rounded-xl shadow p-6 h-fit lg:sticky lg:top-28"
          >
            <h2 class="text-lg font-bold mb-6 text-gray-800">Récapitulatif</h2>

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
              <span class="text-[#6a0d5f]"> {{ subtotal }} FCFA </span>
            </div>

            <NuxtLink
              to="/commande"
              class="block w-full text-center bg-[#6a0d5f] text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
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
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import { useCartStore } from "~~/stores/cart";

const cartStore = useCartStore();

const cart = computed(() => cartStore.items);
const subtotal = computed(() => cartStore.subtotal);

const increaseQty = (item) => cartStore.increase(item.id);
const decreaseQty = (item) => cartStore.decrease(item.id);
const removeItem = (id) => cartStore.remove(id);
</script>
