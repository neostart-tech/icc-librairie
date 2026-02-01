import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
  }),

  getters: {
    count: (state) =>
      state.items.reduce((total, item) => total + item.quantity, 0),

    subtotal: (state) =>
      state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),

    has: (state) => {
      return (id: string) => state.items.some((item) => item.id === id);
    },
  },

  actions: {
    add(product) {
      const existing = this.items.find((i) => i.id === product.id);

      if (existing) {
        existing.quantity++;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
    },

    increase(id) {
      const item = this.items.find((i) => i.id === id);
      if (item) item.quantity++;
    },

    decrease(id) {
      const item = this.items.find((i) => i.id === id);
      if (item && item.quantity > 1) item.quantity--;
    },

    remove(id) {
      this.items = this.items.filter((i) => i.id !== id);
    },
  },
});
