import type { FC } from "react";
import { Button } from "@/components/ui/button.tsx";
import CloseIcon from "@/assets/close.svg?react";

const AuthHeader: FC = () => {
  return (
    <Button variant="icon" size="icon">
      <CloseIcon className="text-grey-400" width="20" height="20" />
    </Button>
  );
};

export default AuthHeader;
