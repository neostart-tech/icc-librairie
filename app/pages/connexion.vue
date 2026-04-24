<template>
  <div class="min-h-screen flex items-center justify-center bg-[#6a0d5f] px-4 py-8" style="background-image: radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px); background-size: 28px 28px;">
    
    <!-- Card principale split-screen -->
    <div v-reveal class="w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[580px]">

      <!-- ========== PANNEAU GAUCHE ========== -->
      <div class="hidden md:flex w-[45%] bg-[#6a0d5f] flex-col justify-between p-12 relative overflow-hidden"
           style="background-image: radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px); background-size: 22px 22px;">
        
        <!-- Blob déco -->
        <div class="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>

        <!-- Logo -->
        <NuxtLink to="/" class="relative z-10">
          <img src="/logo/logo_librairie(1).png" class="h-14 w-auto brightness-0 invert" alt="Logo Librairie ICC" />
        </NuxtLink>

        <!-- Texte central -->
        <div class="relative z-10 space-y-6">
          <div>
            <p class="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">Bienvenue sur</p>
            <h2 class="text-3xl font-bold text-white leading-snug">
              Librairie <br/><span class="text-white/80">ICC-Togo</span>
            </h2>
            <p class="mt-3 text-white/60 text-sm leading-relaxed">
              Accédez à votre espace personnel, découvrez notre catalogue et suivez vos commandes.
            </p>
          </div>

          <!-- Features -->
          <div class="space-y-3 pt-2">
            <div v-for="(item, i) in features" :key="i" class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                <UIcon :name="item.icon" class="text-white w-5 h-5" />
              </div>
              <span class="text-white/80 text-sm font-medium">{{ item.label }}</span>
            </div>
          </div>
        </div>

        <!-- Footer texte -->
        <p class="relative z-10 text-white/30 text-[10px] font-bold uppercase tracking-widest">
          ICC-Togo · Votre librairie chrétienne
        </p>
      </div>

      <!-- ========== PANNEAU DROIT ========== -->
      <div class="flex-1 flex flex-col justify-center p-8 md:p-12">

        <!-- Mobile : logo -->
        <div class="md:hidden mb-8 text-center">
          <img src="/logo/logo_librairie(1).png" class="h-12 w-auto mx-auto" style="filter: hue-rotate(0deg)" alt="Logo" />
        </div>

        <div class="mb-8">
          <h1 class="text-2xl font-bold text-gray-900">Connexion</h1>
          <p class="text-gray-400 text-sm mt-1">Entrez vos identifiants pour continuer</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Email -->
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</label>
            <input v-model="email" type="email" placeholder="votre@email.com"
              class="w-full bg-gray-50 border border-gray-200 focus:border-[#6a0d5f] focus:bg-white rounded-xl px-4 py-3.5 text-gray-900 text-sm outline-none transition-all placeholder:text-gray-300"
              required />
          </div>

          <!-- Mot de passe -->
          <div class="space-y-1.5">
            <div class="flex justify-between items-center">
              <label class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Mot de passe</label>
              <NuxtLink to="/forgot-password" class="text-xs font-semibold text-[#6a0d5f] hover:underline">Oublié ?</NuxtLink>
            </div>
            <div class="relative">
              <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••"
                class="w-full bg-gray-50 border border-gray-200 focus:border-[#6a0d5f] focus:bg-white rounded-xl px-4 py-3.5 text-gray-900 text-sm outline-none transition-all placeholder:text-gray-300 pr-12"
                required />
              <button type="button" @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#6a0d5f]">
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

          <!-- Bouton principal -->
          <button type="submit" :disabled="auth.loading"
            class="w-full bg-[#6a0d5f] hover:bg-[#7e1073] text-white py-3.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg shadow-[#6a0d5f]/30 disabled:opacity-60 flex items-center justify-center gap-2 mt-2">
            <svg v-if="auth.loading" class="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span v-else>Me connecter</span>
          </button>
        </form>

        <!-- Séparateur -->
        <div class="my-6 flex items-center gap-3">
          <div class="flex-1 h-px bg-gray-100"></div>
          <span class="text-xs text-gray-300 font-medium">OU</span>
          <div class="flex-1 h-px bg-gray-100"></div>
        </div>

        <!-- Bouton ICC Covoiturage -->
        <NuxtLink to="/ConnexionIcc"
          class="w-full flex items-center justify-center gap-3 border border-gray-200 hover:border-[#6a0d5f] hover:bg-[#6a0d5f]/5 text-gray-500 hover:text-[#6a0d5f] py-3.5 rounded-xl font-semibold text-sm transition-all">
          <img src="/logo/logo_librairie(1).png" class="h-5 w-auto grayscale opacity-40" alt="" />
          Connexion avec compte ICC Covoiturage
        </NuxtLink>

        <!-- Lien inscription -->
        <p class="mt-6 text-center text-sm text-gray-400">
          Pas encore de compte ?
          <NuxtLink to="/inscription" class="text-[#6a0d5f] font-semibold hover:underline ml-1">Créer un compte</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~~/stores/auth";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from 'sweetalert2';

const router = useRouter();
const auth = useAuthStore();
const route = useRoute();
const email = ref("");
const password = ref("");
const showPassword = ref(false);

const features = [
  { icon: 'i-lucide-book-open', label: 'Catalogue de livres chrétiens' },
  { icon: 'i-lucide-shopping-cart', label: 'Commandes simplifiées' },
  { icon: 'i-lucide-sparkles', label: 'Offres et promotions exclusives' },
];

const handleLogin = async () => {
  try {
    await auth.login(email.value, password.value);

    const redirect =
      typeof route.query.redirect === "string"
        ? route.query.redirect
        : "/";

    router.push(redirect);

    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Heureux de vous revoir !',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      customClass: {
        popup: 'rounded-xl border-l-4 border-green-500 shadow-xl'
      }
    });

  } catch (e: any) {
    Swal.fire({
      title: 'Erreur de connexion',
      text: e.message || "Identifiants incorrects. Veuillez réessayer.",
      icon: 'error',
      confirmButtonColor: '#6a0d5f',
      customClass: {
        popup: 'rounded-xl',
        confirmButton: 'rounded-xl font-bold px-8 py-3 text-sm'
      }
    });
  }
};
</script>

<style scoped></style>
