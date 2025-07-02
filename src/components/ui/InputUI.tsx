import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";  

interface InputUIProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const InputUI = React.forwardRef<HTMLInputElement, InputUIProps>(
  ({ label, error, ...props }, ref) => (
    <div className="space-y-1">
      {label && <Label>{label}</Label>}
      <Input ref={ref} {...props} />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
);

InputUI.displayName = "InputUI";
export default InputUI;
