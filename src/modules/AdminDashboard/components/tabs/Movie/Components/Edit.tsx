import React from "react";
import { useGetMovieQuery } from "../../../../../../app/api/moviApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Rate } from "antd";
import { extractStars } from "../../../../../../utils/helper";

function Edit({ editId }: { editId: number }) {
  const { data: movie, error, isLoading } = useGetMovieQuery(editId);

  const editValidationSchema = Yup.object().shape({
    id: Yup.number().required("ID is required"),
    title: Yup.string().required("Title is required"),
    stars: Yup.number()
      .required("Stars is required")
      .min(0, "Stars must be at least 0")
      .max(5, "Stars must be at most 5"),
    description: Yup.string().required("Description is required"),
  });

  let exstars;
  if (movie) {
    exstars = extractStars(movie?.stars);
  }

  const initialValues = movie
    ? {
        id: movie.id,
        title: movie.title,
        stars: exstars,
        description: movie.description || "",
      }
    : {
        id: "",
        title: "",
        stars: "",
        description: "",
      };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: editValidationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      setSubmitting(false);
    },
  });

  if (editId <= 0) {
    return <div className="text-white">Movie does not exist.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-8 text-white">Edit Movie</h1>
      {movie && (
        <form
          onSubmit={formik.handleSubmit}
          className="max-w-md mx-auto border-white border-2 p-2 rounded-lg"
        >
          <div className="mb-6">
            <label htmlFor="id" className="block text-white mb-2">
              ID:
            </label>
            <input
              type="number"
              id="id"
              name="id"
              disabled= {true}
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
              className="form-input mt-1 block w-full rounded-md bg-gray-800 text-white px-4 py-2"
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.title}
              </div>
            ) : null}
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
              className="form-input mt-1 block w-full rounded-md bg-gray-800 text-white px-4 py-2"
              min="0"
              max="5"
            />
            <div className="flex items-center">
              <Rate
               value={typeof formik.values.stars === 'string' ? parseInt(formik.values.stars) : formik.values.stars}
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
            <label htmlFor="description" className="block text-white mb-2">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className="form-textarea mt-1 block w-full rounded-md bg-gray-800 text-white px-4 py-2"
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.description}
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
