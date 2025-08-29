import AuthCard from "@/components/auth/AuthCard.tsx";
import { Input } from "@/components/ui/input.tsx";
import { type FC } from "react";
import { Button } from "@/components/ui/button.tsx";

type PasswordStepProps = {
  password: string;
  passwordConfirm: string;
  onChangePassword: (password: string) => void;
  onChangePasswordConfirm: (password: string) => void;
  handleSignUpAction: () => void;
};

const PasswordStep: FC<PasswordStepProps> = ({
  password,
  passwordConfirm,
  onChangePassword,
  onChangePasswordConfirm,
  handleSignUpAction,
}) => {
  const isLengthOk = password.length >= 8;
  const isMatch = password === passwordConfirm && passwordConfirm.length > 0;
  const canSubmit = isLengthOk && isMatch;

  const footer = (
    <Button
      className="w-full h-10"
      disabled={!canSubmit}
      onClick={handleSignUpAction}
    >
      확인
    </Button>
  );

  return (
    <AuthCard footer={footer}>
      <form>
        <div className="flex flex-col gap-2">
          <Input
            id="password"
            type="password"
            placeholder="비밀번호(8자 이상)"
            autoComplete="new-password"
            minLength={8}
            value={password}
            onChange={(e) => onChangePassword(e.target.value)}
            required
          />
          <Input
            id="passwordConfirm"
            type="password"
            autoComplete="new-password"
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            onChange={(e) => onChangePasswordConfirm(e.target.value)}
          />
          {!isLengthOk && password.length > 0 && (
            <p className="text-xs text-red-500">
              비밀번호는 최소 8자 이상이어야 합니다.
            </p>
          )}
          {!isMatch && passwordConfirm.length > 0 && (
            <p className="text-xs text-red-500">
              비밀번호가 일치하지 않습니다.
            </p>
          )}
        </div>
      </form>
    </AuthCard>
  );
};

export default PasswordStep;
