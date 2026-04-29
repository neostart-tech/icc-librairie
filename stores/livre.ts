import { defineStore } from "pinia";

export interface Image {
  id: number;
  path: string;
}

export interface Livre {
  id: number;
  titre: string;
  auteur?: string;
  description?: string;
  prix: number;
  prix_promo?: number;
  categorie_id: number;
  image?: string;
  categorie?: any;
  auteurRel?: any;
  stock?: any;
}

export const useLivreStore = defineStore("livre", {
  /* =========================
   * STATE
   ========================= */
  state: () => ({
    livres: [] as Livre[],
    livre: null as Livre | null,
    selectionMois: [] as Livre[],
    selectionMoisPrecedent: [] as Livre[],
    enVogue: null as Livre | null,
    loading: false,
  }),

  getters: {
    getCoverImage: () => (livre: Livre) => {
      if (!livre) return "/images/livre.jpg";
      const config = useRuntimeConfig();
      return livre.image
        ? `${config.public.storageBase}/${livre.image}`
        : "/images/livre.jpg";
    },
  },

  /* =========================
   * ACTIONS
   ========================= */
  actions: {
    /** ======================
     * LISTE DES LIVRES
     ======================= */
    async fetchLivres() {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const res: any = await $api("/livres");
        this.livres = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
      } catch (error) {
        console.error("Erreur fetchLivres", error);
      } finally {
        this.loading = false;
      }
    },

    /** ======================
     * DETAIL LIVRE
     ======================= */
    async fetchLivre(id: number) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const res: any = await $api(`/livres/${id}`);
        const data = res?.data ?? res;
        this.livre = data;
        return data;
      } catch (error) {
        console.error("Erreur fetchLivre", error);
        return null;
      } finally {
        this.loading = false;
      }
    },

    /** ======================
     * CREATION LIVRE (ADMIN)
     ======================= */
    async createLivre(payload: {
      titre: string;
      auteur?: string;
      description?: string;
      prix: number;
      prix_promo?: number;
      categorie_id: number;
      image?: File;
    }) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const formData = new FormData();

        formData.append("titre", payload.titre);
        formData.append("prix", payload.prix.toString());
        formData.append("categorie_id", payload.categorie_id.toString());

        if (payload.auteur) formData.append("auteur", payload.auteur);
        if (payload.description) {
          formData.append("description", payload.description);
        }
        if (payload.prix_promo !== undefined) {
          formData.append("prix_promo", payload.prix_promo.toString());
        }

        if (payload.image) {
          formData.append("image", payload.image);
        }

        const res: any = await $api("/livres", {
          method: "POST",
          body: formData,
        });

        const newLivre = res.data ?? res;
        this.livres.unshift(newLivre);
        return newLivre;
      } catch (error: any) {
        throw error?.data || error;
      } finally {
        this.loading = false;
      }
    },

    /** ======================
     * UPDATE LIVRE (ADMIN)
     ======================= */
    async updateLivre(
      id: number,
      payload: Partial<{
        titre: string;
        auteur: string;
        description: string;
        prix: number;
        prix_promo: number;
        categorie_id: number;
        image: File;
      }>,
    ) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const formData = new FormData();

        Object.entries(payload).forEach(([key, value]) => {
          if (value === undefined) return;

          if (key === "image" && value instanceof File) {
            formData.append("image", value);
          } else {
            formData.append(key, value.toString());
          }
        });

        const res: any = await $api(`/livres/${id}`, {
          method: "POST",
          body: formData,
          query: { _method: "PUT" },
        });

        const updatedLivre = res.data ?? res;
        const index = this.livres.findIndex((l) => l.id === id);
        if (index !== -1) {
          this.livres[index] = updatedLivre;
        }

        this.livre = updatedLivre;
        return updatedLivre;
      } catch (error: any) {
        throw error?.data || error;
      } finally {
        this.loading = false;
      }
    },

    /** ======================
     * DELETE LIVRE (ADMIN)
     ======================= */
    async deleteLivre(id: number) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        await $api(`/livres/${id}`, { method: "DELETE" });

        this.livres = this.livres.filter((l) => l.id !== id);
        if (this.livre?.id === id) this.livre = null;
      } catch (error) {
        console.error("Erreur suppression livre", error);
      } finally {
        this.loading = false;
      }
    },

    /** ======================
     * LIVRES EN AVANT
     ======================= */
    async fetchFeaturedLivres() {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const res: any = await $api("/livres/featured");
        this.selectionMois = res.selection_mois || [];
        this.selectionMoisPrecedent = res.selection_mois_precedent || [];
        this.enVogue = res.en_vogue || null;
      } catch (error) {
        console.error("Erreur fetchFeaturedLivres", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
