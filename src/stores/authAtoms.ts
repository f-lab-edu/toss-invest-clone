import { atom } from "jotai";
import { supabase } from "@/lib/supabaseClient";
import type {
  AuthSession,
  AuthResult,
  LoginCredentials,
  SignUpCredentials,
  AuthUser,
} from "@/types/auth";
import type { Session, User } from "@supabase/supabase-js";

function mapSupabaseSession(session: Session | null): AuthSession | null {
  if (!session) return null;
  return {
    accessToken: session.access_token,
    refreshToken: session.refresh_token ?? undefined,
    expiresAt: session.expires_at ?? Math.floor(Date.now() / 1000) + 60 * 30,
  };
}

function mapSupabaseUser(user: User | null): AuthUser | null {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email || "",
  };
}

export const authReadyAtom = atom<boolean>(false);

export const sessionAtom = atom<AuthSession | null>(null);

export const isAuthenticatedAtom = atom((get) => {
  const session = get(sessionAtom);
  return !!(session?.accessToken && session.expiresAt * 1000 > Date.now());
});

export const userAtom = atom<Promise<AuthUser | null>>(async (get) => {
  const authed = get(isAuthenticatedAtom);
  if (!authed) return null;

  const { data, error } = await supabase.auth.getUser(); // 세션 기반으로 현재 유저 조회
  if (error) throw error;

  if (!data.user) return null;

  return mapSupabaseUser(data.user);
});

export const signInAtom = atom(
  null,
  async (_get, set, credentials: LoginCredentials): Promise<AuthResult> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw error;

      set(sessionAtom, mapSupabaseSession(data.session));

      return {
        success: true,
        user: data.user,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      console.error("Login error:", error);
      return { success: false, error: errorMessage };
    }
  },
);

export const signUpAtom = atom(
  null,
  async (_get, _set, credentials: SignUpCredentials): Promise<AuthResult> => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw error;

      return {
        success: true,
        user: data.user,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Sign up failed";
      console.error("Sign up error:", error);
      return { success: false, error: errorMessage };
    }
  },
);
