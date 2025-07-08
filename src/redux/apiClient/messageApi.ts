import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/baseApi";

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery,
  tagTypes: ["MESSAGE"],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (selectedUser) => {
        const baseUrl = "/messages";
        const params = selectedUser?.user?.userId
          ? `?receiverId=${selectedUser.user.userId}`
          : "";
        return {
          url: `${baseUrl}${params}`,
          method: "GET",
        };
      },
      providesTags: ["MESSAGE"],
    }),
    sendMessages: builder.mutation({
      query: (formData) => ({
        url: `/messages/send`,
        method: "POST",
        body: JSON.stringify(formData),
      }),
    }),
    readMessages: builder.mutation({
      query: (formData) => {
        return {
          url: `/messages/read`,
          method: "PATCH",
          body: JSON.stringify(formData || {}),
        };
      },
    }),
    deleteMessage: builder.mutation({
      query: (messageId) => {
        return {
          url: `/messages/${messageId}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useSendMessagesMutation,
  useReadMessagesMutation,
  useDeleteMessageMutation,
} = messageApi;
