import { type FC } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import type { Category } from "@/types/ranking.ts";

type RankingCategoryTabsProps = {
  rankingCategory: Category;
  onChangeRankingCategory: (rankingCategory: Category) => void;
};

const RankingCategoryTabs: FC<RankingCategoryTabsProps> = ({
  rankingCategory,
  onChangeRankingCategory,
}) => {
  return (
    <Tabs
      value={rankingCategory}
      onValueChange={(value: string) =>
        onChangeRankingCategory(value as Category)
      }
    >
      <TabsList variant="underline" className="gap-x-2.5">
        <TabsTrigger variant="underline" value="notional">
          거래대금
        </TabsTrigger>
        <TabsTrigger variant="underline" value="volume">
          거래량
        </TabsTrigger>
        <TabsTrigger variant="underline" value="pct_up">
          급상승
        </TabsTrigger>
        <TabsTrigger variant="underline" value="pct_down">
          급하락
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default RankingCategoryTabs;
