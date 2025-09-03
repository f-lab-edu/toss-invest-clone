import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { cn } from "@/lib/utils.ts";
import type { FC } from "react";
import type { Stock } from "@/types/ranking.ts";

type RankingTableProps = {
  stocks: Stock[];
};

const RankingTable: FC<RankingTableProps> = ({ stocks }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent border-none">
          <TableHead>종목</TableHead>
          <TableHead className="text-right">현재가</TableHead>
          <TableHead className="text-right">등락률</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stocks.map((stock: Stock) => (
          <TableRow
            key={stock.rank}
            className={cn(
              stock.rank % 2 === 1 ? "bg-[#f9fafb]" : null,
              "border-none text-grey-800 cursor-pointer",
            )}
          >
            <TableCell className="font-medium">
              <div className="flex">
                <div className="min-w-7 mx-2">{stock.rank}</div>
                <div>{stock.name}</div>
              </div>
            </TableCell>
            <TableCell className="text-right">${stock.price.base}</TableCell>
            <TableCell
              className={cn(
                "text-right",
                ((stock.price.close - stock.price.base) / stock.price.base) *
                  100 >
                  0
                  ? "text-red-500"
                  : "text-blue-600",
              )}
            >
              {(
                Math.round(
                  ((stock.price.close - stock.price.base) / stock.price.base) *
                    1000,
                ) / 10
              ).toFixed(1)}
              %
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RankingTable;
