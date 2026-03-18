<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <!-- Hero Section -->
    <section class="relative bg-[#6a0d5f] pt-24 pb-32 overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-[100px]"></div>
        <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-400 rounded-full blur-[100px]"></div>
      </div>

      <div class="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <span v-reveal
          class="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/80 text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
          Espace Membre
        </span>
        <h1 v-reveal
          class="text-3xl md:text-4xl font-bold text-white uppercase tracking-wide leading-none mb-3">
          Mon <span class="text-orange-400">Profil</span>
        </h1>
        <p v-reveal class="text-white/60 text-xs font-bold uppercase tracking-widest">Gérez vos informations et votre
          sécurité</p>
      </div>
    </section>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-6 -mt-16 relative z-20 space-y-6">
      <!-- Personal Info Card -->
      <section v-reveal class="bg-white rounded-xl shadow-2xl p-6 md:p-8 border border-white">
        <div class="flex items-center justify-between mb-10">
          <div class="flex items-center gap-3">
            <div class="w-12 h-1 text-[#6a0d5f] bg-[#6a0d5f] rounded-full"></div>
            <h2 class="text-xl font-bold text-gray-900 uppercase tracking-wide">Informations Personnelles
            </h2>
          </div>
          <button @click="isEditingPersonal = !isEditingPersonal"
            class="text-[10px] font-black text-[#6a0d5f] uppercase tracking-widest hover:text-orange-500 transition-colors">
            {{ isEditingPersonal ? 'Annuler' : 'Modifier' }}
          </button>
        </div>

        <form v-if="isEditingPersonal" @submit.prevent="updatePersonalInfo" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Prénom</label>
              <input v-model="userData.firstName" type="text"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#6a0d5f] outline-none transition-all font-bold placeholder:text-gray-300"
                required />
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Nom</label>
              <input v-model="userData.lastName" type="text"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#6a0d5f] outline-none transition-all font-bold placeholder:text-gray-300"
                required />
            </div>
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Email</label>
            <input v-model="userData.email" type="email"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#6a0d5f] outline-none transition-all font-bold placeholder:text-gray-300"
              required />
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Téléphone</label>
            <input v-model="userData.phone" type="tel"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#6a0d5f] outline-none transition-all font-bold placeholder:text-gray-300" />
          </div>
          <div class="pt-4">
            <button type="submit" :disabled="isLoading"
              class="w-full py-3 bg-gray-900 text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-[#6a0d5f] transition-all duration-500 disabled:opacity-50 shadow-xl">
              <span v-if="isLoading">Mise à jour...</span>
              <span v-else>Enregistrer les modifications</span>
            </button>
          </div>
        </form>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#6a0d5f]">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <div>
              <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Identité</p>
              <p class="font-bold text-gray-900 tracking-wide">{{ userData.firstName }} {{ userData.lastName }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-400">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <div>
              <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Contact</p>
              <p class="font-bold text-gray-900 tracking-wide">{{ userData.email }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Security Section -->
      <section v-reveal class="reveal-delay-100 bg-white rounded-xl shadow-2xl p-6 md:p-8 border border-white">
        <div class="flex items-center justify-between mb-10">
          <div class="flex items-center gap-3">
            <div class="w-12 h-1 text-red-500 bg-red-500 rounded-full"></div>
            <h2 class="text-xl font-bold text-gray-900 uppercase tracking-wide">Sécurité</h2>
          </div>
          <button @click="isEditingPassword = !isEditingPassword"
            class="text-[10px] font-black text-red-500 uppercase tracking-widest hover:text-gray-900 transition-colors">
            {{ isEditingPassword ? 'Annuler' : 'Changer mot de passe' }}
          </button>
        </div>

        <form v-if="isEditingPassword" @submit.prevent="updatePassword" class="space-y-6">
          <div class="space-y-2">
            <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Mot de passe
              actuel</label>
            <input v-model="passwordData.currentPassword" type="password"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all font-bold"
              required />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Nouveau mot de
                passe</label>
              <input v-model="passwordData.newPassword" type="password"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all font-bold"
                required />
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Confirmer le mot de
                passe</label>
              <input v-model="passwordData.confirmPassword" type="password"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all font-bold"
                required />
            </div>
          </div>
          <div class="pt-4">
            <button type="submit" :disabled="isLoading"
              class="w-full py-3 bg-red-600 text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-red-700 transition-all duration-500 disabled:opacity-50 shadow-xl">
              <span v-if="isLoading">Mise à jour...</span>
              <span v-else>Mettre à jour la sécurité</span>
            </button>
          </div>
        </form>

        <p v-else class="text-gray-400 text-xs font-medium">Votre sécurité est notre priorité. Votre mot de passe
          est crypté et inaccessible par quiconque.</p>
      </section>

    </main>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useUserStore } from "~~/stores/user";
import Swal from "sweetalert2";

const userStore = useUserStore();
const isLoading = ref(false);
const isEditingPersonal = ref(false);
const isEditingPassword = ref(false);

const userData = reactive({
  id: null,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  createdAt: "",
  updatedAt: "",
});

const passwordData = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

onMounted(async () => {
  try {
    await userStore.fetchProfile();
    syncUserData();
  } catch (e) {
    Swal.fire({
      icon: "error",
      title: "Erreur",
      text: "Impossible de charger votre profil.",
      confirmButtonColor: "#6a0d5f",
    });
  } finally {
    isPageLoading.value = false;
  }
});

const syncUserData = () => {
  const u = userStore.user;
  if (!u) return;
  userData.id = u.id;
  userData.firstName = u.prenom;
  userData.lastName = u.nom;
  userData.email = u.email;
  userData.phone = u.telephone;
  userData.createdAt = u.created_at;
  userData.updatedAt = u.updated_at;
};

const updatePersonalInfo = async () => {
  isLoading.value = true;
  try {
    await userStore.updateProfile({
      nom: userData.lastName,
      prenom: userData.firstName,
      email: userData.email,
      telephone: userData.phone,
    });

    Swal.fire({
      icon: "success",
      title: "Profil mis à jour",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: "#fff",
      color: "#6a0d5f",
    });

    isEditingPersonal.value = false;
  } catch (e) {
    Swal.fire({
      icon: "error",
      title: "Erreur",
      text: e.message || "Une erreur est survenue lors de la mise à jour.",
      confirmButtonColor: "#6a0d5f",
    });
  } finally {
    isLoading.value = false;
  }
};

const updatePassword = async () => {
  if (passwordData.newPassword !== passwordData.confirmPassword) {
    Swal.fire({
      icon: "warning",
      title: "Attention",
      text: "Les nouveaux mots de passe ne correspondent pas.",
      confirmButtonColor: "#6a0d5f",
    });
    return;
  }

  if (passwordData.newPassword.length < 8) {
    Swal.fire({
      icon: "warning",
      title: "Attention",
      text: "Le mot de passe doit contenir au moins 8 caractères.",
      confirmButtonColor: "#6a0d5f",
    });
    return;
  }

  isLoading.value = true;
  try {
    await userStore.updatePassword({
      current_password: passwordData.currentPassword,
      new_password: passwordData.newPassword,
    });

    Swal.fire({
      icon: "success",
      title: "C'est fait !",
      text: "Votre mot de passe a été modifié avec succès.",
      confirmButtonColor: "#6a0d5f",
    });

    isEditingPassword.value = false;
    passwordData.currentPassword = "";
    passwordData.newPassword = "";
    passwordData.confirmPassword = "";
  } catch (e) {
    Swal.fire({
      icon: "error",
      title: "Erreur",
      text: e.message || "Mot de passe actuel incorrect ou erreur serveur.",
      confirmButtonColor: "#6a0d5f",
    });
  } finally {
    isLoading.value = false;
  }
};

const confirmDeleteAccount = async () => {
  const { value: password } = await Swal.fire({
    title: "Action Critique",
    text: "Cette action supprimera définitivement votre compte. Entrez votre mot de passe pour confirmer.",
    input: "password",
    inputPlaceholder: "Votre mot de passe",
    showCancelButton: true,
    confirmButtonText: "Supprimer mon compte",
    cancelButtonText: "Annuler",
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#9ca3af",
    inputValidator: (value) => {
      if (!value) return "Le mot de passe est requis !";
    }
  });

  if (password) {
    isLoading.value = true;
    try {
      await userStore.deleteAccount({ password });
      await userStore.logout();
      navigateTo("/");
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: e.message || "Impossible de supprimer le compte.",
        confirmButtonColor: "#6a0d5f",
      });
    } finally {
      isLoading.value = false;
    }
  }
};

definePageMeta({
  layout: "default",
  middleware: "auth",
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.reveal-delay-100 {
  animation-delay: 0.1s;
}

.reveal-delay-200 {
  animation-delay: 0.2s;
}
</style>
