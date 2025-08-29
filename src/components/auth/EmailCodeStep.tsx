import AuthCard from "@/components/auth/AuthCard.tsx";
import { Input } from "@/components/ui/input.tsx";
import { type FC } from "react";
import { Button } from "@/components/ui/button.tsx";

type EmailCodeStepProps = {
  email: string;
  verifyCode: string;
  isCodeSent: boolean;
  onChangeEmail: (v: string) => void; // ✅ 변경 콜백
  onChangeVerifyCode: (v: string) => void;
  handleVerificationAction: () => void;
};

const EmailCodeStep: FC<EmailCodeStepProps> = ({
  email,
  verifyCode,
  onChangeEmail,
  onChangeVerifyCode,
  isCodeSent,
  handleVerificationAction,
}) => {
  const footer = (
    <Button
      className="w-full h-10"
      onClick={handleVerificationAction}
      disabled={!isCodeSent ? email.length === 0 : verifyCode.length === 0}
    >
      {isCodeSent ? "확인" : "인증번호 받기"}
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
            autoComplete="email"
            value={email}
            onChange={(e) => onChangeEmail(e.target.value)}
            required
          />
          {isCodeSent && (
            <Input
              id="verifyCode"
              type="text"
              autoComplete="one-time-code"
              placeholder="인증번호"
              value={verifyCode}
              onChange={(e) => onChangeVerifyCode(e.target.value)}
            />
          )}
        </div>
      </form>
    </AuthCard>
  );
};

export default EmailCodeStep;
