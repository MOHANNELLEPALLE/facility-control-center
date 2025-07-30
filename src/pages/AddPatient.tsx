import React, { useState, useEffect, Suspense } from "react";
import { useForm, FieldErrors, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PageHeader from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Copy, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
const AddressComponent = React.lazy(() =>
  import("@/components/common/AddressForm").then((mod) => ({
    default: mod.AddressComponent,
  }))
);
import { useAddUsersInBulkMutation } from "@/store/features/userApi";
const PhoneNumberInput = React.lazy(
  () => import("@/components/common/PhoneNumberInput")
);
const GenderSelector = React.lazy(
  () => import("@/components/common/GenderSelector")
);
import TextInput from "@/components/common/TextInput";
const EmailComponent = React.lazy(() =>
  import("@/components/common/AsyncEmailInput").then((mod) => ({
    default: mod.EmailComponent,
  }))
);
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const addressSchema = z.object({
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
});
export const formSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  gender: z.enum(["male", "female", "others"], {
    required_error: "Please select a gender",
  }),
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

const AddPatient: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  useEffect(() => {
    setGeneratedPassword(generatePassword());
  }, []);

  const [addUsersInBulk] = useAddUsersInBulkMutation();

  const onSubmit = (data: FormValues) => {
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
    console.log("Form Data:", data);
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
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(generatedPassword);
    toast({
      title: "Password Copied",
      description: "The password has been copied to your clipboard.",
    });
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };
  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form validation errors:", errors);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Add Patient"
          description="Create a new patient account with secure credentials"
        />

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className="space-y-6"
              >
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TextInput name="first_name" label="First Name" />
                  <TextInput name="last_name" label="Last Name" />
                </div>
                {/* Email */}
                <EmailComponent name="email" />
                {/* Generated Password */}
                <div className="space-y-2">
                  <Label>Generated Password (Read-Only)</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={generatedPassword}
                      readOnly
                      className="pr-20 bg-muted"
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
                </div>{" "}
                <Suspense fallback={<div>Loading address form...</div>}>
                  {/* Phone Number */}
                  <PhoneNumberInput name="phone" label="Phone Number" />
                  {/* Gender */}
                  <GenderSelector name="gender" />
                  {/* Location Fields */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Location Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <AddressComponent showonlyCity={true} />
                    </div>
                  </div>
                </Suspense>
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button type="submit" className="flex-1 sm:flex-none">
                    Submit
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="flex-1 sm:flex-none"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AddPatient;
