import { api } from '../api';

// Auth request types
export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface SigninRequest {
  email: string;
  password: string;
}

// Auth response types
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message?: string;
}

// Extend the main API with auth endpoints
export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<AuthResponse, SignupRequest>({
      query: (credentials) => ({
        url: '/auth/signup',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    signin: builder.mutation<AuthResponse, SigninRequest>({
      query: (credentials) => ({
        url: '/auth/signin',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useSignupMutation,
  useSigninMutation,
} = authApi;