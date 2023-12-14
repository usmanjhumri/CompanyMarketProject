/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Container,
  Typography,
  Button,
  OutlinedInput,
  Link,
} from "@mui/material";
import styles from "./styles";
import "./index";
import { useFormik } from "formik";
import { signupSchema } from "./Regex";
import logo from "../../assets/jdlogo1.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
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
  const [showPassword2, setShowPassword2] = useState(false);

  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
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
          ...styles.mainBox,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            style={{
              ...styles.paperDiv,
            }}
          >
            <Box
              sx={{
                ...styles.innerPaperFlex,
              }}
            >
              <Box
                sx={{
                  ...styles.logoDiv,
                }}
              >
                <Box
                  component="img"
                  src={logo}
                  width="100%%"
                  alt="jdlogo"
                  sx={{ ...styles.equalMargin }}
                ></Box>
              </Box>
              <Box>
                <Typography sx={{ ...styles.equalMargin, ...styles.signFont }}>
                  Sign up
                </Typography>
              </Box>
              <Button
                variant="outlined"
                startIcon={<FcGoogle size={30} />}
                sx={{ ...styles.btnLoginWith }}
              >
                Continue with Google
              </Button>
              <Button
                variant="outlined"
                startIcon={<BsFacebook size={30} color="#4762b4" />}
                sx={{ ...styles.btnLoginWith }}
              >
                Continue with Apple
              </Button>
              <Button
                variant="outlined"
                startIcon={<BsApple size={30} />}
                sx={{ ...styles.btnLoginWith }}
              >
                Continue with Apple
              </Button>
              /*Form Start */
              <Box sx={{ ...styles.typoLabel }}>
                <Box>
                  <Typography>First Name </Typography>{" "}
                  <OutlinedInput sx={{ width: "100%" }} />{" "}
                </Box>
                <Box>
                  <Typography>Last Name </Typography>{" "}
                  <OutlinedInput sx={{ width: "100%" }} />{" "}
                </Box>
              </Box>
              <Box sx={{ ...styles.typoLabel }}>
                <Typography>Email </Typography>{" "}
              </Box>
              <OutlinedInput sx={{ width: "90%" }} />{" "}
              <Box sx={{ ...styles.typoLabel }}>
                <Typography>Username </Typography>{" "}
              </Box>
              <OutlinedInput sx={{ width: "90%" }} />{" "}
              <Box sx={{ ...styles.typoLabel }}>
                <Typography>Password </Typography>
              </Box>
              <OutlinedInput sx={{ width: "90%" }} />
              <Button variant="contained" sx={{ ...styles.signInBtn }}>
                Sign up
              </Button>
              /*Form end */
              <Box sx={{ ...styles.typoLabel1 }}>
                <Typography>Already have an Account? </Typography>{" "}
                <NavLink
                  style={{ textDecoration: "none", color: "#2697FA" }}
                  to={"/signin"}
                >
                  Sign in here.
                </NavLink>
              </Box>
              {/* <form onSubmit={handleSubmit}>
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
                type={showPassword2 ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <span onClick={togglePasswordVisibility2}>
                      {showPassword2 ? <FaRegEye /> : <FaEyeSlash />}
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
            </Box> */}
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
