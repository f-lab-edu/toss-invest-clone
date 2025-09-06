import AuthCard from "@/components/auth/AuthCard.tsx";
import { Input } from "@/components/ui/input.tsx";
import { type FC, useState } from "react";
import { Button } from "@/components/ui/button.tsx";

type EmailCodeStepProps = {
  onChangeStep: () => void;
};

const EmailCodeStep: FC<EmailCodeStepProps> = ({ onChangeStep }) => {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [email, setEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const handleVerificationAction = () => {
    if (!isCodeSent) {
      // TODO: 이메일로 인증코드 발송 API
      setIsCodeSent(true);
    } else {
      // TODO: 인증번호 검증 API
      onChangeStep();
    }
  };

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
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {isCodeSent && (
            <Input
              id="verifyCode"
              type="text"
              autoComplete="one-time-code"
              placeholder="인증번호"
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value)}
            />
          )}
        </div>
      </form>
    </AuthCard>
  );
};

export default EmailCodeStep;
