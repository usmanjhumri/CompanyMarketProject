import React from "react";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Container,
  Typography,
  Button,
} from "@mui/material";
import formStyle from "./styles";
import "./index";
import { useFormik } from "formik";
import { signupSchema } from "./Regex";
import logo from "../../assets/jdlogo.png";
const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmpassword: "",
};

export default function Signup() {
  const { errors, values, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signupSchema,
      onSubmit: (values, actions) => {
        actions.resetForm();
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
              />
              {errors.firstname && touched.firstname ? (
                <p style={{ color: "red" }} sx={formStyle.signupError}>
                  {errors.firstname}
                </p>
              ) : null}
              <br />
              <br />

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
              />
              {errors.lastname && touched.lastname ? (
                <p style={{ color: "red" }} sx={formStyle.signupError}>
                  {errors.lastname}
                </p>
              ) : null}
              <br />
              <br />

              <TextField
                id="email"
                label="Email"
                variant="standard"
                fullWidth
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email ? (
                <p style={{ color: "red" }} sx={formStyle.signupError}>
                  {errors.email}
                </p>
              ) : null}
              <br />
              <br />

              <TextField
                id="password"
                label="Password"
                variant="standard"
                fullWidth
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password ? (
                <p style={{ color: "red" }} sx={formStyle.signupError}>
                  {errors.password}
                </p>
              ) : null}
              <br />
              <br />
              {errors.confirmpassword && touched.confirmpassword ? (
                <p style={{ color: "red" }} sx={formStyle.signupError}>
                  {errors.confirmpassword}
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
              />
              <br />
              <br />
              <br />
              <br />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disableElevation
              >
                Signup
              </Button>
            </form>
            {/* Add more form fields as needed */}
          </Paper>
        </Container>
      </Box>
    </>
  );
}
