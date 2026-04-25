import ChartLineIcon from "@/assets/chartLine.svg?react";
import HeartIcon from "@/assets/heart.svg?react";
import CheckBoxIcon from "@/assets/checkBox.svg?react";
import ChevronLeftDuoIcon from "@/assets/chevronLeftDuo.svg?react";
import { type ComponentType, type FC, type SVGProps, useState } from "react";
import { cn } from "@/lib/utils.ts";

type NavItemProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
};

const NavItem: FC<NavItemProps> = ({ icon: Icon, label }) => {
  return (
    <button
      type="button"
      className="w-12 h-16 mt-1 flex flex-col items-center justify-center group cursor-pointer"
    >
      <span className="w-8 h-8 flex items-center justify-center rounded-md group-hover:bg-grey-opacity-200 transition-colors">
        <Icon
          width={20}
          height={20}
          className="text-grey-400 group-hover:text-grey-800 transition-colors"
        />
      </span>
      <span className="text-xs text-grey-opacity-600 group-hover:text-grey-opacity-800 group-hover:font-semibold transition-colors">
        {label}
      </span>
    </button>
  );
};

const SideBar: FC = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  return (
    <div
      data-open={isOpenSidebar}
      className={cn(
        "group/sidebar z-1000 sticky right-0 bottom-0 top-0 flex overflow-hidden",
        isOpenSidebar ? "w-[370px]" : "w-[56px]",
        "transition-[width] duration-200 ease-in-out",
      )}
    >
      <div className="absolute inset-y-0 right-0 w-[56px] z-10 bg-[#f6f7f9] border-l border-grey-opacity-200 pt-1.5">
        <nav className="flex flex-col justify-center items-center">
          <div className="w-8 h-12 flex justify-center items-center group cursor-pointer">
            <div
              className="w-8 h-8 flex items-center justify-center group-hover:bg-grey-opacity-200 rounded-md"
              onClick={() => setIsOpenSidebar(!isOpenSidebar)}
              data-open={isOpenSidebar}
            >
              <ChevronLeftDuoIcon
                width="28"
                height="28"
                className="text-grey-400 group-hover:text-grey-800 transition-transform duration-200 transform-gpu
                                            group-data-[open=true]/sidebar:rotate-180"
              />
            </div>
          </div>
          <NavItem icon={ChartLineIcon} label="내 투자" />
          <NavItem icon={HeartIcon} label="관심" />
          <NavItem icon={CheckBoxIcon} label="최근 본" />
        </nav>
      </div>
      <div
        className="w-[314px] h-full bg-[#f6f7f9] border-l border-grey-opacity-200 pt-1.5
                           translate-x-[370px] transition-transform duration-200 ease-in-out
                           group-data-[open=true]/sidebar:translate-x-0"
      ></div>
    </div>
  );
};

export default SideBar;
