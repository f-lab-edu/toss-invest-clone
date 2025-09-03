import type { FC } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import type { Period } from "@/types/ranking.ts";

type RankingPeriodTabsProps = {
  selectedRankingPeriod: Period;
  rankingPeriods: Period[];
  onChangeRankingPeriod: (period: Period) => void;
};

const RankingPeriodTabs: FC<RankingPeriodTabsProps> = ({
  selectedRankingPeriod,
  rankingPeriods,
  onChangeRankingPeriod,
}) => {
  return (
    <Tabs
      value={selectedRankingPeriod}
      onValueChange={(value: string) => onChangeRankingPeriod(value as Period)}
    >
      <TabsList>
        {rankingPeriods.map((period) => (
          <TabsTrigger key={period} value={period}>
            {period === "rt"
              ? "실시간"
              : period === "1d"
                ? "1일"
                : period === "7d"
                  ? "1주일"
                  : period === "1m"
                    ? "1개월"
                    : period === "3m"
                      ? "3개월"
                      : period === "6m"
                        ? "6개월"
                        : "1년"}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
export default RankingPeriodTabs;
