import { configureStore, combineReducers,} from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import moviesReducer from "./store/movieSlice";
import { authApi } from "../modules/Auth/api";
import { movieShowApi } from "./api/movieShows";
import { movieApi } from "./api/moviApi";
import { movieInTheaterApi } from "./api/movieInTheater";
import { theaterApi } from "./api/theater";
import { ticketApi } from "./api/ticket";

// Load persisted state from local storage
const persistedState = localStorage.getItem("reduxState");
const initialState = persistedState ? JSON.parse(persistedState) : undefined;

// Extract the preloaded state for the auth reducer
const preloadedAuthState = initialState ? initialState.auth : undefined;

// Combine reducers
const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [movieShowApi.reducerPath]: movieShowApi.reducer,
  [movieApi.reducerPath]: movieApi.reducer,
  [movieInTheaterApi.reducerPath]: movieInTheaterApi.reducer,
  [theaterApi.reducerPath]: theaterApi.reducer,
  [ticketApi.reducerPath]: ticketApi.reducer,
  auth: authReducer,
  movies: moviesReducer,
});

// Create the store
const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    auth: preloadedAuthState,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, movieShowApi.middleware,movieApi.middleware,movieInTheaterApi.middleware,theaterApi.middleware,ticketApi.middleware),
  devTools: process.env.NODE_ENV !== 'production', // Enable devtools only in non-production environment
});

// Subscribe to store changes and save auth state to local storage
store.subscribe(() => {
  const authState = store.getState().auth;
  const state = JSON.stringify({ auth: authState });
  localStorage.setItem("reduxState", state);
});

// Add event listener to save auth state to local storage before page unload
window.addEventListener("beforeunload", () => {
  const authState = store.getState().auth;
  const state = JSON.stringify({ auth: authState });
  localStorage.setItem("reduxState", state);
});

// Function to clear stored state
export const clearStoredState = () => {
  localStorage.removeItem("reduxState");
};

export default store;
