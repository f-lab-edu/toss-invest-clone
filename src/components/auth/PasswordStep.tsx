import AuthCard from "@/components/auth/AuthCard.tsx";
import { Input } from "@/components/ui/input.tsx";
import { type FC } from "react";
import { Button } from "@/components/ui/button.tsx";

const PasswordStep: FC = () => {
  const footer = <Button className="w-full h-10">확인</Button>;

  return (
    <AuthCard footer={footer}>
      <form>
        <div className="flex flex-col gap-2">
          <Input
            id="password"
            type="password"
            placeholder="비밀번호"
            autoComplete="new-password"
            required
          />
          <Input
            id="passwordConfirm"
            type="password"
            autoComplete="new-password"
            placeholder="비밀번호 확인"
          />
        </div>
      </form>
    </AuthCard>
  );
};

export default PasswordStep;
