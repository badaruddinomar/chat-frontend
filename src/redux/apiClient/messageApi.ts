import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/baseApi";

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery,
  tagTypes: ["MESSAGE"],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => ({
        url: `/messages`,
        method: "GET",
      }),
      providesTags: ["MESSAGE"],
    }),
    sendMessages: builder.mutation({
      query: (formData) => ({
        url: `/messages/send`,
        method: "POST",
        body: JSON.stringify(formData),
      }),
    }),
  }),
});

export const { useGetMessagesQuery, useSendMessagesMutation } = messageApi;
