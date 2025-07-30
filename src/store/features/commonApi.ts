import { api } from "../api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCities: builder.query<any, Record<string, string | number | undefined>>({
      query: (params) => {
        const queryParams = new URLSearchParams(
          Object.entries(params)
            .filter(([, value]) => value !== undefined && value !== "")
            .map(([key, value]) => [key, String(value)])
        ).toString();

        return {
          url: `/cities/?${queryParams}`,
          method: "GET",
        };
      },
    }),
  }),
});

// Export hooks for usage in components
export const { useGetCitiesQuery, useLazyGetCitiesQuery } = authApi;
