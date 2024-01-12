import { useState } from "react";
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
import styles from "./styles";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { MuiOtpInput } from "mui-one-time-password-input";
import { resetPasswordVerify } from "../../Redux/api/api";
import { resetForgotState } from "../../Redux/Slice/forgotpassword";

export default function ResetPassword() {
  const { email } = useSelector((state) => state?.forgotpassword);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email,
      password: "",
      password_confirmation: "",
      code: "",
    },
    validationSchema: Yup.object({
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
      setLoading(true);
      const res = await resetPasswordVerify(values);
      if (res.success) {
        toast.success(res.data);
        setLoading(false);
        dispatch(resetForgotState());
      }
      if (!res.success) {
        toast.error(res.message);
        setLoading(false);
        dispatch(resetForgotState());
      }
    },
  });
  const handleChangeOTP = (newValue) => {
    setCode(newValue);
    formik.initialValues.code = newValue;
  };
  return (
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
                Reset Password
              </Typography>
            </Box>
          </Box>
          <form onSubmit={formik.handleSubmit} style={{ textAlign: "center" }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    mt: 4,
                  }}
                >
                  <Box sx={{ ...styles.typoLabel }}>
                    <Typography>Verification Code</Typography>
                  </Box>
                  <MuiOtpInput
                    length={6}
                    style={{ paddingLeft: "15px", paddingRight: "15px" }}
                    value={code}
                    onChange={handleChangeOTP}
                    id="code"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ ...styles.typoLabel }}>
                    <Typography>New Password</Typography>
                  </Box>
                  <TextField
                    id="password"
                    name="password"
                    type="password"
                    required
                    sx={{ width: "95%" }}
                    size="medium"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
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
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ ...styles.typoLabel }}>
                    <Typography>Confrim Password</Typography>
                  </Box>
                  <TextField
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    required
                    sx={{ width: "95%" }}
                    size="medium"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password_confirmation}
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
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ ...styles.signInBtn }}
                  disabled={loading}
                >
                  {loading ? "Verifying" : "Verify & Reset"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
