import { defineStore } from "pinia";

export const usePaiementStore = defineStore("paiement", {
  state: () => ({
    paiements: [] as any[],
    currentPaiement: null as any | null,
    loading: false,
    error: null as any,
  }),

  getters: {
    hasPaiements: (state) => state.paiements.length > 0,
  },

  actions: {
    /**
     * Tous les paiements (admin)
     */
    async fetchAllPaiements() {
      this.loading = true;
      this.error = null;

      try {
        const { $api } = useNuxtApp();
        const res = await $api("/paiements");
        this.paiements = res.data.data ?? [];
      } catch (e) {
        console.error("Erreur fetch paiements :", e);
        this.error = e;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Paiements de l'utilisateur connecté
     */
    async fetchMyPaiements() {
      this.loading = true;
      this.error = null;

      try {
        const { $api } = useNuxtApp();
        const res = await $api("/paiements/user-paiements");
        this.paiements = res.data.data ?? [];
      } catch (e) {
        console.error("Erreur fetch paiements user :", e);
        this.error = e;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Détail d'un paiement
     */
    async fetchPaiement(id: string) {
      this.loading = true;
      this.error = null;

      try {
        const { $api } = useNuxtApp();
        const res = await $api(`/paiements/${id}`);
        this.currentPaiement = res.data.data;
      } catch (e) {
        console.error("Erreur fetch paiement :", e);
        this.error = e;
      } finally {
        this.loading = false;
      }
    },

    clear() {
      this.paiements = [];
      this.currentPaiement = null;
    },
  },
});
