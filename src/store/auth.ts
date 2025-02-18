import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserEntityWithoutPassword } from "../openapi/requests";

type User = {
  access_token: string;
  isAuthenticated: boolean;
};

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUserCredentials: (user: User) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUserCredentials: (user) => set({ user, isAuthenticated: true }),
      clearUser: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: "AS" }
  )
);
