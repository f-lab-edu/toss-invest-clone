import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { FC, ReactNode } from "react";

type AuthCardProps = {
  children: ReactNode;
  footer?: ReactNode;
  errorMessage?: string;
};

const AuthCard: FC<AuthCardProps> = ({ children, footer, errorMessage }) => {
  return (
    <Card className="w-[404px] gap-4">
      <CardContent>
        {children}
        {errorMessage && (
          <p className="text-xs text-red-500 pt-1">{errorMessage}</p>
        )}
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};

export default AuthCard;
