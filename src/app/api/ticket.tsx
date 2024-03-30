import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Movie, Ticket, TicketRequestBody } from './types';
import storage from '../../utils/storage'; // Assuming storage contains getToken() function

export const ticketApi = createApi({
  reducerPath: 'ticketApi',
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
  tagTypes: ['Ticket'],
  endpoints: (builder) => ({

    getTickets: builder.query<Ticket[], void>({
      query: () => "tickets",
    }),
    
    createTicket: builder.mutation<Ticket, TicketRequestBody>({
        query: (data) => ({
          url: 'tickets',
          method: 'POST',
          body: data,
        }),
        transformResponse: (response: any) => {
          console.log("in transform: ",response);
          return response}, // Access the 'data' property
        transformErrorResponse: (error: any) => error.status, // Adjust this according to the structure of your API error response
        invalidatesTags: ['Ticket'], 
      }),
    
  }),
}); 

export const { useCreateTicketMutation, useGetTicketsQuery } = ticketApi;
