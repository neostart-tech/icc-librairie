<template>
  <div class="min-h-screen bg-gray-100 px-4 py-16 flex items-center justify-center">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

      <!-- Titre -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">Inscription</h1>
        <p class="text-sm text-gray-500 mt-1">
          Crée ton compte en quelques secondes
        </p>
      </div>

      <!-- Formulaire -->
      <form class="space-y-5" @submit.prevent="handleRegister">

        <div>
          <label class="text-sm text-gray-600">Nom</label>
          <input
            v-model="name"
            type="text"
            placeholder="Ton nom"
            class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
                   focus:ring-2 focus:ring-[#6a0d5f] focus:border-[#6a0d5f]"
            required
          />
        </div>

        <div>
          <label class="text-sm text-gray-600">Prénom</label>
          <input
            v-model="firstName"
            type="text"
            placeholder="Ton prénom"
            class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
                   focus:ring-2 focus:ring-[#6a0d5f] focus:border-[#6a0d5f]"
            required
          />
        </div>

        <div>
          <label class="text-sm text-gray-600">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="email@example.com"
            class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
                   focus:ring-2 focus:ring-[#6a0d5f] focus:border-[#6a0d5f]"
            required
          />
        </div>

        <div>
          <label class="text-sm text-gray-600">Téléphone</label>
          <input
            v-model="telephone"
            type="tel"
            placeholder="Ton téléphone"
            class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
                   focus:ring-2 focus:ring-[#6a0d5f] focus:border-[#6a0d5f]"
            required
          />
        </div>

        <!-- Mot de passe -->
        <div>
          <label class="text-sm text-gray-600">Mot de passe</label>
          <div class="relative mt-1">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-sm
                     focus:ring-2 focus:ring-[#6a0d5f] focus:border-[#6a0d5f]"
              required
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              <!-- Œil ouvert -->
              <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>

              <!-- Œil barré -->
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.96 9.96 0 012.219-3.423m1.43-1.1A9.963 9.963 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.05 10.05 0 01-1.481 2.563M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3l18 18" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Confirmer mot de passe -->
        <div>
          <label class="text-sm text-gray-600">Confirmer le mot de passe</label>
          <div class="relative mt-1">
            <input
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="••••••••"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-sm
                     focus:ring-2 focus:ring-[#6a0d5f] focus:border-[#6a0d5f]"
              required
            />
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              <!-- Œil ouvert -->
              <svg v-if="!showConfirmPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>

              <!-- Œil barré -->
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.96 9.96 0 012.219-3.423m1.43-1.1A9.963 9.963 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.05 10.05 0 01-1.481 2.563M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3l18 18" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Bouton -->
        <button
          class="w-full bg-[#6a0d5f] text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
        >
          Créer un compte
        </button>
      </form>

      <p class="text-center text-sm text-gray-600 mt-6">
        Déjà un compte ?
        <NuxtLink to="/connexion" class="font-medium text-[#6a0d5f] hover:underline">
          Connexion
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const firstName = ref('')
const email = ref('')
const telephone = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const handleRegister = () => {
  if (password.value !== confirmPassword.value) {
    alert('Les mots de passe ne correspondent pas')
    return
  }
  router.push('/dashboard')
}
</script>
