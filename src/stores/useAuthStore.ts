import { IUser } from "@/interfaces/authInterfaces";
import { create } from "zustand";

interface AuthState {
  user: IUser;
  isLoggedIn: boolean;
  login: (userData: IUser) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: {} as IUser,
  isLoggedIn: false,
  login: (user: IUser) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: {} as IUser, isLoggedIn: false }),
}));

export default useAuthStore;
