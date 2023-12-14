import React, { useState } from "react";

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
import logo from "../../assets/jdlogo1.svg";
import { FaRegEye } from "react-icons/fa";
import { useFormik } from "formik";
import { signinSchema } from "./Regex";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link as NavLink } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import styles from "./styles";

const initialValues = {
  email: "",
  password: "",
};

export default function Signin({ setIsLoggedIn }) {
  const handleSignIn = () => {
    setIsLoggedIn(true);
  };
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { errors, values, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signinSchema,
      onSubmit: async (values, actions) => {
        console.log(values);
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        actions.resetForm();
        setLoading(false);
        navigate("/");
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
                  Sign in
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
                <Typography>Username or Email </Typography>{" "}
                <Link>Remind me</Link>
              </Box>
              <OutlinedInput sx={{ width: "90%" }} />{" "}
              <Box sx={{ ...styles.typoLabel }}>
                <Typography>Password </Typography> <Link>Forgot</Link>
              </Box>
              <OutlinedInput sx={{ width: "90%" }} />
              <Button variant="contained" sx={{ ...styles.signInBtn }}>
                Sign In
              </Button>
              /*Form end */
              <Box sx={{ ...styles.typoLabel1 }}>
                <Typography>New Here? </Typography>{" "}
                <NavLink
                  style={{ textDecoration: "none", color: "#2697FA" }}
                  to={"/signup"}
                >
                  {" "}
                  Create an account{" "}
                </NavLink>
              </Box>
              {/* <form onSubmit={handleSubmit}>
                <TextField
                  id="email"
                  label="Email"
                  variant="standard"
                  fullWidth
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  style={{ marginBottom: "5px" }}
                />
                {errors.email && touched.email ? (
                  <p
                    style={{ color: "red", margin: "0", marginBottom: "15px" }}
                  >
                    {errors.email}
                  </p>
                ) : null}

                <TextField
                  id="password"
                  label="Password"
                  variant="standard"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  style={{ marginBottom: "5px" }}
                  InputProps={{
                    endAdornment: (
                      <span onClick={togglePasswordVisibility}>
                        {showPassword ? <FaRegEye /> : <FaEyeSlash />}
                      </span>
                    ),
                  }}
                />

                {errors.password && touched.password ? (
                  <p
                    style={{ color: "red", margin: "0", marginBottom: "15px" }}
                  >
                    {errors.password}
                  </p>
                ) : null}

                <br />
                <br />

                <Button
                  onClick={handleSignIn}
                  style={{ marginTop: "10px" }}
                  type="submit"
                  variant="contained"
                  fullWidth
                  disableElevation
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Sign IN"}
                </Button>
              </form> */}
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
