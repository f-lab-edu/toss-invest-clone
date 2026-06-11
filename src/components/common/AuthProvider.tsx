import { supabase } from "@/lib/supabaseClient.ts";
import { authReadyAtom, sessionAtom } from "@/stores/authAtoms.ts";
import type { AuthSession } from "@/types/auth.ts";
import type { Session } from "@supabase/supabase-js";
import { useSetAtom } from "jotai";
import { useCallback, useEffect, type FC, type ReactNode } from "react";

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

  const initialize = useCallback(async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    if (data.session != null) {
      setSession(mapSupabaseSession(data.session));
    }
  }, [setSession]);

  useEffect(() => {
    initialize().finally(() => setAuthReady(true));

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(mapSupabaseSession(session));
    });

    return () => sub.subscription.unsubscribe();
  }, [setSession, setAuthReady, initialize]);

  return <>{children}</>;
};
