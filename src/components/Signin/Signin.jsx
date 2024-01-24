/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
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
import { useNavigate, Link as NavLink, useLocation } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
// import { BsApple } from "react-icons/bs";
// import { BsFacebook } from "react-icons/bs";
import styles from "./styles";
import { toast } from "react-toastify";
import { signInNew } from "../../Redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { resetSuccessSignin } from "../../Redux/Slice/signin";
import { order_number } from "../../Const/CONST";

const initialValues = {
  email: "",
  password: "",
  order_number: "",
};

export default function Signin() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state?.signInReducer?.isLoading);
  const isError = useSelector((state) => state?.signInReducer?.isError);
  const errorMessage = useSelector(
    (state) => state?.signInReducer?.errorMessage
  );

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    if (isError) {
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      dispatch(resetSuccessSignin());
    }
  }, [isError, errorMessage]);

  const { errors, values, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signinSchema,
      onSubmit: (values) => {
        const id = localStorage.getItem("id");
        const order_Number = localStorage.getItem(order_number);
        if (id) {
          values.order_number = id;
        } else if (order_Number) {
          values.order_number = order_Number;
        } else {
          values.order_number = "";
        }

        dispatch(signInNew(values))
          .then((res) => {
            if (res.payload.success) {
              toast.success("Sign in successfully", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
              setTimeout(() => {
                navigate(-1);
              }, 200);
            }
          })
          .catch((e) => console.log(e));
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
              {/* <Box>
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
                  Continue with Facebook
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<BsApple size={30} />}
                  sx={{ ...styles.btnLoginWith }}
                >
                  Continue with Apple
                </Button>
              </Box> */}
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
                        Email or Username
                      </Typography>
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
                      <p style={styles.errorP}>{errors.email}</p>
                    ) : null}
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={{ ...styles.typoLabel }}>
                      <Typography sx={{ paddingLeft: "30px" }}>
                        Password
                      </Typography>
                      <NavLink to="/forget" style={{ color: "#1976d2" }}>
                        Forgot
                      </NavLink>
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
                    {errors.password && touched.password ? (
                      <p style={styles.errorP}>{errors.password}</p>
                    ) : null}
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ ...styles.signInBtn }}
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing In..." : "Sign in"}
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
