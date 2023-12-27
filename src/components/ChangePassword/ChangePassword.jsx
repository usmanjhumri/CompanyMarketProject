/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./styles";
import { useEffect, useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../Redux/api/api";
import { changePasswordSuccess } from "../../Redux/Slice/changePassword";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const isLoading = useSelector((state) => state?.changePassword?.isLoading);
  // console.log(isLoading, " usman");
  const isError = useSelector((state) => state?.changePassword?.isError);
  const message = useSelector((state) => state?.changePassword?.Message);
  // console.log(message, " changepasswords");
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };
  const togglePasswordVisibility3 = () => {
    setShowPassword3(!showPassword3);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (isError) {
      toast.error(message || "current password does not matched", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      dispatch(changePasswordSuccess());
    }
  }, [message, isError]);
  const formik = useFormik({
    initialValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string()
        .min(8)
        .max(20)
        .matches(
          /^.*[!@#$%^&*()_+\-=\]{};':"\\|,.<>?].*$/,
          "Need one special character"
        ),
      password: Yup.string()
        .min(8)
        .max(20)
        .matches(
          /^.*[!@#$%^&*()_+\-=\]{};':"\\|,.<>?].*$/,
          "Need one special character"
        ),
      password_confirmation: Yup.string()
        .min(8)
        .max(20)
        .matches(
          /^.*[!@#$%^&*()_+\-=\]{};':"\\|,.<>?].*$/,
          "Need one special character"
        ),
    }),
    onSubmit: (values) => {
      if (values.password.trim() !== values.password_confirmation.trim()) {
        toast.error("password and confirm password does not matcg", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }
      dispatch(changePassword(values))
        .then((res) => {
          if (
            res.payload.success &&
            values.password.trim() === values.password_confirmation.trim()
          ) {
            toast.success(message || "password changed", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            navigate("/");
          }
        })
        .catch((e) => e);
    },
  });

  return (
    <>
      <Box mt={6} sx={styles.mainBox}>
        <Container maxWidth="sm">
          <Paper style={styles.paperDiv}>
            <Box
              sx={{
                ...styles.innerPaperFlex,
              }}
            >
              <Box
                sx={{
                  ...styles.logoDiv,
                }}
              ></Box>
              <Box>
                <Typography sx={{ ...styles.equalMargin, ...styles.signFont }}>
                  Change Password
                </Typography>
              </Box>

              <form
                onSubmit={formik.handleSubmit}
                style={{ textAlign: "center" }}
              >
                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={12}>
                    <Box sx={styles.typoLabel}>
                      <Typography sx={{ paddingLeft: "30px" }}>
                        Current Password
                      </Typography>
                    </Box>
                    <TextField
                      id="current_password"
                      name="current_password"
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.current_password}
                      style={{ marginBottom: "5px" }}
                      InputProps={{
                        endAdornment: (
                          <span onClick={togglePasswordVisibility}>
                            {showPassword ? (
                              <FaRegEye style={{ cursor: "pointer" }} />
                            ) : (
                              <FaEyeSlash style={{ cursor: "pointer" }} />
                            )}
                          </span>
                        ),
                      }}
                      sx={{ width: "90%" }}
                    />
                    {formik.touched.current_password &&
                    formik.errors.current_password ? (
                      <p
                        style={{
                          color: "red",
                          margin: "0",
                          paddingLeft: "15px",
                          marginTop: "10px",
                          textAlign: "left",
                          fontSize: "14px",
                        }}
                      >
                        {formik.errors.current_password}
                      </p>
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={styles.typoLabel}>
                      <Typography sx={{ paddingLeft: "30px" }}>
                        New Password
                      </Typography>
                    </Box>
                    <TextField
                      id="password"
                      name="password"
                      type={showPassword2 ? "text" : "password"}
                      fullWidth
                      required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      style={{ marginBottom: "5px" }}
                      InputProps={{
                        endAdornment: (
                          <span onClick={togglePasswordVisibility2}>
                            {showPassword2 ? (
                              <FaRegEye style={{ cursor: "pointer" }} />
                            ) : (
                              <FaEyeSlash style={{ cursor: "pointer" }} />
                            )}
                          </span>
                        ),
                      }}
                      sx={{ width: "90%" }}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <p
                        style={{
                          color: "red",
                          margin: "0",
                          paddingLeft: "15px",
                          marginTop: "10px",
                          textAlign: "left",
                          fontSize: "14px",
                        }}
                      >
                        {formik.errors.password}
                      </p>
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={styles.typoLabel}>
                      <Typography sx={{ paddingLeft: "30px" }}>
                        Confirm Password
                      </Typography>
                    </Box>
                    <TextField
                      id="password_confirmation"
                      name="password_confirmation"
                      type={showPassword3 ? "text" : "password"}
                      fullWidth
                      required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password_confirmation}
                      style={{ marginBottom: "5px" }}
                      InputProps={{
                        endAdornment: (
                          <span onClick={togglePasswordVisibility3}>
                            {showPassword3 ? (
                              <FaRegEye style={{ cursor: "pointer" }} />
                            ) : (
                              <FaEyeSlash style={{ cursor: "pointer" }} />
                            )}
                          </span>
                        ),
                      }}
                      sx={{ width: "90%" }}
                    />
                    {formik.touched.password_confirmation &&
                    formik.errors.password_confirmation ? (
                      <p
                        style={{
                          color: "red",
                          margin: "0",
                          paddingLeft: "15px",
                          marginTop: "10px",
                          textAlign: "left",
                          fontSize: "14px",
                        }}
                      >
                        {formik.errors.password_confirmation}
                      </p>
                    ) : null}
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ ...styles.signInBtn }}
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Change Password"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default ChangePassword;
