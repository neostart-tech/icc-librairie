<template>
  <aside
    :class="[
      'fixed top-0 left-0 h-screen bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 flex flex-col transition-all duration-300',
      isCollapsed ? 'w-20' : 'w-64',
    ]"
  >
    <!-- Logo et utilisateur -->
    <div class="p-4 flex items-center justify-between flex-shrink-0">
      <div class="flex items-center gap-3">
        <img
          src="/logo/logo_librairie(1).png"
          alt="ICC Librairie"
          class="h-10 w-10 object-contain"
        />
        <div v-if="!isCollapsed">
          <h1 class="text-lg font-bold text-[#6a0d5f]">ICC Librairie</h1>
          <p class="text-xs text-gray-500">Tableau de bord</p>
        </div>
      </div>
      <button
        @click="toggleSidebar"
        class="p-2 rounded-lg hover:bg-gray-100 transition"
      >
        <svg
          class="w-6 h-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-3 space-y-1 mt-4 overflow-hidden">
      <!-- Tableau de bord -->
      <NuxtLink
        to="/dashboard"
        class="flex items-center px-3 py-3 rounded-xl text-gray-700 hover:bg-white hover:shadow-sm transition group"
        active-class="bg-white shadow font-semibold text-[#6a0d5f]"
      >
        <div
          class="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center"
        >
          <svg
            class="w-5 h-5 text-gray-600 group-hover:text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </div>
        <span v-if="!isCollapsed" class="ml-3">Tableau de bord</span>
      </NuxtLink>

      <!-- Commandes -->
      <div>
        <nuxt-link
          to="/dashboard/commandes"
          class="w-full flex items-center justify-between px-3 py-3 rounded-xl text-gray-700 hover:bg-white hover:shadow-sm transition group"
        >
          <div class="flex items-center">
            <div
              class="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-gray-600 group-hover:text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2"
                />
              </svg>
            </div>
            <span v-if="!isCollapsed" class="ml-3">Commandes</span>
          </div>
        </nuxt-link>
      </div>

      <!-- Profil -->
      <NuxtLink
        to="/dashboard/profil"
        class="flex items-center px-3 py-3 rounded-xl text-gray-700 hover:bg-white hover:shadow-sm transition group"
        active-class="bg-white shadow font-semibold text-[#6a0d5f]"
      >
        <div
          class="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center"
        >
          <svg
            class="w-5 h-5 text-gray-600 group-hover:text-green-600"
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
        </div>
        <span v-if="!isCollapsed" class="ml-3">Profil</span>
      </NuxtLink>

      <!-- Paramètres -->
      <!-- <NuxtLink
        to="/dashboard/parametres"
        class="flex items-center px-3 py-3 rounded-xl text-gray-700 hover:bg-white hover:shadow-sm transition group"
        active-class="bg-white shadow font-semibold text-[#6a0d5f]"
      >
        <div
          class="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center"
        >
          <svg
            class="w-5 h-5 text-gray-600 group-hover:text-yellow-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <span v-if="!isCollapsed" class="ml-3">Paramètres</span>
      </NuxtLink> -->
    </nav>

    <!-- Footer -->
    <div
      v-if="!isCollapsed"
      class="p-4 text-xs text-gray-500 border-t flex-shrink-0"
    >
      © ICC Librairie 2026
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  isCollapsed: Boolean,
});

const emit = defineEmits(["update:isCollapsed"]);

const openCommandes = ref(false);

const toggleSidebar = () => {
  emit("update:isCollapsed", !props.isCollapsed);
};

// Repli automatique sur mobile
const checkScreen = () => {
  if (window.innerWidth < 1024) {
    emit("update:isCollapsed", true);
  } else {
    emit("update:isCollapsed", false);
  }
};

onMounted(() => {
  checkScreen();
  window.addEventListener("resize", checkScreen);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreen);
});
</script>
