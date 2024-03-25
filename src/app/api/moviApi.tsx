import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Movie } from './types';
import storage from '../../utils/storage'; // Assuming storage contains getToken() function

export const movieApi = createApi({
  reducerPath: 'movieApi',
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
  tagTypes: ['Movie'],
  endpoints: (builder) => ({

    getMovie: builder.query<Movie, number>({  
        query: (id) => `movies/${id}`,  
      }),

    getMovies: builder.query<Movie[],void>({
        query: () => 'movies',
    })
    
  }),
}); 

export const { useGetMovieQuery,useGetMoviesQuery } = movieApi;
