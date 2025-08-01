import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("API Base URL:", API_BASE_URL);

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      // Add authentication headers if needed
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Request", "Facility", "Doctor", "Analytics"],
  endpoints: () => ({}),
});

// Export hooks will be added here when endpoints are defined
