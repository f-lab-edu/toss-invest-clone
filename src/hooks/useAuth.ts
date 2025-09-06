import { useAtomValue, useSetAtom } from "jotai";
import {
  userAtom,
  isAuthenticatedAtom,
  authReadyAtom,
  signInAtom,
  signUpAtom,
} from "@/stores/authAtoms";
import type { LoginCredentials, SignUpCredentials } from "../types/auth";

export const useAuth = () => {
  const user = useAtomValue(userAtom);
  const isLogin = useAtomValue(isAuthenticatedAtom);
  const isAuthReady = useAtomValue(authReadyAtom);

  const signIn = useSetAtom(signInAtom);
  const signUp = useSetAtom(signUpAtom);

  return {
    user,
    isLogin,
    isAuthReady,
    signIn: (credentials: LoginCredentials) => signIn(credentials),
    signUp: (credentials: SignUpCredentials) => signUp(credentials),
  };
};
