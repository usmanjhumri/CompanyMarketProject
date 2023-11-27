import * as Yup from "yup";

export const signupSchema = Yup.object({
    firstname:Yup.string().min(2).max(20).required("plese enter your FirstName").matches(/^[a-z]+$/, 'Only alphabetic characters allowed'),
    lastname:Yup.string().min(2).max(20).required("plese enter your LastName").matches(/^[a-z]+$/, 'Only alphabetic characters allowed'),
    email:Yup.string().email().required(`plese enter your email`),
    password:Yup.string().min(6).max(12).matches(/^.*[!@#$%^&*()_+\-=\]{};':"\\|,.<>?].*$/, 'Need one special character'),
    confirmpassword:Yup.string().oneOf([Yup.ref("password"),null], "password must matched").required(`password confirm is required`),

})
