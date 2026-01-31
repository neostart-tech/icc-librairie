<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

      <div class="text-center mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">
          Connexion
        </h1>
        <p class="text-sm text-gray-500 mt-1">
          Accède à ton espace personnel
        </p>
      </div>

      <form class="space-y-5" @submit.prevent="handleLogin">
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

        <div class="flex justify-between items-center text-sm">
          <label class="flex items-center gap-2 text-gray-600">
            <input type="checkbox" class="rounded border-gray-300">
            Se souvenir de moi
          </label>
          <a href="#" class="text-[#6a0d5f] hover:underline">
            Mot de passe oublié ?
          </a>

        </div>

        <button
          class="w-full bg-[#6a0d5f] text-white py-3 rounded-lg font-medium
                 hover:opacity-90 transition"
        >
          Se connecter
        </button>
      </form>

      <p class="text-center text-sm text-gray-600 mt-6">
        Pas encore de compte ?
        <NuxtLink to="/inscription" class="font-medium text-[#6a0d5f] hover:underline">
          Inscription
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')

const handleLogin = () => {
  // 👉 Ici plus tard : appel API connexion
  console.log('Connexion:', email.value)

  router.push('/dashboard')
}
</script>
