import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/baseApi";

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery,
  tagTypes: ["MESSAGE"],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: ({ chatToId }) => ({
        url: `/messages/all/${chatToId}`,
        method: "GET",
      }),
    }),
    sendMessages: builder.mutation({
      query: ({ chatToId, formData }) => ({
        url: `/messages/send/${chatToId}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }),
    }),
  }),
});

export const { useGetMessagesQuery, useSendMessagesMutation } = messageApi;
