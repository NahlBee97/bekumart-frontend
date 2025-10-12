import { create } from "zustand";
import { ICart } from "@/interfaces/cartInterfaces";
import api from "@/lib/axios";

// Define the shape of your store's state and actions
interface CartState {
  cart: ICart | null;
  setCart: (cart: ICart) => void;
  addToCart: (
    userId: string,
    productId: string,
    quantity: number
  ) => Promise<void>;
  updateItemQuantity: (
    userId: string,
    itemId: string,
    quantity: number
  ) => Promise<void>;
  deleteItem: (userId: string, itemId: string) => Promise<void>;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  // 1. Initial State
  cart: null,

  // 2. Actions
  setCart: (cart: ICart) => set({ cart }),

  // Corrected async action
  addToCart: async (userId: string, productId: string, quantity: number) => {
    try {
      // Perform the async API call and wait for the response
      await api.post(`/api/carts/items`, { userId, productId, quantity });

      const response = await api.get(`/api/carts/${userId}`);

      set({ cart: response.data.data });
    } catch (error) {
      console.log("Failed to add item to cart:", error);
    }
  },

  updateItemQuantity: async (
    userId: string,
    itemId: string,
    quantity: number
  ) => {
    try {
      await api.put(`/api/carts/items/${itemId}`, { quantity });

      // Fetch the updated cart after changing the quantity
      const response = await api.get(`/api/carts/${userId}`);

      set({ cart: response.data.data });
    } catch (error) {
      console.log("Failed to update item quantity:", error);
    }
  },

  deleteItem: async (userId: string, itemId: string) => {
    try {
      await api.delete(`/api/carts/items/${itemId}`);

      // Fetch the updated cart after deleting the item
      const response = await api.get(`/api/carts/${userId}`);

      set({ cart: response.data.data });
    } catch (error) {
      console.log("Failed to delete item from cart:", error);
    }
  },

  clearCart: () => set({ cart: null }),
}));
