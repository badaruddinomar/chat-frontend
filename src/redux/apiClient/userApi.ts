import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/baseApi";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["USER"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (bodyData) => ({
        url: "/auth/register",
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
    getUsers: builder.query({
      query: () => ({
        url: `/customers`,
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
    // farmer chat app test--
    verifyOtp: builder.mutation({
      query: (bodyData) => ({
        url: `/auth/customer/verify-otp`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }),
    }),
    // farmer admin login--
    login: builder.mutation({
      query: (bodyData) => ({
        url: "/auth/admin/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useResendVerifyCodeMutation,
  useLogoutMutation,
  useGetUserQuery,
  useGetUsersQuery,
  //
  useVerifyOtpMutation,
} = userApi;
