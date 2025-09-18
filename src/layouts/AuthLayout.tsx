import type { FC } from "react";
import { Outlet } from "react-router";
import Header from "@/components/layout/Header.tsx";

const AuthLayout: FC = () => {
  return (
    <div className="flex flex-col w-full min-w-0 flex-1">
      <Header variant="auth" />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
