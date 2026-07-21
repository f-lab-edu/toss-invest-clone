import AuthCard from "@/components/auth/AuthCard.tsx";
import { Input } from "@/components/ui/input.tsx";
import { type FC } from "react";
import { Button } from "@/components/ui/button.tsx";

type SignInFormProps = {
  email: string;
  password: string;
  onChangeEmail: (email: string) => void;
  onChangePassword: (password: string) => void;
  handleSignIn: () => void;
  errorMessage: string;
};

const SignInForm: FC<SignInFormProps> = ({
  email,
  password,
  onChangeEmail,
  onChangePassword,
  handleSignIn,
  errorMessage,
}) => {
  const footer = (
    <Button className="w-full h-10" onClick={handleSignIn}>
      로그인
    </Button>
  );

  return (
    <AuthCard footer={footer} errorMessage={errorMessage}>
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
          <Input
            id="password"
            type="password"
            placeholder="비밀번호"
            autoComplete="current-password"
            value={password}
            onChange={(e) => onChangePassword(e.target.value)}
            required
          />
        </div>
      </form>
    </AuthCard>
  );
};

export default SignInForm;
