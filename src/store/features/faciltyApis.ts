import { api } from "../api";
interface GetOrganizationsArgs {
  sourceOfCreation?: string;
  limit?: number;
  offset?: number;
  isDownload?: boolean;
  keyword?: string;
}
interface UpdateOrganizationStatusArgs {
  orgId: string;
  data: any;
}
export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addOrganization: builder.mutation<any, any>({
      query: (body) => ({
        url: "/organization",
        method: "POST",
        body,
      }),
    }),
    getOrganizations: builder.query<any, GetOrganizationsArgs>({
      query: ({
        sourceOfCreation = "talhospitals",
        limit,
        offset,
        keyword,
      }) => ({
        url: "organization",
        method: "GET",
        params: {
          sourceOfCreation,
          limit,
          offset,
          keyword,
        },
      }),
    }),
    getOrganizationsToExportcsv: builder.query<any, GetOrganizationsArgs>({
      query: ({
        sourceOfCreation = "talhospitals",
        limit,
        offset,
        isDownload,
        keyword,
      }) => ({
        url: "organization",
        method: "GET",
        params: {
          sourceOfCreation,
          limit,
          offset,
          isDownload,
          keyword,
        },
        responseHandler: isDownload ? ("text" as const) : undefined,
      }),
    }),

    updateOrganizationStatus: builder.mutation<
      any,
      UpdateOrganizationStatusArgs
    >({
      query: ({ orgId, data }) => ({
        url: `/organization/${orgId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Organization"],
    }),
    deleteOrganization: builder.mutation<any, string>({
      query: (orgId) => ({
        url: `/organization/${orgId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Organization"],
    }),
  }),
});

export const {
  useAddOrganizationMutation,
  useLazyGetOrganizationsQuery,
  useUpdateOrganizationStatusMutation,
  useDeleteOrganizationMutation,
  useLazyGetOrganizationsToExportcsvQuery,
} = authApi;
