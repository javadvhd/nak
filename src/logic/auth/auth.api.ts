import { axiosInstance } from "../../api/axiosInstance";
import { LoginPayload, LoginResponse, SignupPayload } from "./auth.types";

export const loginApi = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    "/auth/login",
    payload
  );
  return response.data;
};

export const signupApi = async (
  payload: SignupPayload
): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    "/auth/signup",
    payload
  );
  return response.data;
};
