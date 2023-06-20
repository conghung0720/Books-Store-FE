// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import api from "../utils/jwtInterceptor";

export const apiSlice = createApi({
  reducerPath: "register",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  endpoints: (builder) => ({
    getRegister: builder.mutation({
      query: (path) => ({
        url: `auth/register`,
        method: "POST",
        body: path,
      }),
    }),
    getLogin: builder.mutation({
      query: (path) => ({
        url: `auth/login`,
        method: "POST",
        body: path,
      }),
    }),
    getAllBooks: builder.query({
      query: () => `book`,
    }),
    getIdBooks: builder.query({
      query: (id) => `book/${id}`,
    }),
    getChatGpt: builder.mutation({
      query: (chat) => ({
        url: `chat-gpt`,
        method: "POST",
        body: chat,
      }),
    }),
    getListFlashSale: builder.query({
      query: () => `flash-sale/list`,
    }),
    getListCart: builder.query({
      query: (id) => `carts/${id}`,
    }),
  }),
});

export const {
  useGetRegisterMutation,
  useGetLoginMutation,
  useGetAllBooksQuery,
  useGetChatGptMutation,
  useGetListFlashSaleQuery,
  useGetIdBooksQuery,
  useGetListCartQuery
} = apiSlice;
