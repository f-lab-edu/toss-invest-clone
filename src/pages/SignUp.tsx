import AuthLayout from "@/layouts/AuthLayout.tsx";
import { useState } from "react";
import EmailCodeStep from "@/components/auth/EmailCodeStep.tsx";
import PasswordStep from "@/components/auth/PasswordStep.tsx";
import { supabase } from "@/lib/supabaseClient.ts";

function SignUp() {
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const signInWithOtp = async (email: string) => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
    });
    if (error) return console.error(error);
    return data;
  };

  const verifyOtp = async (email: string, token: string) => {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });
    if (error) return console.error(error);
    return data;
  };

  const handleSignUpAction = () => {
    // TODO: 회원가입 API 연동
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
              onChangeEmail={setEmail}
              onChangeVerifyCode={setVerifyCode}
              handleVerificationAction={handleVerificationAction}
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
