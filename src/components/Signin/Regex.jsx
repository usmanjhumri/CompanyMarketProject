import * as Yup from "yup";

export const signinSchema = Yup.object({
    email:Yup.string().email().required(`Please enter your email`),
    password:Yup.string().min(6).max(12).matches(/^.*[!@#$%^&*()_+\-=\]{};':"\\|,.<>?].*$/, 'Need one special character'),

})