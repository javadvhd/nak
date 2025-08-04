export interface User {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginPayload {
  userName: string;
  password: string;
}

export interface SignupPayload extends LoginPayload {
  firstName: string;
  lastName: string;
}
export interface SignupPagePayload extends SignupPayload {
  confirmPassword: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthStore extends AuthState {
  login: (token: string) => void;
  logout: () => void;
  setLoading: (status: boolean) => void;
  initialize: () => void;
}
