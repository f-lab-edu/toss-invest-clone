import AuthLayout from "@/layouts/AuthLayout.tsx";
import { useState } from "react";
import EmailCodeStep from "@/components/auth/EmailCodeStep.tsx";
import PasswordStep from "@/components/auth/PasswordStep.tsx";

function SignUp() {
  const [isVerified, setIsVerified] = useState(false);

  return (
    <AuthLayout>
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col items-center gap-6 pt-20">
          <h1 className="text-4xl text-grey-opacity-800 font-semibold">
            회원가입
          </h1>
          {!isVerified ? (
            <EmailCodeStep onChangeStep={() => setIsVerified(true)} />
          ) : (
            <PasswordStep />
          )}
        </div>
      </div>
    </AuthLayout>
  );
}

export default SignUp;
