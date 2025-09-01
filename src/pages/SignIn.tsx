import AuthLayout from "@/layouts/AuthLayout.tsx";
import { NavLink, useNavigate, useSearchParams } from "react-router";
import SignInForm from "@/components/auth/SignInForm.tsx";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient.ts";

function SignIn() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const redirectQuery = searchParams.get("redirect") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async () => {
    // TODO: 사용자 정보 저장
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setErrorMessage("잘못된 정보를 입력하셨습니다.");
      return;
    }
    console.log(data);
    return navigate(redirect, { replace: true });
  };

  const onChangeEmail = (email: string) => {
    setEmail(email);
    if (errorMessage) setErrorMessage("");
  };

  const onChangePassword = (password: string) => {
    setPassword(password);
    if (errorMessage) setErrorMessage("");
  };

  return (
    <AuthLayout>
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col items-center gap-6 pt-20">
          <h1 className="text-4xl text-grey-opacity-800 font-semibold">
            로그인
          </h1>
          <SignInForm
            email={email}
            password={password}
            onChangeEmail={onChangeEmail}
            onChangePassword={onChangePassword}
            handleSignIn={handleSignIn}
            errorMessage={errorMessage}
          />
          <div className="text-sm space-x-1 font-medium">
            <span className="text-grey-opacity-500">아직 회원이 아닌가요?</span>
            <NavLink
              to={`/signup?redirect=${encodeURIComponent(redirectQuery)}`}
            >
              <span className="underline underline-offset-2 text-blue-500 hover:bg-blue-500/10 p-1 rounded-sm cursor-pointer">
                가입하기
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default SignIn;
