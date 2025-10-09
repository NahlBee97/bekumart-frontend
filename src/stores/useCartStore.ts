import axios from "axios";
import { create } from "zustand";
import { ICart } from "@/interfaces/cartInterfaces";
import { apiUrl } from "@/config";
import { getCookie } from "cookies-next";

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
      const token = getCookie("access_token") as string;

      // Perform the async API call and wait for the response
      await axios.post(
        `${apiUrl}/api/carts/items`,
        { userId, productId, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const response = await axios.get(`${apiUrl}/api/carts/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

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
      const token = getCookie("access_token") as string;
      if (!token) {
        throw new Error("No authorization token found.");
      }

      await axios.put(
        `${apiUrl}/api/carts/items/${itemId}`,
        { quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Fetch the updated cart after changing the quantity
      const response = await axios.get(`${apiUrl}/api/carts/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ cart: response.data.data });
    } catch (error) {
      console.log("Failed to update item quantity:", error);
    }
  },

  deleteItem: async (userId: string, itemId: string) => {
    try {
      const token = getCookie("access_token") as string;
      if (!token) {
        throw new Error("No authorization token found.");
      }

      await axios.delete(`${apiUrl}/api/carts/items/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Fetch the updated cart after deleting the item
      const response = await axios.get(`${apiUrl}/api/carts/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ cart: response.data.data });
    } catch (error) {
      console.log("Failed to delete item from cart:", error);
    }
  },

  clearCart: () => set({ cart: null }),
}));
