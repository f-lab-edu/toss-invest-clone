import RankingPanel from "@/components/ranking/RankingPanel.tsx";

function Home() {
  return (
    <div className="w-full py-4 px-[clamp(16px,_calc(10vw_-_112px),_32px)]">
      <div className="min-w-[1100px] max-w-[1280px] mx-auto">
        <section className="flex gap-x-6 py-4 px-2">
          <span className="text-sm text-grey-500">국내 장 닫힘</span>
          <span className="text-sm">해외 프리마켓</span>
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
