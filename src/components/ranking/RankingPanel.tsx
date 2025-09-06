import { type FC, useState } from "react";
import RankingCategoryTabs from "@/components/ranking/RankingCategoryTabs.tsx";
import {
  type Category,
  type Period,
  PERIODS_BY_CATEGORY,
} from "@/types/ranking.ts";
import RankingPeriodTabs from "@/components/ranking/RankingPeriodTabs.tsx";
import RankingTable from "@/components/ranking/RankingTable.tsx";
import MyPagination from "@/components/pagination/MyPagination.tsx";
import { useNavigate, useSearchParams } from "react-router";

const RankingPanel: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // 임시 데이터
  const stocks = [
    {
      rank: 1,
      productCode: "US20180315001",
      name: "지스케일러",
      logoImageUrl:
        "https://static.toss.im/png-icons/securities/icn-sec-fill-ZS.png",
      price: {
        base: 274.57,
        close: 279.18,
        Volume: 305,
        Amount: 118481891,
      },
      extraInfo: {
        Buy: 1,
        Sell: 305,
      },
    },
    {
      rank: 2,
      productCode: "US20060713004",
      name: "QID",
      logoImageUrl:
        "https://static.toss.im/png-icons/securities/icn-sec-fill-QID.png?20240617",
      price: {
        base: 24.41,
        close: 24.28,
        Volume: 1651,
        Amount: 55815676,
      },
      extraInfo: {
        Buy: 1651,
        Sell: 0,
      },
    },
    {
      rank: 3,
      productCode: "US20220714004",
      name: "NVDS",
      logoImageUrl:
        "https://static.toss.im/png-icons/securities/icn-sec-fill-NVDS.png?20240715",
      price: {
        base: 12.75,
        close: 12.83,
        Volume: 2000,
        Amount: 35784680,
      },
      extraInfo: {
        Buy: 0,
        Sell: 2000,
      },
    },
    {
      rank: 4,
      productCode: "US20210611006",
      name: "퀀텀 Si",
      logoImageUrl:
        "https://static.toss.im/png-icons/securities/icn-sec-fill-QSI.png",
      price: {
        base: 1.08,
        close: 1.09,
        Volume: 23454,
        Amount: 35269937,
      },
      extraInfo: {
        Buy: 10,
        Sell: 23454,
      },
    },
    {
      rank: 5,
      productCode: "US20100311003",
      name: "SOXS",
      logoImageUrl:
        "https://static.toss.im/png-icons/securities/icn-sec-fill-SOXS.png?20240417",
      price: {
        base: 7.35,
        close: 7.42,
        Volume: 3409,
        Amount: 35219641,
      },
      extraInfo: {
        Buy: 3160,
        Sell: 249,
      },
    },
    {
      rank: 6,
      productCode: "US19971008002",
      name: "TSMC(ADR)",
      logoImageUrl:
        "https://static.toss.im/png-icons/securities/icn-sec-fill-NYS001Y70-E0.png?20240424",
      price: {
        base: 228.39,
        close: 229.13,
        Volume: 100,
        Amount: 31753682,
      },
      extraInfo: {
        Buy: 100,
        Sell: 2,
      },
    },
    {
      rank: 7,
      productCode: "NAS0250624007",
      name: "OKLL",
      logoImageUrl:
        "https://static.toss.im/png-icons/securities/icn-sec-fill-OKLL.png",
      price: {
        base: 29.9,
        close: 30.26,
        Volume: 722,
        Amount: 30054926,
      },
      extraInfo: {
        Buy: 25,
        Sell: 697,
      },
    },
    {
      rank: 8,
      productCode: "US20070530002",
      name: "BIL",
      logoImageUrl:
        "https://static.toss.im/png-icons/securities/icn-sec-fill-BIL.png?20240415",
      price: {
        base: 91.47,
        close: 91.5,
        Volume: 217,
        Amount: 27637703,
      },
      extraInfo: {
        Buy: 217,
        Sell: 16,
      },
    },
    {
      rank: 9,
      productCode: "AMX0240401004",
      name: "BITU",
      logoImageUrl:
        "https://static.toss.im/png-icons/securities/icn-sec-fill-BITU.png?20240617",
      price: {
        base: 50.94,
        close: 50.8,
        Volume: 300,
        Amount: 21416876,
      },
      extraInfo: {
        Buy: 5,
        Sell: 300,
      },
    },
    {
      rank: 10,
      productCode: "US20201208006",
      name: "뉴스케일파워",
      logoImageUrl:
        "https://static.toss.im/png-icons/securities/icn-sec-fill-SMR.png",
      price: {
        base: 37.24,
        close: 37.26,
        Volume: 401,
        Amount: 20993911,
      },
      extraInfo: {
        Buy: 396,
        Sell: 5,
      },
    },
  ];
  const liveChart = searchParams.get("liveChart") || "notional";
  const [currentPage, setCurrentPage] = useState(1);
  const [rankingCategory, setRankingCategory] = useState(liveChart as Category);
  const rankingPeriods = PERIODS_BY_CATEGORY[rankingCategory];
  const [selectedRankingPeriod, setSelectedRankingPeriod] = useState<Period>(
    rankingPeriods[0],
  );

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
          <span className="text-sm text-grey-500">오늘 20:30 기준</span>
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

        <div className="py-2">
          <RankingTable stocks={stocks} />
        </div>

        <div className="pt-4">
          <MyPagination
            currentPage={currentPage}
            onCurrentPageChange={setCurrentPage}
          />
        </div>
      </section>
    </div>
  );
};

export default RankingPanel;
