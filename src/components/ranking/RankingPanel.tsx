import { type FC, useEffect, useMemo, useState } from "react";
import RankingCategoryTabs from "@/components/ranking/RankingCategoryTabs.tsx";
import {
  type Category,
  type Period,
  PERIODS_BY_CATEGORY,
  type RankingItem,
} from "@/types/ranking.ts";
import RankingPeriodTabs from "@/components/ranking/RankingPeriodTabs.tsx";
import RankingTable from "@/components/ranking/RankingTable.tsx";
import MyPagination from "@/components/pagination/MyPagination.tsx";
import { useNavigate, useSearchParams } from "react-router";
import { subscribeRankings } from "@/apis/ranking.ts";
import { useStockWebSocket } from "@/hooks/useStockWebSocket.ts";
import { formatHHmm, formatMMDD } from "@/lib/utils.ts";

const RankingPanel: FC = () => {
  const navigate = useNavigate();
  const [updateDateTimeText, setUpdateDateTimeText] = useState("");
  const [searchParams] = useSearchParams();
  const [rankings, setRankings] = useState<RankingItem[]>([]);
  const [rankingPageItems, setRankingPageItems] = useState<RankingItem[]>([]);
  const liveChart = searchParams.get("liveChart") || "notional";
  const [currentPage, setCurrentPage] = useState(1);
  const [rankingCategory, setRankingCategory] = useState(liveChart as Category);
  const rankingPeriods = PERIODS_BY_CATEGORY[rankingCategory];
  const [loading, setLoading] = useState(false);
  const [selectedRankingPeriod, setSelectedRankingPeriod] = useState<Period>(
    rankingPeriods[0],
  );

  const { rtSymbols } = useStockWebSocket(rankingPageItems);

  const realTimeRankingItems = useMemo(
    () =>
      rankingPageItems.map((it) => {
        const rtSymbol = rtSymbols
          .filter((rtSym) => rtSym.symbol === it.symbol)
          .pop();
        return {
          ...it,
          rt_price: rtSymbol?.last,
          rt_ts: rtSymbol?.ts,
        };
      }),
    [rankingPageItems, rtSymbols],
  );

  useEffect(() => {
    setLoading(false);

    const unsubscribe = subscribeRankings(
      rankingCategory,
      selectedRankingPeriod,
      100,
      setRankings,
    );

    setCurrentPage(1);
    return unsubscribe;
  }, [rankingCategory, selectedRankingPeriod]);

  useEffect(() => {
    setRankingPageItems(
      rankings.slice((currentPage - 1) * 10, currentPage * 10),
    );
    setUpdateDateTimeText(
      rankings[0]
        ? formatMMDD(new Date(rankings[0]?.updated_at)) +
            " " +
            formatHHmm(new Date(rankings[0]?.updated_at))
        : "",
    );
    setLoading(true);
  }, [rankings, currentPage]);

  const handleChangeRankingCategory = (next: Category) => {
    setRankingCategory(next);
    setSelectedRankingPeriod(PERIODS_BY_CATEGORY[next][0]);
    return navigate("?liveChart=" + next, { replace: true });
  };

  return (
    <div className="w-full">
      <section>
        <div className="flex justify-start items-center gap-1.5">
          <div className="text-[20px] font-semibold text-grey-800 p-2">
            실시간 차트
          </div>
          <span className="text-sm text-grey-500">
            {updateDateTimeText} 기준
          </span>
        </div>
        <div className="px-2 pt-2">
          <RankingCategoryTabs
            rankingCategory={rankingCategory}
            onChangeRankingCategory={handleChangeRankingCategory}
          />
        </div>

        <div className="px-1 pt-2 pb-0.5">
          <RankingPeriodTabs
            selectedRankingPeriod={selectedRankingPeriod}
            rankingPeriods={rankingPeriods}
            onRankingPeriodChange={setSelectedRankingPeriod}
          />
        </div>

        {loading && (
          <>
            <div className="py-2">
              <RankingTable
                rankingPeriod={selectedRankingPeriod}
                rankingCategory={rankingCategory}
                rankingItems={realTimeRankingItems}
              />
            </div>

            <div className="pt-4">
              <MyPagination
                currentPage={currentPage}
                onCurrentPageChange={setCurrentPage}
              />
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default RankingPanel;
