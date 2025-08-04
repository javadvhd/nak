import { loginApi, signupApi } from "./auth.api";
import { useAuthStore } from "./auth.store";
import { LoginPayload, SignupPayload } from "./auth.types";

export const handleLogin = async (payload: LoginPayload) => {
  try {
    useAuthStore.getState().setLoading(true);
    const response = await loginApi(payload);
    console.log("response ", response);
    useAuthStore.getState().login(response.access_token);
    return response;
  } catch (error) {
    throw error;
  } finally {
    useAuthStore.getState().setLoading(false);
  }
};

export const handleSignup = async (payload: SignupPayload) => {
  try {
    console.log("signup payload ", payload);
    useAuthStore.getState().setLoading(true);
    const response = await signupApi(payload);
    console.log("signup response ", response);
    useAuthStore.getState().login(response.access_token);
    return response;
  } catch (error) {
    throw error;
  } finally {
    useAuthStore.getState().setLoading(false);
  }
};

export const getAuthToken = async () => {
  return localStorage.getItem("token");
};

export const setAuthToken = async (token: string) => {
  localStorage.setItem("token", token);
};
