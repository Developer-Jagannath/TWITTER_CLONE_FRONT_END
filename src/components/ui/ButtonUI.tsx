import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ButtonUIProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const ButtonUI = ({ loading, children, ...props }: ButtonUIProps) => (
  <Button {...props} disabled={loading || props.disabled}>
    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
    {children}
  </Button>
);

export default ButtonUI;
