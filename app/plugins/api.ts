import { useAuthStore } from "~~/stores/auth";

export default defineNuxtPlugin((nuxtApp) => {
  const auth = useAuthStore();
  const config = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: config.public.apiBase,
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
    },

    onRequest({ options }) {
      // Si le store n'est pas encore initialisé
      if (!auth.token && process.client) {
        auth.init();
      }

      // S'assurer que le header Accept est toujours présent (évite les erreurs 500 Route login not defined)
      options.headers = {
        ...options.headers,
        Accept: "application/json",
      };

      if (auth.token && auth.token !== "undefined" && auth.token !== "null") {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${auth.token}`,
        };
      }
    },

    onResponseError({ response }) {
      if (response.status === 401) {
        // juste nettoyer le token
        auth.token = null;
        auth.user = null;

        if (process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }

        // IMPORTANT : relancer l'erreur
        throw response._data;
      }

      throw response._data;
    },
  });

  return {
    provide: {
      api,
    },
  };
});
