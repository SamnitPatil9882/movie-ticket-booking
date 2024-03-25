import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MovieTicketBookApp from "./modules/MovieTicketBookApp/Index";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
const queryClient = new QueryClient;
function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <div className="App bg-black">
      <MovieTicketBookApp />
    </div>
    </QueryClientProvider>
  );
}

export default App;
