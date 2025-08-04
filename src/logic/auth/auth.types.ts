export interface User {
  id: string;
  // usermame: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface SignupPayload extends LoginPayload {
  name: string;
  confirmPassword: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthStore extends AuthState {
  login: (token: string, user: User) => void;
  logout: () => void;
  setLoading: (status: boolean) => void;
  initialize: () => void;
}
