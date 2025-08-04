import React, { lazy, Suspense, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TextInput from "@/components/common/TextInput";
import { AlertCircle, Copy, Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label"; // fixed import
import { useAddUsersInBulkMutation } from "@/store/features/userApi";
import { FormSwitch } from "@/components/common/FormSwitch";
import { useAddOrganizationMutation } from "@/store/features/faciltyApis";

const EmailComponent = lazy(() =>
  import("@/components/common/AsyncEmailInput").then((mod) => ({
    default: mod.EmailComponent,
  }))
);
const GenderSelector = lazy(() => import("@/components/common/GenderSelector"));
const AddressComponent = lazy(() => import("@/components/common/AddressForm"));
const PhoneNumberInput = lazy(
  () => import("@/components/common/PhoneNumberInput")
);

const generatePassword = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*?";
  let password = "";
  for (let i = 0; i < 10; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const formSchema = z.object({
  // Step 1 fields
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  password: z.string().min(1, "Password is required"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender",
  }),
});
const addressSchema = z.object({
  city: z.string().min(1, "City is required"),
});
const step2Schema = z.object({
  orgName: z.string().min(2, "Hospital name is required"),
  websiteUrl: z.string().min(2, "Website URL is required"),
  // orgAddress: addressSchema,
});
type FormValues = z.infer<typeof formSchema>;

const AddHospital = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [responseOfAdminUser, setResponseOfAdminUser] = useState<any>(null);
  const methods = useForm<FormValues>({
    resolver: zodResolver(step === 1 ? formSchema : step2Schema),
    defaultValues: {
      // Step 1 fields
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      gender: undefined,
      password: generatePassword(),
    },
  });

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = methods;

  useEffect(() => {
    const newPassword = generatePassword();
    setGeneratedPassword(newPassword);
    setValue("password", newPassword);
  }, [setValue]);
  const [addUsersInBulk] = useAddUsersInBulkMutation();
  const [addOrganization, { isLoading, error, data }] =
    useAddOrganizationMutation();
  const copyPassword = () => {
    navigator.clipboard.writeText(generatedPassword);
    toast({
      title: "Password Copied",
      description: "The password has been copied to your clipboard.",
    });
  };

  const onSubmit = (data: FormValues) => {
    if (step === 1) {
      console.log("Step 1 Data:", data);
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
          roles: "facility",
          sourceOfSignup: "talhospitals",
        },
      ];

      addUsersInBulk(payload)
        .unwrap()
        .then((response) => {
          setResponseOfAdminUser(response?.data);
          console.log(
            "Response of Admin User:",
            response,
            "id",
            response?.data?._id
          );
          setStep(2);
          toast({
            title: "Hospital Admin Added Successfully",
            description:
              "The hospital admin account has been created with the generated credentials.",
          });
          reset();
          setGeneratedPassword(generatePassword());
        })
        .catch((err) => {
          toast({
            title: "Error Adding Hospital Admin",
            description: err?.message || "Something went wrong.",
            variant: "destructive",
          });
        });
    } else if (step === 2) {
      console.log("Final Submission:", data);
      const payload = {
        ...data,
        sourceOfSignup: "talhospitals",
        userId: responseOfAdminUser?._id,
      };
      addOrganization(payload)
        .then((response) => {
          console.log("Response of Organization Creation:", response);

          const statusCode = response?.data?.statusCode;
          const message = response?.data?.message;
          console.log(
            "Response of Organization Creation:",
            statusCode,
            "message",
            message
          );

          const nameConflictMessages = [
            "Organization name already exists",
            "Hospital name already exists. Please enter a different name.",
          ];

          if (statusCode === 409 && nameConflictMessages.includes(message)) {
            toast({
              title: "Error Adding Hospital Admin",
              description: message || "Something went wrong.",
              variant: "destructive",
            });
          } else if (statusCode === 200) {
            toast({
              title: "Hospital Added Successfully",
              description: "The hospital has been added successfully.",
            });
            reset();
            setStep(1);
          } else {
            toast({
              title: "Unexpected Response",
              description: message || "Please try again later.",
              variant: "destructive",
            });
          }
        })
        .catch((err) => {
          console.log(
            "Response of error?.data?.statusCode:",
            err?.data?.statusCode
          );
          toast({
            title: "Error Adding Hospital",
            description: err?.message || "Something went wrong.",
            variant: "destructive",
          });
        });
    }
  };
  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form validation errors:", errors);
  };
  return (
    <DashboardLayout>
      <PageHeader
        title="Add Hospital"
        description="Create a new hospital administrator account in the system."
      />
      <div className="mt-6">
        <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl">
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="space-y-6"
            >
              {step === 1 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextInput name="first_name" label="First Name" />
                    <TextInput name="last_name" label="Last Name" />
                  </div>

                  <Suspense fallback={<div>Loading Email Component...</div>}>
                    <EmailComponent name="email" />
                  </Suspense>

                  {/* Generated Password */}
                  <div className="space-y-2">
                    <Label>Generated Password (Read-Only)</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={generatedPassword}
                        readOnly
                        className="pr-20 bg-muted"
                        name="password"
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
                        Please store your password in a secure place — it will
                        not be shown again. This password is required for
                        accessing your account and must be kept confidential. If
                        you lose it, you'll need to contact the technical team
                        to generate a new one.
                      </p>
                    </div>
                  </div>

                  <Suspense fallback={<div>Loading Phone...</div>}>
                    <PhoneNumberInput name="phone" label="Phone Number" />
                  </Suspense>
                  <Suspense fallback={<div>Loading Gender...</div>}>
                    <GenderSelector name="gender" />
                  </Suspense>
                </>
              )}

              {step === 2 && (
                <>
                  <TextInput name="orgName" label="Hospital Name" />
                  <TextInput name="websiteUrl" label="Website Url" />
                  <Suspense fallback={<div>Loading address form...</div>}>
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Location Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <AddressComponent showonlyCity={true} />
                      </div>
                    </div>
                  </Suspense>
                  <FormSwitch
                    name="is_verified"
                    control={methods.control}
                    label="Is Free Hospital?"
                  />
                </>
              )}

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" type="button" onClick={() => reset()}>
                  Cancel
                </Button>
                <Button type="submit">{step === 1 ? "Next" : "Submit"}</Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddHospital;
