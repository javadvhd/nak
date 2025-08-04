import { loginApi, signupApi } from "./auth.api";
import { useAuthStore } from "./auth.store";
import { LoginPayload, SignupPayload } from "./auth.types";

export const handleLogin = async (payload: LoginPayload) => {
  try {
    useAuthStore.getState().setLoading(true);
    const response = await loginApi(payload);
    useAuthStore.getState().login(response.token, response.user);
    return response;
  } catch (error) {
    throw error;
  } finally {
    useAuthStore.getState().setLoading(false);
  }
};

export const handleSignup = async (payload: SignupPayload) => {
  try {
    useAuthStore.getState().setLoading(true);
    const response = await signupApi(payload);
    useAuthStore.getState().login(response.token, response.user);
    return response;
  } catch (error) {
    throw error;
  } finally {
    useAuthStore.getState().setLoading(false);
  }
};
