import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import type { FC } from "react";
import type { Stock } from "@/types/ranking.ts";
import RankingRow from "@/components/ranking/RankingRow.tsx";

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
          <RankingRow key={stock.rank} stock={stock} />
        ))}
      </TableBody>
    </Table>
  );
};

export default RankingTable;
