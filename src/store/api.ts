import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define API base URL - replace with your actual API URL
const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3000/api' 
  : '/api';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      // Add authentication headers if needed
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Request', 'Facility', 'Doctor', 'Analytics'],
  endpoints: () => ({}),
});

// Export hooks will be added here when endpoints are defined