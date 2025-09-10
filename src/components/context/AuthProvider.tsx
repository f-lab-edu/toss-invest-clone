import { useEffect, type FC, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import type { AuthSession } from "@/types/auth.ts";
import { useSetAtom } from "jotai";
import { authReadyAtom, sessionAtom } from "@/stores/authAtoms.ts";
import { supabase } from "@/lib/supabaseClient.ts";

interface AuthProviderProps {
  children: ReactNode;
}

function mapSupabaseSession(session: Session | null): AuthSession | null {
  if (!session) return null;
  return {
    accessToken: session.access_token,
    refreshToken: session.refresh_token ?? undefined,
    expiresAt: session.expires_at ?? Math.floor(Date.now() / 1000) + 60 * 30,
  };
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const setSession = useSetAtom(sessionAtom);
  const setAuthReady = useSetAtom(authReadyAtom);

  useEffect(() => {
    setAuthReady(false);
    supabase.auth.getSession().then(({ data }) => {
      setSession(mapSupabaseSession(data.session));
      setAuthReady(true);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(mapSupabaseSession(session));
    });

    return () => sub.subscription.unsubscribe();
  }, [setSession, setAuthReady]);

  return <>{children}</>;
};
