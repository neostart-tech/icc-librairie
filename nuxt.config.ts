// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    server: {
      allowedHosts: ["entertaining-nonacute-olinda.ngrok-free.dev"],
    },
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@pinia/nuxt",
    "nuxt-toast",
    "pinia-plugin-persistedstate/nuxt",
  ],

  ssr: false,

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    public: {
      // apiBase: "http://localhost:8000/api",
      // storageBase: "http://localhost:8000/storage",
      apiBase: "https://api-librairie.icctogo.com/api",
      storageBase: "https://api-librairie.icctogo.com/storage",
    },
  },

  routeRules: {
    "/": { prerender: true },
    "/**": { cors: true },
  },

  nitro: {
    preset: "node-server",
  },

  app: {
    head: {
      title: "ICC Librairie | La référence des livres",
      meta: [
        {
          name: "description",
          content: "La référence des livres",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/logo/logo_librairie(1).png" },
        // Google Fonts
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;700&display=swap",
        },
      ],
    },
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
