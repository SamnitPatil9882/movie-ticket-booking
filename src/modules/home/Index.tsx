import React, { useEffect } from "react";
import Header from "../Headers/header";
import MovieCard from "./Components/MovieCard";
import { useGetMovieShowsQuery } from "../../app/api/movieShows";
import { MovieShow } from "../../app/api/types";
import { useGetMoviesQuery } from "../../app/api/moviApi";
import { useDispatch } from "react-redux";
import { setMovies } from "../../app/store/movieSlice";

function Home() {
  const { data, error, isLoading } = useGetMovieShowsQuery();
  // const { data: movies } = useGetMoviesQuery();
  const dispactch = useDispatch();

  // useEffect(() => {
  //   if (movies) dispactch(setMovies(movies));
  // }, [movies]);

  let uniqueMovieIds: number[] = [];
  if (data) {
    uniqueMovieIds = Array.from(
      new Set(data.map((movie: MovieShow) => movie.movie_id))
    );
  }

  const renderComponents = () => {
    return uniqueMovieIds.map((id) => <MovieCard key={id} id={id} />);
  };

  return (
    <div className="h-screen">
      <Header/>
      <div>
        <div className="flex flex-wrap justify-center items-center text-white">
          {renderComponents()}
        </div>
      </div>
    </div>
  );
}

export default Home;
