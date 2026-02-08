<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- En-tête -->
      <div class="mb-10">
        <h1 class="text-3xl font-bold text-gray-900">Mon Profil</h1>
        <p class="mt-2 text-gray-600">
          Gérez vos informations personnelles, votre sécurité et vos préférences
        </p>
      </div>

      <!-- Messages d'erreur/succès -->
      <div v-if="errorMessage" class="mb-6">
        <div class="rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">{{ errorMessage }}</h3>
            </div>
          </div>
        </div>
      </div>

      <div v-if="successMessage" class="mb-6">
        <div class="rounded-md bg-green-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-green-800">{{ successMessage }}</h3>
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
              <h2 class="text-xl font-semibold text-gray-800">Informations personnelles</h2>
              <button 
                @click="isEditingPersonal = !isEditingPersonal"
                class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                {{ isEditingPersonal ? 'Annuler' : 'Modifier' }}
              </button>
            </div>

            <form v-if="isEditingPersonal" @submit.prevent="updatePersonalInfo" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
                    Prénom
                  </label>
                  <input
                    v-model="userData.firstName"
                    type="text"
                    id="firstName"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
                    Nom
                  </label>
                  <input
                    v-model="userData.lastName"
                    type="text"
                    id="lastName"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                </div>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  Adresse email
                </label>
                <input
                  v-model="userData.email"
                  type="email"
                  id="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
              </div>

              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <input
                  v-model="userData.phone"
                  type="tel"
                  id="phone"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
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
                <svg class="h-5 w-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div>
                  <p class="text-sm font-medium text-gray-900">Nom complet</p>
                  <p class="text-sm text-gray-600">{{ userData.firstName }} {{ userData.lastName }}</p>
                </div>
              </div>
              <div class="flex items-center">
                <svg class="h-5 w-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p class="text-sm font-medium text-gray-900">Email</p>
                  <p class="text-sm text-gray-600">{{ userData.email }}</p>
                </div>
              </div>
              <div class="flex items-center">
                <svg class="h-5 w-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p class="text-sm font-medium text-gray-900">Téléphone</p>
                  <p class="text-sm text-gray-600">{{ userData.phone || 'Non renseigné' }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Section mot de passe -->
          <div class="bg-white shadow rounded-lg p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-semibold text-gray-800">Sécurité du compte</h2>
              <button 
                @click="isEditingPassword = !isEditingPassword"
                class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                {{ isEditingPassword ? 'Annuler' : 'Changer le mot de passe' }}
              </button>
            </div>

            <form v-if="isEditingPassword" @submit.prevent="updatePassword" class="space-y-6">
              <div>
                <label for="currentPassword" class="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe actuel
                </label>
                <input
                  v-model="passwordData.currentPassword"
                  type="password"
                  id="currentPassword"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-2">
                    Nouveau mot de passe
                  </label>
                  <input
                    v-model="passwordData.newPassword"
                    type="password"
                    id="newPassword"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                </div>
                <div>
                  <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
                    Confirmer le mot de passe
                  </label>
                  <input
                    v-model="passwordData.confirmPassword"
                    type="password"
                    id="confirmPassword"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
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
                Pour des raisons de sécurité, votre mot de passe n'est pas affiché.
                Vous pouvez le changer à tout moment.
              </p>
            </div>
          </div>

          <!-- Section préférences -->
          <div class="bg-white shadow rounded-lg p-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-6">Préférences</h2>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-900">Notifications par email</p>
                  <p class="text-sm text-gray-600">Recevoir des mises à jour et des notifications</p>
                </div>
                <button
                  @click="toggleEmailNotifications"
                  :class="[
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                    userPreferences.emailNotifications ? 'bg-indigo-600' : 'bg-gray-200'
                  ]"
                >
                  <span
                    :class="[
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                      userPreferences.emailNotifications ? 'translate-x-5' : 'translate-x-0'
                    ]"
                  />
                </button>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-900">Mode sombre</p>
                  <p class="text-sm text-gray-600">Activer l'interface sombre</p>
                </div>
                <button
                  @click="toggleDarkMode"
                  :class="[
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                    userPreferences.darkMode ? 'bg-indigo-600' : 'bg-gray-200'
                  ]"
                >
                  <span
                    :class="[
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                      userPreferences.darkMode ? 'translate-x-5' : 'translate-x-0'
                    ]"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Colonne de droite - Informations secondaires -->
        <div class="space-y-8">
          <!-- Avatar et rôle -->
          <div class="bg-white shadow rounded-lg p-6">
            <div class="flex flex-col items-center">
              <div class="relative">
                <img
                  :src="userData.avatar || 'https://via.placeholder.com/128'"
                  alt="Avatar"
                  class="h-32 w-32 rounded-full object-cover border-4 border-white shadow"
                >
                <button
                  @click="isEditingAvatar = true"
                  class="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
              <h3 class="mt-4 text-lg font-semibold text-gray-900">{{ userData.firstName }} {{ userData.lastName }}</h3>
              <p class="text-sm text-gray-600">{{ userData.role }}</p>
              <div class="mt-2">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <svg class="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  Compte vérifié
                </span>
              </div>
            </div>
          </div>

          <!-- Informations du compte -->
          <div class="bg-white shadow rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Informations du compte</h3>
            <div class="space-y-3">
              <div>
                <p class="text-sm font-medium text-gray-900">Date d'inscription</p>
                <p class="text-sm text-gray-600">{{ formatDate(userData.createdAt) }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">Dernière connexion</p>
                <p class="text-sm text-gray-600">{{ formatDate(userData.lastLogin) }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">ID utilisateur</p>
                <p class="text-sm text-gray-600 font-mono">{{ userData.id }}</p>
              </div>
            </div>
          </div>

          <!-- Actions dangereuses -->
          <div class="bg-white shadow rounded-lg p-6 border border-red-200">
            <h3 class="text-lg font-semibold text-red-800 mb-4">Zone de danger</h3>
            <div class="space-y-4">
              <button
                @click="exportData"
                class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg class="h-5 w-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Exporter mes données
              </button>
              <button
                @click="showDeleteModal = true"
                class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Supprimer mon compte
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal suppression de compte -->
    <div v-if="showDeleteModal" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="showDeleteModal = false"></div>
        
        <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div>
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.132 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-5">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Supprimer votre compte
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Cette action est irréversible. Toutes vos données seront définitivement supprimées.
                  Veuillez confirmer en tapant votre mot de passe.
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
          <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
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

definePageMeta({
  layout: 'dashboard'
})

import { ref, reactive, onMounted } from 'vue'

// Données utilisateur
const userData = reactive({
  id: 'USR-123456',
  firstName: 'Anna',
  lastName: 'Lorena',
  email: 'anna.lorena@example.com',
  phone: '+33 1 23 45 67 89',
  avatar: null,
  role: 'Utilisateur Premium',
  createdAt: '2023-01-15T10:30:00Z',
  lastLogin: '2024-01-20T14:45:00Z'
})

// États d'édition
const isEditingPersonal = ref(false)
const isEditingPassword = ref(false)
const isEditingAvatar = ref(false)

// Données du formulaire
const passwordData = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Préférences
const userPreferences = reactive({
  emailNotifications: true,
  darkMode: false
})

// États UI
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const passwordError = ref('')
const showDeleteModal = ref(false)
const deletePassword = ref('')

onMounted(() => {

})

// Formater une date
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const updatePersonalInfo = async () => {
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    
    successMessage.value = 'Informations mises à jour avec succès'
    isEditingPersonal.value = false
    
    // Réinitialiser le message après 5 secondes
    setTimeout(() => {
      successMessage.value = ''
    }, 5000)
  } catch (error) {
    errorMessage.value = 'Une erreur est survenue lors de la mise à jour'
  } finally {
    isLoading.value = false
  }
}

// Changer le mot de passe
const updatePassword = async () => {
  if (passwordData.newPassword !== passwordData.confirmPassword) {
    passwordError.value = 'Les mots de passe ne correspondent pas'
    return
  }

  if (passwordData.newPassword.length < 8) {
    passwordError.value = 'Le mot de passe doit contenir au moins 8 caractères'
    return
  }

  isLoading.value = true
  passwordError.value = ''
  errorMessage.value = ''

  try {
    // Simulation d'appel API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Ici, vous feriez un appel API réel :
    // await $fetch('/api/user/password', {
    //   method: 'PUT',
    //   body: {
    //     currentPassword: passwordData.currentPassword,
    //     newPassword: passwordData.newPassword
    //   }
    // })
    
    successMessage.value = 'Mot de passe changé avec succès'
    isEditingPassword.value = false
    
    // Réinitialiser le formulaire
    passwordData.currentPassword = ''
    passwordData.newPassword = ''
    passwordData.confirmPassword = ''
    
    // Réinitialiser le message après 5 secondes
    setTimeout(() => {
      successMessage.value = ''
    }, 5000)
  } catch (error) {
    errorMessage.value = 'Le mot de passe actuel est incorrect'
  } finally {
    isLoading.value = false
  }
}

// Toggle des préférences
const toggleEmailNotifications = () => {
  userPreferences.emailNotifications = !userPreferences.emailNotifications
  // Ici, vous pourriez sauvegarder la préférence via une API
}

const toggleDarkMode = () => {
  userPreferences.darkMode = !userPreferences.darkMode
  // Ici, vous pourriez sauvegarder la préférence via une API
}

// Exporter les données
const exportData = async () => {
  isLoading.value = true
  try {
    // Simulation d'appel API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Dans un cas réel, vous généreriez et téléchargeriez un fichier
    alert('Vos données ont été exportées avec succès')
  } catch (error) {
    errorMessage.value = 'Erreur lors de l\'export des données'
  } finally {
    isLoading.value = false
  }
}

// Supprimer le compte
const deleteAccount = async () => {
  if (!deletePassword.value) return

  isLoading.value = true
  try {
    // Simulation d'appel API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Ici, vous feriez un appel API réel :
    // await $fetch('/api/user/account', {
    //   method: 'DELETE',
    //   body: { password: deletePassword.value }
    // })
    
    // Redirection vers la page d'accueil après suppression
    navigateTo('/')
  } catch (error) {
    errorMessage.value = 'Erreur lors de la suppression du compte'
    showDeleteModal.value = false
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>

</style>