import { defineStore } from "pinia";

export interface Settings {
	id?: number;
	payment_instructions: string;
	delivery_fee: number;
}

export const useSettingsStore = defineStore("settings", {
	state: () => ({
		settings: null as Settings | null,
		loading: false,
	}),

	actions: {
		async fetchSettings() {
			const { $api } = useNuxtApp();
			this.loading = true;
			try {
				const res: any = await $api("/settings");
				this.settings = res?.data ?? null;
				return res;
			} catch (error) {
				console.error("Erreur fetchSettings", error);
			} finally {
				this.loading = false;
			}
		},

		async updateSettings(payload: Partial<Settings>) {
			const { $api } = useNuxtApp();
			this.loading = true;
			try {
				const res: any = await $api("/settings", {
					method: "POST",
					body: payload,
				});
				this.settings = res?.data ?? null;
				return res;
			} catch (error) {
				console.error("Erreur updateSettings", error);
				throw error;
			} finally {
				this.loading = false;
			}
		},
	},
});
