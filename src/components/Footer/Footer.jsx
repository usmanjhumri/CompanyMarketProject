/* eslint-disable no-unused-vars */

import {
  Box,
  Button,
  Container,
  Grid,
  Hidden,
  Link,
  Typography,
} from "@mui/material";
import Logo from "/companylogo.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import FooterStyle from "./styles";
import { LiaCopyrightSolid } from "react-icons/lia";
import { NavLink } from "react-router-dom";
import { Fragment } from "react";

const Footer = () => {
  // const cat = useSelector((state) =>
  //   state?.home?.catergories.filter(
  //     (category) => category.subcategories.length > 0
  //   )
  // );

  return (
    <>
      <Hidden mdDown>
        <Box sx={{ ...FooterStyle.footerBottom }}>
          <Box mt={12} sx={FooterStyle.root}>
            <Container maxWidth="100%">
              <Grid container>
                <Grid item md={12}>
                  <Box sx={FooterStyle.imgBtnstyle}>
                    <Box>
                      <NavLink to="/">
                        <Box component="img" src={Logo} />
                      </NavLink>
                    </Box>

                    <Box
                      sx={{
                        justifyContent: "space-around",
                        width: "50%",
                        "@media (min-width: 900px)": {
                          width: "68%",
                        },

                        display: "flex",
                      }}
                    >
                      <Typography sx={FooterStyle.linkTypo}>
                        {/* <MdKeyboardArrowRight style={FooterStyle.iconStyle} /> */}
                        <NavLink to="/about" style={FooterStyle.link}>
                          About us
                        </NavLink>
                      </Typography>
                      <Typography sx={FooterStyle.linkTypo}>
                        {/* <MdKeyboardArrowRight style={FooterStyle.iconStyle} /> */}
                        <NavLink to="/privacy-policy" style={FooterStyle.link}>
                          Privacy Policy
                        </NavLink>
                      </Typography>
                      <Typography sx={FooterStyle.linkTypo}>
                        {/* <MdKeyboardArrowRight style={FooterStyle.iconStyle} /> */}
                        <NavLink
                          to="/terms-conditions"
                          style={FooterStyle.link}
                        >
                          Terms & Conditions
                        </NavLink>
                      </Typography>
                      <Typography sx={FooterStyle.linkTypo}>
                        {/* <MdKeyboardArrowRight style={FooterStyle.iconStyle} /> */}
                        <NavLink to="/about" style={FooterStyle.link}>
                          Payment Policy
                        </NavLink>
                      </Typography>
                      <Typography sx={FooterStyle.linkTypo}>
                        {/* <MdKeyboardArrowRight style={FooterStyle.iconStyle} /> */}
                        <NavLink to="/help-center" style={FooterStyle.link}>
                          Help Center
                        </NavLink>
                      </Typography>
                    </Box>

                    <NavLink to={"/signup"}>
                      <Button variant="contained" sx={FooterStyle.button}>
                        Join Now
                      </Button>
                    </NavLink>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
          <Box sx={FooterStyle.copyRightStyle}>
            <Typography sx={FooterStyle.copyRightTypo}>
              Copyright <LiaCopyrightSolid /> 2023 | All Right Reserved By{" "}
              <NavLink to="/" style={{ color: "#fff", textDecoration: "none" }}>
                JD Funnel Market
              </NavLink>
            </Typography>
          </Box>
        </Box>
      </Hidden>

      <Hidden mdUp>
        <Box>
          <Box mt={12} sx={FooterStyle.root}>
            <Container maxWidth="100%">
              <Grid container>
                <Grid
                  item
                  xs={12}
                  md={3}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <NavLink to="/">
                      <Box component="img" src={Logo} />
                    </NavLink>
                  </Box>
                  <Box
                    sx={{
                      display: { md: "none", xs: "block", sm: "block" },
                    }}
                  >
                    <NavLink to={"/signup"}>
                      <Button variant="contained" sx={FooterStyle.button}>
                        Join Now
                      </Button>
                    </NavLink>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={FooterStyle.footerItem}>
                    <Typography sx={FooterStyle.linkTypo}>
                      <NavLink to="/about" style={FooterStyle.link}>
                        About us
                      </NavLink>
                    </Typography>
                    <Typography sx={FooterStyle.linkTypo}>
                      <NavLink to="/privacy-policy" style={FooterStyle.link}>
                        Privacy Policy
                      </NavLink>
                    </Typography>
                    <Typography sx={FooterStyle.linkTypo}>
                      <NavLink to="/terms-conditions" style={FooterStyle.link}>
                        Terms & Conditions
                      </NavLink>
                    </Typography>
                    <Typography sx={FooterStyle.linkTypo}>
                      <NavLink to="/about" style={FooterStyle.link}>
                        Payment Policy
                      </NavLink>
                    </Typography>
                    <Typography sx={FooterStyle.linkTypo}>
                      <NavLink to="/about" style={FooterStyle.link}>
                        Help Center
                      </NavLink>
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={3}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Box
                    sx={{
                      display: { md: "block", xs: "none", sm: "none" },
                    }}
                  >
                    <NavLink to={"/signup"}>
                      <Button variant="contained" sx={FooterStyle.button}>
                        Join Now
                      </Button>
                    </NavLink>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
          <Box sx={FooterStyle.copyRightStyle}>
            <Typography sx={FooterStyle.copyRightTypo}>
              Copyright <LiaCopyrightSolid /> 2023 | All Right Reserved By{" "}
              <NavLink to="/" style={{ color: "#fff", textDecoration: "none" }}>
                JD Funnel Marketplace
              </NavLink>
            </Typography>
          </Box>
        </Box>
      </Hidden>
    </>
  );
};

export default Footer;
