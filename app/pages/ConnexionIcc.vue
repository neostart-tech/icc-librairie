<template>
  <div class="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">
    <!-- Background: Specialized ecosystem feel -->
    <div class="absolute inset-0 z-0">
      <img src="/images/auth_background.png" class="w-full h-full object-cover scale-150 rotate-12 blur-sm opacity-50" alt="Background" />
      <div class="absolute inset-0 bg-[#4a0942]/95 backdrop-blur-md"></div>
    </div>

    <!-- Cosmic Decorative Elements -->
    <div class="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#6a0d5f]/30 rounded-full blur-[150px] animate-pulse"></div>
    <div class="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px]"></div>

    <!-- Login Card -->
    <div v-reveal class="relative z-10 w-full max-w-lg">
      <div class="text-center mb-12">
        <NuxtLink to="/" class="inline-block mb-8 group">
          <div class="p-4 bg-white/10 rounded-3xl backdrop-blur-xl border border-white/20 group-hover:bg-white/20 transition-all duration-500">
            <img src="/logo/logo_librairie(1).png" class="h-16 w-auto brightness-0 invert" alt="ICC Global" />
          </div>
        </NuxtLink>
        <h1 class="text-3xl font-black text-white uppercase italic tracking-tighter">ICC-Covoiturage Connect</h1>
        <p class="text-white/50 text-xs font-bold uppercase tracking-[0.4em] mt-3">Votre porte d'entrée universelle</p>
      </div>

      <div class="bg-white rounded-[3rem] shadow-2xl p-10 md:p-14 border border-white/20 relative">
        <div class="absolute -top-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-orange-400 text-[#6a0d5f] rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
           Identification Unique
        </div>

        <form @submit.prevent="handleLogin" class="space-y-8 mt-4">
          <!-- EMAIL -->
          <div class="space-y-2">
            <label class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Email ICC-Covoiturage</label>
            <input
              v-model="email"
              type="email"
              placeholder="votre@email-icc.com"
              class="w-full bg-gray-50 border-2 border-gray-100 focus:border-[#6a0d5f] focus:bg-white rounded-2xl px-6 py-4 text-gray-900 font-bold outline-none transition-all placeholder:text-gray-300"
              required
            />
          </div>

          <!-- MOT DE PASSE -->
          <div class="space-y-2">
            <div class="flex justify-between items-end mr-1">
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Mot de passe</label>
            </div>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="w-full bg-gray-50 border-2 border-gray-100 focus:border-[#6a0d5f] focus:bg-white rounded-2xl px-6 py-4 text-gray-900 font-bold outline-none transition-all placeholder:text-gray-300"
                required
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#6a0d5f] transition-colors"
              >
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke-width="2" /></svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.96 9.96 0 012.219-3.423m1.43-1.1A9.963 9.963 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.05 10.05 0 01-1.481 2.563M15 12a3 3 0 11-6 0 3 3 0 016 0zM3 3l18 18" stroke-width="2" /></svg>
              </button>
            </div>
          </div>

          <button
            :disabled="auth.loading"
            class="w-full relative group bg-[#6a0d5f] text-white py-6 rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-[#6a0d5f]/30 hover:bg-[#851178] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-60 overflow-hidden"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span v-if="auth.loading">Authentification en cours...</span>
            <span v-else>Se connecter via ICC-Covoiturage</span>
          </button>
        </form>

        <div class="mt-12 text-center">
            <NuxtLink to="/connexion" class="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-[#6a0d5f] transition-colors">
              <svg class="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Retour à la connexion classique
            </NuxtLink>
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
      title: 'Connexion ICC Global réussie !',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      customClass: { popup: 'rounded-2xl border-l-4 border-purple-500 shadow-xl' }
    });
  } catch (e: any) {
    Swal.fire({
      title: 'Erreur ICC Global',
      text: e.message || "Impossible de vous authentifier via ICC Global. Vérifiez vos accès.",
      icon: 'error',
      confirmButtonColor: '#6a0d5f',
      customClass: { popup: 'rounded-[2.5rem]' }
    });
  }
};
</script>

