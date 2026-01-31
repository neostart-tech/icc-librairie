<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

      <div class="text-center mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">
          Inscription
        </h1>
        <p class="text-sm text-gray-500 mt-1">
          Crée ton compte en quelques secondes
        </p>
      </div>

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
          <label class="text-sm text-gray-600">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
                   focus:ring-2 focus:ring-[#6a0d5f] focus:border-[#6a0d5f]"
            required
          />
        </div>

        <div>
          <label class="text-sm text-gray-600">Confirmer le mot de passe</label>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="••••••••"
            class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
                   focus:ring-2 focus:ring-[#6a0d5f] focus:border-[#6a0d5f]"
            required
          />
        </div>

        <button
          class="w-full bg-[#6a0d5f] text-white py-3 rounded-lg font-medium
                 hover:opacity-90 transition"
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
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleRegister = () => {
  if (password.value !== confirmPassword.value) {
    alert('Les mots de passe ne correspondent pas')
    return
  }

  console.log('Compte créé:', {
    name: name.value,
    email: email.value
  })

  // Redirection vers dashboard
  router.push('/dashboard')
}
</script>
