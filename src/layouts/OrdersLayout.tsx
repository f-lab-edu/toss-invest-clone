import type { FC } from "react";
import Header from "@/components/header/Header.tsx";
import { Outlet } from "react-router";
import SideBar from "@/components/common/SideBar.tsx";

const OrdersLayout: FC = () => {
  return (
    <div className="flex bg-[#F6F7F9]">
      <div className="flex flex-col max-w-[1856px] min-w-0 flex-1">
        <Header paddingClass="px-5" />
        <main>
          <Outlet />
        </main>
      </div>
      <SideBar />
    </div>
  );
};

export default OrdersLayout;
