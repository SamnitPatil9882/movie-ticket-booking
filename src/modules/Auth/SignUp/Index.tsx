import React, { useEffect } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { Role, SignUpCredentials, SignUpRequest } from "../types";
import { SignUpCredentialsValidationSchema } from "./validation";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import storage from "../../../utils/storage";
import { notification } from "antd";
import { AxiosError } from "axios";
import { useSignUpUserMutation } from "../api";
import { login as authLogin } from "../../../app/authSlice";
import { useDispatch } from "react-redux";


const initialValues: SignUpCredentials = {
  role: Role.user,
  name: "",
  age: 0,
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [signUpUser,{isError,isLoading:isPending,isSuccess,data,error}] = useSignUpUserMutation()
  const validationSchema = SignUpCredentialsValidationSchema;

  useEffect(() => {
    if (isSuccess && data && data.user) {
      const userData = data.user;
      storage.setToken(data.token);
      dispatch(authLogin({ userData }));
      navigate("/home");
    }
  }, [isSuccess, data, dispatch, navigate]);

  const { handleChange, handleSubmit, values, isSubmitting, errors, touched,setTouched, handleBlur } =
    useFormik({
      initialValues,
      onSubmit: async (values) => {

        try {
          const signUpReqData: SignUpRequest = {
            user: {
              name: values.name,
              age: values.age,
              phone_no: values.phone,
              email: values.email,
              password: values.password,
              role_id: values.role
            }
          };
          const response = await signUpUser(signUpReqData).unwrap();
          console.log("response: ", response);
        } catch (error) {
          console.log("Login error:", error);
        }
      },
      validationSchema,
    });
  
    const handleFieldBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const { name } = e.target;
      setTouched({ ...touched, [name]: true });
      handleBlur(e);
    };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-black-500">
      {isPending && <div> creating user.. </div>}
      {error && <div>error occured</div>}
        {contextHolder}
      <div className="flex justify-center items-center w-full">
        <div className="quote-container flex justify-center items-center w-1/2">
          <div className="quote p-8 text-white text-center bg-opacity-75 bg-black rounded-lg shadow-lg">
            <h2 className="text-4xl font-semibold mb-4">
              Join Us and Discover Your Next Favorite Movie
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
            <h2 className="text-white text-5xl font-bold mb-8 ">Sign Up</h2>
            {/* Select Role section */}
           
            <FormGroup className="mb-4">
              <Label htmlFor="name" className="text-white mb-2 block text-left font-bold text-xl">
                Name:
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleFieldBlur}
                className="bg-gray-900 text-white w-full p-3 rounded-md mb-2 focus:outline-none focus:ring focus:border-red-500"
                placeholder="Enter your name"
              />
              {errors.name && touched.name && (
                <div className="text-red-500 text-xs mb-2">{errors.name}</div>
              )}
            </FormGroup>
            {/* Render error message for age */}
            <FormGroup className="mb-4">
              <Label htmlFor="age" className="text-white mb-2 block text-left font-bold text-xl">
                Age:
              </Label>
              <Input
                type="number"
                id="age"
                name="age"
                value={values.age}
                onChange={handleChange}
                onBlur={handleFieldBlur}
                className="bg-gray-900 text-white w-full p-3 rounded-md mb-2 focus:outline-none focus:ring focus:border-red-500"
                placeholder="Enter your age"
              />
              {errors.age && touched.age && (
                <div className="text-red-500 text-xs mb-2">{errors.age}</div>
              )}
            </FormGroup>
            {/* Render error message for phone */}
            <FormGroup className="mb-4">
              <Label htmlFor="phone" className="text-white mb-2 block text-left font-bold text-xl">
                Phone Number:
              </Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleFieldBlur}
                className="bg-gray-900 text-white w-full p-3 rounded-md mb-2 focus:outline-none focus:ring focus:border-red-500"
                placeholder="Enter your phone number"
              />
              {errors.phone && touched.phone && (
                <div className="text-red-500 text-xs mb-2">{errors.phone}</div>
              )}
            </FormGroup>
            {/* Render error message for password */}
            <FormGroup className="mb-4">
              <Label htmlFor="password" className="text-white mb-2 block text-left font-bold text-xl">
                Password:
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleFieldBlur}
                className="bg-gray-900 text-white w-full p-3 rounded-md mb-2 focus:outline-none focus:ring focus:border-red-500"
                placeholder="Enter your password"
              />
              {errors.password && touched.password && (
                <div className="text-red-500 text-xs mb-2">
                  {errors.password}
                </div>
              )}
            </FormGroup>
            {/* Render error message for confirm password */}
            <FormGroup
              className="mb-6
"
            >
              <Label
                htmlFor="confirmPassword"
                className="text-white mb-2 block text-left font-bold text-xl"
              >
                Confirm Password:
              </Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleFieldBlur}
                className="bg-gray-900 text-white w-full p-3 rounded-md mb-2 focus:outline-none focus:ring focus:border-red-500"
                placeholder="Confirm your password"
              />
              
            </FormGroup>
            {errors.confirmPassword && touched.confirmPassword && (
                <div className="text-red-500 text-xs mb-2">
                  {errors.confirmPassword}
                </div>
              )}
            {/* Submit Button */}
            <Button
              type="submit"
              className="bg-red-500 text-white py-4 px-8 rounded-md hover:bg-red-600 transition duration-300 ease-in-out w-full font-bold text-2xl"
            >
              Sign Up
            </Button>
            {/* Link to Login */}
            <p className="mt-4 text-lg text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-white">
                Log in here
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
