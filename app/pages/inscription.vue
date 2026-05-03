<template>
  <div class="relative min-h-screen flex items-center justify-center px-4 py-10 overflow-hidden">
    <!-- Image de fond -->
    <img
      src="/images/a-propos/img1.jpg"
      alt="Background"
      class="absolute inset-0 w-full h-full object-cover object-center scale-105"
    />
    <!-- Overlay dégradé violet -->
    <div class="absolute inset-0 bg-gradient-to-b from-[#6a0d5f]/80 via-[#6a0d5f]/60 to-[#3a0532]/90"></div>

    <!-- Card principale split-screen -->
    <div v-reveal class="relative z-10 w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">

      <!-- ========== PANNEAU GAUCHE ========== -->
      <div class="hidden md:flex w-[40%] bg-[#6a0d5f] flex-col justify-between p-12 relative overflow-hidden"
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
            <p class="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">Rejoignez-nous</p>
            <h2 class="text-3xl font-bold text-white leading-snug">
              Librairie <br/><span class="text-white/80">ICC-Togo</span>
            </h2>
            <p class="mt-3 text-white/60 text-sm leading-relaxed">
              Créez votre compte et accédez à des milliers d'ouvrages chrétiens.
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
          <img src="/logo/logo_librairie(1).png" class="h-12 w-auto mx-auto" alt="Logo" />
        </div>

        <div class="mb-7">
          <h1 class="text-2xl font-bold text-gray-900">Créer un compte</h1>
          <p class="text-gray-400 text-sm mt-1">Remplissez les informations ci-dessous</p>
        </div>

        <form @submit.prevent="handleRegister" class="grid grid-cols-1 md:grid-cols-2 gap-4">

          <!-- Nom -->
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Nom</label>
            <input v-model="name" type="text" placeholder="Ex: DOSSEH"
              class="w-full bg-gray-50 border border-gray-200 focus:border-[#6a0d5f] focus:bg-white rounded-xl px-4 py-3.5 text-gray-900 text-sm outline-none transition-all placeholder:text-gray-300"
              required />
          </div>

          <!-- Prénom -->
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Prénom</label>
            <input v-model="firstName" type="text" placeholder="Ex: Jean"
              class="w-full bg-gray-50 border border-gray-200 focus:border-[#6a0d5f] focus:bg-white rounded-xl px-4 py-3.5 text-gray-900 text-sm outline-none transition-all placeholder:text-gray-300"
              required />
          </div>

          <!-- Email -->
          <div class="space-y-1.5 md:col-span-2">
            <label class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</label>
            <input v-model="email" type="email" placeholder="votre@email.com"
              class="w-full bg-gray-50 border border-gray-200 focus:border-[#6a0d5f] focus:bg-white rounded-xl px-4 py-3.5 text-gray-900 text-sm outline-none transition-all placeholder:text-gray-300"
              required />
          </div>

          <!-- Téléphone -->
          <div class="space-y-1.5 md:col-span-2">
            <label class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Téléphone <span class="normal-case font-normal text-gray-300">(optionnel)</span></label>
            <div class="flex gap-2">
              <select v-model="selectedCountryCode" class="w-1/3 bg-gray-50 border border-gray-200 focus:border-[#6a0d5f] focus:bg-white rounded-xl px-2 py-3.5 text-gray-900 text-sm outline-none transition-all">
                <option v-for="country in countries" :key="country.code" :value="country.dialCode">
                  {{ country.flag }} {{ country.dialCode }} ({{ country.name }})
                </option>
              </select>
              <input v-model="phoneInput" type="tel" placeholder="Numéro"
                class="w-2/3 bg-gray-50 border border-gray-200 focus:border-[#6a0d5f] focus:bg-white rounded-xl px-4 py-3.5 text-gray-900 text-sm outline-none transition-all placeholder:text-gray-300" />
            </div>
          </div>

          <!-- Mot de passe -->
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Mot de passe</label>
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

          <!-- Confirmation mot de passe -->
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Confirmation</label>
            <div class="relative">
              <input v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" placeholder="••••••••"
                class="w-full bg-gray-50 border border-gray-200 focus:border-[#6a0d5f] focus:bg-white rounded-xl px-4 py-3.5 text-gray-900 text-sm outline-none transition-all placeholder:text-gray-300 pr-12"
                required />
              <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#6a0d5f]">
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

          <!-- Bouton submit -->
          <div class="md:col-span-2 pt-2">
            <button type="submit" :disabled="auth.loading"
              class="w-full bg-[#6a0d5f] hover:bg-[#7e1073] text-white py-3.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg shadow-[#6a0d5f]/30 disabled:opacity-60 flex items-center justify-center gap-2">
              <span v-if="auth.loading">Traitement en cours...</span>
              <span v-else>Créer mon compte</span>
            </button>
          </div>
        </form>

        <!-- Lien connexion + ICC -->
        <div class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
          <p class="text-sm text-gray-400">
            Déjà membre ?
            <NuxtLink to="/connexion" class="text-[#6a0d5f] font-semibold hover:underline ml-1">Se connecter</NuxtLink>
          </p>
          <NuxtLink :to="{ path: '/ConnexionIcc', query: route.query.redirect ? { redirect: route.query.redirect } : {} }"
            class="flex items-center gap-2 text-xs text-gray-400 hover:text-[#6a0d5f] transition-colors font-medium">
            <img src="/logo/logo_librairie(1).png" class="h-4 w-auto grayscale opacity-40" alt="" />
            Connexion ICC Covoiturage
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "~~/stores/auth";
import { useRoute, useRouter } from "vue-router";
import Swal from 'sweetalert2';

definePageMeta({ middleware: 'guest' });

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const name = ref("");
const firstName = ref("");
const email = ref("");
const phoneInput = ref("");
const selectedCountryCode = ref("+228");
const countries = ref<any[]>([]);

const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);

onMounted(async () => {
  try {
    const res = await fetch('https://restcountries.com/v3.1/all?fields=name,idd,flag,cca2');
    const data = await res.json();
    countries.value = data
      .filter((c: any) => c.idd && c.idd.root)
      .flatMap((c: any) => {
        if (!c.idd.suffixes || c.idd.suffixes.length === 0 || c.idd.suffixes.length > 1) {
          return [{ name: c.name.common, code: c.cca2, dialCode: c.idd.root, flag: c.flag }];
        }
        return [{ name: c.name.common, code: c.cca2, dialCode: c.idd.root + c.idd.suffixes[0], flag: c.flag }];
      })
      .sort((a: any, b: any) => a.name.localeCompare(b.name));
  } catch (err) {
    console.error('Erreur chargement pays', err);
  }
});

const features = [
  { icon: 'i-lucide-book-open', label: 'Catalogue de livres chrétiens' },
  { icon: 'i-lucide-shopping-cart', label: 'Commandes simplifiées' },
  { icon: 'i-lucide-sparkles', label: 'Offres et promotions exclusives' },
];

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    Swal.fire({
      title: 'Attention',
      text: 'Les mots de passe ne sont pas identiques.',
      icon: 'warning',
      confirmButtonColor: '#6a0d5f',
      customClass: { popup: 'rounded-xl' }
    });
    return;
  }

  try {
    const finalPhone = phoneInput.value ? `${selectedCountryCode.value}${phoneInput.value.replace(/^0+/, '')}` : null;

    await auth.register({
      nom: name.value,
      prenom: firstName.value,
      email: email.value,
      telephone: finalPhone,
      password: password.value,
    });

    const redirect = typeof route.query.redirect === "string" ? route.query.redirect : "/";
    router.push(redirect);

    Swal.fire({
      title: 'Bienvenue !',
      text: 'Votre compte a été créé avec succès.',
      icon: 'success',
      confirmButtonColor: '#6a0d5f',
      customClass: { popup: 'rounded-xl' }
    });
  } catch (err: any) {
    Swal.fire({
      title: 'Erreur',
      text: err?.message || "Une erreur est survenue lors de l'inscription.",
      icon: 'error',
      confirmButtonColor: '#6a0d5f',
      customClass: { popup: 'rounded-xl' }
    });
  }
};
</script>

<style scoped></style>
