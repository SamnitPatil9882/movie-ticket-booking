import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "../Landing/Index";
import Login from "../Auth/Login/Index";
import Home from "../home/Index";
import Signup from "../Auth/SignUp/Index";
import Protected from "../../Components/AuthLayout";
import { Provider } from "react-redux";
import store from "../../app/store";
import MovieInfo from "../movieInfo";
import MovieAvailTheater from "../movieTheaters";
import BookTicket from "../BookTicket";
import AdminDashboard from "../AdminDashboard";
import MyTickets from "../MyTickets";

function MovieTicketBookApp() {
  return (
    <Provider store={store}>
      <Router>
        {/* <LoginHeader /> */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/home"
            element={
              <Protected authentication={true}>
                <Home />
              </Protected>
            }
          />
          <Route
            path="/login"
            element={
              <Protected authentication={false}>
                <Login />
              </Protected>
            }
          />
          <Route
            path="/signup"
            element={
              <Protected authentication={false}>
                <Signup />
              </Protected>
            }
          />
          <Route
            // path="/movie-info/:movieShowId"
            path="/movie-info/:movieId"
            element={
              <Protected authentication={true}>
                <MovieInfo />
              </Protected>
            }
          />
          <Route
            path="/movie-avail-theater/:movieId"
            element={
              <Protected authentication={true}>
                <MovieAvailTheater />
              </Protected>
            }
          />
          <Route
            path="/book-ticket/:movieShowId"
            element={
              <Protected authentication={true}>
                <BookTicket />
              </Protected>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <Protected authentication={true}>
                <AdminDashboard />
              </Protected>
            }
          />
           <Route
            path="/my-tickets"
            element={
              <Protected authentication={true}>
                <MyTickets />
              </Protected>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default MovieTicketBookApp;
