import React from "react";
import { Card, Rate } from "antd";
import { useGetMovieQuery } from "../../../app/api/moviApi";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

function MovieCard({ id }: { id: number }) {
  const { data: movie, error, isLoading } = useGetMovieQuery(id);
const navigate = useNavigate();
  function extractStars(stars: string): number {
    const match = stars.match(/\d+/);
    return match ? parseInt(match[0]) : 0; 
  }
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error occured</div>}
      {movie &&
        <Card
          className="m-5"
          hoverable
          onClick={()=>navigate(`/movie-info/${id}`)}
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
            description={<Rate disabled defaultValue={extractStars(movie.stars)} />}
          />
        </Card>
      }
    </div>
  );
}

export default MovieCard;
