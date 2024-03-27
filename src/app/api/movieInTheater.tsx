import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Movie, MovieInTheater } from './types';
import storage from '../../utils/storage'; // Assuming storage contains getToken() function

export const movieInTheaterApi = createApi({
  reducerPath: 'movieInTheaterApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:3001/api/v1/', 
    prepareHeaders: (headers, { getState }) => {

        const token = storage.getToken();
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;

      }
  }),
  tagTypes: ['movieInTheater'],
  endpoints: (builder) => ({

    getMovieInTheater: builder.query<MovieInTheater, number>({  
        query: (id) => `movie_in_theaters/${id}`,  
      }),

    getMovieInTheaters: builder.query<MovieInTheater[],void>({
        query: () => 'movie_in_theaters',
    })
    
  }),
}); 

export const { useGetMovieInTheaterQuery,useGetMovieInTheatersQuery} = movieInTheaterApi;
