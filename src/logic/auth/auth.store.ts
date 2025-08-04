import { create } from "zustand";
import { StateCreator } from "zustand/vanilla";
import { AuthState, AuthStore, User } from "./auth.types";

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

export const useAuthStore = create<AuthStore>(
  (set: StateCreator<AuthStore>["set"]) => ({
    ...initialState,

    login: (token: string, user: User) => {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      set({ token, user, isAuthenticated: true });
    },

    logout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      set(initialState);
    },

    setLoading: (status: boolean) => {
      set({ isLoading: status });
    },

    initialize: () => {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");

      if (token && userStr) {
        try {
          const user = JSON.parse(userStr) as User;
          set({ token, user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ ...initialState, isLoading: false });
        }
      } else {
        set({ ...initialState, isLoading: false });
      }
    },
  })
);
