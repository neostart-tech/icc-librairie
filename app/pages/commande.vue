<template>
  <div class="min-h-screen bg-[#F3F0F5] px-6 lg:px-12 py-10">
    <div class="max-w-6xl mx-auto">

      <!-- HEADER -->
      <div class="flex items-center gap-3 mb-8">
        <NuxtLink
          to="/panier"
          class="text-gray-500 hover:text-[#6a0d5f] transition text-xl"
        >
          ←
        </NuxtLink>
        <h1 class="text-2xl font-bold text-gray-800">Commande</h1>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <!-- FORMULAIRE -->
        <div class="lg:col-span-2 bg-white rounded-xl shadow p-6">

          <!-- INFOS CLIENT -->
          <h2 class="text-lg font-semibold mb-4">Informations client</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input class="input" placeholder="Nom" />
            <input class="input" placeholder="Prénom" />
            <input class="input md:col-span-2" placeholder="Email" />
            <input class="input md:col-span-2" placeholder="Téléphone" />
          </div>

          <!-- ADRESSE -->
          <h2 class="text-lg font-semibold mb-4">Adresse de livraison</h2>
          <div class="grid grid-cols-1 gap-4 mb-6">
            <input class="input" placeholder="Adresse complète" />
            <div class="grid grid-cols-2 gap-4">
              <input class="input" placeholder="Ville" />
              <input class="input" placeholder="Pays" />
            </div>
          </div>

          <!-- PAIEMENT -->
          <h2 class="text-lg font-semibold mb-4">Mode de paiement</h2>

          <div class="space-y-3">

            <!-- FLOOZ -->
            <label class="payment-option">
              <input type="radio" v-model="payment" value="flooz" />
              <img src="/logo/flooz.png" class="w-8 h-6" alt="Flooz" />
              <span>Flooz</span>
            </label>

            <!-- MIXX -->
            <label class="payment-option">
              <input type="radio" v-model="payment" value="mixx" />
              <img src="/logo/Mixx-by-yas.jpg" class="h-6" alt="Mixx by YAS" />
              <span>Mixx by YAS</span>
            </label>

            <!-- MASTERCARD -->
            <label class="payment-option">
              <input type="radio" v-model="payment" value="mastercard" />
              <img src="/logo/mastercard-logo.jpg" class="h-8" alt="MasterCard" />
              <span>MasterCard</span>
            </label>
          </div>

          <!-- INFOS DE PAIEMENT -->
          <div v-if="payment" class="mt-6 bg-gray-50 border rounded-lg p-4">
            <h3 class="font-semibold mb-3 text-gray-700">
              Informations de paiement
            </h3>

            <!-- FLOOZ -->
            <div v-if="payment === 'flooz'" class="space-y-3">
              <input class="input" placeholder="Numéro Flooz" />
              <p class="text-sm text-gray-500">
                Vous recevrez une demande de paiement sur votre téléphone.
              </p>
            </div>

            <!-- MIXX -->
            <div v-if="payment === 'mixx'" class="space-y-3">
              <input class="input" placeholder="Numéro Mixx by YAS" />
              <p class="text-sm text-gray-500">
                Confirmez le paiement via votre compte Mixx.
              </p>
            </div>

            <!-- MASTERCARD -->
            <div v-if="payment === 'mastercard'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input class="input md:col-span-2" placeholder="Numéro de carte" />
              <input class="input" placeholder="MM / AA" />
              <input class="input" placeholder="CVV" />
            </div>
          </div>

        </div>

        <!-- RÉCAP COMMANDE -->
        <aside class="bg-white rounded-xl shadow p-6 h-fit sticky top-6">
          <h2 class="text-lg font-bold mb-4">Votre commande</h2>

          <div class="space-y-3 mb-4">
            <div
              v-for="item in cart"
              :key="item.id"
              class="flex justify-between text-sm"
            >
              <span>
                {{ item.title }}
                <span class="text-gray-400">× {{ item.quantity }}</span>
              </span>
              <span class="font-medium">
                {{ item.price * item.quantity }} FCFA
              </span>
            </div>
          </div>

          <hr class="my-4" />

          <div class="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span class="text-[#6a0d5f]">{{ total }} FCFA</span>
          </div>

          <p class="text-sm text-gray-500 mt-3">
            Paiement :
            <span class="font-medium capitalize">{{ payment }}</span>
          </p>

          <button
            class="mt-6 w-full bg-[#6a0d5f] text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Confirmer la commande
          </button>
        </aside>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const cart = ref([
  { id: 1, title: 'Le Pouvoir de la Foi', price: 7500, quantity: 1 },
  { id: 2, title: 'Marcher avec Dieu', price: 9800, quantity: 2 },
])

const payment = ref(null)

const total = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
)
</script>

<style scoped>
.input {
  width: 100%;
  border: 1px solid #e5e5e5;
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
}

.input:focus {
  outline: none;
  border-color: #6a0d5f;
  box-shadow: 0 0 0 1px #6a0d5f;
}

.payment-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid #e5e5e5;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.payment-option:hover {
  border-color: #6a0d5f;
}

.payment-option input {
  accent-color: #6a0d5f;
}
</style>
