import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import type { FC } from "react";
import type { Category, Period, RankingItem } from "@/types/ranking.ts";
import RankingRow from "@/components/ranking/RankingRow.tsx";
import { cn, getPeriodText } from "@/lib/utils.ts";

type RankingTableProps = {
  rankingPeriod: Period;
  rankingCategory: Category;
  rankingItems: RankingItem[];
};

const HEAD_CATEGORIES = {
  notional: "거래대금 많은 순",
  volume: "거래량 많은 순",
  pct_up: "등락률 높은 순",
  pct_down: "등락률 낮은 순",
} as const;

const RankingTable: FC<RankingTableProps> = ({
  rankingPeriod,
  rankingCategory,
  rankingItems,
}) => {
  const rankingHeadName =
    (rankingPeriod === "RT" ? "" : getPeriodText(rankingPeriod)) +
    " " +
    HEAD_CATEGORIES[rankingCategory];

  const gridCols = ["pct_up", "pct_down"].includes(rankingCategory)
    ? "grid grid-cols-4"
    : "grid grid-cols-5";

  return (
    <Table>
      <TableHeader>
        <TableRow className={cn("hover:bg-transparent border-none", gridCols)}>
          <TableHead className="text-left col-span-2">종목</TableHead>
          <TableHead className="text-right col-span-1">현재가</TableHead>
          {!["pct_up", "pct_down"].includes(rankingCategory) && (
            <TableHead className="text-right col-span-1">등락률</TableHead>
          )}
          <TableHead className="text-right font-medium text-blue-500 col-span-1">
            {rankingHeadName}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rankingItems.map((stock) => (
          <RankingRow key={stock.rank} stock={stock} />
        ))}
      </TableBody>
    </Table>
  );
};

export default RankingTable;
