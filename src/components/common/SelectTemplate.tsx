import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FC } from "react";

type SelectItem = {
  label: string;
  value: string;
  description?: string;
};

type SelectTemplateProps = {
  defalutValue: string;
  selectItems: SelectItem[];
  selectLabel?: string;
  placeHolder?: string;
  onChange: (value: string) => void;
};

const SelectTemplate: FC<SelectTemplateProps> = ({
  defalutValue,
  selectItems,
  placeHolder,
  onChange,
  selectLabel,
}) => {
  return (
    <Select onValueChange={onChange} defaultValue={defalutValue}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeHolder ?? ""} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="gap-y-1">
          {selectLabel && <SelectLabel>{selectLabel}</SelectLabel>}
          {selectItems.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              description={item.description}
            >
              <div className="font-medium">{item.label}</div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectTemplate;
