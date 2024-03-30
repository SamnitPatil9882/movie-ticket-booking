import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Movie, MovieCreateReq } from "./types";
import storage from "../../utils/storage"; // Assuming storage contains getToken() function
import { useSelector } from "react-redux";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/v1/",
    prepareHeaders: (headers, { getState }) => {
      const token = storage.getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Movie"],
  endpoints: (builder) => ({
    
    getMovie: builder.query<Movie, number>({
      query: (id) => `movies/${id}`,
      providesTags: ["Movie"],
    }),

    getMovies: builder.query<Movie[], void>({
      query: () => "movies",
      providesTags: ["Movie"],
    }),

    createMovie: builder.mutation<Movie, MovieCreateReq>({
      query: (data) => ({
        url: "movies",
        method: "POST",
        body: {
          movie: {
            ...data,
          },
        },
      }),
      transformResponse: (response: any) => {
        console.log("in transform: ", response);
        return response;
      }, // Access the 'data' property
      transformErrorResponse: (error: any) => error.status, // Adjust this according to the structure of your API error response
      invalidatesTags: ["Movie"],
    }),

    updateMovie: builder.mutation<Movie, MovieCreateReq>({
      query: (data) => ({
        url: `movies/${data.id}`,
        method: "PUT",
        body: {
          movie: {
            ...data,
          },
        },
      }),
      transformResponse: (response: any) => {
        console.log("in transform: ", response);
        return response;
      }, // Access the 'data' property
      transformErrorResponse: (error: any) => error.status, // Adjust this according to the structure of your API error response
      invalidatesTags: ["Movie"],
    }),
  }),
});

export const {
  useGetMovieQuery,
  useGetMoviesQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
} = movieApi;
