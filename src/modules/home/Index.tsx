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
  // const { data: movietheaterData } = useGetMovieInTheatersQuery();
  // const navigate = useNavigate();
  // const [movieShowData, setMovieShowData] = useState<MovieShow[]>([]);

  // useEffect(() => {
  //   const fetchMovieShowData = async () => {
  //     if (!movietheaterData) return;

  //     try {
  //       const uniqueMovieShowIds = Array.from(new Set(movietheaterData.map(movieTheater => movieTheater.movie_show_id)));
  //       const results = await getMovieShowData(uniqueMovieShowIds); // Call custom utility function to fetch movie show data

  //       // Format the time in each movie show object
  //       const formattedResults = results.map(movieShow => ({
  //         ...movieShow,
  //         show_start_time: moment(movieShow.show_start_time).format('MMMM Do YYYY, h:mm:ss a'), // Format start time
  //         show_end_time: moment(movieShow.show_end_time).format('MMMM Do YYYY, h:mm:ss a') // Format end time
  //       }));

  //       setMovieShowData(formattedResults);
  //     } catch (error) {
  //       console.error('Error fetching movie show data:', error);
  //     }
  //   };

  //   fetchMovieShowData();
  // }, [movietheaterData]); // Dependency array to re-fetch movie show data when movietheaterData changes

  const[movieIds,setMovieIds] = useState<number[]>([])
  const {
    data: movieShows,
    error: movieShowError,
    isLoading: movieShowLoading,
  } = useGetMovieShowsQuery();

  console.log(movieShows);
  
  useEffect(()=>{
    if(movieShows)
    {
      const uniqueMovieIds = Array.from(
        new Set(movieShows.map((movieShow) => movieShow.movie_id))
      );
      setMovieIds(uniqueMovieIds)
    }

  },[movieShows])


  return (
    <div className="flex flex-col flex-grow min-h-screen">
      <Header />
      <div className="flex flex-wrap justify-center">
        {movieIds &&
          movieIds.map((movieId, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-gray-900 text-white rounded-lg p-4 m-4"
              
            >
                            <MovieCard movieId={movieId} />

              {/* <MovieCard movieShow={movieShow} /> */}

              {/* <div className="mt-4">
                <p className="font-bold text-lg">Movie Show Information</p>
                <ul>
                  <li className="text-left">
                    <p>
                      <span className="font-bold">Language:</span>{" "}
                      {movieShow.language}
                    </p>
                    <p>
                      <span className="font-bold">Seat Count:</span>{" "}
                      {movieShow.seat_count}
                    </p>
                    <p>
                      <span className="font-bold">Show Start Time:</span>{" "}
                      {movieShow.show_start_time}
                    </p>
                    <p>
                      <span className="font-bold">Show End Time:</span>{" "}
                      {movieShow.show_end_time}
                    </p>
                  </li>
                </ul>
              </div> */}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
