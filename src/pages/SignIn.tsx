import AuthLayout from "@/layouts/AuthLayout.tsx";
import { NavLink } from "react-router";
import SignInForm from "@/components/auth/SignInForm.tsx";

function SignIn() {
  return (
    <AuthLayout>
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col items-center gap-6 pt-20">
          <h1 className="text-4xl text-grey-opacity-800 font-semibold">
            로그인
          </h1>
          <SignInForm />
          <div className="text-sm space-x-1 font-medium">
            <span className="text-grey-opacity-500">아직 회원이 아닌가요?</span>
            <NavLink to="/signup">
              <span className="underline underline-offset-2 text-blue-500 hover:bg-blue-500/10 p-1 rounded-sm cursor-pointer">
                가입하기
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default SignIn;
