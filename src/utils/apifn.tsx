import axios from "axios";
import { Dispatch } from "react";
import { MovieInTheater, MovieShow } from "../app/api/types";
import storage from "./storage";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3001/api/v1/",
    timeout: 2000,
    headers: {
      Authorization: `Bearer ${storage.getToken()}` // Include bearer token in the Authorization header
    }
  });

  
  export const getMovieShowData = async (uniqueMovieShowIds: number[]): Promise<MovieShow[]> => {
    try {
      const promises = uniqueMovieShowIds.map(uniqueMovieShowId => {
        return axiosInstance.get(`movie_shows/${uniqueMovieShowId}`)
          .then(response => response.data);
      });
  
      const results = await Promise.all(promises);
      return results as MovieShow[];
    } catch (error) {
      console.error('Error fetching movie show data:', error);
      throw error; // Rethrow the error to handle it outside
    }
  };
// export const SignUpUser = (data: SignUpRequest): Promise<UserSignUpResponse> => {
//     console.log(data);
//     return axiosInstance.post("users", data);
//   };