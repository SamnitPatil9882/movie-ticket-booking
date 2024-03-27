import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Movie, MovieShow } from "./types";
import storage from "../../utils/storage"; // Assuming storage contains getToken() function

export const movieShowApi = createApi({
  reducerPath: "movieShowApi",

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

  tagTypes: ["MovieShow"],
  endpoints: (builder) => ({
    getMovieShows: builder.query<MovieShow[], void>({
      query: () => "movie_shows",
    }),

    getMovieShow: builder.query<MovieShow, number>({
      query: (id) => `movie_shows/${id}`,
    }),

    getMovieShowsByTheaterId: builder.query<MovieShow[],number>({
      query: (id) => `theaters/${id}/movie_shows_by_theater_id`,
    }),

    getMovieShowByTheaterId: builder.query<MovieShow,number>({
      query: (id) => `movie_in_theaters/${id}`,
    })
  }),
});

export const {
  useGetMovieShowsQuery,
  useGetMovieShowQuery,
  // useGetMovieQuery,
  // useGetMoviesQuery,
  useGetMovieShowByTheaterIdQuery,
  useGetMovieShowsByTheaterIdQuery
} = movieShowApi;
