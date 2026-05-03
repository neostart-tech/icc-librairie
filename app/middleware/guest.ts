import { useAuthStore } from "~~/stores/auth";

/**
 * Middleware "guest" : si l'utilisateur est déjà connecté,
 * il est redirigé vers la page d'accueil (ou la page demandée).
 * À utiliser sur les pages de connexion, inscription, etc.
 */
export default defineNuxtRouteMiddleware(() => {
  if (!process.client) return;

  const auth = useAuthStore();

  if (auth.isLogged) {
    return navigateTo("/");
  }
});
