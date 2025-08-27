import type {FC, ReactNode} from "react";
import Header from "@/components/common/Header.tsx";
import SideBar from "@/components/common/SideBar.tsx";

type LayoutProps = {
    children: ReactNode;
};

const MainLayout: FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex">
            <div className="flex flex-col w-full min-w-0 flex-1">
                <Header></Header>
                <main>{children}</main>
            </div>
            <SideBar></SideBar>
        </div>
    );
};

export default MainLayout;