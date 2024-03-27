import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Rate } from "antd";
import { extractStars } from "../../../../../../utils/helper";

function CreateMovieForm() {
  const createValidationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    stars: Yup.number()
      .required("Stars is required")
      .min(0, "Stars must be at least 0")
      .max(5, "Stars must be at most 5"),
    description: Yup.string().required("Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      stars: "",
      description: "",
    },
    validationSchema: createValidationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      setSubmitting(false);
    },
  });

  return (
    <div className="container mx-auto p-4">
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
            className="form-input mt-1 block w-full rounded-md bg-gray-800 text-white px-4 py-2"
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
            className="form-input mt-1 block w-full rounded-md bg-gray-800 text-white px-4 py-2"
            min="0"
            max="5"
          />
          <div className="flex items-center">
            <Rate
              value={typeof formik.values.stars === 'string' ? parseInt(formik.values.stars) : formik.values.stars}
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
            className="form-textarea mt-1 block w-full rounded-md bg-gray-800 text-white px-4 py-2"
          />
          {formik.touched.description && formik.errors.description && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.description}
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
