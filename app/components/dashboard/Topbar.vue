<template>
  <header class="h-14 bg-white border-b px-6 flex items-center justify-end relative">
    <!-- ADMIN AVATAR + NOM -->
    <div class="relative" @click="toggleDropdown">
      <button
        class="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition cursor-pointer"
      >
        <!-- IMAGE UTILISATEUR -->
        <img src="/icone/user.jpg" alt="Admin" class="h-6 w-6 rounded-full object-cover" />

        <span class="text-gray-700 font-medium">Admin</span>
      </button>

      <!-- DROPDOWN -->
      <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
        <ul class="flex flex-col">
          <li>
            <button class="w-full text-left px-4 py-2 hover:bg-gray-100 transition cursor-pointer" @click="goToSettings">
              <img src="/icone/settings.png" alt="Paramètres" class="inline h-4 w-4 mr-2"/> Paramètres
            </button>
          </li>
          <li>
            <button class="w-full text-left px-4 py-2 hover:bg-gray-100 transition cursor-pointer" @click="logout">
              <img src="/icone/logout.png" alt="Déconnexion" class="inline h-4 w-4 mr-2"/> Déconnexion
            </button>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Topbar",
  data() {
    return {
      dropdownOpen: false
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    goToSettings() {
      this.$router.push('/admin/settings');
      this.dropdownOpen = false;
    },
    logout() {
      alert('Déconnexion effectuée');
      this.dropdownOpen = false;
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.dropdownOpen = false;
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }
};
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>
