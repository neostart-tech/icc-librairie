import { defineStore } from "pinia";

export const useGatewayStore = defineStore("gateway", {
  state: () => ({
    gateways: [],
    loading: false,
    error: null,
  }),

  getters: {
    actifs: (state) => state.gateways.filter((g) => g.actif),
    hasGateways: (state) => state.gateways.length > 0,

    // optionnel mais utile
    getById: (state) => (id) => state.gateways.find((g) => g.id === id),
  },

  actions: {
    async fetchGateways(force = false) {
      if (this.gateways.length && !force) return;

      this.loading = true;
      this.error = null;

      try {
        const { $api } = useNuxtApp();

        const res = await $api("/gateways");

        // Laravel JsonResource => { data: [...] }
        this.gateways = res.data ?? [];
      } catch (e) {
        console.error("Erreur fetch gateways :", e);
        this.error = "Impossible de charger les moyens de paiement";
      } finally {
        this.loading = false;
      }
    },

    clear() {
      this.gateways = [];
    },
  },
});
