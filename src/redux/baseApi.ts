// import config from "@/config";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
  // credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
  // paramsSerializer: (params) => new URLSearchParams(params).toString(),
});
