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
        <img src="/logo/logo_librairie(1).png" class="h-14 w-auto mx-auto mb-6" alt="Logo" />
        <h1 class="text-2xl font-bold text-gray-900">Réinitialisation</h1>
        <p class="text-gray-400 text-sm mt-2">Choisissez votre nouveau mot de passe.</p>
      </div>

      <form @submit.prevent="handleResetPassword" class="space-y-5">
        <!-- Email (Read only) -->
        <div class="space-y-1.5 opacity-60">
          <label class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</label>
          <input :value="email" type="email" readonly
            class="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-500 text-sm outline-none cursor-not-allowed" />
        </div>

        <!-- Nouveau Password -->
        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Nouveau mot de passe</label>
          <div class="relative">
            <input v-model="password" :type="showPass ? 'text' : 'password'" placeholder="••••••••"
              class="w-full bg-gray-50 border border-gray-200 focus:border-[#6a0d5f] focus:bg-white rounded-xl px-4 py-3.5 text-gray-900 text-sm outline-none transition-all pr-12"
              required />
            <button type="button" @click="showPass = !showPass"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <UIcon :name="showPass ? 'i-lucide-eye-off' : 'i-lucide-eye'" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Confirmation Password -->
        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Confirmer le mot de passe</label>
          <input v-model="password_confirmation" :type="showPass ? 'text' : 'password'" placeholder="••••••••"
            class="w-full bg-gray-50 border border-gray-200 focus:border-[#6a0d5f] focus:bg-white rounded-xl px-4 py-3.5 text-gray-900 text-sm outline-none transition-all"
            required />
        </div>

        <button type="submit" :disabled="loading"
          class="w-full bg-[#6a0d5f] hover:bg-[#7e1073] text-white py-3.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg shadow-[#6a0d5f]/30 disabled:opacity-60 flex items-center justify-center gap-2 mt-4">
          <svg v-if="loading" class="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none">
            </circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
          <span v-else>Réinitialiser</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();

const email = ref("");
const token = ref("");
const password = ref("");
const password_confirmation = ref("");
const loading = ref(false);
const showPass = ref(false);

onMounted(() => {
  email.value = route.query.email as string || "";
  token.value = route.query.token as string || "";

  if (!token.value || !email.value) {
    Swal.fire({
      title: 'Lien invalide',
      text: 'Le lien de réinitialisation est incomplet ou expiré.',
      icon: 'warning',
      confirmButtonColor: '#6a0d5f',
    }).then(() => {
      router.push('/connexion');
    });
  }
});

const handleResetPassword = async () => {
  if (password.value !== password_confirmation.value) {
    Swal.fire({
      title: 'Attention',
      text: 'Les mots de passe ne correspondent pas.',
      icon: 'warning',
      confirmButtonColor: '#6a0d5f',
    });
    return;
  }

  loading.value = true;
  try {
    await $fetch(`${config.public.apiBase}/user/reset-password`, {
      method: 'POST',
      body: {
        email: email.value,
        token: token.value,
        password: password.value,
        password_confirmation: password_confirmation.value
      }
    });

    Swal.fire({
      title: 'Succès !',
      text: 'Votre mot de passe a été modifié avec succès. Vous pouvez maintenant vous connecter.',
      icon: 'success',
      confirmButtonColor: '#6a0d5f',
    }).then(() => {
      router.push('/connexion');
    });
  } catch (e: any) {
    Swal.fire({
      title: 'Erreur',
      text: e.data?.message || "Le lien est invalide ou a déjà été utilisé.",
      icon: 'error',
      confirmButtonColor: '#6a0d5f',
    });
  } finally {
    loading.value = false;
  }
};
</script>
