/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import  { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Container,
  Typography,
  Button,

  FormControl,
 
  
} from "@mui/material";
import formStyle from "./styles";
import "./index";
import { useFormik } from "formik";
import { signupSchema } from "./Regex";
import logo from "../../assets/jdlogo.png";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash, FaRegEyeSlash,FaRegEye } from "react-icons/fa";
// import {  } from "react-icons/fa";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
// import countriesList from "react-select-country-list";
// Import the list of countries

const initialValues = {
  firstname: "",
  lastname: "",
  username: "",
  country: "",
  phoneNumber: "",
  email: "",
  password: "",
  confirmpassword: "",
};

export default function Signup({ setIsLoggedIn }) {
  const handleSignIn = () => {
    setIsLoggedIn(true);
  };
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    errors,
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    touched,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: signupSchema,
    onSubmit: async (values, actions) => {
      console.log(values);
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      actions.resetForm();
      setLoading(false);
      navigate("/signin");
    },
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontFamily: "Be+Vietnam",
        }}
      >
        <Container maxWidth="sm">
          <Paper
            sx={formStyle.paperStyle}
            style={{
              borderRadius: "10px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.10)",
              minHeight: "200px",
              padding: "16px",
            }}
          >
            <Grid container direction="column" align="center" spacing={2}>
              <Grid
                container
                style={{ paddingTop: "5px" }}
                justifyContent="center"
              >
                <img src={logo} width="70px" alt="jdlogo" />
              </Grid>
              <Typography
                sx={formStyle.signupHeading}
                variant="h4"
                component="h1"
              >
                Create Account
              </Typography>
            </Grid>

            <form onSubmit={handleSubmit}>
              <TextField
                id="firstname"
                name="firstname"
                value={values.firstname}
                fullWidth
                label="Firstname"
                variant="standard"
                size="small"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ marginBottom: "20px" }}
              />
              {errors.firstname && touched.firstname ? (
                <p
                  style={{ color: "red", margin: "0", marginBottom: "15px" }}
                  sx={formStyle.signupError}
                >
                  {errors.firstname}
                </p>
              ) : null}

              <TextField
                id="lastName"
                name="lastname"
                value={values.lastname}
                fullWidth
                label="Lastname"
                variant="standard"
                size="small"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ marginBottom: "20px" }}
              />
              {errors.lastname && touched.lastname ? (
                <Typography
                  variant="span"
                  style={{ color: "red", margin: "0", marginBottom: "15px" }}
                  sx={formStyle.signupError}
                >
                  {errors.lastname}
                </Typography>
              ) : null}
              <TextField
                id="username"
                name="username"
                value={values.username}
                fullWidth
                label="Username"
                variant="standard"
                size="small"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ marginBottom: "20px" }}
                handleSubmit={handleSubmit}
              />
              {errors.username && touched.username ? (
                <Typography
                  variant="span"
                  style={{ color: "red", margin: "0", marginBottom: "15px" }}
                  sx={formStyle.signupError}
                >
                  {errors.username}
                </Typography>
              ) : null}

              {/* 
<FormControl fullWidth style={{ marginBottom: "20px" }}>
                <InputLabel  htmlFor="country">Country</InputLabel>
                <MuiSelect
                  label="Country"
                  id="country"
                  name="country"
                  variant="standard"
                  size="small"
                  value={values.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                >
                  {countriesList().getData().map((country) => (
                    <MenuItem key={country.value} value={country.value}>
                      {country.label}
                    </MenuItem>
                  ))}
                </MuiSelect>
                {touched.country && errors.country && (
                  <div style={{ color: "red" }}>{errors.country}</div>
                )}
              </FormControl> */}

              <FormControl fullWidth style={{ marginTop: "10px", }}>
                <PhoneInput
                  id="phoneNumber"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={(value) => handleChange("phoneNumber", value)}
                  onBlur={handleBlur}
                  variant="standard"
                  size="small"
                  required
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <div style={{ color: "red" }}>{errors.phoneNumber}</div>
                )}
              </FormControl>


              <TextField
                id="email"
                label="Email"
                variant="standard"
                fullWidth
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                style={{ marginBottom: "20px" }}
              />
              {errors.email && touched.email ? (
                <p
                  style={{ color: "red", margin: "0", marginBottom: "15px" }}
                  sx={formStyle.signupError}
                >
                  {errors.email}
                </p>
              ) : null}

              <TextField
                id="password"
                label="Password"
                variant="standard"
                fullWidth
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                style={{ marginBottom: "20px" }}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <span onClick={togglePasswordVisibility}>
                      {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </span>
                  ),
                }}
              />
              {errors.password && touched.password ? (
                <p
                  style={{ color: "red", margin: "0", marginBottom: "15px" }}
                  sx={formStyle.signupError}
                >
                  {errors.password}
                </p>
              ) : null}

              <TextField
                id="confirmpassword"
                label="Confirm password"
                variant="standard"
                fullWidth
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmpassword}
                style={{ marginBottom: "20px" }}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <span onClick={togglePasswordVisibility}>
                      {showPassword ? <FaRegEye /> : <FaEyeSlash />}
                    </span>
                  ),
                }}
              >
                {errors.confirmpassword && touched.confirmpassword ? (
                  <p
                    style={{ color: "red", margin: "0", marginBottom: "15px" }}
                    sx={formStyle.signupError}
                  >
                    {errors.confirmpassword}
                  </p>
                ) : null}
              </TextField>

              <Button
                onClick={handleSignIn}
                type="submit"
                variant="contained"
                fullWidth
                disableElevation
                disabled={loading}
              >
                {loading ? "Loading" : "Sign up"}
              </Button>
            </form>
            {/* Add more form fields as needed */}
          </Paper>
        </Container>
      </Box>
    </>
  );
}
