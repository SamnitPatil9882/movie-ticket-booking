import React, { useEffect, useState } from "react";
import Header from "../Headers/header";
import MovieCard from "./Components/MovieCard";
import {
  useGetMovieShowQuery,
  useGetMovieShowsQuery,
} from "../../app/api/movieShows";
import { MovieInTheater, MovieShow } from "../../app/api/types";
import { useGetMoviesQuery } from "../../app/api/moviApi";
import { useDispatch } from "react-redux";
import { setMovies } from "../../app/store/movieSlice";
import { useGetMovieInTheatersQuery } from "../../app/api/movieInTheater";
import { useNavigate } from "react-router-dom";
import { getMovieShowData } from "../../utils/apifn";
import moment from "moment-timezone"; // Import moment.js library for date formatting
import { number } from "yup";

function Home() {
  const [movieIds, setMovieIds] = useState<number[]>([]);
  const {
    data: movieShows,
    error: movieShowError,
    isLoading: movieShowLoading,
  } = useGetMovieShowsQuery();

  console.log(movieShows);

  useEffect(() => {
    if (movieShows) {
      const uniqueMovieIds = Array.from(
        new Set(movieShows.map((movieShow) => movieShow.movie_id))
      );
      setMovieIds(uniqueMovieIds);
    }
  }, [movieShows]);

  return (
    <div className="flex flex-col flex-grow min-h-screen">
      <Header />
      {movieShowError && <div>Getting error in fetching</div>}
      {movieShowLoading && <div>Loading....</div>}
      {movieShows && (
        <div className="flex flex-wrap justify-center">
          {movieIds &&
            movieIds.map((movieId, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-gray-900 border-white border-2 text-white rounded-lg p-4 m-4"
              >
                <MovieCard movieId={movieId} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Home;
