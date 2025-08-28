import AuthCard from "@/components/auth/AuthCard.tsx";
import { Input } from "@/components/ui/input.tsx";
import { type FC, useState } from "react";
import { Button } from "@/components/ui/button.tsx";

type EmailCodeStepProps = {
  onChangeStep: () => void;
};

const EmailCodeStep: FC<EmailCodeStepProps> = ({ onChangeStep }) => {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const footer = (
    <Button
      className="w-full h-10"
      onClick={() =>
        !isEmailVerified ? setIsEmailVerified(true) : onChangeStep()
      }
    >
      {isEmailVerified ? "확인" : "인증번호 받기"}
    </Button>
  );

  return (
    <AuthCard footer={footer}>
      <form>
        <div className="flex flex-col gap-2">
          <Input
            id="email"
            type="email"
            placeholder="이메일"
            autoComplete="username"
            required
          />
          {isEmailVerified && (
            <Input
              id="verifyCode"
              type="password"
              autoComplete="current-password"
              placeholder="인증번호"
            />
          )}
        </div>
      </form>
    </AuthCard>
  );
};

export default EmailCodeStep;
