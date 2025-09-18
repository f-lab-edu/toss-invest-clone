import { Button } from "@/components/ui/button";
import { type FC } from "react";
import { NavLink, useLocation } from "react-router";
import { useAuth } from "@/hooks/useAuth.ts";

const DefaultHeader: FC = () => {
  const { isLogin, isAuthReady } = useAuth();
  const location = useLocation();
  return (
    <>
      <div className="flex-1">
        <ul className="flex text-[15px]">
          <li className="px-3 py-1.5">홈</li>
          <li className="px-3 py-1.5">주식 골라보기</li>
          <li className="px-3 py-1.5">내 계좌</li>
        </ul>
      </div>
      <div>
        {!isLogin && isAuthReady && (
          <NavLink
            to={`/signin?redirect=${encodeURIComponent(location.pathname)}`}
          >
            <Button variant="default" size="sm">
              로그인
            </Button>
          </NavLink>
        )}
        {isLogin && isAuthReady && (
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
  );
};

export default DefaultHeader;
