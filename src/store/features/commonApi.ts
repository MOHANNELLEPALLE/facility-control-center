import { api } from "../api";
export interface HospitalService {
  _id: string;
  name: string;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
}
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
    getHospitalServices: builder.query<HospitalService[], void>({
      query: () => "/hospitalServices",
      transformResponse: (response: {
        data: HospitalService[];
        status: string;
        statusCode: number;
        message: string;
        totalCountOfRecords: number;
      }) => response.data, // 👈 Extract the `data` array
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetCitiesQuery,
  useLazyGetCitiesQuery,
  useGetHospitalServicesQuery,
} = authApi;
