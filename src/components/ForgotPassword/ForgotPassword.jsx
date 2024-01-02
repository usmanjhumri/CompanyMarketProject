import { useEffect } from "react";
import {
  Box,
  Paper,
  TextField,
  Container,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import logo from "../../assets/jdlogo1.svg";
import { useNavigate } from "react-router-dom";
import styles from "./styles";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
// import { MuiOtpInput } from "mui-one-time-password-input";
import { forgotPassword } from "../../Redux/api/api";
function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, successMessage, errorMessage, success } =
    useSelector((state) => state?.forgotpassword);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),

    onSubmit: (values) => {
      dispatch(forgotPassword(values));
    },
  });

  useEffect(() => {
    if (success) {
      toast.success(successMessage);
      navigate("/reset-password");
    }
    if (isError) {
      toast.error(errorMessage);
    }
  }, [success, isError]);

  return (
    <>
      <Box sx={{ ...styles.mainBox }}>
        {" "}
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
                  Forgot Password
                </Typography>
              </Box>
            </Box>
            <form
              onSubmit={formik.handleSubmit}
              style={{ textAlign: "center" }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Box sx={{ ...styles.typoLabel }}>
                      <Typography>Email</Typography>
                    </Box>
                    <TextField
                      id="email"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      required
                      sx={{ width: "95%" }}
                      size="medium"
                      placeholder="example@gmail.com"
                    />
                  </Box>
                  {formik.touched.email && formik.errors.email ? (
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
                      {formik.errors.email}
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
                    {isLoading ? "Sending mail" : "Send"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default ForgotPassword;
