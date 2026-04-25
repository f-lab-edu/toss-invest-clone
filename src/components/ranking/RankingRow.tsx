import { TableCell, TableRow } from "@/components/ui/table.tsx";
import { cn, commaFormat, getNotionalText } from "@/lib/utils.ts";
import { type FC, useEffect, useMemo, useRef, useState } from "react";
import type { RankingItem } from "@/types/ranking.ts";
import { useNavigate } from "react-router";

type RankingRowProps = {
  stock: RankingItem;
};

const ROW_BASE = "border-none text-gray-800 cursor-pointer";
const ZEBRA_BG = "bg-[#F9FAFB]";

const RankingRow: FC<RankingRowProps> = ({ stock }) => {
  const prevPctRef = useRef<number | null>(null);
  const stockPrice = stock.rt_price ?? stock.current_price;
  const 등락률 = ((stockPrice - stock.anchor_price) / stock.anchor_price) * 100;
  const fixed = Math.abs(등락률) >= 0.1 ? 1 : 2;
  const numberSign = 등락률 > 0 ? "+" : "";
  const 등락률Text = numberSign + 등락률.toFixed(fixed);

  const navigate = useNavigate();
  const to = `/stocks/${stock.symbol}/order`;
  const [flashClass, setFlashClass] = useState("");
  const changeTextClass = 등락률 > 0 ? "text-red-500" : "text-blue-600";
  const rowClass = cn(ROW_BASE, stock.rank % 2 === 1 && ZEBRA_BG);
  const changeClass = cn(changeTextClass);
  const gridCols = ["pct_up", "pct_down"].includes(stock.metric)
    ? "grid grid-cols-4"
    : "grid grid-cols-5";

  const 등락률flash = useMemo(() => {
    const prev = prevPctRef.current;
    prevPctRef.current = 등락률;
    if (prev === null || 등락률 === 0) return "";
    if (prev.toFixed(fixed) === 등락률.toFixed(fixed)) return "";
    return 등락률 > 0 ? "flash-up" : "flash-down";
  }, [등락률, fixed]);

  useEffect(() => {
    if (!등락률flash) return;
    setFlashClass("");
    const id = requestAnimationFrame(() => setFlashClass(등락률flash));
    return () => cancelAnimationFrame(id);
  }, [등락률flash]);

  return (
    <TableRow className={cn(rowClass, gridCols)} onClick={() => navigate(to)}>
      <TableCell className="justify-start font-medium col-span-2">
        <div className="flex">
          <div className="min-w-7 mx-2">{stock.rank}</div>
          <div>{stock.symbol}</div>
        </div>
      </TableCell>
      <TableCell className="justify-end col-span-1">
        <div className="px-1">${stockPrice.toFixed(2)}</div>
      </TableCell>
      <TableCell className="justify-end col-span-1">
        <div
          className={cn(
            changeClass,
            flashClass,
            "py-0.5 rounded-[6px] min-w-[91px] flex justify-end px-1 h-7",
          )}
        >
          {등락률Text}%
        </div>
      </TableCell>
      {stock.metric === "notional" && (
        <TableCell className="justify-end col-span-1 px-2">
          {getNotionalText(stock.value)}
        </TableCell>
      )}
      {stock.metric === "volume" && (
        <TableCell className="justify-end col-span-1 px-2">
          {commaFormat(stock.value)}주
        </TableCell>
      )}
    </TableRow>
  );
};

export default RankingRow;
