import React, { useEffect } from "react";
// import { useUpdateUserMutation, useGetUserQuery } from "../../../../../../app/api/userApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { notification } from "antd";
import { useSelector } from "react-redux";
import { useGetUserQuery, useUpdateUserMutation } from "../../../../../Auth/api";

function EditUser({ editId }: { editId: number }) {
  const [api, contextHolder] = notification.useNotification();
  const authUserData = useSelector((state: any) => state.auth.userData);
  const { data: user, error, isLoading } = useGetUserQuery(editId);
  const [updateUser, { error: updateError, isLoading: updateIsLoading, isSuccess: editSuccess }] =
    useUpdateUserMutation();
  const editValidationSchema = Yup.object().shape({
    id: Yup.number().required("ID is required"),
    name: Yup.string().required("Name is required"),
    age: Yup.number()
      .required("Age is required")
      .min(0, "Age must be at least 0")
      .max(150, "Age must be at most 150"),
    phone_no: Yup.string().required("Phone number is required"),
    password_digest: Yup.string().required("Password is required"),
    role_id: Yup.number().required("Role ID is required"),
    created_at: Yup.string().required("Created At is required"),
    updated_at: Yup.string().required("Updated At is required"),
  });

  useEffect(() => {
    if (editSuccess) {
      api.open({
        message: "User Updated Successfully",
      });
    } else if (updateError) {
      api.open({
        message: "Got an error in updating the user",
        description: "Enter valid Data",
      });
    }
  }, [updateError, updateIsLoading, editSuccess, api]);

  const initialValues = user
    ? {
        id: user.id,
        name: user.name,
        age: user.age,
        phone_no: user.phone_no,
        password_digest: user.password_digest,
        role_id: user.role,
        created_at: user.created_at || "",
        updated_at: user.updated_at || "",
      }
    : {
        id: "",
        name: "",
        age: "",
        phone_no: "",
        password_digest: "",
        role_id: "",
        created_at: "",
        updated_at: "",
      };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: editValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await updateUser({
          id: values.id as number,
          name: values.name,
          age: values.age as number,
          phone_no: values.phone_no,
          password_digest: values.password_digest,
          role_id: values.role_id =="admin" ? 1 :2,
          created_at: values.created_at,
          updated_at: values.updated_at,
          // Add other fields as needed
        }).unwrap();
        console.log("response: ", response);
      } catch (error) {
        console.log("Update error:", error);
      }
    },
  });

  if (!user || isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-gray-800">
      {contextHolder}
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-md mx-auto border-white border-2 p-2 rounded-lg"
      >
        <div className="mb-6">
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
          <label htmlFor="name" className="block text-white mb-2 text-lg">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="form-input mt-1 block w-full rounded-md bg-gray-800 text-white px-4 py-2 text-lg"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.name}
            </div>
          ) : null}
        </div>
        <div className="mb-6">
          <label htmlFor="age" className="block text-white mb-2 text-lg">
            Age:
          </label>
          <input
            type="number"
            id="age"
            name="age"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.age}
            className="form-input mt-1 block w-full rounded-md bg-gray-800 text-white px-4 py-2"
            min="0"
          />
          {formik.touched.age && formik.errors.age ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.age}
            </div>
          ) : null}
        </div>
        <div className="mb-6">
          <label htmlFor="phone_no" className="block text-white mb-2 text-lg">
            Phone Number:
          </label>
          <input
            type="text"
            id="phone_no"
            name="phone_no"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone_no}
            className="form-input mt-1 block w-full rounded-md bg-gray-800 text-white px-4 py-2 text-lg"
          />
          {formik.touched.phone_no && formik.errors.phone_no ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.phone_no}
            </div>
          ) : null}
        </div>
        <div className="mb-6">
          <label htmlFor="password_digest" className="block text-white mb-2 text-lg">
            Password:
          </label>
          <input
            type="password"
            id="password_digest"
            name="password_digest"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password_digest}
            className="form-input mt-1 block w-full rounded-md bg-gray-800 text-white px-4 py-2 text-lg"
          />
          {formik.touched.password_digest && formik.errors.password_digest ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.password_digest}
            </div>
          ) : null}
        </div>
        <div className="mb-6">
          <label htmlFor="role_id" className="block text-white mb-2 text-lg">
            Role ID:
          </label>
          <input
            type="number"
            id="role_id"
            name="role_id"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.role_id}
            className="form-input mt-1 block w-full rounded-md bg-gray-800 text-white px-4 py-2"
          />
          {formik.touched.role_id && formik.errors.role_id ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.role_id}
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
    </div>
  );
}

export default EditUser;
