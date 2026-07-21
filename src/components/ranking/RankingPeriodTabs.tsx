import type { FC } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import type { Period } from "@/types/ranking.ts";
import { getPeriodText } from "@/lib/utils.ts";

type RankingPeriodTabsProps = {
  selectedRankingPeriod: Period;
  rankingPeriods: Period[];
  onRankingPeriodChange: (period: Period) => void;
};

const RankingPeriodTabs: FC<RankingPeriodTabsProps> = ({
  selectedRankingPeriod,
  rankingPeriods,
  onRankingPeriodChange,
}) => {
  return (
    <Tabs
      value={selectedRankingPeriod}
      onValueChange={(value: string) => onRankingPeriodChange(value as Period)}
    >
      <TabsList>
        {rankingPeriods.map((period) => (
          <TabsTrigger key={period} value={period}>
            {getPeriodText(period)}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
export default RankingPeriodTabs;
