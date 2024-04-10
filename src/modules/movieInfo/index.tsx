import React, { useEffect, useState } from "react";
import { Descriptions, Rate } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMovieQuery } from "../../app/api/moviApi";
import Header from "../Headers/header";
import { useGetMovieShowQuery, useGetMovieShowsQuery } from "../../app/api/movieShows";
import { useGetTheatersByMovieShowIdQuery } from "../../app/api/theater";
import { MovieShow, Theater } from "../../app/api/types";
import { Avatar, Divider, List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { formatTime } from "../../utils/helper";

function MovieInfo() {
  // const { movieShowId } = useParams<{ movieShowId?: string }>();

  const { movieId } = useParams<{ movieId?: string }>();

  const navigate = useNavigate();
  const [showTheaterList, setShowTheaterList] = useState<boolean>(false);
  // Fetch data for the selected movie show
  const {
    data: movieShows,
    error: movieShowError,
    isLoading: movieShowLoading,
  } = useGetMovieShowsQuery();

  // Fetch data for the movie
  const {
    data: movie,
    error: movieError,
    isLoading: movieLoading,
  } = useGetMovieQuery(movieId ? parseInt(movieId) : 1);

  const[movieShowsBymovieId,setMovieShowById] = useState<MovieShow[]>([])
  // Fetch theaters by movie show ID
  // const { data: theaterByMovieShow } = useGetTheatersByMovieShowIdQuery(
  //   movieShowId ? parseInt(movieShowId) : 1
  // );

  useEffect(() =>{
    if(movieShows){
      const filteredMovieShows = movieShows.filter((movieShow) =>movieShow.movie_id.toString() === movieId)
      setMovieShowById(filteredMovieShows)
    }

  },[movieShows,movieId])
  // Function to extract stars from string
  function extractStars(stars: string): number {
    const match = stars.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  }

  // Function to format time from ISO string to human-readable format


  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <Header />

      {/* Loading indicator */}
      {(movieLoading || movieShowLoading) && <div>Loading...</div>}

      {/* Error message */}
      {(movieError || movieShowError) && <div>Error occurred</div>}

      {/* Check if movie and movie show data are available */}
      {movie && (
        <div className="flex flex-col justify-center items-center mt-8 ">
          {/* Container for movie details */}
          <div className="max-w-3xl bg-gray-800 rounded-lg overflow-hidden shadow-lg flex w-full">
            {/* Movie image */}
            <div className="flex w-full">
              <img
                src={movie.img_url}
                alt={movie.title}
                className="w-full object-cover"
              />
            </div>
            {/* Movie details */}
            <div className="p-8 w-full border-l-2 border-gray-600">
              <h1 className="text-3xl font-bold text-white mb-4">
                {movie.title}
              </h1>
              <Descriptions bordered column={1} size="small" layout="vertical">
                {/* Stars */}
                <Descriptions.Item
                  label={<span className="text-white font-bold text-xl">Stars</span>}
                >
                  <Rate className="text-3xl" disabled defaultValue={extractStars(movie.stars)} />
                </Descriptions.Item>
                {/* Description */}
                <Descriptions.Item
                  label={
                    <span className="text-white font-bold text-xl">Description</span>
                  }
                >
                  <p className="text-white font-bold text-xl">{movie.description}</p>
                </Descriptions.Item>
                {/* Show Start Time */}
                {/* <Descriptions.Item
                  label={
                    <span className="text-white font-bold">
                      Show Start Time
                    </span>
                  }
                >
                  <span className="text-white">
                    {formatTime(movieShow.show_start_time)}
                  </span>
                </Descriptions.Item> */}
                {/* Show End Time */}
                {/* <Descriptions.Item
                  label={
                    <span className="text-white font-bold">Show End Time</span>
                  }
                >
                  <span className="text-white">
                    {formatTime(movieShow.show_end_time)}
                  </span>
                </Descriptions.Item> */}
                {/* Language */}
                {/* <Descriptions.Item
                  label={<span className="text-white font-bold">Language</span>}
                >
                  <span className="text-white">{movieShow.language}</span>
                </Descriptions.Item> */}
                {/* Screen No */}
                {/* <Descriptions.Item
                  label={
                    <span className="text-white font-bold">Screen No</span>
                  }
                > */}
                  {/* <p className="text-white">{movieShow.screen_no}</p>
                </Descriptions.Item> */}
              </Descriptions>
              {/* Button to check available theaters */}
              <button
                onClick={() => setShowTheaterList((prevState) => !prevState)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
              >
                Check Available Movie Slots
              </button>
            </div>
          </div>
          {/* Container for theaters with scroll */}
          {showTheaterList && (
            <div className="w-full pl-4 overflow-y-auto">
              <div className="text-white">
                <h2 className="text-3xl font-bold mb-4">Movie Show</h2>
                {/* Iterate over theater data */}
                {
                  movieShowsBymovieId && (
                   
                    <div className="bg-gray-800 text-white">
                      <List
                        className=""
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                          onChange: (page) => {
                            console.log(page);
                          },
                          pageSize: 1,
                          className: "text-red", // Set text color to white
                        }}
                        dataSource={movieShowsBymovieId}
                        renderItem={(movieShow) => (
                          <List.Item 
                          onClick={() => navigate(`/book-ticket/${movieShow.id}`)}
                          key={movieShow.id}>
                            <div
                              key={movieShow.id}
                              className="border rounded p-2 bg-gray-900"
                            >
                              <div className="mb-2">
                                <span className="font-bold text-white text-xl">
                                  Screen No.:
                                </span>{" "}
                                <span className="ml-2 text-white">
                                  {movieShow.screen_no}
                                </span>
                              </div>
                              <div className="mb-2">
                                <span className="font-bold text-white">
                                  Language:
                                </span>{" "}
                                <span className="ml-2 text-white">
                                  {movieShow.language}
                                </span>
                              </div>
                              <div className="mb-2">
                                <span className="font-bold text-white">
                                  Start Time:
                                </span>{" "}
                                <span className="ml-2 text-white">
                                  {formatTime(movieShow.show_start_time)}
                                </span>
                              </div>
                              <div className="mb-2">
                                <span className="font-bold text-white">
                                  End Time:
                                </span>{" "}
                                <span className="ml-2 text-white">
                                  {formatTime(movieShow.show_end_time)}
                                </span>
                              </div>
                            </div>
                          </List.Item>
                        )}
                      />
                    </div>
                  )
                  // )
                  // )
                }
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MovieInfo;
