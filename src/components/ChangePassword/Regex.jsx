import * as Yup from "yup";

export const signupSchema = Yup.object({
  password: Yup.string()
    .min(8)
    .max(20)
    .matches(
      /^.*[!@#$%^&*()_+\-=\]{};':"\\|,.<>?].*$/,
      "Need one special character"
    ),
  password_confirmation: Yup.string()
    .required(`Password confirm is required`)
    .oneOf([Yup.ref("password"), null], "Password must matched"),
});
