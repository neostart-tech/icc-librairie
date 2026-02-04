import { defineStore } from "pinia";

export const useCommandeStore = defineStore("commande", {
  state: () => ({
    commandes: [] as any[],
    currentCommande: null as any | null,
    loading: false,
    error: null as any,
  }),

  getters: {
    hasCommandes: (state) => state.commandes.length > 0,
  },

  actions: {
    /**
     * Commandes de l'utilisateur connecté
     */
    async fetchMyCommandes() {
      this.loading = true;
      this.error = null;

      try {
        const { $api } = useNuxtApp();
        const res = await $api("/commandes");
        this.commandes = res.data.data ?? [];
      } catch (e) {
        console.error("Erreur fetch commandes :", e);
        this.error = e;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Toutes les commandes (admin)
     */
    async fetchAllCommandes() {
      this.loading = true;
      this.error = null;

      try {
        const { $api } = useNuxtApp();
        const res = await $api("/commandes/all");
        this.commandes = res.data.data ?? [];
      } catch (e) {
        console.error("Erreur fetch all commandes :", e);
        this.error = e;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Détail d'une commande
     */
    async fetchCommande(id: string) {
      this.loading = true;
      this.error = null;

      try {
        const { $api } = useNuxtApp();
        const res = await $api(`/commandes/${id}`);
        this.currentCommande = res.data.data;
      } catch (e) {
        console.error("Erreur fetch commande :", e);
        this.error = e;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Créer une commande + initier paiement
     */
    async createCommande(payload: {
      phone: string;
      gateway_id: number;
      livres: { livre_id: string; quantite: number }[];
    }) {
      this.loading = true;
      this.error = null;

      try {
        const { $api } = useNuxtApp();
        const res = await $api("/commandes", {
          method: "POST",
          body: payload,
        });

        return res; // { success, payment_url }
      } catch (e) {
        console.error("Erreur création commande :", e);
        this.error = e;
        throw e;
      } finally {
        this.loading = false;
      }
    },

    clear() {
      this.commandes = [];
      this.currentCommande = null;
    },
  },
});
