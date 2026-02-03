import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as Array<{
      id: number;
      title: string;
      price: number;
      image: string;
      quantity: number;
      stockAvailable: number; // stock réel du livre
    }>,
  }),

  getters: {
    subtotal: (state) =>
      state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),

    getQuantity: (state) => (id: number) => {
      const item = state.items.find((i) => i.id === id);
      return item ? item.quantity : 0;
    },

    count: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
  },

  actions: {
    add(item: {
      id: number;
      title: string;
      price: number;
      image: string;
      stockAvailable: number;
    }) {
      const existing = this.items.find((i) => i.id === item.id);

      if (existing) {
        // n'ajoute pas si stock atteint
        if (existing.quantity >= item.stockAvailable) return;
        existing.quantity++;
      } else {
        if (item.stockAvailable <= 0) return;
        this.items.push({ ...item, quantity: 1 });
      }
    },

    increase(id: number) {
      const item = this.items.find((i) => i.id === id);
      if (!item) return;
      if (item.quantity < item.stockAvailable) item.quantity++;
    },

    decrease(id: number) {
      const item = this.items.find((i) => i.id === id);
      if (!item) return;
      if (item.quantity > 1) item.quantity--;
    },

    remove(id: number) {
      this.items = this.items.filter((i) => i.id !== id);
    },
  },
});
