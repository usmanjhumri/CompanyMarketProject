/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
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
  FormControl,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { createUser } from "../../Redux/Slice/AuthSignup";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  firstname: "",
  lastname: "",
  username: "",
  mobile_code: "",
  mobile: "",
  email: "",
  password: "",
  password_confirmation: "",
  country_code: "",
  country: "",
};
const handleOtpChange = (otp) => {
  setOtp(otp);
};
export default function Signup({ setIsLoggedIn }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.app?.loading);
  const [phone, setPhone] = useState("");
  const [vaildPhoneNumber, setValidPhoneNumber] = useState(false);

  const handleSignIn = () => {
    setIsLoggedIn(true);
  };
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const [mobile, setMobile] = useState("");
  const handePhoneNumber = (newVal, info) => {
    const { countryCallingCode, countryCode } = info;
    const check = matchIsValidTel(newVal);
    setValidPhoneNumber(check);
    values.mobile_code = countryCallingCode;
    values.country_code = countryCode;
    values.mobile = newVal;
    setMobile(newVal);
  };

  const { errors, values, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signupSchema,

      onSubmit: async (values, actions) => {
        const encodedPassword = btoa(values.password);
        values.password = encodedPassword;
        const encodedConfirm = btoa(values.password_confirmation);
        values.password_confirmation = encodedConfirm;

        // console.log(values, actions);
        if (vaildPhoneNumber) {
          const registerResult = await dispatch(createUser(values));
          if (registerResult.payload.success) {
            toast.success(registerResult.payload.message);

            navigate("/signin");
          }
          registerResult.error && registerResult.error.message === "Rejected"
            ? (toast.error(registerResult.payload.message), actions.resetForm())
            : null;
        } else {
          toast.error("Please check your phone number");
        }
        // console.log(registerResult, "action");
      },
    });

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleChangePhone = (newPhone) => {
    setPhone(newPhone);
  };

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
                                fontSize: "14px",
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
                                fontSize: "14px",
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
                    style={{
                      color: "red",
                      margin: "0",
                      marginBottom: "15px",
                      fontSize: "14px",
                    }}
                  >
                    {errors.username}
                  </Typography>
                ) : null}

                <FormControl>
                  <Box>
                    <Typography style={{ marginTop: "20px" }}>
                      Phone Number
                    </Typography>
                  </Box>
                  <MuiTelInput
                    required
                    name="mobile"
                    id="mobile"
                    defaultCountry="PK"
                    value={values.mobile}
                    onChange={handePhoneNumber}
                    sx={{ marginTop: "20px" }}
                    forceCallingCode={true}
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
                  name="email"
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email ? (
                  <Typography
                    style={{
                      color: "red",
                      margin: "0",
                      marginBottom: "15px",
                      fontSize: "14px",
                    }}
                  >
                    {errors.email}
                  </Typography>
                ) : null}

                <Box sx={{ ...styles.typoLabel }}>
                  <Typography>Password </Typography>
                </Box>
                <TextField
                  id="password"
                  name="password"
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaRegEye /> : <FaEyeSlash />}
                      </span>
                    ),
                  }}
                />

                {errors.password && touched.password ? (
                  <Typography
                    style={{
                      color: "red",
                      margin: "0",
                      marginBottom: "15px",
                      fontSize: "14px",
                    }}
                  >
                    {errors.password}
                  </Typography>
                ) : null}

                <Box sx={{ ...styles.typoLabel }}>
                  <Typography>Confirm Password </Typography>
                </Box>
                <TextField
                  id="password_confirmation"
                  name="password_confirmation"
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password_confirmation}
                  type={showPassword2 ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={togglePasswordVisibility2}
                      >
                        {showPassword2 ? <FaRegEye /> : <FaEyeSlash />}
                      </span>
                    ),
                  }}
                />
                {errors.confirmpassword && touched.confirmpassword ? (
                  <p
                    style={{
                      color: "red",
                      margin: "0",
                      marginBottom: "15px",
                      fontSize: "14px",
                    }}
                  >
                    {errors.confirmpassword}
                  </p>
                ) : null}

                <Button
                  onClick={handleSignIn}
                  type="submit"
                  variant="contained"
                  fullWidth
                  style={{ width: "100%" }}
                  sx={{ ...styles.signInBtn }}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Sign up"}
                </Button>
              </form>
              <ToastContainer />
              <Box sx={{ ...styles.typoLabel1 }}>
                <Typography>Already have an Account? </Typography>
                <NavLink
                  style={{ textDecoration: "none", color: "#2697FA" }}
                  to={"/signin"}
                >
                  Sign in here.
                </NavLink>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
