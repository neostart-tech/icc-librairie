<template>
  <div class="min-h-screen relative flex items-center justify-center px-4 bg-[#f8f9fa] py-12">
    <!-- Background subtle pattern -->
    <div class="absolute inset-0 z-0 opacity-40 pointer-events-none">
      <div class="absolute inset-0 bg-gradient-to-br from-[#6a0d5f]/5 to-transparent"></div>
      <div class="w-full h-full" style="background-image: radial-gradient(#6a0d5f 0.5px, transparent 0.5px); background-size: 24px 24px;"></div>
    </div>

    <!-- Register Card -->
    <div v-reveal class="relative z-10 w-full max-w-5xl">
      <div
        class="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden border border-gray-100 flex flex-col md:flex-row min-h-[700px]">
        
        <!-- Côté Gauche: Branding & Info (Desktop only) -->
        <div class="hidden md:flex w-[35%] bg-[#6a0d5f] relative overflow-hidden flex-col justify-between p-12 text-white">
          <!-- Background Decoration -->
          <div class="absolute top-0 left-0 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl -ml-32 -mt-32"></div>
          <div class="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl -mr-24 -mb-24"></div>
          
          <div class="relative z-10 text-center md:text-left">
            <NuxtLink to="/">
              <img src="/logo/logo_librairie(1).png" class="h-16 w-auto brightness-0 invert mx-auto md:mx-0" alt="Logo" />
            </NuxtLink>
          </div>

          <div class="relative z-10 space-y-8">
            <div class="space-y-4">
              <h2 class="text-4xl font-bold leading-tight">
                Commencez votre <span class="text-orange-400 italic">voyage</span>
              </h2>
              <p class="text-white/70 text-sm leading-relaxed font-medium">
                Créez votre compte pour accéder à des milliers d'ouvrages et profiter d'une expérience personnalisée.
              </p>
            </div>

            <div class="space-y-4 pt-4">
              <div v-for="(item, i) in ['Accès illimité', 'Suivi de commandes', 'Offres exclusives']" :key="i"
                class="flex items-center gap-3">
                <div class="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                  <svg class="w-3.5 h-3.5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <span class="text-xs font-bold uppercase tracking-widest text-white/80">{{ item }}</span>
              </div>
            </div>
          </div>

          <!-- Decorative dots grid -->
          <div class="absolute bottom-10 left-10 opacity-20 pointer-events-none">
            <div class="grid grid-cols-4 gap-2">
              <div v-for="i in 16" :key="i" class="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        <!-- Côté Droit: Form -->
        <div class="flex-1 p-8 md:p-14 flex flex-col justify-center">
          <div class="mb-10 text-center md:text-left">
            <h1 class="text-3xl font-bold text-gray-900">Inscription</h1>
            <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-2">Créez votre compte en quelques secondes</p>
            <div class="h-1.5 w-12 bg-orange-400 rounded-full mt-4 mx-auto md:mx-0"></div>
          </div>

          <form @submit.prevent="handleRegister" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Nom -->
            <div class="space-y-1">
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Nom</label>
              <input v-model="name" type="text" placeholder="Ex: DOSSEH"
                class="w-full bg-gray-50 border-2 border-transparent focus:border-[#6a0d5f] focus:bg-white rounded-2xl px-6 py-4 text-gray-900 font-bold outline-none transition-all placeholder:text-gray-300 text-sm"
                required />
            </div>

            <!-- Prénom -->
            <div class="space-y-1">
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Prénom</label>
              <input v-model="firstName" type="text" placeholder="Ex: Jean"
                class="w-full bg-gray-50 border-2 border-transparent focus:border-[#6a0d5f] focus:bg-white rounded-2xl px-6 py-4 text-gray-900 font-bold outline-none transition-all placeholder:text-gray-300 text-sm"
                required />
            </div>

            <!-- Email -->
            <div class="space-y-1 md:col-span-2">
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Email</label>
              <input v-model="email" type="email" placeholder="votre@email.com"
                class="w-full bg-gray-50 border-2 border-transparent focus:border-[#6a0d5f] focus:bg-white rounded-2xl px-6 py-4 text-gray-900 font-bold outline-none transition-all placeholder:text-gray-300 text-sm"
                required />
            </div>

            <!-- Téléphone -->
            <div class="space-y-1 md:col-span-2">
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Téléphone (Optionnel)</label>
              <input v-model="telephone" type="tel" placeholder="+228 XX XX XX XX"
                class="w-full bg-gray-50 border-2 border-transparent focus:border-[#6a0d5f] focus:bg-white rounded-2xl px-6 py-4 text-gray-900 font-bold outline-none transition-all placeholder:text-gray-300 text-sm" />
            </div>

            <!-- Password -->
            <div class="space-y-1">
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Mot de passe</label>
              <div class="relative">
                <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••"
                  class="w-full bg-gray-50 border-2 border-transparent focus:border-[#6a0d5f] focus:bg-white rounded-2xl px-6 py-4 text-gray-900 font-bold outline-none transition-all placeholder:text-gray-300 text-sm pr-12"
                  required />
                <button type="button" @click="showPassword = !showPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#6a0d5f]">
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

            <!-- Confirm Password -->
            <div class="space-y-1">
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Confirmation</label>
              <div class="relative">
                <input v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" placeholder="••••••••"
                  class="w-full bg-gray-50 border-2 border-transparent focus:border-[#6a0d5f] focus:bg-white rounded-2xl px-6 py-4 text-gray-900 font-bold outline-none transition-all placeholder:text-gray-300 text-sm pr-12"
                  required />
                <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#6a0d5f]">
                  <svg v-if="!showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

            <!-- Submit Button -->
            <div class="md:col-span-2 pt-4">
              <button type="submit" :disabled="auth.loading"
                class="w-full relative group bg-[#6a0d5f] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-[#6a0d5f]/20 hover:bg-[#851178] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-60 overflow-hidden flex items-center justify-center gap-2">
                <span v-if="auth.loading">Traitement en cours...</span>
                <span v-else>Créer mon compte</span>
              </button>
            </div>
          </form>

          <footer class="mt-10 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p class="text-[11px] font-black text-gray-400 uppercase tracking-widest text-center sm:text-left">
              Déjà membre ?
              <NuxtLink to="/connexion" class="text-[#6a0d5f] hover:text-orange-500 transition-colors ml-1 underline underline-offset-4 decoration-2">
                Connectez-vous</NuxtLink>
            </p>

            <div class="flex items-center gap-4">
              <p class="text-[9px] font-black text-gray-300 uppercase tracking-widest">Compte ICC-Covoiturage :</p>
              <NuxtLink to="/ConnexionIcc" class="p-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                <img src="/logo/logo_librairie(1).png" class="h-5 w-auto grayscale opacity-50" alt="ICC" />
              </NuxtLink>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "~~/stores/auth";
import { useRoute, useRouter } from "vue-router";
import Swal from 'sweetalert2';

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const name = ref("");
const firstName = ref("");
const email = ref("");
const telephone = ref("");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    Swal.fire({
      title: 'Attention',
      text: 'Les mots de passe ne sont pas identiques.',
      icon: 'warning',
      confirmButtonColor: '#6a0d5f',
      customClass: { popup: 'rounded-[2rem]' }
    });
    return;
  }

  try {
    await auth.register({
      nom: name.value,
      prenom: firstName.value,
      email: email.value,
      telephone: telephone.value || null,
      password: password.value,
    });

    const redirect = typeof route.query.redirect === "string" ? route.query.redirect : "/";
    router.push(redirect);

    Swal.fire({
      title: 'Bienvenue !',
      text: 'Votre compte a été créé avec succès.',
      icon: 'success',
      confirmButtonColor: '#6a0d5f',
      customClass: { popup: 'rounded-[2.5rem]' }
    });
  } catch (err: any) {
    Swal.fire({
      title: 'Erreur',
      text: err?.message || "Une erreur est survenue lors de l'inscription.",
      icon: 'error',
      confirmButtonColor: '#6a0d5f',
      customClass: { popup: 'rounded-[2rem]' }
    });
  }
};
</script>

<style scoped>
</style>
