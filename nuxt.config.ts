// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    server: {
      allowedHosts: ["entertaining-nonacute-olinda.ngrok-free.dev"],
    },
  },

  modules: ["@nuxt/eslint", "@nuxt/ui", "@pinia/nuxt", "nuxt-toast", "pinia-plugin-persistedstate/nuxt"],

  ssr: false,

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    public: {
      apiBase: "http://localhost:8000/api",
      storageBase: "http://localhost:8000/storage",
      // apiBase: "https://api-librairie.icctogo.com/api",
      // storageBase: "https://api-librairie.icctogo.com/storage",
    },
  },

  routeRules: {
    "/": { prerender: true },
    "/**": { cors: true },
  },

  nitro: {
    preset: "node-server",
  },

  compatibilityDate: "2025-01-15",

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },
});
