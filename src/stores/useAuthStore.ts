import api from "@/lib/axios";
import { create } from "zustand";
import { IUser } from "@/interfaces/dataInterfaces";
import { jwtAccessSecret } from "@/config";
import { jwtDecode } from "jwt-decode";

interface AuthState {
  accessToken: string | null;
  user: IUser | null;
  isLoggedIn: boolean;
  isAuthLoading: boolean;
  checkAuth: () => Promise<void>;
  setAccessToken: (token: string) => void;
  login: (userData: IUser) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isLoggedIn: false,
  isAuthLoading: true,
  checkAuth: async () => {
    try {
      const response = await api.get("/api/auth/refresh-token");
      const { accessToken } = response.data;

      const payload = jwtDecode<IUser>(accessToken);

      set({
        user: payload,
        isLoggedIn: true,
        accessToken: accessToken,
        isAuthLoading: false
      });

    } catch (error) {
      // If refresh fails, it means no valid session, so we clear the state
      set({ user: null, isLoggedIn: false, accessToken: null });
      console.log("No active session found:", error);
    } finally {
      set({ isAuthLoading: false})
    }
  },
  setAccessToken: (token: string) => set({ accessToken: token }),
  login: (user: IUser) => set({ user, isLoggedIn: true }),
  logout: async () => {
    await api.post("api/auth/logout", {});
    set({ user: null, isLoggedIn: false, accessToken: null });
  },
}));

