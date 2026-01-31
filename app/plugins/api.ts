import { useAuthStore } from "~~/stores/auth";

export default defineNuxtPlugin((nuxtApp) => {
  const auth = useAuthStore();

  const api = $fetch.create({
    baseURL: "http://localhost:8000/api",

    onRequest({ options }) {
      // Si le store n'est pas encore initialisé
      if (!auth.token && process.client) {
        auth.init();
      }

      if (auth.token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${auth.token}`,
        };
      }
    },

    onResponseError({ response }) {
      if (response.status === 401) {
        auth.logout();
      }
    },
  });

  return {
    provide: {
      api,
    },
  };
});
