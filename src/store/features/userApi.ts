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
  }),
});
export const { useLazyGetUsersQuery } = authApi;
