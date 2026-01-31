<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">Connexion</h1>
        <p class="text-sm text-gray-500 mt-1">Accède à ton espace personnel</p>
      </div>

      <form class="space-y-5" @submit.prevent="handleLogin">
        <div>
          <label class="text-sm text-gray-600">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="email@example.com"
            class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-[#6a0d5f] focus:border-[#6a0d5f]"
            required
          />
        </div>

        <div>
          <label class="text-sm text-gray-600">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-[#6a0d5f] focus:border-[#6a0d5f]"
            required
          />
        </div>

        <!-- Erreur -->
        <p v-if="error" class="text-sm text-red-600 text-center">
          {{ error }}
        </p>

        <button
          :disabled="auth.loading"
          class="w-full bg-[#6a0d5f] text-white py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-60"
        >
          {{ auth.loading ? "Connexion..." : "Se connecter" }}
        </button>
      </form>

      <p class="text-center text-sm text-gray-600 mt-6">
        Pas encore de compte ?
        <NuxtLink
          to="/inscription"
          class="font-medium text-[#6a0d5f] hover:underline"
        >
          Inscription
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "~~/stores/auth";

const auth = useAuthStore();
const route = useRoute();
const email = ref("");
const password = ref("");
const error = ref("");

const handleLogin = async () => {
  error.value = "";

  try {
    await auth.login(email.value, password.value);

    const redirect = route.query.redirect as string;
    navigateTo(redirect || "/");
  } catch (e: any) {
    error.value = e.message;
  }
};
</script>
