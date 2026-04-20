import { defineStore } from "pinia";

export interface Auteur {
  id: number;
  nom: string;
  biographie?: string;
  photo?: string;
  created_at?: string;
}

export const useAuteurStore = defineStore("auteur", {
  state: () => ({
    auteurs: [] as Auteur[],
    loading: false,
  }),

  actions: {
    async fetchAuteurs() {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const res: any = await $api("/auteurs");
        this.auteurs = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
      } catch (error) {
        console.error("Erreur fetchAuteurs", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
