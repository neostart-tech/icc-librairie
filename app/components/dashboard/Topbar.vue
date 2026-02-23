<template>
  <header
    class="h-16 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-40"
  >
    <!-- Titre de la page -->
    <div class="flex-1 ml-4 lg:ml-0">
      <h1 class="text-lg font-semibold text-gray-900 truncate">
        {{ pageTitle }}
      </h1>
      <p class="text-xs text-gray-500 truncate hidden sm:block">
        {{ pageDescription }}
      </p>
    </div>

    <!-- Actions droite -->
    <div class="flex items-center space-x-3 sm:space-x-4">
      <!-- Notifications -->
      <div class="relative" ref="notificationsDropdown">
        <button
          @click.stop="toggleNotifications"
          class="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors duration-200 relative"
        >
          <svg
            class="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>

          <!-- Badge -->
          <span
            v-if="notificationStore.unreadCount > 0"
            class="absolute -top-1 -right-1 h-5 min-w-[1.25rem] px-1 flex items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold"
          >
            {{ notificationStore.unreadCount }}
          </span>
        </button>

        <!-- Dropdown notifications -->
        <transition
          enter-active-class="transition-all duration-200 ease-out"
          leave-active-class="transition-all duration-150 ease-in"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-2"
        >
          <div
            v-if="notificationsOpen"
            class="absolute right-[-80px] mt-3 w-[90vw] sm:w-96 max-h-[70vh] bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
          >
            <!-- Header -->
            <div
              class="px-4 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-700"
            >
              <h3 class="font-semibold text-gray-800 dark:text-white">
                Notifications
              </h3>

              <button
                v-if="unreadNotificationsCount > 0"
                @click="notificationStore.markAllAsRead"
                class="text-xs font-medium text-[#6a0d5f] hover:underline"
              >
                Tout marquer comme lu
              </button>
            </div>

            <!-- Liste -->
            <ul
              class="overflow-y-auto max-h-[60vh] divide-y divide-gray-200 dark:divide-gray-700"
            >
              <li
                v-for="notif in notificationStore.notifications"
                :key="notif.id"
                class="px-4 py-3 transition flex gap-3"
                :class="{
                  'bg-[#6a0d5f]/5 dark:bg-[#6a0d5f]/20': !notif.read_at,
                }"
              >
                <div
                  class="flex-1 cursor-pointer"
                  @click="handleNotificationClick(notif)"
                >
                  <p
                    class="text-sm font-medium text-gray-800 dark:text-gray-100"
                  >
                    {{ notif.data.title ?? "Notification" }}
                  </p>

                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {{ notif.data.message }}
                  </p>

                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-[11px] text-gray-400">
                      {{ notificationStore.formatDate(notif.created_at) }}
                    </span>

                    <span
                      v-if="!notif.read_at"
                      class="text-[10px] font-semibold text-[#6a0d5f]"
                    >
                      • Nouveau
                    </span>
                  </div>
                </div>

                <!-- Supprimer -->
                <button
                  @click.stop="notificationStore.deleteNotification(notif.id)"
                  class="text-gray-400 hover:text-red-500 transition"
                  title="Supprimer"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M6 8a1 1 0 011 1v6a1 1 0 11-2 0V9a1 1 0 011-1zm4 0a1 1 0 011 1v6a1 1 0 11-2 0V9a1 1 0 011-1zm5-3a1 1 0 010 2h-1v9a2 2 0 01-2 2H7a2 2 0 01-2-2V7H4a1 1 0 010-2h3l1-1h4l1 1h3z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </transition>
      </div>

      <!-- Profil utilisateur -->
      <div class="relative" ref="profileDropdown">
        <button
          @click.stop="toggleProfileDropdown"
          class="flex items-center gap-3 bg-white hover:bg-gray-50 px-3 py-2 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 cursor-pointer"
        >
          <!-- Avatar -->
          <div
            class="h-8 w-8 rounded-full bg-[#6a0d5f] flex items-center justify-center"
          >
            <span class="text-white font-bold">{{ userInitial }}</span>
          </div>

          <!-- Info utilisateur -->
          <div class="hidden lg:block text-left">
            <p class="text-sm font-medium text-gray-900">{{ userFullName }}</p>
            <p class="text-xs text-gray-500">Utilisateur</p>
          </div>

          <!-- Flèche dropdown -->
          <svg
            class="w-4 h-4 text-gray-400 transition-transform duration-200"
            :class="profileDropdownOpen ? 'rotate-180' : ''"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <!-- Dropdown menu -->
        <transition
          enter-active-class="transition-all duration-200 ease-out"
          leave-active-class="transition-all duration-150 ease-in"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-2"
        >
          <div
            v-if="profileDropdownOpen"
            class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50"
          >
            <div class="px-4 py-3 border-b border-gray-100">
              <p class="text-sm font-medium text-gray-900">
                {{ userFullName }}
              </p>
              <p class="text-xs text-gray-500 mt-0.5">{{ userEmail }}</p>
            </div>
            <NuxtLink
              to="/dashboard/profil"
              @click="closeDropdowns"
              class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
            >
              <span>Mon profil</span>
            </NuxtLink>
            <div class="border-t border-gray-100 my-1"></div>
            <nuxt-link
              to="/"
              class="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
            >
              <span>Retourner à l'accueil</span>
            </nuxt-link>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useUserStore } from "~~/stores/user";
import { useNotificationStore } from "~~/stores/notification";

const userStore = useUserStore();
const notificationStore = useNotificationStore();

// Dropdown refs
const profileDropdown = ref(null);
const notificationsDropdown = ref(null);

// Dropdown states
const profileDropdownOpen = ref(false);
const notificationsOpen = ref(false);

// Utilisateur
const userInitial = computed(() =>
  userStore.user?.nom?.charAt(0)?.toUpperCase(),
);
const userFullName = ref("");
const userEmail = ref("");

// Notifications
const notifications = computed(() => notificationStore.notifications);
const unreadNotificationsCount = computed(() => notificationStore.unreadCount);

// Dropdown functions
const toggleProfileDropdown = () => {
  profileDropdownOpen.value = !profileDropdownOpen.value;
  if (profileDropdownOpen.value) notificationsOpen.value = false;
};

const toggleNotifications = () => {
  notificationsOpen.value = !notificationsOpen.value;
  if (notificationsOpen.value) profileDropdownOpen.value = false;
};

const closeDropdowns = () => {
  profileDropdownOpen.value = false;
  notificationsOpen.value = false;
};

// Handle notification click
const handleNotificationClick = async (notif) => {
  if (!notif.read_at && notif.id) {
    await notificationStore.markAsRead(notif.id);
  }
  notificationsOpen.value = false;

  // Redirection selon type
  // if (notif.data?.commande_id) {
  //   navigateTo(`/commandes/${notif.data.commande_id}`);
  // } else if (notif.data?.livre_id) {
  //   navigateTo(`/livres/${notif.data.livre_id}`);
  // }
};

// Click outside
const handleClickOutside = (e) => {
  if (profileDropdown.value && !profileDropdown.value.contains(e.target)) {
    profileDropdownOpen.value = false;
  }
  if (
    notificationsDropdown.value &&
    !notificationsDropdown.value.contains(e.target)
  ) {
    notificationsOpen.value = false;
  }
};

// Stop propagation
const handleDropdownClick = (e) => e.stopPropagation();

// Lifecycle
onMounted(async () => {
  document.addEventListener("click", handleClickOutside);
  if (profileDropdown.value)
    profileDropdown.value.addEventListener("click", handleDropdownClick);
  if (notificationsDropdown.value)
    notificationsDropdown.value.addEventListener("click", handleDropdownClick);

  // Charger profil utilisateur
  await userStore.fetchProfile();
  if (userStore.user) {
    userFullName.value = `${userStore.user.nom} ${userStore.user.prenom}`;
    userEmail.value = userStore.user.email;
  }

  // Charger notifications depuis l'API
  await notificationStore.fetchNotifications();

  // Mise à jour toutes les 2 secondes
  const interval = setInterval(() => {
    notificationStore.fetchNotifications();
  }, 2000);

  onUnmounted(() => clearInterval(interval));
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
  if (profileDropdown.value)
    profileDropdown.value.removeEventListener("click", handleDropdownClick);
  if (notificationsDropdown.value)
    notificationsDropdown.value.removeEventListener(
      "click",
      handleDropdownClick,
    );
});
</script>
