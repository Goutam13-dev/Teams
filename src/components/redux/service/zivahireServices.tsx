import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const zivahireServices = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }), // Replace with your API URL
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
    }),
    getPostById: builder.query({
      query: (id) => `/posts/${id}`,
    }),
    createPost: builder.mutation({
      query: (newPost) => ({
        url: "/posts",
        method: "POST",
        body: newPost,
      }),
    }),
  }),
});

// Export Hooks for usage in functional components
export const { useGetPostsQuery, useGetPostByIdQuery, useCreatePostMutation } = zivahireServices;
export default zivahireServices;
