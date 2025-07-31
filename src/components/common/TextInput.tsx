// components/form/TextInput.tsx

import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface TextInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  requiredMark?: boolean;
  description?: string;
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  requiredMark = true,
  description,
  required,
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {requiredMark && <span className="text-red-500"> *</span>}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder || `Enter ${label.toLowerCase()}`}
              {...field}
            />
          </FormControl>

          {/* Optional description below the input */}
          {description && (
            <FormDescription className="text-muted-foreground text-sm">
              {description}
            </FormDescription>
          )}

          {/* Shows validation error if any */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextInput;
