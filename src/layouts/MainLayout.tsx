import type {FC, ReactNode} from "react";
import Header from "@/components/common/Header.tsx";
import SideBar from "@/components/common/SideBar.tsx";

type LayoutProps = {
    children: ReactNode;
};

const MainLayout: FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex">
            <div className="flex w-full min-w-0 flex-1">
                <Header></Header>
            </div>
            <SideBar></SideBar>
            <main>{children}</main>
        </div>
    );
};

export default MainLayout;