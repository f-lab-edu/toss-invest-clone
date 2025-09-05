import { type FC, useState } from "react";
import { Button } from "@/components/ui/button.tsx";

const DefaultHeader: FC = () => {
  const [isLogin] = useState(false);
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
  );
};

export default DefaultHeader;
