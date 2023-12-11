/* eslint-disable no-unused-vars */

import { Box, Button, Container, Grid, Link, Typography } from "@mui/material";
import Logo from "../../assets/logo.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import FooterStyle from "./styles";
import { LiaCopyrightSolid } from "react-icons/lia";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
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
            <Grid item xs={6} md={3}>
              <Box>
                <Typography variant="h3" sx={FooterStyle.Ftype}>
                  JD Funnel MarketPlace
                </Typography>
                <Fragment>
                  <Typography sx={FooterStyle.linkTypo}>
                    <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                    <Link href="/Insurance" sx={FooterStyle.link}>
                      Terms
                    </Link>
                  </Typography>
                  <Typography sx={FooterStyle.linkTypo}>
                    <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                    <Link href="/Insurance" sx={FooterStyle.link}>
                      Licenses
                    </Link>
                  </Typography>
                  <Typography sx={FooterStyle.linkTypo}>
                    <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                    <Link href="/Insurance" sx={FooterStyle.link}>
                      Become an affiliate
                    </Link>
                  </Typography>
                </Fragment>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box>
                <Typography variant="h3" sx={FooterStyle.Ftype}>
                  Help
                </Typography>
                <Fragment>
                  <Typography sx={FooterStyle.linkTypo}>
                    <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                    <Link href="/Insurance" sx={FooterStyle.link}>
                      Help Center
                    </Link>
                  </Typography>
                  <Typography sx={FooterStyle.linkTypo}>
                    <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                    <Link href="/Insurance" sx={FooterStyle.link}>
                      Authors
                    </Link>
                  </Typography>
                </Fragment>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box>
                <Typography variant="h3" sx={FooterStyle.Ftype}>
                  Our Community
                </Typography>
                <Fragment>
                  <Typography sx={FooterStyle.linkTypo}>
                    <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                    <Link href="/Insurance" sx={FooterStyle.link}>
                      Community
                    </Link>
                  </Typography>
                  <Typography sx={FooterStyle.linkTypo}>
                    <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                    <Link href="/Insurance" sx={FooterStyle.link}>
                      Blog
                    </Link>
                  </Typography>
                  <Typography sx={FooterStyle.linkTypo}>
                    <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                    <Link href="/Insurance" sx={FooterStyle.link}>
                      Forums
                    </Link>
                  </Typography>
                </Fragment>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box>
                <Typography variant="h3" sx={FooterStyle.Ftype}>
                  Meet Us
                </Typography>
                <Fragment>
                  <Typography sx={FooterStyle.linkTypo}>
                    <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                    <Link href="/Insurance" sx={FooterStyle.link}>
                      About us
                    </Link>
                  </Typography>
                  <Typography sx={FooterStyle.linkTypo}>
                    <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                    <Link href="/Insurance" sx={FooterStyle.link}>
                      Privacy Policy
                    </Link>
                  </Typography>
                  <Typography sx={FooterStyle.linkTypo}>
                    <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                    <Link href="/Insurance" sx={FooterStyle.link}>
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
          Marketplace
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
