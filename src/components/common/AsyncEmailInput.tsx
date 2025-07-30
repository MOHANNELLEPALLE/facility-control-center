import React from "react";
import { useFormContext, useFormState } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSearchUserByEmailorPhoneNumberMutation } from "@/store/features/userApi";
import { toast } from "@/hooks/use-toast";

interface AsyncEmailInputProps {
  name: string;
  label?: string;
  placeholder?: string;
}

const AsyncEmailInput: React.FC<AsyncEmailInputProps> = ({
  name,
  label = "Email Address *",
  placeholder = "Enter email address",
}) => {
  const { control, setError } = useFormContext();
  const { errors } = useFormState({ control });
  const [searchUserByEmailorPhoneNumber, { data, isLoading, error }] =
    useSearchUserByEmailorPhoneNumberMutation();
  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value?.trim();
    if (!value) return;

    try {
      const res = await searchUserByEmailorPhoneNumber(value).unwrap();
      const { email } = res?.data;

      if (email) {
        toast({
          title: "User Check",
          description: "Email already in use",
        });

        setError(name as any, {
          type: "manual",
          message: "Email already in use",
        });
      }
    } catch (err) {
      console.error("Account check failed:", err);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="email"
              placeholder={placeholder}
              {...field}
              onBlur={(e) => {
                field.onBlur(); // mark field as touched
                handleBlur(e);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const EmailComponent = React.memo(AsyncEmailInput);
