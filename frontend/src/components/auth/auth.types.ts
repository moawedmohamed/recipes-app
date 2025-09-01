export interface AuthFormData {
  username: string;
  email: string;
  password: string;
}
export interface AuthFormDataLogin {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
}
