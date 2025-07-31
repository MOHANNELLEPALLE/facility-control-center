import React, { lazy, useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/dashboard/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import TextInput from "@/components/common/TextInput";
import { EmailComponent } from "@/components/common/AsyncEmailInput";
import { AlertCircle, Copy, Eye, EyeOff } from "lucide-react";
import { Label } from "recharts";
import PhoneNumberInput from "@/components/common/PhoneNumberInput";
import GenderSelector from "@/components/common/GenderSelector";
import { MultiSelect } from "@/components/common/MultiSelectDropdown";
import { useGetHospitalServicesQuery } from "@/store/features/commonApi";
import { useAddUsersInBulkMutation } from "@/store/features/userApi";
const AddressComponent = lazy(() => import("@/components/common/AddressForm"));

const addressSchema = z.object({
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
});
const formSchema = z.object({
  first_name: z.string().min(2, { message: "First name is required" }),
  last_name: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().min(7, { message: "Phone number is required" }),
  salutation: z.string().min(1).min(2, { message: "salutation is required" }),
  gender: z.string().optional(),
  password: z.string().min(1, "Password is required"),
  education: z.string().min(2, { message: "Education details are required" }),
  yearsOfExperience: z
    .string()
    .min(1, { message: "Years of experience is required" }),
  services: z
    .array(z.string().min(1))
    .min(1, { message: "At least one service must be selected" }),

  address: addressSchema,
});

export type FormValues = z.infer<typeof formSchema>;
const generatePassword = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*?";
  let password = "";
  for (let i = 0; i < 10; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};
const AddDoctor = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      gender: undefined,
      address: {
        city: "",
        state: "",
        country: "",
      },
      services: [],
      salutation: "",
      education: "",
      yearsOfExperience: "",
      password: generatePassword(),
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;
  const [showPassword, setShowPassword] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const { data: servicesData } = useGetHospitalServicesQuery();
  const [addUsersInBulk] = useAddUsersInBulkMutation();
  const doctorServiceOptions = useMemo(() => {
    return (
      servicesData?.map((item) => ({
        label: item.name,
        value: item._id,
      })) ?? []
    );
  }, [servicesData]);
  console.log("Hospital Services Data:", doctorServiceOptions);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Formvalues in add Doctor", data);
    if (errors.phone) {
      console.log("Phone error in Children Component:", errors.phone.message);
      toast({
        title: "Validation Error",
        description: errors.phone.message,
        variant: "destructive",
      });
      return;
    }
    if (errors.email) {
      console.log("email error in Children Component:", errors.email.message);
      toast({
        title: "Validation Error",
        description: errors.email.message,
        variant: "destructive",
      });
      return;
    }
    const payload = [
      {
        ...data,
        password: generatedPassword,

        name: {
          first_name: data.first_name,
          last_name: data.last_name,
          middle_name: "",
        },
        roles: "patient",
        sourceOfSignup: "talhospitals",
      },
    ];
    addUsersInBulk(payload)
      .unwrap()
      .then(() => {
        toast({
          title: "Patient Added Successfully",
          description:
            "The patient account has been created with the generated credentials.",
        });
        reset();
        setGeneratedPassword(generatePassword());
      })
      .catch((err) => {
        toast({
          title: "Error Adding Patient",
          description: err?.message || "Something went wrong.",
          variant: "destructive",
        });
      });
    reset();
  };
  useEffect(() => {
    setGeneratedPassword(generatePassword());
  }, []);
  const copyPassword = () => {
    navigator.clipboard.writeText(generatedPassword);
    toast({
      title: "Password Copied",
      description: "The password has been copied to your clipboard.",
    });
  };
  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form validation errors:", errors);
  };
  return (
    <DashboardLayout>
      <PageHeader
        title="Add Doctor"
        description="Create a new doctor profile in the system."
      />

      <div className="mt-6">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="space-y-6 mt-6"
          >
            {/* Personal Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium mb-6">Personal Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextInput name="first_name" label="First Name" />
                <TextInput name="last_name" label="Last Name" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <EmailComponent name="email" />

                {/* Password Section */}
                <div className="space-y-2">
                  <Label>Generated Password (Read-Only)</Label>
                  <div className="relative">
                    {/* <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={generatedPassword}
                      readOnly
                      className="pr-20 bg-muted"
                    /> */}
                    <TextInput
                      name="password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={copyPassword}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
                    <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-amber-800">
                      Please store your password in a secure place — it will not
                      be shown again. This password is required for accessing
                      your account and must be kept confidential. If you lose
                      it, you'll need to contact the technical team to generate
                      a new one.
                    </p>
                  </div>
                </div>

                <PhoneNumberInput name="phone" label="Phone Number" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <MultiSelect
                  name="salutation"
                  label="Salutation"
                  description="Select the title for the doctor."
                  options={[
                    { label: "Dr", value: "dr" },
                    { label: "Professor", value: "professor" },
                  ]}
                  required
                />
                <GenderSelector name="gender" />
              </div>
            </div>

            {/* Location Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium mb-6">Location Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AddressComponent showonlyCity={true} />
              </div>
            </div>

            {/* Professional Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium mb-6">
                Professional Information
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <TextInput name="education" label="Education" />
                <TextInput
                  name="yearsOfExperience"
                  label="Experience"
                  type="number"
                />
                <MultiSelect
                  name="services"
                  label="Services"
                  description="Example: Cardiac Surgery, Echocardiogram, etc."
                  options={doctorServiceOptions}
                  required
                  isMulti={true}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-health-600 hover:bg-health-700"
              >
                Add Doctor
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </DashboardLayout>
  );
};

export default AddDoctor;
