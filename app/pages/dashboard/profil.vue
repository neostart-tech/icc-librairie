<template>
  <!-- LOADING -->
  <div
    v-if="isPageLoading"
    class="fixed inset-0 z-50 flex items-center justify-center bg-white/70 dark:bg-gray-900/70"
  >
    <div
      class="h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"
    ></div>
  </div>

  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- En-tête -->
      <div class="mb-10">
        <h1 class="text-2xl font-semibold text-gray-900">Mon Profil</h1>
        <p class="mt-2 text-gray-600">
          Gérez vos informations personnelles, votre sécurité et vos préférences
        </p>
      </div>

      <!-- Messages d'erreur/succès -->
      <div v-if="errorMessage" class="mb-6">
        <div class="rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg
                class="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">
                {{ errorMessage }}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div v-if="successMessage" class="mb-6">
        <div class="rounded-md bg-green-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg
                class="h-5 w-5 text-green-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-green-800">
                {{ successMessage }}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Colonne de gauche - Informations principales -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Section informations personnelles -->
          <div class="bg-white shadow rounded-lg p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-semibold text-gray-800">
                Informations personnelles
              </h2>
              <button
                @click="isEditingPersonal = !isEditingPersonal"
                class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                {{ isEditingPersonal ? "Annuler" : "Modifier" }}
              </button>
            </div>

            <form
              v-if="isEditingPersonal"
              @submit.prevent="updatePersonalInfo"
              class="space-y-6"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    for="firstName"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Prénom
                  </label>
                  <input
                    v-model="userData.firstName"
                    type="text"
                    id="firstName"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label
                    for="lastName"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Nom
                  </label>
                  <input
                    v-model="userData.lastName"
                    type="text"
                    id="lastName"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  Adresse email
                </label>
                <input
                  v-model="userData.email"
                  type="email"
                  id="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label
                  for="phone"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  Téléphone
                </label>
                <input
                  v-model="userData.phone"
                  type="tel"
                  id="phone"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div class="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  @click="isEditingPersonal = false"
                  class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  :disabled="isLoading"
                  class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  <span v-if="isLoading">Enregistrement...</span>
                  <span v-else>Enregistrer</span>
                </button>
              </div>
            </form>

            <div v-else class="space-y-4">
              <div class="flex items-center">
                <svg
                  class="h-5 w-5 text-gray-400 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <div>
                  <p class="text-sm font-medium text-gray-900">Nom complet</p>
                  <p class="text-sm text-gray-600">
                    {{ userData.firstName }} {{ userData.lastName }}
                  </p>
                </div>
              </div>
              <div class="flex items-center">
                <svg
                  class="h-5 w-5 text-gray-400 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <p class="text-sm font-medium text-gray-900">Email</p>
                  <p class="text-sm text-gray-600">{{ userData.email }}</p>
                </div>
              </div>
              <div class="flex items-center">
                <svg
                  class="h-5 w-5 text-gray-400 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div>
                  <p class="text-sm font-medium text-gray-900">Téléphone</p>
                  <p class="text-sm text-gray-600">
                    {{ userData.phone || "Non renseigné" }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Section mot de passe -->
          <div class="bg-white shadow rounded-lg p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-semibold text-gray-800">
                Sécurité du compte
              </h2>
              <button
                @click="isEditingPassword = !isEditingPassword"
                class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                {{ isEditingPassword ? "Annuler" : "Changer le mot de passe" }}
              </button>
            </div>

            <form
              v-if="isEditingPassword"
              @submit.prevent="updatePassword"
              class="space-y-6"
            >
              <div>
                <label
                  for="currentPassword"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  Mot de passe actuel
                </label>
                <div class="relative">
                  <input
                    v-model="passwordData.currentPassword"
                    :type="showCurrentPassword ? 'text' : 'password'"
                    class="w-full pr-10 px-3 py-2 border rounded-md"
                    required
                  />
                  <button
                    type="button"
                    @click="showCurrentPassword = !showCurrentPassword"
                    class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                  >
                    <svg
                      v-if="showCurrentPassword"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <!-- œil barré -->
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-5-10-5s2.221-3.368 5.36-5.22M3 3l18 18"
                      />
                    </svg>
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <!-- œil ouvert -->
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    for="newPassword"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Nouveau mot de passe
                  </label>
                  <div class="relative">
                    <input
                      v-model="passwordData.newPassword"
                      :type="showNewPassword ? 'text' : 'password'"
                      class="w-full pr-10 px-3 py-2 border rounded-md"
                      required
                    />
                    <button
                      type="button"
                      @click="showNewPassword = !showNewPassword"
                      class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                    >
                      <svg
                        v-if="showNewPassword"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-5-10-5s2.221-3.368 5.36-5.22M3 3l18 18"
                        />
                      </svg>
                      <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div>
                  <label
                    for="confirmPassword"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Confirmer le mot de passe
                  </label>
                  <div class="relative">
                    <input
                      v-model="passwordData.confirmPassword"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      class="w-full pr-10 px-3 py-2 border rounded-md"
                      required
                    />
                    <button
                      type="button"
                      @click="showConfirmPassword = !showConfirmPassword"
                      class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                    >
                      <svg
                        v-if="showConfirmPassword"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-5-10-5s2.221-3.368 5.36-5.22M3 3l18 18"
                        />
                      </svg>
                      <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div v-if="passwordError" class="text-sm text-red-600">
                {{ passwordError }}
              </div>

              <div class="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  @click="isEditingPassword = false"
                  class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  :disabled="isLoading"
                  class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  <span v-if="isLoading">Changement...</span>
                  <span v-else>Changer le mot de passe</span>
                </button>
              </div>
            </form>

            <div v-else>
              <p class="text-sm text-gray-600">
                Pour des raisons de sécurité, votre mot de passe n'est pas
                affiché. Vous pouvez le changer à tout moment.
              </p>
            </div>
          </div>
        </div>

        <!-- Colonne de droite - Informations secondaires -->
        <div class="space-y-8">
          <!-- Avatar et rôle -->

          <!-- Informations du compte -->
          <div class="bg-white shadow rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Informations du compte
            </h3>
            <div class="space-y-3">
              <div>
                <p class="text-sm font-medium text-gray-900">
                  Date d'inscription
                </p>
                <p class="text-sm text-gray-600">
                  {{ formatDate(userData.createdAt) }}
                </p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">
                  Dernière modification
                </p>
                <p class="text-sm text-gray-600">
                  {{ formatDate(userData.updatedAt) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal suppression de compte -->
    <div v-if="showDeleteModal" class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          @click="showDeleteModal = false"
        ></div>

        <div
          class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
        >
          <div>
            <div
              class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100"
            >
              <svg
                class="h-6 w-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.132 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-5">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Supprimer votre compte
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Cette action est irréversible. Toutes vos données seront
                  définitivement supprimées. Veuillez confirmer en tapant votre
                  mot de passe.
                </p>
              </div>
              <div class="mt-4">
                <input
                  v-model="deletePassword"
                  type="password"
                  placeholder="Votre mot de passe"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>
          </div>
          <div
            class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense"
          >
            <button
              type="button"
              @click="showDeleteModal = false"
              class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-1 sm:text-sm"
            >
              Annuler
            </button>
            <button
              type="button"
              @click="deleteAccount"
              :disabled="!deletePassword"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed sm:mt-0 sm:col-start-2 sm:text-sm"
            >
              Supprimer le compte
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useUserStore } from "~~/stores/user";
import { useToast } from "#imports";

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

const toast = useToast();
const userStore = useUserStore();
const isPageLoading = ref(true);

/* =======================
   Données utilisateur
======================= */
const userData = reactive({
  id: null,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  createdAt: "",
  updatedAt: "",
});

/* =======================
   États UI
======================= */
const isEditingPersonal = ref(false);
const isEditingPassword = ref(false);
const isLoading = ref(false);
const showDeleteModal = ref(false);
const deletePassword = ref("");

/* =======================
   Affichage mot de passe
======================= */
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

/* =======================
   Form mot de passe
======================= */
const passwordData = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

/* =======================
   Chargement profil
======================= */
onMounted(async () => {
  try {
    isPageLoading.value = true;
    await userStore.fetchProfile();

    const u = userStore.user;
    if (!u) return;

    userData.id = u.id;
    userData.firstName = u.prenom;
    userData.lastName = u.nom;
    userData.email = u.email;
    userData.phone = u.telephone;
    userData.createdAt = u.created_at;
    userData.updatedAt = u.updated_at;
  } catch (e) {
    toast.error({
      message: "Impossible de charger le profil",
    });
  } finally {
    isPageLoading.value = false;
  }
});

/* =======================
   Utils
======================= */
const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/* =======================
   Mise à jour profil
======================= */
const updatePersonalInfo = async () => {
  isLoading.value = true;

  try {
    await userStore.updateProfile({
      nom: userData.lastName,
      prenom: userData.firstName,
      email: userData.email,
      telephone: userData.phone,
    });

    toast.success({
      message: "Profil mis à jour avec succès",
    });

    isEditingPersonal.value = false;
  } catch (e) {
    toast.error({
      message: e.message || "Erreur lors de la mise à jour",
    });
  } finally {
    isLoading.value = false;
  }
};

/* =======================
   Changer mot de passe
======================= */
const updatePassword = async () => {
  if (passwordData.newPassword !== passwordData.confirmPassword) {
    toast.error({
      message: "Les mots de passe ne correspondent pas",
    });

    return;
  }

  if (passwordData.newPassword.length < 8) {
    toast.error({
      message: "Le mot de passe doit contenir au moins 8 caractères",
    });

    return;
  }

  isLoading.value = true;

  try {
    await userStore.updatePassword({
      current_password: passwordData.currentPassword,
      new_password: passwordData.newPassword,
    });

    toast.success({
      message: "Mot de passe modifié avec succès",
    });

    isEditingPassword.value = false;

    passwordData.currentPassword = "";
    passwordData.newPassword = "";
    passwordData.confirmPassword = "";
  } catch (e) {
    toast.error({
      message: e.message || "Erreur lors de la mise à jour du mot de passe.",
    });
  } finally {
    isLoading.value = false;
  }
};

/* =======================
   Suppression compte
======================= */
const deleteAccount = async () => {
  if (!deletePassword.value) return;

  isLoading.value = true;

  try {
    await userStore.deleteAccount({
      password: deletePassword.value,
    });

    toast.add({
      title: "Compte supprimé",
      description: "Votre compte a été supprimé avec succès",
      color: "green",
    });

    await userStore.logout();
    navigateTo("/");
  } catch (e) {
    toast.add({
      title: "Erreur",
      description: e.message || "Impossible de supprimer le compte",
      color: "red",
    });
    showDeleteModal.value = false;
  } finally {
    isLoading.value = false;
  }
};
</script>
