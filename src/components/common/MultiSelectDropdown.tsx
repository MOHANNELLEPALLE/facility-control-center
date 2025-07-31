import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import debounce from "lodash.debounce";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown } from "lucide-react";
import clsx from "clsx";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  name: string;
  label?: string;
  options: Option[];
  placeholder?: string;
  description?: string;
  required?: boolean;
  isMulti?: boolean;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  name,
  label,
  options,
  placeholder = "Select...",
  description,
  required = false,
  isMulti = false,
}) => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const debouncedSearch = useMemo(() => debounce(setSearch, 300), []);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);

  useEffect(() => {
    setFilteredOptions(
      options.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, options]);

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          const selected = field.value || (isMulti ? [] : "");

          const handleSelect = (val: string) => {
            if (isMulti) {
              const current = Array.isArray(selected) ? [...selected] : [];
              if (current.includes(val)) {
                setValue(
                  name,
                  current.filter((v) => v !== val)
                );
              } else {
                setValue(name, [...current, val]);
              }
            } else {
              field.onChange(val);
              setOpen(false); // close on single select
            }
          };

          const isSelected = (val: string) =>
            isMulti ? selected.includes(val) : selected === val;

          const selectedLabels = isMulti
            ? options
                .filter((opt) => selected.includes(opt.value))
                .map((opt) => opt.label)
                .join(", ")
            : options.find((opt) => opt.value === selected)?.label || "";

          return (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <div
                  className="flex min-h-[38px] w-full cursor-pointer items-center justify-between rounded border px-3 py-2 text-sm"
                  onClick={() => setOpen(true)}
                >
                  <span
                    className={clsx({
                      "text-muted-foreground": !selectedLabels,
                    })}
                  >
                    {selectedLabels || placeholder}
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[250px] p-2 space-y-1">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full rounded border px-2 py-1 text-sm mb-2"
                  onChange={(e) => debouncedSearch(e.target.value)}
                  onFocus={() => setOpen(true)}
                />

                <div className="max-h-[200px] overflow-y-auto space-y-1">
                  {filteredOptions.length ? (
                    filteredOptions.map((opt) => (
                      <div
                        key={opt.value}
                        onClick={() => handleSelect(opt.value)}
                        className={clsx(
                          "flex cursor-pointer items-center justify-between rounded px-2 py-1 hover:bg-muted",
                          isSelected(opt.value) && "bg-muted"
                        )}
                      >
                        <span>{opt.label}</span>
                        {isSelected(opt.value) && (
                          <Check className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground px-2">
                      No results found
                    </p>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          );
        }}
      />

      {errors[name] && (
        <p className="text-sm text-red-500">
          {(errors[name] as any)?.message || "This field is required"}
        </p>
      )}
    </div>
  );
};
