import { type FC } from "react";
import DefaultHeader from "@/components/header/DefaultHeader.tsx";
import AuthHeader from "@/components/header/AuthHeader.tsx";
import CompactHeader from "@/components/header/CompactHeader.tsx";

type HeaderProps = {
  variant?: "default" | "compact" | "auth";
};

const Header: FC<HeaderProps> = ({ variant = "default" }) => {
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
        {variant === "default" && <DefaultHeader />}
        {variant === "auth" && <AuthHeader />}
        {variant === "compact" && <CompactHeader />}
      </nav>
    </header>
  );
};

export default Header;
