import { defineStore } from "pinia";

interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as any,
    token: null as string | null,
    loading: false,
  }),

  getters: {
    isLogged: (state) => !!state.token,
  },

  actions: {
    async login(email: string, password: string) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const res: any = await $api("/user/login", {
          method: "POST",
          body: { email, password },
        });

        this.token = res.token;
        this.user = res.user;

        if (process.client) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("user", JSON.stringify(res.user));
        }

        return res;
      } catch (error: any) {
        throw {
          message: error?.data?.message || "Impossible de se connecter.",
          errors: error?.data?.errors,
        } as ApiError;
      } finally {
        this.loading = false;
      }
    },

    async loginSSO(email: string, password: string) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const res: any = await $api("/user/login-sso", {
          method: "POST",
          body: { email, password },
        });

        // Vérifier si la réponse contient un token, sinon lancer l'erreur
        if (!res.token) {
          throw {
            message: res.message || "Email ou mot de passe incorrect",
          } as ApiError;
        }

        this.token = res.token;
        this.user = res.user;

        if (process.client) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("user", JSON.stringify(res.user));
        }

        return res;
      } catch (error: any) {
        throw {
          message:
            error?.data?.message ||
            error?.message ||
            "Impossible de se connecter via SSO.",
          errors: error?.data?.errors,
        } as ApiError;
      } finally {
        this.loading = false;
      }
    },

    async register(data: {
      nom: string;
      prenom: string;
      email: string;
      telephone?: string | null;
      password: string;
    }) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const res: any = await $api("/user/register", {
          method: "POST",
          body: data,
        });

        this.token = res.token;
        this.user = res.user;

        if (process.client) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("user", JSON.stringify(res.user));
        }

        return res;
      } catch (error: any) {
        throw {
          message:
            error?.data?.message || "Erreur lors de l’inscription. Réessaie.",
          errors: error?.data?.errors,
        } as ApiError;
      } finally {
        this.loading = false;
      }
    },

    logout(redirect = true) {
      this.token = null;
      this.user = null;

      if (process.client) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }

      if (redirect) return navigateTo("/connexion");
    },

    init() {
      if (!process.client) return;

      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token) this.token = token;
      if (user) this.user = JSON.parse(user);
    },
  },
});
