/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";

import {
  Box,
  Paper,
  TextField,
  Container,
  Typography,
  Button,
  Link,
  Grid,
} from "@mui/material";
import logo from "../../assets/jdlogo1.svg";
import { FaRegEye } from "react-icons/fa";
import { useFormik } from "formik";
import { signinSchema } from "./Regex";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link as NavLink, json } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import styles from "./styles";
import { toast } from "react-toastify";
import { authLoginApi, signIn, storageKey } from "../../Redux/api/api";
import { useDispatch } from "react-redux";
import axios from "axios";

const initialValues = {
  email: "",
  password: "",
};

export default function Signin({ setIsLoggedIn }) {
  const dispatch = useDispatch();
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
        try {
          setLoading(true);
          const res = await axios.post(authLoginApi, {
            login: values.email,
            password: values.password,
          });

          if (res.status === 200) {
            const {
              data: { user_name: username, email },
              access_token: token,
            } = res.data;

            localStorage.setItem(
              storageKey,
              JSON.stringify({ username, email, token })
            );
            await dispatch(signIn(storageKey));
          }

          setLoading(false);
          setIsLoggedIn(true);
          navigate("/");
          toast.success("User signed in successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } catch (error) {
          setLoading(false);

          toast.error("Email or password is incorrect. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
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

              <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={12}>
                    <Box sx={{ ...styles.typoLabel }}>
                      <Typography sx={{ paddingLeft: "30px" }}>
                        Username or Email
                      </Typography>
                      <Link>Remind me</Link>
                    </Box>
                    <TextField
                      id="email"
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      sx={{ width: "90%" }}
                      size="medium"
                    />
                    {errors.email && touched.email ? (
                      <p
                        style={{
                          color: "red",
                          margin: "0",
                        }}
                      >
                        {errors.email}
                      </p>
                    ) : null}
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={{ ...styles.typoLabel }}>
                      <Typography sx={{ paddingLeft: "30px" }}>
                        Password
                      </Typography>
                      <Link to="/forget">Forgot</Link>
                    </Box>
                    <TextField
                      id="password"
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
                      sx={{ width: "90%" }}
                    />
                    {errors.password && touched.password ? (
                      <p
                        style={{
                          color: "red",
                          margin: "0",
                        }}
                      >
                        {errors.password}
                      </p>
                    ) : null}
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ ...styles.signInBtn }}
                    >
                      Sign In
                    </Button>
                  </Grid>
                </Grid>
              </form>

              <Box sx={{ ...styles.typoLabel1 }}>
                <Typography>New Here? </Typography>
                <NavLink
                  style={{ textDecoration: "none", color: "#2697FA" }}
                  to={"/signup"}
                >
                  Create an account
                </NavLink>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
