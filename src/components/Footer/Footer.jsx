/* eslint-disable no-unused-vars */

import { Box, Button, Container, Grid, Link, Typography } from "@mui/material";
import Logo from "../../assets/logo.png";
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
      <Box mt={12} sx={FooterStyle.root}>
        <Container maxWidth="100%">
          <Box sx={FooterStyle.imgBtnstyle}>
            <Box>
              <Box component="img" src={Logo} />
            </Box>
            <NavLink to={"/signup"}>
              <Button variant="contained" sx={FooterStyle.button}>
                Join Now
              </Button>
            </NavLink>
          </Box>
          <Grid
            maxWidth="100%"
            container
            sx={{
              marginTop: { md: "4rem", xs: "2rem" },
              padding: { md: "0px 2rem", xs: "auto" },
            }}
          >
            <Grid item xs={6} md={4}>
              <Box>
                <Typography variant="h3" sx={FooterStyle.Ftype}>
                  JD Funnel Marketplace MarketPlace
                </Typography>
                <Fragment>
                  <Typography sx={FooterStyle.linkTypo}>
                    <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                    <NavLink to="/terms-conditions" style={FooterStyle.link}>
                      Terms
                    </NavLink>
                  </Typography>
                  <Typography sx={FooterStyle.linkTypo}>
                    <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                    <Link href="#" sx={FooterStyle.link}>
                      Licenses
                    </Link>
                  </Typography>
                  <Typography sx={FooterStyle.linkTypo}>
                    <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                    <Link href="#" sx={FooterStyle.link}>
                      Become an affiliate
                    </Link>
                  </Typography>
                </Fragment>
              </Box>
            </Grid>
            <Grid item xs={6} md={4}>
              <Box>
                <Typography variant="h3" sx={FooterStyle.Ftype}>
                  Help
                </Typography>
                <Fragment>
                  <Typography sx={FooterStyle.linkTypo}>
                    <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                    <Link href="#" sx={FooterStyle.link}>
                      Help Center
                    </Link>
                  </Typography>
                  <Typography sx={FooterStyle.linkTypo}>
                    <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                    <Link href="#" sx={FooterStyle.link}>
                      Authors
                    </Link>
                  </Typography>
                </Fragment>
              </Box>
            </Grid>
            <Grid item xs={6} md={4}>
              <Box>
                <Typography variant="h3" sx={FooterStyle.Ftype}>
                  Meet Us
                </Typography>
                <Fragment>
                  <Typography sx={FooterStyle.linkTypo}>
                    <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                    <NavLink to="/about" style={FooterStyle.link}>
                      About us
                    </NavLink>
                  </Typography>
                  <Typography sx={FooterStyle.linkTypo}>
                    <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                    <NavLink to="/privacy-policy" style={FooterStyle.link}>
                      Privacy Policy
                    </NavLink>
                  </Typography>
                  <Typography sx={FooterStyle.linkTypo}>
                    <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                    <Link href="#" sx={FooterStyle.link}>
                      Sitemap
                    </Link>
                  </Typography>
                </Fragment>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box sx={FooterStyle.copyRightStyle}>
        <Typography sx={FooterStyle.copyRightTypo}>
          Copyright <LiaCopyrightSolid /> 2023 | All Right Reserved By JD Funnel
          Marketplace Marketplace
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
