import type { FC, ReactNode } from "react";
import Header from "@/components/common/Header.tsx";

type LayoutProps = {
  children: ReactNode;
};

const AuthLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-full min-w-0 flex-1">
      <Header variant="auth"></Header>
      <main>{children}</main>
    </div>
  );
};

export default AuthLayout;
