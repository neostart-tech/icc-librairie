import { defineStore } from "pinia";

export interface Popup {
    id: string;
    image_url: string;
    is_active: boolean;
    link?: string;
}

export const usePopupStore = defineStore("popup", {
    state: () => ({
        activePopup: null as Popup | null,
        loading: false,
        hasShown: false, // Per session flag
    }),

    actions: {
        async fetchActivePopup() {
            const { $api } = useNuxtApp();
            this.loading = true;
            try {
                const res: any = await $api("/popups/active");
                this.activePopup = res.data ?? res;
            } catch (error) {
                console.error("Erreur fetchActivePopup", error);
            } finally {
                this.loading = false;
            }
        },

        markAsShown() {
            this.hasShown = true;
        }
    }
});
