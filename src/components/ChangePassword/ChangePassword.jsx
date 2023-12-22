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
import { useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../Redux/api/api";
import { changePasswordSuccess } from "../../Redux/Slice/changePassword";
const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = useSelector((state) => state?.ChangePassword?.isLoading);
  const isError = useSelector((state) => state?.ChangePassword?.isError);
  const message = useSelector((state) => state?.ChangePassword?.Message);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //   const handleSubmit = () => {
  //     console.log("working");
  //   };

  //   const handleChange = () => {
  //     console.log("working");
  //   };

  const dispatch = useDispatch();

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
        .oneOf([Yup.ref("password"), null], "Password must matched")
        .required(`Password confirm is required`),
    }),

    onSubmit: async (values) => {
      console.log(values);
      dispatch(changePassword(values));
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
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
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
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password_confirmation}
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
