import { api } from "../api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<
      any,
      {
        limit?: number;
        offset?: number;
        startDate?: number;
        endDate?: number;
        roles?: string;
        search?: string;
        status?: string;
        isDownload?: boolean;
      }
    >({
      query: (args) => {
        const {
          limit = 10,
          offset = 0,
          startDate,
          endDate,
          roles,
          search,
          status,
          isDownload,
        } = args;

        const params = Object.fromEntries(
          Object.entries({
            limit,
            offset,
            startDate,
            endDate,
            roles,
            keyword: search,
            status,
            isDownload,
          }).filter(([_, value]) => value !== undefined)
        );

        return {
          url: "/users",
          method: "GET",
          params,
        };
      },

      providesTags: ["User"],
    }),
    updateProfile: builder.mutation<any, { userId: string; values: any }>({
      query: ({ userId, values }) => ({
        url: `/user/${userId}`,
        method: "PUT",
        body: values,
      }),
      invalidatesTags: ["User"],
    }),
    addUsersInBulk: builder.mutation<any, any[]>({
      query: (body) => ({
        url: "/user/add/bulk",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body), // raw array, not wrapped in object
      }),
    }),
    SearchUserByEmailorPhoneNumber: builder.mutation<any, string>({
      query: (value) => ({
        url: "/searchuser",
        method: "POST",
        body: { account: value },
      }),
    }),
    addOrganization: builder.mutation<any, any>({
      query: (body) => ({
        url: "/organization",
        method: "POST",
        body,
      }),
    }),
  }),
});
export const {
  useLazyGetUsersQuery,
  useUpdateProfileMutation,
  useAddUsersInBulkMutation,
  useSearchUserByEmailorPhoneNumberMutation,
  useAddOrganizationMutation,
} = authApi;
