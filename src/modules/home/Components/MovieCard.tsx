import React from "react";
import { Card, Rate } from "antd";
import { useGetMovieQuery } from "../../../app/api/moviApi";
import { useNavigate } from "react-router-dom";
import { MovieShow } from "../../../app/api/types";

const { Meta } = Card;

// function MovieCard({ movieShow }: { movieShow: MovieShow }) {
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
          <div>Error occured</div>

          <div>
            <Card
              className="m-5"
              hoverable
              onClick={() => navigate(`/movie-info/${movieId}`)}
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta
                title="Demo Movie"
                description={
                  <Rate disabled defaultValue={extractStars("4 stars")} />
                }
              />
            </Card>
          </div>
        </div>
      )}
      {movie && (
        <Card
          className="m-5"
          hoverable
          onClick={() => navigate(`/movie-info/${movieId}`)}
          style={{ width: 240 }}
          cover={
            <img
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
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
