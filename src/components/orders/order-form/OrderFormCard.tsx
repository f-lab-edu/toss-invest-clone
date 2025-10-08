import { type FC, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import OrderSideTab from "@/components/orders/order-form/OrderSideTab.tsx";
import BuyOrderForm from "@/components/orders/order-form/BuyOrderForm.tsx";
import SellOrderForm from "@/components/orders/order-form/SellOrderForm.tsx";
import ScheduledOrderForm from "@/components/orders/order-form/ScheduledOrderForm.tsx";

const OrderFormCard: FC = () => {
  const [orderFormType, setOrderFormType] = useState("buy");

  return (
    <div className="flex flex-col h-full">
      <div className="text-sm px-1.5 pt-2 pb-3 font-semibold">주문하기</div>
      <div className="flex-1 overflow-y-auto">
        <div className="sticky top-0 pb-3">
          <OrderSideTab
            orderFormType={orderFormType}
            onOrderFormTypeChange={setOrderFormType}
          />
        </div>

        {orderFormType === "buy" && <BuyOrderForm />}
        {orderFormType === "sell" && <SellOrderForm />}
        {orderFormType === "scheduled" && <ScheduledOrderForm />}
      </div>
      <div className="shrink-0 pt-2">
        <Button className="w-full bg-red-500 hover:bg-red-600">
          구매 예약하기
        </Button>
      </div>
    </div>
  );
};

export default OrderFormCard;
