/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import "../../App.css";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Container,
  Typography,
  Button,
  OutlinedInput,
  FormControl,
  Select,
  MenuItem,
  Link,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// import OTPInput from "react-otp-input";

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
import { MuiTelInput } from "mui-tel-input";
import "react-phone-number-input/style.css";

import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

const initialValues = {
  firstname: "",
  lastname: "",
  username: "",
  phoneNumber: "",
  country: "",
  email: "",
  password: "",
  confirmpassword: "",
  otp: "",
};
const handleOtpChange = (otp) => {
  setOtp(otp);
};
export default function Signup({ setIsLoggedIn }) {
  // const [otp, setOtp] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("US");
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };
  const [phone, setPhone] = useState("");

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
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      actions.resetForm();
      setLoading(false);
      navigate("/signin");
    },
  });
  const [changePhone, setChangePhone] = useState("");
  const handePhoneNumber = (newVal) => {
    setChangePhone(newVal);
  };
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleChangePhone = (newPhone) => {
    setPhone(newPhone);
  };

  // const handleOtpChange = (otp) => {
  //   setOtp(otp);
  // };
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

              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "10px",
                }}
              >
                <Box sx={{ ...styles.typoLabel }}>
                  <Box>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={isSmallScreen ? 12 : 6}>
                        <Box>
                          <Typography>First Name </Typography>
                          <TextField
                            id="firstname"
                            name="firstname"
                            value={values.firstname}
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                          />
                          {errors.firstname && touched.firstname ? (
                            <p
                              style={{
                                color: "red",
                                margin: "0",
                                marginBottom: "15px",
                              }}
                            >
                              {errors.firstname}
                            </p>
                          ) : null}
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={isSmallScreen ? 12 : 6}>
                        <Box
                          sx={{
                            width: "100%",
                            maxWidth: isSmallScreen ? "100%" : "600px",
                            marginLeft: isSmallScreen ? "0" : "50px",
                          }}
                        >
                          <Typography>Last Name </Typography>
                          <TextField
                            className=""
                            id="lastName"
                            name="lastname"
                            value={values.lastname}
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                          />

                          {errors.lastname && touched.lastname ? (
                            <Typography
                              variant="span"
                              style={{
                                color: "red",
                                margin: "0",
                                marginBottom: "15px",
                              }}
                            >
                              {errors.lastname}
                            </Typography>
                          ) : null}
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                <Box sx={{ ...styles.typoLabel }}>
                  <Typography>Username </Typography>
                </Box>
                <TextField
                  id="username"
                  name="username"
                  value={values.username}
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                />
                {errors.username && touched.username ? (
                  <Typography
                    variant="span"
                    style={{ color: "red", margin: "0", marginBottom: "15px" }}
                  >
                    {errors.username}
                  </Typography>
                ) : null}

                <FormControl>
                  <Box>
                    <Typography style={{ marginTop: "20px" }}>
                      Phone Number{" "}
                    </Typography>
                  </Box>
                  <MuiTelInput
                    defaultCountry="PK"
                    value={changePhone}
                    onChange={handePhoneNumber}
                    sx={{ marginTop: "20px" }}
                  />

                  {touched.phoneNumber && errors.phoneNumber && (
                    <div style={{ color: "red" }}>{errors.phoneNumber}</div>
                  )}
                </FormControl>

                <Box sx={{ ...styles.typoLabel }}>
                  <Typography>Email </Typography>
                </Box>
                <TextField
                  id="email"
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email ? (
                  <Typography
                    style={{ color: "red", margin: "0", marginBottom: "15px" }}
                  >
                    {errors.email}
                  </Typography>
                ) : null}

                <Box sx={{ ...styles.typoLabel }}>
                  <Typography>Password </Typography>
                </Box>
                <TextField
                  id="password"
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <span onClick={togglePasswordVisibility}>
                        {showPassword ? <FaRegEye /> : <FaEyeSlash />}
                      </span>
                    ),
                  }}
                />

                {errors.password && touched.password ? (
                  <Typography
                    style={{ color: "red", margin: "0", marginBottom: "15px" }}
                  >
                    {errors.password}
                  </Typography>
                ) : null}

                <Box sx={{ ...styles.typoLabel }}>
                  <Typography>Confirm Password </Typography>
                </Box>
                <TextField
                  id="confirmpassword"
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmpassword}
                  type={showPassword2 ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <span onClick={togglePasswordVisibility2}>
                        {showPassword2 ? <FaRegEye /> : <FaEyeSlash />}
                      </span>
                    ),
                  }}
                />
                {errors.confirmpassword && touched.confirmpassword ? (
                  <p
                    style={{ color: "red", margin: "0", marginBottom: "15px" }}
                  >
                    {errors.confirmpassword}
                  </p>
                ) : null}

                {/* <Box sx={{ ...styles.typoLabel }}>
                  <Typography>Enter OTP</Typography>
                </Box>
                <OTPInput
                  value={otp}
                  onChange={handleOtpChange}
                  numInputs={4}
                  isInputNum
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => <input {...props} />}
                /> */}

                <Button
                  onClick={handleSignIn}
                  type="submit"
                  variant="contained"
                  fullWidth
                  disableElevation
                  disabled={loading}
                  style={{ width: "100%" }}
                  sx={{ ...styles.signInBtn }}
                >
                  {loading ? "Loading" : "Sign up"}
                </Button>
              </form>

              <Box sx={{ ...styles.typoLabel1 }}>
                <Typography>Already have an Account? </Typography>
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
