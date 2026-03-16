<template>
  <div class="min-h-screen relative flex items-center justify-center px-4 bg-[#f8f9fa] py-12">
    <!-- Background subtle pattern -->
    <div class="absolute inset-0 z-0 opacity-40 pointer-events-none">
      <div class="absolute inset-0 bg-gradient-to-br from-[#4a0942]/5 to-transparent"></div>
      <div class="w-full h-full" style="background-image: radial-gradient(#4a0942 0.5px, transparent 0.5px); background-size: 24px 24px;"></div>
    </div>

    <!-- Login Card -->
    <div v-reveal class="relative z-10 w-full max-w-4xl">
      <div
        class="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden border border-gray-100 flex flex-col md:flex-row min-h-[600px] relative">
        
        <!-- Top accent line (on top of card) -->
        <div class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#6a0d5f] via-orange-400 to-[#4a0942] z-20"></div>

        <!-- Côté Gauche: Branding & Image (Desktop only) -->
        <div class="hidden md:flex w-2/5 bg-[#4a0942] relative overflow-hidden flex-col justify-between p-12 text-white">
          <!-- Background Decoration -->
          <div class="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -ml-32 -mt-32"></div>
          <div class="absolute bottom-0 right-0 w-48 h-48 bg-[#6a0d5f]/30 rounded-full blur-2xl -mr-24 -mb-24"></div>
          
          <div class="relative z-10 text-center">
            <NuxtLink to="/">
              <div class="inline-block p-4 bg-white/10 rounded-[2rem] backdrop-blur-md border border-white/10">
                <img src="/logo/logo_librairie(1).png" class="h-16 w-auto brightness-0 invert" alt="ICC Global" />
              </div>
            </NuxtLink>
          </div>

          <div class="relative z-10 space-y-6">
            <h2 class="text-3xl font-bold leading-tight uppercase tracking-tight">
              Connexion <br/> ICC-Global
            </h2>
            <div class="h-1 w-12 bg-orange-400 rounded-full"></div>
            <p class="text-white/60 text-xs leading-relaxed font-bold uppercase tracking-widest">
              Utilisez vos identifiants uniques pour accéder à tout l'écosystème ICC.
            </p>
          </div>

          <div class="relative z-10">
            <p class="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">One Account. Many Possibilities.</p>
          </div>
        </div>

        <!-- Côté Droit: Form -->
        <div class="flex-1 p-8 md:p-14 flex flex-col justify-center">
          <div class="mb-10 text-center md:text-left">
            <h1 class="text-3xl font-bold text-gray-900">ICC-Covoiturage</h1>
            <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-2">Authentification Centralisée</p>
            <div class="h-1.5 w-12 bg-orange-400 rounded-full mt-4 mx-auto md:mx-0"></div>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-6">
            <div class="space-y-1">
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Email ICC</label>
              <input v-model="email" type="email" placeholder="votre@email-icc.com"
                class="w-full bg-gray-50 border-2 border-transparent focus:border-[#6a0d5f] focus:bg-white rounded-2xl px-6 py-4 text-gray-900 font-bold outline-none transition-all placeholder:text-gray-300"
                required />
            </div>

            <div class="space-y-1">
              <div class="flex justify-between items-center ml-1">
                <label class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Mot de passe</label>
              </div>
              <div class="relative">
                <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••"
                  class="w-full bg-gray-50 border-2 border-transparent focus:border-[#6a0d5f] focus:bg-white rounded-2xl px-6 py-4 text-gray-900 font-bold outline-none transition-all placeholder:text-gray-300"
                  required />
                <button type="button" @click="showPassword = !showPassword"
                  class="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#6a0d5f]">
                  <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-width="2" />
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke-width="2" />
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.96 9.96 0 012.219-3.423m1.43-1.1A9.963 9.963 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.05 10.05 0 01-1.481 2.563M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-width="2" />
                    <path d="M3 3l18 18" stroke-width="2" />
                  </svg>
                </button>
              </div>
            </div>

            <button :disabled="auth.loading"
              class="w-full bg-[#4a0942] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-[#4a0942]/20 hover:bg-[#5a0b50] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2">
              <span v-if="auth.loading">Authentification...</span>
              <span v-else>Se connecter</span>
            </button>
          </form>

          <div class="mt-8 text-center">
            <NuxtLink to="/connexion" class="group inline-flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-[#6a0d5f] transition-colors">
              <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Retour
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "~~/stores/auth";
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const email = ref("");
const password = ref("");
const showPassword = ref(false);

const handleLogin = async () => {
  try {
    await auth.loginSSO(email.value, password.value);

    const redirect = typeof route.query.redirect === "string" ? route.query.redirect : "/";
    router.push(redirect);
    
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Connexion ICC réussie !',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      customClass: { popup: 'rounded-2xl border-l-4 border-purple-500 shadow-xl' }
    });
  } catch (e: any) {
    Swal.fire({
      title: 'Erreur ICC',
      text: e.message || "Impossible de vous authentifier. Vérifiez vos accès.",
      icon: 'error',
      confirmButtonColor: '#6a0d5f',
      customClass: { popup: 'rounded-[2.5rem]' }
    });
  }
};
</script>

<style scoped>
</style>
