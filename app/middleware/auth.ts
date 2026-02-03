import { useAuthStore } from "~~/stores/auth";

export default defineNuxtRouteMiddleware(() => {
  if (!process.client) {
    return;
  }
  const auth = useAuthStore();

  if (!auth.isLogged) {
    return navigateTo("/connexion");
  }
});
