import { useAuthStore } from "~~/stores/auth";

export default defineNuxtRouteMiddleware((to) => {
  if (!process.client) {
    return;
  }
  const auth = useAuthStore();

  if (!auth.isLogged) {
    return navigateTo({
      path: "/connexion",
      query: { redirect: to.fullPath },
    });
  }
});
