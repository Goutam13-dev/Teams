import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const zivahireServices = createApi({
  reducerPath: "api",
  tagTypes:['requirement'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.upswap.cloud/api'}),
  endpoints: (builder) => ({
    getPosts: builder.query({
      providesTags:['requirement'],
      query: () => "/posts",
    }),
    GetRequirement: builder.query({
      providesTags:['requirement'],
      query: (id) => `get/requirement/${id}/`,
    }),
    GetRequirementById: builder.query({
      providesTags:['requirement'],
      query: (id) => `get/requirement-details/${id}/`,
    }),
    createRequiremment: builder.mutation({
      invalidatesTags:['requirement'],
      query: (newPost) => ({
        url: "create/requirement/",
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: newPost,
      }),
    }),
    createInvitationForm: builder.mutation({
      invalidatesTags:['requirement'],
      query: (newPost) => ({
        url: "fill/requirement-details/",
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: newPost,
      }),
    }),
    GetInvitations: builder.query({
      providesTags:['requirement'],
      query: (id) => `get/invitations/${id}/`,
    }),
  }),
});

export const { useGetPostsQuery,useGetRequirementQuery , useCreateRequiremmentMutation, useGetRequirementByIdQuery , useGetInvitationsQuery, useCreateInvitationFormMutation } = zivahireServices;
export default zivahireServices;
