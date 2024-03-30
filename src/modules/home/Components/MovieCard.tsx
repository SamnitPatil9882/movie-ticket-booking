import React from "react";
import { Card, Rate } from "antd";
import { useGetMovieQuery } from "../../../app/api/moviApi";
import { useNavigate } from "react-router-dom";
import { MovieShow } from "../../../app/api/types";

const { Meta } = Card;

function MovieCard({ movieId }: { movieId: number }) {
  const {
    data: movie,
    error,
    isLoading,
  } = useGetMovieQuery(movieId);
  
  const navigate = useNavigate();

  function extractStars(stars: string): number {
    const match = stars.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  }

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && (
        <div className="">
          <div>Error occurred</div>
        </div>
      )}
      {movie && (
        <Card
          className="m-5 transition-transform duration-300 transform hover:scale-110"
          hoverable
          onClick={() => navigate(`/movie-info/${movieId}`)}
          style={{ width: 300 }}
          cover={
            <img
              alt="example"
              src={movie.img_url}
            />
          }
        >
          <Meta
            title={movie.title}
            description={
              <Rate disabled defaultValue={extractStars(movie.stars)} />
            }
          />
        </Card>
      )}
    </div>
  );
}

export default MovieCard;
