import { api } from "../api";

export interface SigninRequest {
  account: string;
  password: string;
  dontSendToken?: boolean;
}
// Auth response types
export interface User {
  unique_id: string;
  display_name: string;
  email: string;
  profile_image_url: string;
  roles: string[];
  token_detail: {
    token: string;
    type: string;
  };
  name: {
    first_name: string;
    middle_name: string;
    last_name: string;
  };
  phone: string;
  dob: number;
  // Add more as needed
}

export interface AuthResponse {
  data: {
    unique_id: string;
    email: string;
    phone: string;
    username: string;
    display_name: string;
    token_detail: {
      token: string;
      type: string;
    };
    roles: string[];
    // add more if needed
  };
  message: string;
  status: string;
  statusCode: number;
}

// Extend the main API with auth endpoints
export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation<AuthResponse, SigninRequest>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

// Export hooks for usage in components
export const { useSigninMutation } = authApi;
