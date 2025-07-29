import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSigninMutation } from "@/store/features/authApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Lock, LogIn } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  username: string;
  roles: string[];
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [signin, { isLoading }] = useSigninMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await signin({
        account: data.email,
        password: data.password,
        dontSendToken: true,
      }).unwrap();
      console.log("Login result:", result);
      const user: User = {
        id: result.data.unique_id,
        name: result.data.display_name,
        email: result.data.email,
        phone: result.data.phone,
        username: result.data.username,
        roles: result.data.roles || [],
      };

      console.log("Login result user binding:", user);
      if (!user) {
        throw new Error("User data is missing in the response");
      }
      // Store user data in local storage or state management
      localStorage.setItem("user", JSON.stringify(result.data));

      if (user.roles.includes("admin")) {
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.name}!`,
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Yo",
          description: `Welcome back, ${user.name}!`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error?.data?.message || "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-health-600">
            Healthcare Admin
          </h1>
          <p className="text-gray-500 mt-2">Login to access your dashboard</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  <>
                    <LogIn className="mr-2" />
                    Sign in
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-sm text-gray-500 flex items-center">
              <Lock className="h-4 w-4 mr-1" />
              Secure login for authorized personnel only
            </div>
          </CardFooter>
        </Card>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Healthcare Admin Dashboard &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
