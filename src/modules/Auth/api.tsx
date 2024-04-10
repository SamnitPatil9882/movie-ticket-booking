import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginCredentials, User, UserGet, UserResponse } from './types';
import { SignUpRequest, UserSignUpResponse } from './types';
import storage from '../../utils/storage';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/v1/',
  prepareHeaders: (headers, { getState }) => {
    const token = storage.getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  }, }),
  tagTypes: ['login'],
  endpoints: (builder) => ({

    getUser: builder.query<UserGet, number>({
      query: (id) => `users/${id}`,
      providesTags: ["login"],
    }),

    getUsers: builder.query<UserGet[], void>({
      query: () => "users",
      providesTags: ["login"],
    }),

    login: builder.mutation<UserResponse, LoginCredentials>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
      
      transformResponse: (response: any) => {
        console.log("in transform: ",response);
        return response}, // Access the 'data' property
      invalidatesTags: ['login'],
    }),

    signUpUser: builder.mutation<UserResponse, SignUpRequest>({
      query: (data) => ({
        url: 'users',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: any) => {
        console.log("in transform: ",response);
        return response}, // Access the 'data' property
      transformErrorResponse: (error: any) => error.status, // Adjust this according to the structure of your API error response
      invalidatesTags: ['login'], 
    }),

    updateUser:builder.mutation<User, User>({
      query: (data) => ({
        url: `users/${data.id}`,
        method: 'PUT',
        body: {user:{...data}},
      }),
      transformResponse: (response: any) => {
        console.log("in transform: ",response);
        return response}, // Access the 'data' property
      transformErrorResponse: (error: any) => error.status, // Adjust this according to the structure of your API error response
      invalidatesTags: ['login'], 
    }),
  }),
});

export const { useLoginMutation, useSignUpUserMutation, useGetUserQuery,useGetUsersQuery,useUpdateUserMutation } = authApi;
