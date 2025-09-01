import type { User } from "@supabase/supabase-js";

export type AuthUser = {
  id: string;
  email: string;
};

export type AuthSession = {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type AuthResult = {
  success: boolean;
  error?: string;
  user?: User | null;
};

export type SignUpCredentials = {
  email: string;
  password: string;
};
