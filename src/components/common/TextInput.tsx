// components/form/TextInput.tsx

import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface TextInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  requiredMark?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  requiredMark = true,
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
            {requiredMark && " *"}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder || `Enter ${label.toLowerCase()}`}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextInput;
