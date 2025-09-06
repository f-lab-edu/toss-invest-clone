import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { FC, ReactNode } from "react";

type AuthCardProps = {
  children: ReactNode;
  footer?: ReactNode;
};

const AuthCard: FC<AuthCardProps> = ({ children, footer }) => {
  return (
    <Card className="w-[404px]">
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};

export default AuthCard;
