import * as Yup from "yup";

export const signupSchema = Yup.object({
  firstname: Yup.string()
    .min(2)
    .max(20)
    .required("Please enter your first name")
    .matches(/^[a-zA-Z]+$/, "Only alphabetic characters allowed"),
  lastname: Yup.string()
    .min(2)
    .max(20)
    .required("Please enter your last name")
    .matches(/^[a-zA-Z]+$/, "Only alphabetic characters allowed"),
  username: Yup.string().min(2).max(20).required("Please enter your user name"),
  email: Yup.string().email().required(`Please enter your email`),
  password: Yup.string()
    .min(8)
    .max(20)
    .matches(
      /^.*[!@#$%^&*()_+\-=\]{};':"\\|,.<>?].*$/,
      "Need one special character"
    ),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must matched")
    .required(`Password confirm is required`),
});
