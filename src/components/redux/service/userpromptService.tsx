import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userpromptService = createApi({
  reducerPath: "userpromptService",
  tagTypes:['requirement'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://utilities.jivahire.com/service5'}),
  endpoints: (builder) => ({
    getJobDescriptionByPrompt: builder.mutation<
      { job_description: string; job_title: string; message: string },
      { prompt: string }
    >({
      query: ({ prompt }) => {
        const formData = new FormData();
        formData.append("prompt", prompt);
        return {
          url: "/generate-job-description/?x_api_key=ZBFezMmBuh2pkEXttdz6SwOeMgGGsG2b",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const {  useGetJobDescriptionByPromptMutation } = userpromptService;
export default userpromptService;
