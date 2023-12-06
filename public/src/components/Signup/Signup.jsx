/* eslint-disable react/jsx-no-undef */
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
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import "react-phone-number-input/style.css";

import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

// Import the list of countries

const initialValues = {
  firstname: "",
  lastname: "",
  username: "",

  phoneNumber: "",
  country: "",
  email: "",
  password: "",
  confirmpassword: "",
};

export default function Signup({ setIsLoggedIn }) {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const getInitialCountry = () => {
    // Use any logic to determine the user's locale and get the corresponding country code
    // For example, you can use a library like 'react-intl' for internationalization
    // Here, we're using 'en-US' as the default locale for demonstration purposes
    const userLocale = "en-PK";

    // Extract the country code from the user's locale
    const countryCode = userLocale.split("-")[1];

    return countryCode || "PK"; // Set a default country code if not available
  };

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
                <img
                  src={logo}
                  width="70px"
                  alt="jdlogo"
                  style={{ marginTop: 10 }}
                />
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

              <FormControl
                className="PhoneInputInput"
                fullWidth
                style={{ marginTop: "15px" }}
              >
                <PhoneInput
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  countryCallingCodeEditable={false}
                  value={values.phoneNumber}
                  onChange={(e) => {
                    values.phoneNumber = e;
                  }}
                  onCountryChange={(e) => (values.country = e)}
                  onBlur={handleBlur}
                  required
                  defaultCountry={(values.country = "PK")}
                  international
                  style={{ marginBottom: "20px" }}
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
                sx={{ textTransform: "capitalize" }}
              >
                {loading ? "Loading" : "Sign up"}
              </Button>
            </form>
            <Box
              style={{
                marginTop: 15,
                marginBottom: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Link to="/signin">
                <Typography
                  sx={{ textDecoration: "underline", color: "black" }}
                >
                  Sign In
                </Typography>
              </Link>
              <Typography sx={{ textDecoration: "underline" }}>
                Forgot password?
              </Typography>
            </Box>
            {/* Add more form fields as needed */}
          </Paper>
        </Container>
      </Box>
    </>
  );
}
