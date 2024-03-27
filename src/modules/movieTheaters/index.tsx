import React from 'react';
import Header from '../Headers/header';
import { useGetMovieQuery } from '../../app/api/moviApi';
import { useParams } from 'react-router-dom';
import { Card, Rate } from 'antd';
import Meta from 'antd/es/card/Meta';
import ListOfAvailTheaters from './components/ListOfAvailTheaters';

function MovieAvailTheater() {
    const { movieId } = useParams<{ movieId?: string }>();
    const { data: movie, error, isLoading } = useGetMovieQuery(movieId ? parseInt(movieId) : 1);

    function extractStars(stars: string): number {
        const match = stars.match(/\d+/);
        return match ? parseInt(match[0]) : 0; 
    }

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-grow w-screen">
                <div className='bg-green-400 flex-1 flex justify-center items-center'>
                    {isLoading && <div>Loading...</div>}
                    {error && <div>Error occurred</div>}
                    {movie && (
                        <Card
                            className="m-5"
                            hoverable
                            style={{ width: '80%' }}
                            cover={
                                <img
                                    alt="example"
                                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                    style={{ height: 600 }}
                                />
                            }
                        >
                            <Meta
                                title={<h1 className='text-2xl'>{movie.title}</h1>}
                                description={
                                    <div>
                                        <Rate disabled defaultValue={extractStars(movie.stars)} />
                                        <p className='text-black text-xl'>{movie.description}</p>
                                    </div>
                                }
                            />
                        </Card>
                    )}
                </div>
                <div className="bg-red-400 flex-1">
                    <ListOfAvailTheaters key={movieId} movieId={movieId ? parseInt(movieId) : 1} />
                </div>
            </div>
        </div>
    );
}

export default MovieAvailTheater;
