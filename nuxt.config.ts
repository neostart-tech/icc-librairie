// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    server: {
      allowedHosts: ["entertaining-nonacute-olinda.ngrok-free.dev"],
    },
  },

  modules: ["@nuxt/eslint", "@nuxt/ui", "@pinia/nuxt", "nuxt-toast"],

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    public: {
      apiBase: "http://localhost:8000/api",
      storageBase: "http://localhost:8000/storage",
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
