// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import api from "../utils/jwtInterceptor";

export const apiSlice = createApi({
  reducerPath: "register",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
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
    postComment: builder.mutation({
      query: (path) => ({
        url: `comments/`,
        method: "POST",
        body: path,
      }),
    }),
    postBooks: builder.mutation({
      query: (path) => ({
        url: `comments/`,
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
    getListManageOrder: builder.query({
      query: () => `orders-detail/list`,
    }),
    getOrderDetailsById: builder.query({
      query: (id) => `orders-detail/${id}`,
    }),
    getProfile: builder.query({
      query: () => "auth/profile",
    }),
    getProcessStatus: builder.query({
      query: (id) => `orders-detail/process/${id}`,
    }),
    getAcceptStatus: builder.query({
      query: (id) => `orders-detail/accept/${id}`,
    }),
    getCancelStatus: builder.query({
      query: (id) => `orders-detail/cancel/${id}`,
    }),
    getCommentsOfBook: builder.query({
      query: (id) => `comments/${id}`,
    }),
    getAllUser: builder.query({
      query: () => `user/all-user`,
    }),
    getUserId: builder.query({
      query: (idUser) => `user/user/${idUser}`
    })
  }),
});

export const {
  useGetRegisterMutation,
  useGetAllUserQuery,
  useGetUserIdQuery,
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
  useGetAcceptStatusQuery,
  useGetCancelStatusQuery,
  useGetProcessStatusQuery,
  usePostCommentMutation,
  useGetCommentsOfBookQuery,
  useGetListManageOrderQuery
} = apiSlice;
