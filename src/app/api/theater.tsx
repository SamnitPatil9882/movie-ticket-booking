import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Movie, Theater } from "./types";
import storage from "../../utils/storage"; // Assuming storage contains getToken() function

export const theaterApi = createApi({
  reducerPath: "theaterApi",
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
  tagTypes: ["Theater"],
  endpoints: (builder) => ({
    getTheater: builder.query<Theater, number>({
      query: (id) => `theaters/${id}`,
    }),

    getTheaters: builder.query<Theater[], void>({
      query: () => "theaters",
    }),

    getTheatersByMovieShowId: builder.query<Theater[], number>({
      query: (id) => `movie_shows/${id}/theater_by_movie_show_id`,
    }),

    // getTheaterByMovieShowId: builder.query<Theater, number>({
    //   query: (id) => `movie_shows/${id}/theater_by_movie_show_id`,
    // }),
  }),
});

export const { useGetTheaterQuery, useGetTheatersQuery, useGetTheatersByMovieShowIdQuery } = theaterApi;
