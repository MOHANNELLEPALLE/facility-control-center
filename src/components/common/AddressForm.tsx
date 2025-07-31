import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "@/hooks/useDebounce";
import { useLazyGetCitiesQuery } from "@/store/features/commonApi";
import * as z from "zod";

// Schema for address only
interface AddressFormProps {
  showonlyCity?: boolean;
}
const AddressForm: React.FC<AddressFormProps> = ({ showonlyCity = false }) => {
  const [citySearch, setCitySearch] = useState("");
  const debouncedCitySearch = useDebounce(citySearch, 500);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  console.log("AddressForm rendered with showonlyCity:", showonlyCity);
  const formSchema = z.object({
    address: z.object({
      branch: z.string().min(1, "Branch is required"),
      line1: z.string().min(1, "Line 1 is required"),
      line2: z.string().optional(),
      zipcode: z.string().min(1, "Zipcode is required"),
      city: z.string().min(1, "City is required"),
      state: z.string().min(1, "State is required"),
      country: z.string().min(1, "Country is required"),
    }),
  });
  type FormValues = z.infer<typeof formSchema>;

  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<FormValues>();

  const [triggerCities, { data: cityData, isFetching }] =
    useLazyGetCitiesQuery();

  useEffect(() => {
    const currentCity = getValues("address.city");
    if (currentCity) setCitySearch(currentCity);
  }, [getValues]);

  useEffect(() => {
    if (debouncedCitySearch.trim() && !debouncedCitySearch.includes(",")) {
      triggerCities({ limit: 10, keyword: debouncedCitySearch });
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
    }
  }, [debouncedCitySearch, triggerCities]);

  const citySuggestions = Array.isArray(cityData?.data) ? cityData.data : [];

  const handleSelectCity = (city: any) => {
    const fullCity = `${city.name}, ${city.state_name}, ${city.country_name}`;
    setCitySearch(fullCity);
    setValue("address.city", city.name);
    setValue("address.state", city.state_name);
    setValue("address.country", city.country_name);
    setDropdownVisible(false);
  };

  const handleClear = () => {
    setValue("address.city", "");
    setCitySearch("");
    inputRef.current?.focus();
    setDropdownVisible(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {!showonlyCity && (
        <div>
          <div>
            <Label>Branch</Label>
            <Input {...register("address.branch")} placeholder="Enter branch" />
            {errors.address?.branch && (
              <p className="text-sm text-red-500">
                {errors.address.branch.message}
              </p>
            )}
          </div>

          <div>
            <Label>Line 1</Label>
            <Input
              {...register("address.line1")}
              placeholder="Enter address line 1"
            />
            {errors.address?.line1 && (
              <p className="text-sm text-red-500">
                {errors.address.line1.message}
              </p>
            )}
          </div>

          <div>
            <Label>Line 2</Label>
            <Input
              {...register("address.line2")}
              placeholder="Enter address line 2"
            />
          </div>

          <div>
            <Label>Zip Code</Label>
            <Input
              {...register("address.zipcode")}
              placeholder="Enter zip code"
            />
            {errors.address?.zipcode && (
              <p className="text-sm text-red-500">
                {errors.address.zipcode.message}
              </p>
            )}
          </div>
        </div>
      )}
      {/* CITY FIELD WITH VALIDATION & DROPDOWN */}
      <div className="relative md:col-span-2">
        <Label>City</Label>
        <div className="relative">
          <Input
            ref={inputRef}
            value={citySearch}
            onChange={(e) => {
              setCitySearch(e.target.value);
              setValue("address.city", e.target.value);
            }}
            onFocus={() => citySearch && setDropdownVisible(true)}
            onBlur={() => setTimeout(() => setDropdownVisible(false), 150)}
            placeholder="Search city"
            className="pr-8"
          />
          {citySearch && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 hover:text-black"
            >
              <X size={16} />
            </button>
          )}
        </div>
        {errors.address?.city && (
          <p className="text-sm text-red-500">{errors.address.city.message}</p>
        )}
        {isDropdownVisible && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-56 overflow-auto">
            {isFetching ? (
              <div className="p-2 text-gray-500 text-sm">Loading...</div>
            ) : citySuggestions.length > 0 ? (
              citySuggestions.map((city: any) => (
                <div
                  key={city._id}
                  onClick={() => handleSelectCity(city)}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  <div className="font-medium">{city.name}</div>
                  <div className="text-xs text-gray-600">
                    {city.state_name}, {city.country_name}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500 text-sm">No cities found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressForm;
