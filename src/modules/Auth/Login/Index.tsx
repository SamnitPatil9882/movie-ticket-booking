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

interface LoginFormValues {
  id: string;
  password: string;
}

const initialValues: LoginFormValues = {
  id: "",
  password: "",
};

function Login() {
  const [responseData, setResponseData] = useState<UserResponse>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();

  const [login, { isLoading, isSuccess, error, data }] = useLoginMutation();
 
  useEffect(() => {
    if (isSuccess && data && data.user) {
      const userData = data.user;
      storage.setToken(data.token);
      dispatch(authLogin({ userData }));
      navigate("/home");
    }
    else if(error){
      api.open({
        message: 'Enter Valid Credentials',
      });
    }
  }, [isSuccess, data, dispatch, navigate]);

  const validationSchema = LoginCredentialsValidationSchema;

  const { handleChange, handleSubmit, values, errors, touched, handleBlur } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response: UserResponse = await login(values).unwrap();
        console.log("response: ", response);
        
      } catch (error) {
        console.log("Login error:", error);
        api.open({
          message: 'Enter Valid Credentials',
        });
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
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
            <h2 className="text-white text-5xl font-bold mb-8">Sign In</h2>
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
                onBlur={handleBlur}
                className="bg-gray-800 text-white w-full p-4 rounded-md mb-4 focus:outline-none focus:ring focus:border-red-500"
                placeholder="User Id"
              />
              {touched.id && errors.id && <div className="text-red-500">{errors.id}</div>}
            </FormGroup>

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
                onBlur={handleBlur}
                className="bg-gray-800 text-white w-full p-4 rounded-md mb-4 focus:outline-none focus:ring focus:border-red-500"
                placeholder="Password"
              />
              {touched.password && errors.password && <div className="text-red-500">{errors.password}</div>}
            </FormGroup>
            <Button
              disabled={isLoading}
              type="submit"
              className="bg-red-500 text-white py-4 px-8 rounded-md hover:bg-red-600 transition duration-300 ease-in-out w-full font-bold text-2xl"
            >
              {isLoading?"Submitting":"Submit"}
            </Button>
            <p className="mt-4 text-lg text-gray-400">
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
