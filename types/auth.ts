export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export interface User {
  user_Id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface AuthenticatedUser {
  userId: number;
  email: string;
}

export interface JwtPayload {
  userId: number;
  email: string;
  [key: string]: unknown;
}