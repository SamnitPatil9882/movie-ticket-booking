import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginCredentials, UserResponse } from './types';
import { SignUpRequest, UserSignUpResponse } from './types';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/v1/' }),
  tagTypes: ['login'],
  endpoints: (builder) => ({

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
  }),
});

export const { useLoginMutation, useSignUpUserMutation } = authApi;
