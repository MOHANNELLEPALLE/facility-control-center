// components/common/FormSwitch.tsx
import { useController, Control } from "react-hook-form";
import { Switch } from "@/components/ui/switch"; // your styled switch
import { Label } from "@/components/ui/label";

interface FormSwitchProps {
  name: string;
  control: Control<any>;
  label?: string;
  description?: string;
  disabled?: boolean;
}

export const FormSwitch = ({
  name,
  control,
  label,
  description,
  disabled = false,
}: FormSwitchProps) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    defaultValue: false,
  });

  return (
    <div className="flex items-center space-x-3">
      <Switch
        checked={value}
        onCheckedChange={onChange}
        id={name}
        disabled={disabled}
      />
      {label && <Label htmlFor={name}>{label}</Label>}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};
