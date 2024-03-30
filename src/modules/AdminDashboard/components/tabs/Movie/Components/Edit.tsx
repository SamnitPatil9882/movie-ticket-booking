import React, { useEffect } from "react";
import {
  useCreateMovieMutation,
  useGetMovieQuery,
  useUpdateMovieMutation,
} from "../../../../../../app/api/moviApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Rate, notification } from "antd";
import { extractStars } from "../../../../../../utils/helper";
import { Movie } from "../../../../../../app/api/types";
import { useSelector } from "react-redux";

function Edit({ editId }: { editId: number }) {
  const [api, contextHolder] = notification.useNotification();
  const authUserData = useSelector((state: any) => state.auth.userData)
  const { data: movie, error, isLoading } = useGetMovieQuery(editId);
  const [updateMovie, { error: updateError, isLoading: updateIsLoading, isSuccess:editSuccess }] =
    useUpdateMovieMutation();
  const editValidationSchema = Yup.object().shape({
    id: Yup.number().required("ID is required"),
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

  let exstars;
  if (movie) {
    exstars = extractStars(movie?.stars);
  }
  useEffect(()=>{
    if(editSuccess){
      api.open({
        message: 'Movie Updated Successfully',
      })
    }else if(updateError){
      api.open({
        message: 'Got an error in updating the movie',
        description:"Enter valid Data"
      })
    }
  },[updateError,updateIsLoading,editSuccess,api])

  const initialValues = movie
    ? {
        id: movie.id,
        title: movie.title,
        stars: exstars,
        description: movie.description || "",
        img_url: movie.img_url || "",
      }
    : {
        id: "",
        title: "",
        stars: "",
        description: "",
        img_url: "",
      };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: editValidationSchema,
    onSubmit: async (values) => {
      try {
        const response: Movie = await updateMovie({
          id: values.id as number,
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

  if (editId <= 0) {
    return <div className="text-white">Movie does not exist.</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-gray-800">
      {contextHolder}
      {movie && (
        <form
          onSubmit={formik.handleSubmit}
          className="max-w-md mx-auto border-white border-2 p-2 rounded-lg"
        >
          <div className="mb-6 ">
            <label htmlFor="id" className="block text-white mb-2 text-lg">
              ID:
            </label>
            <input
              type="number"
              id="id"
              name="id"
              disabled={true}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.id}
              className="form-input mt-1 block w-full rounded-md bg-gray-800 text-white px-4 py-2"
            />
            {formik.touched.id && formik.errors.id ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.id}
              </div>
            ) : null}
          </div>
          <div className="mb-6">
            <label htmlFor="title" className="block text-white mb-2 text-lg">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              className="form-input mt-1 block w-full rounded-md bg-gray-800 text-white px-4 py-2 text-lg"
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.title}
              </div>
            ) : null}
          </div>
          <div className="mb-6">
            <label htmlFor="stars" className="block text-white mb-2 text-lg">
              Stars:
            </label>
            <input
              type="number"
              id="stars"
              name="stars"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.stars}
              className="form-input mt-1 block w-full rounded-md bg-gray-800 text-white px-4 py-2"
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
                // Update Rate component value
                onChange={(value) => formik.setFieldValue("stars", value)} // Update formik value on Rate change
                className="text-2xl mr-2"
              />
              <span className="text-white text-lg">
                ({formik.values.stars} out of 5)
              </span>
            </div>
            {formik.touched.stars && formik.errors.stars ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.stars}
              </div>
            ) : null}
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-white mb-2 text-lg">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className="form-textarea mt-1 block w-full rounded-md bg-gray-800 text-white px-4 py-2 text-lg"
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.description}
              </div>
            ) : null}
          </div>
          <div className="mb-6">
            <label htmlFor="img_url" className="block text-white mb-2 text-lg">
              Image URL:
            </label>
            <input
              type="text"
              id="img_url"
              name="img_url"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.img_url}
              className="form-input mt-1 block w-full rounded-md bg-gray-800 text-white px-4 py-2 text-lg"
            />
            {formik.touched.img_url && formik.errors.img_url ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.img_url}
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default Edit;
