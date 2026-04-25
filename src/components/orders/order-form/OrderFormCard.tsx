import { type FC, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Button } from "@/components/ui/button.tsx";
import MySelect from "@/components/common/MySelect.tsx";
import PriceInput from "@/components/orders/order-form/PriceInput.tsx";
import OrderSideTab from "@/components/orders/order-form/OrderSideTab.tsx";

const OrderFormCard: FC = () => {
  const [orderFormType, setOrderFormType] = useState("order");
  const [orderType, setOrderType] = useState("regularScheduled");
  const [direction, setDirection] = useState(19.16);
  const [orderPriceType, setOrderPriceType] = useState("");
  const [orderCount, setOrderCount] = useState(0);
  const orderTypes = [
    {
      label: "정규장 주문 예약",
      value: "regularScheduled",
      description: "다음 정규장이 시작되면 주문",
    },
    { label: "LOC 주문", value: "limitOnClose", description: "" },
    {
      label: "조건 주문",
      value: "conditional",
      description: "지정된 가격이 되면 자동으로 주문",
    },
  ];

  return (
    <div>
      <div className="text-sm px-1.5 pt-2 pb-3 font-semibold">주문하기</div>
      <div className="overflow-y-auto">
        <div className="sticky pb-3">
          <OrderSideTab
            orderFormType={orderFormType}
            onOrderFormTypeChange={setOrderFormType}
          />
        </div>

        {/* 기능 추가 후 리팩토링 예정*/}
        <div className="text-sm font-medium flex flex-col gap-y-2">
          <div className="flex pr-1 pl-2 gap-x-2 items-center justify-between">
            <div className="w-[60px] shrink-0">주문 유형</div>
            <div className="flex-1">
              <MySelect
                defalutValue={orderType}
                selectItems={orderTypes}
                onChange={setOrderType}
              ></MySelect>
            </div>
          </div>

          <div className="flex items-center w-full px-2 py-2">
            <div className="w-1/2">구매가능 금액</div>
            <div className="w-1/2 text-right">$871.01</div>
          </div>

          <div className="flex pr-1 pl-2 gap-x-2 items-center justify-between">
            <div className="w-[60px] shrink-0">감시가격</div>
            <div className="flex-1">
              <PriceInput
                currencyLabel="달러"
                currencyValue={direction}
                onPriceInputChange={setDirection}
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-2 pr-1 pl-2 gap-x-2 justify-between">
            <div className="flex gap-x-2">
              <div className="w-[60px] shrink-0 flex items-center">
                구매가격
              </div>
              <div className="flex-1">
                <Tabs
                  value={orderPriceType}
                  onValueChange={(value: string) => {
                    setOrderPriceType(value);
                  }}
                >
                  <TabsList className="w-full text-sm">
                    <TabsTrigger className="w-full" value="Limit">
                      지정가
                    </TabsTrigger>
                    <TabsTrigger className="w-full" value="market">
                      시장가
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            <div className="flex gap-x-2">
              <div className="w-[60px] shrink-0"></div>
              <div className="flex-1">
                <PriceInput
                  currencyLabel="달러"
                  currencyValue={direction}
                  onPriceInputChange={setDirection}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <div className="flex pr-1 pl-2 gap-x-2 items-center justify-between">
              <div className="w-[60px] shrink-0">수량</div>
              <div className="flex-1">
                <PriceInput
                  currencyLabel="주"
                  currencyValue={orderCount}
                  onPriceInputChange={setOrderCount}
                />
              </div>
            </div>
            <div className="flex pr-1 pl-2 gap-x-2">
              <div className="w-[60px] shrink-0"></div>
              <div className="flex flex-1 gap-x-1">
                <Button
                  size="sm"
                  className="flex-1 bg-grey-100 hover:bg-grey-200 text-grey-800"
                >
                  10%
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-grey-100 hover:bg-grey-200 text-grey-800"
                >
                  25%
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-grey-100 hover:bg-grey-200 text-grey-800"
                >
                  50%
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-grey-100 hover:bg-grey-200 text-grey-800"
                >
                  최대
                </Button>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center w-full px-2 py-2">
              <div className="w-1/2">내 주식 평균</div>
              <div className="w-1/2 text-right">$17.18</div>
            </div>

            <div className="flex items-center w-full px-2 py-2">
              <div className="w-1/2">구매 후 예상</div>
              <div className="w-1/2 text-right">-</div>
            </div>

            <div className="flex items-center w-full px-2 py-2">
              <div className="w-1/2">현재 수익</div>
              <div className="w-1/2 text-right text-red-500">
                +$32.71 (10.2%)
              </div>
            </div>

            <div className="px-1 py-2 min-h-9 flex flex-col justify-center items-center">
              <hr className="h-[1px] w-full" />
            </div>

            <div className="flex items-center w-full px-2 py-2">
              <div className="w-1/2">구매가능 금액</div>
              <div className="w-1/2 text-right">$871.01</div>
            </div>

            <div className="flex items-center w-full px-2 py-2">
              <div className="w-1/2">총 주문금액</div>
              <div className="w-1/2 text-right">$0.00</div>
            </div>
          </div>

          <Button className="sticky bottom-0 w-full bg-red-500">
            구매 예약하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderFormCard;
