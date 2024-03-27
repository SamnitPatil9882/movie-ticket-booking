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
        <div className="flex justify-center items-center mt-8 ">
          {/* Container for movie details */}
          <div className="max-w-3xl bg-gray-800 rounded-lg overflow-hidden shadow-lg flex w-1/2">
            {/* Movie image */}
            <div className="flex w-full">
              <img
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
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
                  label={<span className="text-white font-bold">Stars</span>}
                >
                  <Rate disabled defaultValue={extractStars(movie.stars)} />
                </Descriptions.Item>
                {/* Description */}
                <Descriptions.Item
                  label={
                    <span className="text-white font-bold">Description</span>
                  }
                >
                  <p className="text-white font-bold">{movie.description}</p>
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
            <div className="w-1/3 pl-4 overflow-y-auto">
              <div className="text-white">
                <h2 className="text-3xl font-bold mb-4">Movie Show</h2>
                {/* Iterate over theater data */}
                {
                  movieShowsBymovieId && (
                    // theaterByMovieShow.map((theater: Theater) => (
                    // <div
                    //   key={theater.id}
                    //   className="border rounded m-4 p-4 bg-gray-900"
                    // >
                    //   <div className="mb-2">
                    //     <span className="font-bold">Name:</span>{" "}
                    //     <span className="ml-2">{theater.name}</span>
                    //   </div>
                    //   <div className="mb-2">
                    //     <span className="font-bold">Location:</span>{" "}
                    //     <span className="ml-2">{theater.location}</span>
                    //   </div>
                    //   <div className="mb-2">
                    //     <span className="font-bold">City:</span>{" "}
                    //     <span className="ml-2">{theater.city}</span>
                    //   </div>
                    // </div>
                    // <InfiniteScroll
                    //   dataLength={theaterByMovieShow.length}
                    //   next={loadMoreData}
                    //   hasMore={data.length < 50}
                    //   loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    //   endMessage={
                    //     <Divider plain>It is all, nothing more 🤐</Divider>
                    //   }
                    //   scrollableTarget="scrollableDiv"
                    // >
                    //   <List
                    //     dataSource={theaterByMovieShow}
                    //     renderItem={(item) => (
                    //       <List.Item key={item.email}>
                    //         <List.Item.Meta
                    //           avatar={<Avatar src={item.picture.large} />}
                    //           title={
                    //             <a href="https://ant.design">{item.name.last}</a>
                    //           }
                    //           description={item.email}
                    //         />
                    //         <div>Content</div>
                    //       </List.Item>
                    //     )}
                    //   />
                    // </InfiniteScroll>
                    <div className="bg-gray-800 text-white">
                      <List
                        className=""
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                          onChange: (page) => {
                            console.log(page);
                          },
                          pageSize: 4,
                          className: "text-red", // Set text color to white
                        }}
                        dataSource={movieShowsBymovieId}
                        renderItem={(movieShow) => (
                          <List.Item 
                          onClick={() => navigate(`/book-ticket/${movieShow.movie_id}`)}
                          key={movieShow.id}>
                            <div
                              key={movieShow.id}
                              className="border rounded p-2 bg-gray-900"
                            >
                              <div className="mb-2">
                                <span className="font-bold text-white">
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
