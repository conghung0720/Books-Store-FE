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
    postOrderDetails: builder.mutation({
      query: (path) => ({
        url: `orders-detail/`,
        method: "POST",
        body: path,
      }),
    }),
    getDeleteItemsCart: builder.query({
      query: (id) => `carts/delete/${id}`,
    }),
    getListOrderUser: builder.query({
      query: (idUser) => `orders-detail/user/${idUser}`,
    }),
    getOrderDetailsById: builder.query({
      query: (id) => `orders-detail/${id}`,
    }),
    getProfile: builder.query({
      query: () => "auth/profile",
    }),
  }),
});

export const {
  useGetRegisterMutation,
  useGetLoginMutation,
  useGetAllBooksQuery,
  useGetDeleteItemsCartQuery,
  useGetChatGptMutation,
  useGetListFlashSaleQuery,
  useGetIdBooksQuery,
  useGetListCartQuery,
  usePostOrderDetailsMutation,
  useGetListOrderUserQuery,
  useGetOrderDetailsByIdQuery,
  useGetProfileQuery,
} = apiSlice;
