import { type FC, useState } from "react";
import { TabsList, Tabs, TabsTrigger } from "@/components/ui/tabs.tsx";
import {
  TableHeader,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table.tsx";

const StockPricePanel: FC = () => {
  const [priceStreamMode, setPriceStreamMode] = useState("daily");
  const priceStreams = [
    {
      id: 1,
      time: "09.19",
      close: "19.63",
      등락률: "4.47",
      notional: "21억",
      volume: "110,268,630",
      open: "19.26",
      high: "19.94",
      low: "19.24",
    },
  ];

  return (
    <div>
      <div className="text-sm px-1.5 py-2 font-semibold">
        일별 · 실시간 시세
      </div>
      <Tabs
        value={priceStreamMode}
        onValueChange={(value: string) => {
          setPriceStreamMode(value);
        }}
      >
        <TabsList className="w-full text-sm">
          <TabsTrigger className="w-full" value="realtime">
            실시간
          </TabsTrigger>
          <TabsTrigger className="w-full" value="daily">
            일별
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Table>
        <TableHeader>
          <TableRow className="text-sm">
            <TableHead className="text-left w-[10%]">일자</TableHead>
            <TableHead className="text-right w-[10%]">종가</TableHead>
            <TableHead className="text-right w-[15%]">등락률</TableHead>
            <TableHead className="text-right w-[20%]">거래량 (주)</TableHead>
            <TableHead className="text-right w-[20%]">거래대금</TableHead>
            <TableHead className="text-right w-[10%]">시가</TableHead>
            <TableHead className="text-right w-[10%]">고가</TableHead>
            <TableHead className="text-right w-[10%]">저가</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {priceStreams.map((stream) => (
            <TableRow key={stream.id}>
              <TableCell className="text-sm w-[10%]">{stream.time}</TableCell>
              <TableCell className="text-sm px-2 justify-end w-[10%]">
                ${stream.close}
              </TableCell>
              <TableCell className="text-sm px-2 justify-end w-[15%]">
                {stream.등락률}%
              </TableCell>
              <TableCell className="text-sm px-2 justify-end w-[20%]">
                {stream.volume}
              </TableCell>
              <TableCell className="text-sm px-2 justify-end w-[20%]">
                ${stream.notional}
              </TableCell>
              <TableCell className="text-sm px-2 justify-end w-[10%]">
                ${stream.open}
              </TableCell>
              <TableCell className="text-sm px-2 justify-end w-[10%]">
                ${stream.high}
              </TableCell>
              <TableCell className="text-sm px-2 justify-end w-[10%]">
                ${stream.low}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StockPricePanel;
