import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersearchService = createApi({
  reducerPath: "usersearchService",
  tagTypes:['requirement'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://graph.microsoft.com/v1.0'}),
  endpoints: (builder) => ({
    searchOrganizationUsers: builder.query({
      query: ({graphToken , query}) => ({
        url: `/users/?$filter=startswith(displayName, '${encodeURIComponent(query)}')`,
        headers: {
             "Authorization": `Bearer ${graphToken}`,
            "Content-Type": "application/json",
          },
        method: "GET",
        
      }),
    }),
  }),
});

export const {  useSearchOrganizationUsersQuery } = usersearchService;
export default usersearchService;
