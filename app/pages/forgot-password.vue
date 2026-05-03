<template>
  <div class="relative min-h-screen flex items-center justify-center px-4 py-8 overflow-hidden">
    <!-- Image de fond -->
    <img
      src="/images/a-propos/img1.jpg"
      alt="Background"
      class="absolute inset-0 w-full h-full object-cover object-center scale-105"
    />
    <!-- Overlay dégradé violet -->
    <div class="absolute inset-0 bg-gradient-to-b from-[#6a0d5f]/80 via-[#6a0d5f]/60 to-[#3a0532]/90"></div>

    <div v-reveal class="relative z-10 w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl p-8 md:p-10">

      <div class="mb-8 text-center">
        <NuxtLink to="/connexion">
          <img src="/logo/logo_librairie(1).png" class="h-14 w-auto mx-auto mb-6" alt="Logo" />
        </NuxtLink>
        <h1 class="text-2xl font-bold text-gray-900">Mot de passe oublié</h1>
        <p class="text-gray-400 text-sm mt-2">Entrez votre adresse email pour recevoir un lien de réinitialisation.</p>
      </div>

      <form v-if="!sent" @submit.prevent="handleForgotPassword" class="space-y-6">
        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</label>
          <input v-model="email" type="email" placeholder="votre@email.com"
            class="w-full bg-gray-50 border border-gray-200 focus:border-[#6a0d5f] focus:bg-white rounded-xl px-4 py-3.5 text-gray-900 text-sm outline-none transition-all placeholder:text-gray-300"
            required />
        </div>

        <button type="submit" :disabled="loading"
          class="w-full bg-[#6a0d5f] hover:bg-[#7e1073] text-white py-3.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg shadow-[#6a0d5f]/30 disabled:opacity-60 flex items-center justify-center gap-2">
          <svg v-if="loading" class="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none">
            </circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
          <span v-else>Envoyer le lien</span>
        </button>
      </form>

      <div v-else class="text-center space-y-6 py-4">
        <div class="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <UIcon name="i-lucide-check-circle-2" class="w-10 h-10" />
        </div>
        <div class="space-y-2">
          <h3 class="text-xl font-bold text-gray-900">Email envoyé !</h3>
          <p class="text-gray-500 text-sm px-4">Si un compte existe pour <strong>{{ email }}</strong>, vous recevrez un
            lien de réinitialisation d'ici quelques instants.</p>
        </div>
        <NuxtLink to="/connexion" class="inline-block text-[#6a0d5f] font-bold text-sm hover:underline">
          Retour à la connexion
        </NuxtLink>
      </div>

      <div v-if="!sent" class="mt-8 text-center border-t border-gray-100 pt-6">
        <NuxtLink to="/connexion"
          class="text-gray-400 text-sm hover:text-[#6a0d5f] transition-colors flex items-center justify-center gap-2">
          <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
          Retour à la connexion
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Swal from 'sweetalert2';

const email = ref("");
const loading = ref(false);
const sent = ref(false);
const config = useRuntimeConfig();

const handleForgotPassword = async () => {
  loading.value = true;
  try {
    const response: any = await $fetch(`${config.public.apiBase}/user/forgot-password`, {
      method: 'POST',
      body: { email: email.value }
    });

    sent.value = true;

    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Lien envoyé !',
      text: 'Veuillez vérifier votre boîte mail.',
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
    });
  } catch (e: any) {
    Swal.fire({
      title: 'Erreur',
      text: e.data?.message || "Impossible d'envoyer le lien. Veuillez vérifier l'adresse email.",
      icon: 'error',
      confirmButtonColor: '#6a0d5f',
    });
  } finally {
    loading.value = false;
  }
};

definePageMeta({
});
</script>
