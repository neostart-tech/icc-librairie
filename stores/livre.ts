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
  images?: Image[];
  categorie?: any;
  stock?: any;
}

export const useLivreStore = defineStore("livre", {
  state: () => ({
    livres: [] as Livre[],
    livre: null as Livre | null,
    loading: false,
  }),

  actions: {
    /** ======================
     *  LISTE DES LIVRES
     ======================= */
    async fetchLivres() {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const res: Livre[] = await $api("/livres");
        this.livres = res;
      } catch (error) {
        console.error("Erreur fetchLivres", error);
      } finally {
        this.loading = false;
      }
    },

    /** ======================
     *  DETAIL LIVRE
     ======================= */
    async fetchLivre(id: number) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const res: Livre = await $api(`/livres/${id}`);
        this.livre = res;
      } catch (error) {
        console.error("Erreur fetchLivre", error);
      } finally {
        this.loading = false;
      }
    },

    /** ======================
     *  CREATION LIVRE (ADMIN)
     *  images => FormData
     ======================= */
    async createLivre(payload: {
      titre: string;
      auteur?: string;
      description?: string;
      prix: number;
      prix_promo?: number;
      categorie_id: number;
      images?: File[];
    }) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const formData = new FormData();

        formData.append("titre", payload.titre);
        formData.append("prix", payload.prix.toString());
        formData.append("categorie_id", payload.categorie_id.toString());

        if (payload.auteur) formData.append("auteur", payload.auteur);
        if (payload.description)
          formData.append("description", payload.description);
        if (payload.prix_promo !== undefined) {
          formData.append("prix_promo", payload.prix_promo.toString());
        }

        if (payload.images?.length) {
          payload.images.forEach((file) => {
            formData.append("images[]", file);
          });
        }

        const res: Livre = await $api("/livres", {
          method: "POST",
          body: formData,
        });

        this.livres.unshift(res);
        return res;
      } catch (error: any) {
        throw error?.data || error;
      } finally {
        this.loading = false;
      }
    },

    /** ======================
     *  UPDATE LIVRE (ADMIN)
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
        images: File[];
      }>,
    ) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const formData = new FormData();

        Object.entries(payload).forEach(([key, value]) => {
          if (value === undefined) return;

          if (key === "images" && Array.isArray(value)) {
            value.forEach((file) => {
              formData.append("images[]", file);
            });
          } else {
            formData.append(key, value.toString());
          }
        });

        const res: Livre = await $api(`/livres/${id}`, {
          method: "POST", // Laravel accepte POST + _method
          body: formData,
          query: { _method: "PUT" },
        });

        const index = this.livres.findIndex((l) => l.id === id);
        if (index !== -1) {
          this.livres[index] = res;
        }

        this.livre = res;
        return res;
      } catch (error: any) {
        throw error?.data || error;
      } finally {
        this.loading = false;
      }
    },

    /** ======================
     *  DELETE LIVRE (ADMIN)
     ======================= */
    async deleteLivre(id: number) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        await $api(`/livres/${id}`, {
          method: "DELETE",
        });

        this.livres = this.livres.filter((l) => l.id !== id);
        if (this.livre?.id === id) {
          this.livre = null;
        }
      } catch (error) {
        console.error("Erreur suppression livre", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
