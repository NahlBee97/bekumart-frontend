import { IUser } from "@/interfaces/authInterfaces";
import { create } from "zustand";

interface AuthState {
  user: IUser | null;
  isLoggedIn: boolean;
  login: (userData: IUser) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  login: (user: IUser) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
}));

export default useAuthStore;
