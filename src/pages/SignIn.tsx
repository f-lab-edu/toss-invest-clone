import AuthLayout from "@/layouts/AuthLayout.tsx";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button.tsx";

function SignIn() {
  return (
    <AuthLayout>
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col items-center gap-6 pt-20">
          <h1 className="text-4xl text-grey-opacity-800 font-semibold">
            로그인
          </h1>
          <Card className="w-[404px]">
            <CardContent>
              <form>
                <div className="flex flex-col gap-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="이메일"
                    required
                  />
                  <Input
                    id="password"
                    type="password"
                    placeholder="비밀번호"
                    required
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full h-10">로그인</Button>
            </CardFooter>
          </Card>
          <div className="text-sm space-x-1 font-medium">
            <span className="text-grey-opacity-500">아직 회원이 아닌가요?</span>
            <span className="underline underline-offset-2 text-blue-500 hover:bg-blue-500/10 p-1 rounded-sm cursor-pointer">
              가입하기
            </span>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default SignIn;
