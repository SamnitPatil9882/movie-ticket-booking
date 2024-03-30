import * as Yup from "yup";
import { Role } from "../types";

export const SignUpCredentialsValidationSchema = Yup.object({
  role: Yup.number()
    .required("Role is required")
    .oneOf([Role.admin, Role.user], "Invalid Role"),
  name: Yup.string()
    .required("Name is required")
    .matches(/^[A-Za-z]+$/, "Name must contain only alphabets")
    .min(4, "Name must be at least 4 characters"),
  age: Yup.number()
    .required("Age is required")
    .min(13, "You must be at least 13 years old"),
  phone: Yup.string()
    .required("Phone Number is required")
    .matches(/^\d{10}$/, "Phone Number must contain numbers")
    .min(10, "Phone Number must contain exactly 10 digits")
    .max(10, "Phone Number must contain exactly 10 digits"),
    password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z].*[A-Za-z].*[A-Za-z]).*$/,
      "Password must contain at least 3 alphabet characters"
    )
    .matches(
      /^(?=.*\d.*\d).*$/,
      "Password must contain at least 2 numeric characters"
    )
    .matches(
      /^(?=.*[!@#$%^&*()\-_=+\\|[\]{};:'",.<>/?]).*$/,
      "Password must contain at least one symbol"
    )
    .matches(
      /^(?=.*[a-z]).*$/,
      "Password must contain at least one lowercase letter"
    )
    .matches(
      /^(?=.*[A-Z]).*$/,
      "Password must contain at least one uppercase letter"
    )
    .matches(
      /^\S*$/,
      "Password cannot contain spaces"
    )
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match")
    .min(4, "Confirm Password must be at least 4 characters"),
});
