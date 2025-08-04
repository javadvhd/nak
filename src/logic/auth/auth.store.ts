import { create } from "zustand";
import { StateCreator } from "zustand/vanilla";
import { AuthState, AuthStore } from "./auth.types";
import { setAuthToken } from "./auth.service";

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

export const useAuthStore = create<AuthStore>(
  (set: StateCreator<AuthStore>["set"]) => ({
    ...initialState,

    login: (token: string) => {
      setAuthToken(token);
      set({ token, isAuthenticated: true });
    },

    logout: () => {
      localStorage.removeItem("token");
      set(initialState);
    },

    setLoading: (status: boolean) => {
      set({ isLoading: status });
    },

    initialize: () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          set({ token, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ ...initialState, isLoading: false });
        }
      } else {
        set({ ...initialState, isLoading: false });
      }
    },
  })
);
