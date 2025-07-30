import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useFormContext, Controller } from "react-hook-form";
import { useSearchUserByEmailorPhoneNumberMutation } from "@/store/features/userApi";
import { toast } from "@/hooks/use-toast";

interface PhoneInputFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

const PhoneNumberInput: React.FC<PhoneInputFieldProps> = ({
  name,
  label,
  placeholder = "Enter phone number",
  disabled = false,
}) => {
  const {
    control,
    formState: { errors },
    setError,
    clearErrors,
  } = useFormContext();

  const [searchUserByEmailorPhoneNumber] =
    useSearchUserByEmailorPhoneNumberMutation();

  const maxDigits = 13;
  const allowedCountries = ["in", "us"];

  const handlePhoneBlur = async (value?: string) => {
    if (!value) return;

    // Ensure value starts with '+'
    const formattedValue = value.startsWith("+") ? value : `+${value}`;

    if (formattedValue.length > 10) {
      try {
        const res = await searchUserByEmailorPhoneNumber(
          formattedValue
        ).unwrap();
        const { phone } = res?.data;

        if (phone) {
          setError(name, {
            type: "manual",
            message: "Phone number already in use",
          });
          toast({
            title: "User Check",
            description: "Phone number already in use",
          });
        } else {
          clearErrors(name);
        }
      } catch (err) {
        toast({
          title: "User Check",
          description: "Could not verify phone number. Try again later.",
        });
      }
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="font-medium">{label}</label>}

      <Controller
        name={name}
        control={control}
        rules={{
          required: "Phone number is required", // ✅ Required field validation
        }}
        render={({ field }) => (
          <PhoneInput
            country="in"
            onlyCountries={allowedCountries}
            value={field.value}
            onChange={(value) => {
              const digitsOnly = value.replace(/\D/g, "");
              const updatedValue = `+${digitsOnly}`;
              if (digitsOnly.length <= maxDigits) {
                field.onChange(updatedValue);
              }
            }}
            onBlur={() => handlePhoneBlur(field.value)}
            countryCodeEditable={false}
            placeholder={placeholder}
            disabled={disabled}
            inputClass={`!w-full !h-10 !text-black ${
              errors[name] ? "!border-red-500" : ""
            }`}
            containerClass="!w-full"
            inputProps={{
              name,
              required: true,
              autoFocus: false,
            }}
          />
        )}
      />

      {errors[name] && (
        <span className="text-sm text-red-500">
          {errors[name]?.message?.toString()}
        </span>
      )}
    </div>
  );
};

export default PhoneNumberInput;
