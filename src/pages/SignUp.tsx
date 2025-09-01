import AuthLayout from "@/layouts/AuthLayout.tsx";
import { useState } from "react";
import EmailCodeStep from "@/components/auth/EmailCodeStep.tsx";
import PasswordStep from "@/components/auth/PasswordStep.tsx";
import { supabase } from "@/lib/supabaseClient.ts";
import { useNavigate, useSearchParams } from "react-router";

function SignUp() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const postSignUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.updateUser({ email, password });
    if (error) return console.error(error);
    return data;
  };

  const signInWithOtp = async (email: string) => {
    const { data, error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      console.error(error);
      return;
    }
    return data;
  };

  const verifyOtp = async (email: string, token: string) => {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });
    if (error) {
      setErrorMessage("인증번호가 틀렸습니다.");
      return;
    }
    return data;
  };

  const onChangeEmail = (email: string) => {
    setEmail(email);
    if (errorMessage) setErrorMessage(""); // 에러 메시지 초기화
  };

  const onChangeVerifyCode = (verifyCode: string) => {
    setVerifyCode(verifyCode);
    if (errorMessage) setErrorMessage("");
  };

  const handleSignUpAction = async () => {
    // TODO: 전체 로그인 상태로 변경
    const result = await postSignUp(email, password);
    console.log(result);
    return navigate(redirect, { replace: true });
  };

  const handleVerificationAction = async () => {
    if (!isCodeSent) {
      const result = await signInWithOtp(email);
      if (result) setIsCodeSent(true);
    } else {
      const result = await verifyOtp(email, verifyCode);
      if (result) setIsVerified(true);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col items-center gap-6 pt-20">
          <h1 className="text-4xl text-grey-opacity-800 font-semibold">
            회원가입
          </h1>
          {!isVerified ? (
            <EmailCodeStep
              email={email}
              verifyCode={verifyCode}
              isCodeSent={isCodeSent}
              onChangeEmail={onChangeEmail}
              onChangeVerifyCode={onChangeVerifyCode}
              handleVerificationAction={handleVerificationAction}
              errorMessage={errorMessage}
            />
          ) : (
            <PasswordStep
              password={password}
              passwordConfirm={passwordConfirm}
              onChangePassword={setPassword}
              onChangePasswordConfirm={setPasswordConfirm}
              handleSignUpAction={handleSignUpAction}
            />
          )}
        </div>
      </div>
    </AuthLayout>
  );
}

export default SignUp;
