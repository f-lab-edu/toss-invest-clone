import { TableCell, TableRow } from "@/components/ui/table.tsx";
import { cn } from "@/lib/utils.ts";
import type { FC } from "react";
import type { Stock } from "@/types/ranking.ts";

type RankingRowProps = {
  stock: Stock;
};

const ROW_BASE = "border-none text-gray-800 cursor-pointer";
const ZEBRA_BG = "bg-[#F9FAFB]";

const RankingRow: FC<RankingRowProps> = ({ stock }) => {
  const 등락률 =
    ((stock.price.close - stock.price.base) / stock.price.base) * 100;
  const fixed = Math.abs(등락률) >= 0.1 ? 1 : 2;
  const 등락률Text = (Math.round(등락률 * fixed * 10) / (fixed * 10)).toFixed(
    fixed,
  );

  const changeTextClass = 등락률 > 0 ? "text-red-500" : "text-blue-600";
  const rowClass = cn(ROW_BASE, stock.rank % 2 === 1 && ZEBRA_BG);
  const changeClass = cn(changeTextClass, "text-right");

  return (
    <TableRow key={stock.rank} className={rowClass}>
      <TableCell className="font-medium">
        <div className="flex">
          <div className="min-w-7 mx-2">{stock.rank}</div>
          <div>{stock.name}</div>
        </div>
      </TableCell>
      <TableCell className="text-right">${stock.price.base}</TableCell>
      <TableCell className={changeClass}>{등락률Text}%</TableCell>
    </TableRow>
  );
};

export default RankingRow;
