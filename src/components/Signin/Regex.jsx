import * as Yup from "yup";

export const signinSchema = Yup.object({
  email: Yup.string().email().required(`Please enter your email`),
  password: Yup.string().required(`Please enter password`),
});
