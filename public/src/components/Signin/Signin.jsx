import React, { useState } from "react";

import {
  Box,
  Grid,
  Paper,
  TextField,
  Container,
  Typography,
  Button,
} from "@mui/material";
import logo from "../../assets/jdlogo.png";
import { FaRegEye } from "react-icons/fa";
import { useFormik } from "formik";
import { signinSchema } from "./Regex";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

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
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontFamily: "Be Vietnam Pro,sans-serif",
        }}
      >
        <Container maxWidth="sm">
          <Paper
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
                style={{ fontFamily: "Be Vietnam Pro,sans-serif" }}
                variant="h4"
                component="h1"
              >
                Sign In
              </Typography>
            </Grid>

            <form onSubmit={handleSubmit}>
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
                <p style={{ color: "red", margin: "0", marginBottom: "15px" }}>
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
                <p style={{ color: "red", margin: "0", marginBottom: "15px" }}>
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
              <Link to="/signup">
                <Typography
                  sx={{ textDecoration: "underline", color: "black" }}
                >
                  Create an account.
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
