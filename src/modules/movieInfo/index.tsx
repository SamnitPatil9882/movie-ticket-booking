import React from "react";
import { Card, Rate } from "antd";
import { useParams } from "react-router-dom";
import { useGetMovieQuery } from "../../app/api/moviApi";
import Header from "../Headers/header";

function MovieInfo() {
  const { movieId } = useParams<{ movieId?: string }>();
  const {
    data: movie,
    error,
    isLoading,
  } = useGetMovieQuery(movieId ? parseInt(movieId) : 1); // Parse to int if movieId is defined

  function extractStars(stars: string): number {
    const match = stars.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  }

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error occurred</div>}
      {movie && (
        <div className="h-screen">
          <Header />
          <div className="flex w-screen bg-orange-400">
            <div className="flex justify-center items-center w-1/2 bg-orange-600">
              <img
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                alt={movie.title}
              />
            </div>
            <div className="flex min-w-0.5 bg-green-400" >
              <Card title={movie.title} className="w-full">
                <p>
                  <strong>Stars:</strong>{" "}
                  <Rate disabled defaultValue={extractStars(movie.stars)} />
                </p>
                <p>
                  <strong>Description:</strong> {movie.description}
                </p>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieInfo;
