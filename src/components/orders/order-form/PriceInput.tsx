import MinusIcon from "@/assets/minus.svg?react";
import PlusIcon from "@/assets/plus.svg?react";
import type { FC } from "react";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";

type priceInputProps = {
  currencyLabel: string;
  currencyValue: number;
  onPriceInputChange: (value: number) => void;
};

const PriceInput: FC<priceInputProps> = ({
  currencyLabel,
  currencyValue,
  onPriceInputChange,
}) => {
  return (
    <div className="flex gap-x-1">
      <div className="relative flex items-center">
        <Input
          inputMode="decimal"
          value={Number.isNaN(currencyValue) ? "" : currencyValue}
          onChange={(e) => onPriceInputChange(Number(e.target.value))}
          className="h-8 text-[13px]"
        />
        <span className="pointer-events-none absolute right-3 text-[13px] text-grey-700">
          {currencyLabel}
        </span>
      </div>

      <div className="rounded-[8px] h-8 shrink-0 inline-flex items-center bg-grey-100">
        <Button
          size="icon"
          className="w-7 rounded-r-none bg-grey-100 hover:bg-grey-opacity-100"
        >
          <MinusIcon className="size-2.5 text-grey-500" />
        </Button>

        <Button
          size="icon"
          className="w-7 rounded-l-none bg-grey-100  hover:bg-grey-opacity-100"
        >
          <PlusIcon className="size-2.5 text-grey-500" />
        </Button>
      </div>
    </div>
  );
};

export default PriceInput;
