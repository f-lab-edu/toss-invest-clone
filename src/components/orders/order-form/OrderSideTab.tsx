import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import type { FC } from "react";

type OrderSideTabProps = {
  orderFormType: string;
  onOrderFormTypeChange: (orderFormType: string) => void;
};

const OrderSideTab: FC<OrderSideTabProps> = ({
  orderFormType,
  onOrderFormTypeChange,
}) => {
  return (
    <Tabs value={orderFormType} onValueChange={onOrderFormTypeChange}>
      <TabsList className="w-full text-sm">
        <TabsTrigger
          className="w-full data-[state=active]:text-red-500"
          value="order"
        >
          구매
        </TabsTrigger>
        <TabsTrigger
          className="w-full data-[state=active]:text-blue-500"
          value="sell"
        >
          판매
        </TabsTrigger>
        <TabsTrigger
          className="w-full data-[state=active]:text-[#03b26c]"
          value="wait"
        >
          대기
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default OrderSideTab;
