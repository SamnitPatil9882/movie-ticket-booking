import React from "react";
import Header from "../Headers/header";
import { useGetTicketsQuery } from "../../app/api/ticket";

interface Ticket {
  id: number;
  payment_mode: string;
  seat_book: number;
  user_id: number;
  movie_show_id: number;
  seat_type: string[];
}

function MyTickets() {
  const { data: myTickets, error, isLoading } = useGetTicketsQuery();
  console.log({ myTickets });

  if (isLoading) {
    return <div> 
      <Header/>
      Loading...
      </div>;
  }
  if(error){
    return <div> 
      <Header/>
      Error occured...
      </div>;
  }
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <h1 className="text-white text-3xl font-bold mb-4">My Tickets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {myTickets &&
          myTickets.map((ticket: Ticket, index: number) => (
            <div key={index} className="bg-gray-800 rounded-lg p-4 text-white">
              <div className="font-bold text-xl">Ticket ID: {ticket.id}</div>
              <div>Payment Mode: {ticket.payment_mode}</div>
              <div>Seat Booked: {ticket.seat_book}</div>
              {/* <div>User ID: {ticket.user_id}</div>
              <div>Movie Show ID: {ticket.movie_show_id}</div> */}
              <div>Seat Type: {ticket.seat_type.join(", ")}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default MyTickets;
