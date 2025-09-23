import { create } from "zustand";
import axios from "axios";
import { ICart } from "@/interfaces/cartInterfaces";
import { apiUrl } from "@/config";
import { getCookie } from "cookies-next";

// Define the shape of your store's state and actions
interface CartState {
  cart: ICart | null;
  isLoading: boolean;
  error: string | null;
  setCart: (cart: ICart) => void;
  addToCart: (
    userId: string,
    productId: string,
  ) => Promise<void>;
  updateItemQuantity: (
    userId: string,
    itemId: string,
    quantity: number
  ) => Promise<void>;
  deleteItem: (userId: string, itemId: string) => Promise<void>;
  clearCart: () => void;
}

const token = getCookie("access_token") as string;

export const useCartStore = create<CartState>((set) => ({
  // 1. Initial State
  cart: null,
  isLoading: false,
  error: null,

  // 2. Actions
  setCart: (cart: ICart) => set({ cart }),

  // Corrected async action
  addToCart: async (userId: string, productId: string) => {
    // Set loading state to true before the API call
    set({ isLoading: true, error: null });

    try {
      if (!token) {
        alert("You must be logged in to add items to the cart.");
        throw new Error("No authorization token found.");
      }

      // Perform the async API call and wait for the response
      await axios.post(
        `${apiUrl}/api/carts/items`,
        { userId, productId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const cartResponse = await axios.get(`${apiUrl}/api/carts/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // On success, update the state with the new cart data
      set({ cart: cartResponse.data.data, isLoading: false });
      alert("Item added to cart successfully!");
    } catch (err) {
      console.error("Failed to add item to cart:", err);
      // On failure, update the error state
      set({ isLoading: false, error: "Could not add item to cart." });
    }
  },

  updateItemQuantity: async (userId: string, itemId: string, quantity: number) => {
    set({ isLoading: true, error: null });

    try {
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
      const cartResponse = await axios.get(`${apiUrl}/api/carts/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ cart: cartResponse.data.data, isLoading: false });
    } catch (err) {
      console.error("Failed to update item quantity:", err);
      set({ isLoading: false, error: "Could not update item quantity." });
    }
  },

  deleteItem: async (userId: string, itemId: string) => {
    set({ isLoading: true, error: null });

    try {
      const token = getCookie("access_token") as string;
      if (!token) {
        throw new Error("No authorization token found.");
      }

      await axios.delete(`${apiUrl}/api/carts/items/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Fetch the updated cart after deleting the item
      const cartResponse = await axios.get(`${apiUrl}/api/carts/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ cart: cartResponse.data.data, isLoading: false });
    } catch (err) {
      console.error("Failed to delete item from cart:", err);
      set({ isLoading: false, error: "Could not delete item from cart." });
    }
  },

  clearCart: () => set({ cart: null }),
}));
