import * as Yup from "yup";

export const signinSchema = Yup.object({
  email: Yup.string().required(`Please enter your email or username`),
  password: Yup.string().required(`Please enter your Password`),
});
