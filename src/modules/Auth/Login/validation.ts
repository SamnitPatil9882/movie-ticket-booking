import * as Yup from "yup";

export const LoginCredentialsValidationSchema = Yup.object({
  // email: Yup.string()
  //   .email("Invalid email address")
  //   .required("Email is required"),
  id: Yup.number()
    .required("userid is required")
    .typeError("User ID must be a number"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters"),
});
