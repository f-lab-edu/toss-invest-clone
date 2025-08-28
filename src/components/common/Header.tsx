import { Button } from "@/components/ui/button";
import { type FC, useState } from "react";
import CloseIcon from "@/assets/close.svg?react";

type HeaderProps = {
  variant?: "default" | "compact" | "auth";
};

const Header: FC<HeaderProps> = ({ variant = "default" }) => {
  const [isLogin] = useState(false);
  const isDefault = variant === "default";
  const isAuth = variant === "auth";

  return (
    <header className="max-w-[1856px] w-full h-13 sticky-top-0 flex items-center">
      <nav className="min-w-[712px] w-full h-10 mx-auto flex justify-between items-center px-8">
        <div className="min-w-[120px] shrink-0">
          <img
            src="/src/assets/logo.png"
            width="78"
            height="20"
            alt="로고이미지"
          />
        </div>
        {isDefault && (
          <>
            <div className="flex-1">
              <ul className="flex text-[15px]">
                <li className="px-3 py-1.5">홈</li>
                <li className="px-3 py-1.5">주식 골라보기</li>
                <li className="px-3 py-1.5">내 계좌</li>
              </ul>
            </div>
            <div>
              {isLogin ? (
                <Button variant="default" size="sm">
                  로그인
                </Button>
              ) : (
                <img
                  className="rounded-md"
                  src="/src/assets/profile.webp"
                  width="32"
                  height="32"
                  alt="프로필이미지"
                />
              )}
            </div>
          </>
        )}
        {isAuth && (
          <Button variant="icon" size="icon">
            <CloseIcon className="text-grey-400" width="20" height="20" />
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Header;
