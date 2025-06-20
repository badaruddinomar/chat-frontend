import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/baseApi";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["USER"],
  endpoints: (builder) => ({
    userRegister: builder.mutation({
      query: (bodyData) => ({
        url: "/auth/register",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }),
    }),
    userLogin: builder.mutation({
      query: (bodyData) => ({
        url: "/auth/signin",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }),
    }),
    verifyEmail: builder.mutation({
      query: (bodyData) => ({
        url: "/auth/verify-email",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }),
    }),
    forgotPassword: builder.mutation({
      query: (bodyData) => ({
        url: "/auth/forgot-password",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, bodyData }) => ({
        url: `/auth/reset-password?token=${token}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }),
    }),

    resendVerifyCode: builder.mutation({
      query: (bodyData) => ({
        url: `/auth/resend-verify-code`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: `/users/profile`,
        method: "GET",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/auth/logout`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useResendVerifyCodeMutation,
  useLogoutMutation,
  useGetUserQuery,
} = userApi;
