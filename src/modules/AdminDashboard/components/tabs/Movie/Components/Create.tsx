import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Rate, notification } from "antd";
import { extractStars } from "../../../../../../utils/helper";
import { useCreateMovieMutation } from "../../../../../../app/api/moviApi";
import { Movie } from "../../../../../../app/api/types";
import { useSelector } from "react-redux";

function CreateMovieForm() {
  const [api, contextHolder] = notification.useNotification();
  const authUserData = useSelector((state: any) => state.auth.userData)
  const [createMovie, { error: createError, isLoading: createIsLoading, isSuccess:createSuccess }] =
  useCreateMovieMutation();
  const createValidationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    stars: Yup.number()
      .required("Stars is required")
      .min(0, "Stars must be at least 0")
      .max(5, "Stars must be at most 5"),
    description: Yup.string().required("Description is required"),
    img_url: Yup.string()
      .url("Invalid URL format")
      .required("Image URL is required"),
  });

  useEffect(()=>{
    if(createSuccess){
      api.open({
        message: 'Movie Created Successfully',
      })
    }else if(createError){
      api.open({
        message: 'Got an error in Creating the movie',
        description:"Enter valid Data"
      })
    }
  },[createError,createIsLoading,createSuccess,api])
  const formik = useFormik({
    initialValues: {
      id: "",
      title: "",
      stars: "",
      description: "",
      img_url: "",
    },
    validationSchema: createValidationSchema,
    onSubmit: async (values) => {
      try {
        const response: Movie = await createMovie({
          id:1,
          title: values.title,
          stars: values.stars as string,
          description: values.description,
          img_url: values.img_url,
          user_id:authUserData.id
        }).unwrap();
        console.log("response: ", response);
      } catch (error) {
        console.log("Login error:", error);
      }
    },
  });

  return (
    <div className="container mx-auto p-4 bg-gray-800">
      {contextHolder}
      <h1 className="text-3xl font-semibold mb-8 text-white">Create Movie</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-md mx-auto border-white border-2 p-2 rounded-lg"
      >
        <div className="mb-6">
          <label htmlFor="title" className="block text-white mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className="form-input mt-1 block w-full rounded-md bg-gray-800 text-white px-4 py-2 border border-gray-700 placeholder-gray-500"
            placeholder="Enter title..."
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.title}
            </div>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="stars" className="block text-white mb-2">
            Stars:
          </label>
          <input
            type="number"
            id="stars"
            name="stars"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.stars}
            className="form-input mt-1 block w-full rounded-md bg-gray-800 text-white px-4 py-2 border border-gray-700 placeholder-gray-500"
            placeholder="Enter stars..."
            min="0"
            max="5"
          />
          <div className="flex items-center">
            <Rate
              value={
                typeof formik.values.stars === "string"
                  ? parseInt(formik.values.stars)
                  : formik.values.stars
              }
              onChange={(value) => formik.setFieldValue("stars", value)}
              className="text-2xl mr-2"
            />
            <span className="text-white text-lg">
              ({formik.values.stars} out of 5)
            </span>
          </div>
          {formik.touched.stars && formik.errors.stars && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.stars}
            </div>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-white mb-2">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className="form-textarea mt-1 block w-full rounded-md bg-gray-800 text-white px-4 py-2 border border-gray-700 placeholder-gray-500"
            placeholder="Enter description..."
          />
          {formik.touched.description && formik.errors.description && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.description}
            </div>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="img_url" className="block text-white mb-2">
            Image URL:
          </label>
          <input
            type="text"
            id="img_url"
            name="img_url"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.img_url}
            className="form-input mt-1 block w-full rounded-md bg-gray-800 text-white px-4 py-2 border border-gray-700 placeholder-gray-500"
            placeholder="Enter image URL..."
          />
          {formik.touched.img_url && formik.errors.img_url && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.img_url}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateMovieForm;
