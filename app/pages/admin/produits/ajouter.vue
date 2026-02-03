<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
    <div class="max-w-4xl mx-auto">
      <!-- En-tête -->
      <div class="mb-8">
        <h1 class="text-2xl md:text-3xl font-bold text-black mb-2">
        Ajouter un nouveau livre
        </h1>

        <p class="text-gray-900">
          Complétez le formulaire ci-dessous pour ajouter un nouveau livre à votre catalogue.
        </p>
      </div>

      <!-- Conteneur principal -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Colonne gauche - Formulaire -->
        <div class="lg:col-span-2">
          <form @submit.prevent="submitLivre" class="space-y-6">
            <!-- Carte du formulaire -->
            <div class="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 class="text-xl font-semibold text-[#6a0d5f] mb-6 pb-4 border-b">
                Informations du livre
              </h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- TITRE -->
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-black mb-2" for="titre">
                    Titre du livre <span class="text-[#6a0d5f]">*</span>
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                      </svg>
                    </div>
                    <input
                      id="titre"
                      v-model="livre.titre"
                      type="text"
                      placeholder="Ex: Foi Chrétienne"
                      class="pl-10 w-full border border-gray-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#6a0d5f] focus:border-transparent transition"
                      required
                    />
                  </div>
                </div>

                <!-- AUTEUR -->
                <div>
                  <label class="block text-sm font-medium text-black mb-2" for="auteur">
                    Auteur <span class="text-[#6a0d5f]">*</span>
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                    <input
                      id="auteur"
                      v-model="livre.auteur"
                      type="text"
                      placeholder="Ex: Jean Dupont"
                      class="pl-10 w-full border border-gray-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#6a0d5f] focus:border-transparent transition"
                      required
                    />
                  </div>
                </div>

                <!-- CATEGORIE -->
                <div>
                  <label class="block text-sm font-medium text-black mb-2" for="categorie">
                    Catégorie <span class="text-[#6a0d5f]">*</span>
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                      </svg>
                    </div>
                    <select
                      id="categorie"
                      v-model="livre.categorie"
                      class="pl-10 w-full border border-gray-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#6a0d5f] focus:border-transparent appearance-none bg-white transition"
                      required
                    >
                      <option value="" disabled>-- Choisir une catégorie --</option>
                      <option value="Informatique">Vie Chrétienne et Spiritualité</option>
                      <option value="Développement web">Mission et Évangélisation</option>
                      <option value="Roman">Famille et Education</option>
                      <option value="Science">Théologie et Doctrine</option>
                    </select>
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- PRIX -->
                <div>
                <label class="block text-sm font-medium text-black mb-2" for="prix">
                    Prix (FCFA) <span class="text-[#6a0d5f]">*</span>
                </label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span class="text-gray-500">FCFA</span>
                    </div>

                    <input
                    id="prix"
                    v-model.number="livre.prix"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    class="pl-14 w-full border border-gray-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#6a0d5f] focus:border-[#6a0d5f] transition"
                    required
                    />
                </div>
                </div>

                <!-- STOCK -->
                <div>
                  <label class="block text-sm font-medium text-black mb-2" for="stock">
                    Quantité en stock <span class="text-[#6a0d5f]">*</span>
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                      </svg>
                    </div>
                    <input
                      id="stock"
                      v-model.number="livre.stock"
                      type="number"
                      min="0"
                      placeholder="0"
                      class="pl-10 w-full border border-gray-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#6a0d5f] focus:border-transparent transition"
                      required
                    />
                  </div>
                </div>

                <!-- IMAGE -->
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-black mb-2" for="image">
                    Image du livre
                  </label>
                  <!-- ZONE UPLOAD -->
                  <div
                    tabindex="0"
                    class="mt-1 flex justify-center px-6 pt-5 pb-6
                          border-2 border-gray-400 border-dashed rounded-2xl
                          cursor-pointer transition-colors duration-300
                          hover:border-[#6a0d5f] focus-within:border-[#6a0d5f]"
                  >
                    <div class="space-y-1 text-center">
                      <!-- ICONE -->
                      <svg
                        class="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <!-- TEXTE -->
                      <div class="flex text-sm text-gray-600 justify-center">
                        <label
                          for="image"
                          class="relative cursor-pointer bg-white rounded-md font-medium text-[#6a0d5f] hover:text-[#520a49] focus-within:outline-none"
                        >
                          <span>Télécharger une image</span>
                          <input
                            id="image"
                            type="file"
                            @change="handleFile"
                            accept="image/*"
                            class="sr-only"
                          />
                        </label>
                        <p class="pl-1">ou glisser-déposer</p>
                      </div>
                      <p class="text-xs text-gray-500">
                        PNG, JPG, WEBP jusqu'à 10MB
                      </p>
                    </div>
                  </div>

                  <!-- PREVIEW IMAGE -->
                  <div v-if="livre.image" class="mt-4">
                    <p class="text-sm text-gray-600 mb-2">Image sélectionnée :</p>
                    <div class="flex items-center space-x-4 bg-gray-50 p-3 rounded-xl">
                      <div class="h-16 w-16 bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          v-if="imagePreview"
                          :src="imagePreview"
                          alt="Aperçu"
                          class="h-full w-full object-cover"
                        />
                      </div>
                      <div class="flex-1">
                        <p class="text-sm font-medium text-gray-900">
                          {{ livre.image.name }}
                        </p>
                        <p class="text-xs text-gray-500">
                          {{ formatFileSize(livre.image.size) }}
                        </p>
                      </div>
                      <!-- BOUTON SUPPRIMER -->
                      <button
                        type="button"
                        @click="removeImage"
                        class="text-red-500 hover:text-red-700 transition"
                      >
                        <svg
                          class="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- STATUT -->
                <div class="md:col-span-2">
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div class="flex items-center space-x-3">
                      <div class="flex items-center h-5">
                        <input
                          id="actif"
                          v-model="livre.actif"
                          type="checkbox"
                          class="h-5 w-5 text-purple-600 rounded focus:ring-purple-500 border-gray-300"
                        />
                      </div>
                      <div>
                        <label for="actif" class="font-medium text-black">
                          Mettre en ligne immédiatement
                        </label>
                        <p class="text-sm text-gray-500">
                          Le livre sera visible par les utilisateurs
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-2">
                      <span :class="[
                        'px-3 py-1 rounded-full text-sm font-medium',
                        livre.actif ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-800'
                      ]">
                        {{ livre.actif ? 'Actif' : 'Inactif' }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Boutons d'action -->
            <div class="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                :disabled="isSubmitting"
                class="flex-1 inline-flex justify-center items-center px-6 py-4 
                      bg-gradient-to-r from-[#6a0d5f] to-[#520a49]
                      text-white font-semibold rounded-xl
                      hover:from-[#520a49] hover:to-[#3f0838]
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6a0d5f]
                      disabled:opacity-50 disabled:cursor-not-allowed
                      transition shadow-lg"
              >
                <svg
                  v-if="isSubmitting"
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>

                <svg
                  v-else
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>

                {{ isSubmitting ? 'Ajout en cours...' : 'Ajouter le livre' }}
              </button>

              
              <button
                type="button"
                @click="resetForm"
                class="flex-1 inline-flex justify-center items-center px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                Réinitialiser
              </button>
            </div>
          </form>
        </div>

        <!-- Colonne droite - Aperçu -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-lg p-6 md:p-8 sticky top-8">
            <h2 class="text-xl font-semibold text-[#6a0d5f] mb-6 pb-4 border-b">
              Aperçu du livre
            </h2>
            
            <!-- Carte de prévisualisation -->
            <div class="space-y-6">
              <!-- Image de prévisualisation -->
              <div class="aspect-[3/4] bg-gradient-to-br from-purple-50 to-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                <div v-if="imagePreview" class="h-full w-full">
                  <img :src="imagePreview" alt="Aperçu" class="h-full w-full object-cover">
                </div>
                <div v-else class="text-center p-6">
                  <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <p class="mt-2 text-sm text-gray-500">Aucune image sélectionnée</p>
                </div>
              </div>
              
              <!-- Détails du livre -->
              <div class="space-y-4">
                <div>
                  <h3 class="text-lg font-bold text-gray-900 truncate">{{ livre.titre || 'Titre du livre' }}</h3>
                  <p class="text-gray-600">{{ livre.auteur || 'Auteur' }}</p>
                </div>
                
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium"> {{ livre.categorie || 'Catégorie' }} </span>
                  <span class="text-lg font-bold text-gray-900"> {{ livre.prix ? `${livre.prix.toFixed(0)} FCFA` : '0 FCFA' }} </span>

                </div>
                
                <div class="space-y-2">
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-600">Stock disponible</span>
                    <span :class="[
                      'font-semibold',
                      livre.stock > 10 ? 'text-green-600' : 
                      livre.stock > 0 ? 'text-yellow-600' : 'text-red-600'
                    ]">
                      {{ livre.stock !== null ? livre.stock : '0' }} unités
                    </span>
                  </div>
                  
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-600">Statut</span>
                    <span :class="[
                      'font-semibold',
                      livre.actif ? 'text-green-700' : 'text-red-600'
                    ]">
                      {{ livre.actif ? 'En ligne' : 'Hors ligne' }}
                    </span>
                  </div>
                </div>
                
                <!-- Barre de progression du formulaire -->
                <div class="pt-4 border-t">
                  <p class="text-sm text-gray-600 mb-2">Progression du formulaire</p>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      class="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-300"
                      :style="{ width: `${formProgress}%` }"
                    ></div>
                  </div>
                  <p class="text-xs text-gray-500 mt-1 text-right">
                    {{ Math.round(formProgress) }}% complet
                  </p>
                </div>
              </div>
            </div>
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

import { ref, computed } from 'vue'

const livre = ref({
  titre: '',
  auteur: '',
  categorie: '',
  prix: null,
  stock: null,
  image: null,
  actif: true,
})

const imagePreview = ref(null)
const isSubmitting = ref(false)

// Gestion du fichier image
const handleFile = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 10 * 1024 * 1024) { // 10MB max
      alert('Le fichier est trop volumineux. Maximum 10MB')
      return
    }
    
    livre.value.image = file
    
    // Créer un aperçu de l'image
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// Supprimer l'image
const removeImage = () => {
  livre.value.image = null
  imagePreview.value = null
}

// Formatage de la taille du fichier
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Calcul de la progression du formulaire
const formProgress = computed(() => {
  const fields = [
    livre.value.titre,
    livre.value.auteur,
    livre.value.categorie,
    livre.value.prix,
    livre.value.stock,
  ]
  
  const filledFields = fields.filter(field => {
    if (field === null || field === undefined) return false
    return String(field).trim().length > 0
  }).length
  
  return (filledFields / fields.length) * 100
})

// Réinitialiser le formulaire
const resetForm = () => {
  livre.value = {
    titre: '',
    auteur: '',
    categorie: '',
    prix: null,
    stock: null,
    image: null,
    actif: true,
  }
  imagePreview.value = null
}

// Soumission du formulaire
const submitLivre = async () => {
  if (formProgress.value < 100) {
    alert('Veuillez remplir tous les champs obligatoires')
    return
  }
  
  isSubmitting.value = true
  
  try {
    // Simuler un délai d'API
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Livre à ajouter :', livre.value)
    
    // Ici, vous ajouteriez votre logique d'API réelle
    // Exemple avec fetch :
    /*
    const formData = new FormData()
    Object.keys(livre.value).forEach(key => {
      if (livre.value[key] !== null) {
        formData.append(key, livre.value[key])
      }
    })
    
    const response = await fetch('/api/livres', {
      method: 'POST',
      body: formData
    })
    
    if (!response.ok) throw new Error('Erreur lors de l\'ajout')
    */
    
    alert('✅ Livre ajouté avec succès !')
    resetForm()
    
  } catch (error) {
    console.error('Erreur:', error)
    alert('❌ Une erreur est survenue lors de l\'ajout du livre')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* Animation pour le téléchargement de fichier */
.border-dashed:hover {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    border-color: #d1d5db;
  }
  50% {
    border-color: #8b5cf6;
  }
}

/* Style personnalisé pour le sélecteur */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}
</style>