import AuthCard from "@/components/auth/AuthCard.tsx";
import { Input } from "@/components/ui/input.tsx";
import type { FC } from "react";
import { Button } from "@/components/ui/button.tsx";

const SignInForm: FC = () => {
  const footer = <Button className="w-full h-10">로그인</Button>;

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
          <Input
            id="password"
            type="password"
            placeholder="비밀번호"
            autoComplete="current-password"
            required
          />
        </div>
      </form>
    </AuthCard>
  );
};

export default SignInForm;
