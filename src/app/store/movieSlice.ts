import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../api/types";

interface MovieState{
    movies: Movie[];
}

const initialState: MovieState = {
    movies: []
}

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setMovies: (state, action: PayloadAction<Movie[]>) => {
            state.movies = action.payload;
            console.log("state movies: ",state.movies);
        }
    }
});

export const { setMovies } = movieSlice.actions;

export default movieSlice.reducer;