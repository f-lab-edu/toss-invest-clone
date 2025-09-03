import type { FC } from "react";
import Header from "@/components/header/Header.tsx";
import SideBar from "@/components/common/SideBar";
import { Outlet } from "react-router";

const MainLayout: FC = () => {
  return (
    <div className="flex">
      <div className="flex flex-col max-w-[1856px] min-w-0 flex-1">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
      <SideBar />
    </div>
  );
};

export default MainLayout;