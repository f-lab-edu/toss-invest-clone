import { type FC } from "react";
import DefaultHeader from "@/components/header/DefaultHeader.tsx";
import AuthHeader from "@/components/header/AuthHeader.tsx";
import CompactHeader from "@/components/header/CompactHeader.tsx";
import { cn } from "@/lib/utils.ts";

type HeaderProps = {
  variant?: "default" | "compact" | "auth";
  paddingClass?: string;
};

const Header: FC<HeaderProps> = ({
  variant = "default",
  paddingClass = "px-8",
}) => {
  return (
    <header className="max-w-[1856px] w-full h-13 sticky-top-0 flex items-center">
      <nav
        className={cn(
          "min-w-[712px] w-full h-10 mx-auto flex justify-between items-center",
          paddingClass,
        )}
      >
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
