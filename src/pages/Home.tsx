import RankingPanel from "@/components/ranking/RankingPanel.tsx";
import { useMarketInfo } from "@/hooks/useMarketInfo.ts";
import { cn } from "@/lib/utils.ts";

function Home() {
  const { isMarketInfoLoading, marketInfo } = useMarketInfo();
  const marketOpenBgClass =
    marketInfo?.marketName === "장 닫힘" ? "bg-grey-400" : "bg-green-700";
  const marketOpenTextClass =
    marketInfo?.marketName === "장 닫힘"
      ? "text-grey-opacity-500"
      : "text-grey-opacity-800 font-semibold";

  if (isMarketInfoLoading) return null;

  return (
    <div className="w-full py-4 px-[clamp(16px,_calc(10vw_-_112px),_32px)]">
      <div className="min-w-[1100px] max-w-[1280px] mx-auto">
        <section className="flex py-4 px-2">
          <span className="flex pr-2.5 justify-center items-center">
            <div
              className={cn(marketOpenBgClass, "w-1.5 h-1.5 rounded-full")}
            ></div>
          </span>
          <span className={cn(marketOpenTextClass, "text-sm")}>
            해외 {marketInfo?.marketName}
          </span>
        </section>
        <div className="flex">
          <section className="max-w-[840px] min-w-[690px]">
            <RankingPanel />
          </section>
          <div className="mx-6 w-[1px] bg-grey-200"></div>
          <aside className="w-[280px]"></aside>
        </div>
      </div>
    </div>
  );
}

export default Home;
