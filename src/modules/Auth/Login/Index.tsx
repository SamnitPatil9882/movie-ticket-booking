import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import { LoginCredentials, UserResponse } from "../types";
import { LoginCredentialsValidationSchema } from "./validation";
import { ErrorMessage, useFormik } from "formik";
import storage from "../../../utils/storage";
import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import { useLoginMutation } from "../api";
import { login as authLogin } from "../../../app/authSlice";
import { useDispatch } from "react-redux";
import { log } from "console";

const initialValues: LoginCredentials = {
  // email: "",
  id: -1,
  password: "",
};

function Login() {
  const [responseData, setResponseData] = useState<UserResponse>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();

  const [login, { isLoading, isSuccess, error, data }] = useLoginMutation();
  // console.log(
  //   "isLoading: ",
  //   isLoading,
  //   " isSuccess: ",
  //   isSuccess,
  //   " isError: ",
  //   error,
  //   " data: ",
  //   data
  // );

  // useEffect(() => {
  //   console.log("data:");
    
  //   console.log({data});
  //   console.log(data?.data);
  //   console.log(data?.data.user);
    
    
  //   if (isSuccess && data && data.data && data.data.user) { // Check if data and data.user exist
  //     console.log("in useEffect");
      
  //     const userData = data.data.user;
  //     dispatch(authLogin({ userData }));
  //     navigate("/home");
  //   }
  // }, [data, dispatch, navigate]); 
  useEffect(() => {
    if (isSuccess && data && data.user) {
      const userData = data.user;
      storage.setToken(data.token);
      dispatch(authLogin({ userData }));
      navigate("/home");
    }
  }, [isSuccess, data, dispatch, navigate]);

  const validationSchema = LoginCredentialsValidationSchema;

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response: UserResponse = await login(values).unwrap();
        console.log("response: ", response);
      } catch (error) {
        console.log("Login error:", error);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      {/* {error && <div>Error occured</div>}
      {isPending && <div>Pending</div>}
      {isSuccess && <div>Success</div>} */}
      {/* <ToastContainer/> */}

      {/* {showToast && (
        <div className="fixed bottom-0 right-0 mb-4 mr-4">
          <div className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md">
            An error occurred while logging in. Please try again later.
          </div>
        </div>
      )} */}
      {contextHolder}
      <div className="flex justify-center items-center w-full">
        <div className="quote-container flex justify-center items-center w-1/2">
          <div className="quote p-8 text-white text-center bg-opacity-75 bg-black-400 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-4">
              Discover Your Next Favorite Movie
            </h2>
            <p className="mb-4 text-lg">
              Explore a vast collection of movies across all genres.
            </p>
            <p className="mb-4 text-lg">
              Unlock an immersive cinematic experience with our platform.
            </p>
            <p className="text-lg">Get ready for unforgettable movie nights!</p>
          </div>
        </div>
        <div className="form-container w-1/2">
          <Form
            onSubmit={handleSubmit}
            className="bg-black p-12 rounded-lg shadow-lg border-2 border-gray-700 focus:border-red-500"
          >
            <h2 className="text-white text-4xl font-bold mb-8">Sign In</h2>
            <FormGroup className="mb-6">
              <Label htmlFor="exampleUserId" className="sr-only">
                User Id
              </Label>
              <Input
                type="number"
                id="exampleUserId"
                value={values.id}
                name="id"
                onChange={handleChange}
                className="bg-gray-800 text-white w-full p-4 rounded-md mb-4 focus:outline-none focus:ring focus:border-red-500"
                placeholder="User Id"
              />
            </FormGroup>

            {errors.id && (
              <div className="text-red-500">{errors.id as string}</div>
            )}

            <FormGroup className="mb-6">
              <Label htmlFor="examplePassword" className="sr-only">
                Password
              </Label>
              <Input
                type="password"
                id="examplePassword"
                value={values.password}
                name="password"
                onChange={handleChange}
                className="bg-gray-800 text-white w-full p-4 rounded-md mb-4 focus:outline-none focus:ring focus:border-red-500"
                placeholder="Password"
              />
            </FormGroup>
            {errors.password && (
              <div className="text-red-500">{errors.password as string}</div>
            )}
            <Button
              type="submit"
              className="bg-red-500 text-white py-4 px-8 rounded-md hover:bg-red-600 transition duration-300 ease-in-out w-full"
            >
              Sign In
            </Button>
            <p className="mt-4 text-sm text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-white">
                Sign up now
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
