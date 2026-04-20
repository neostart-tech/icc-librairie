import { defineStore } from "pinia";

export interface Banner {
    id: string;
    image_path: string;
    image_url: string;
    title?: string;
    order: number;
    is_active: boolean;
}

export const useBannerStore = defineStore("banner", {
    state: () => ({
        banners: [] as Banner[],
        loading: false,
    }),

    actions: {
        async fetchActiveBanners() {
            const { $api } = useNuxtApp();
            this.loading = true;
            try {
                const res: any = await $api("/banners/actives");
                this.banners = res.data ?? res;
            } catch (error) {
                console.error("Erreur fetchActiveBanners", error);
            } finally {
                this.loading = false;
            }
        },
    }
});
