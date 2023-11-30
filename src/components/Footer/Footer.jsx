
import { Box, Button, Container, Grid, Link, Typography } from "@mui/material";
import Logo from "../../assets/logo.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import FooterStyle from "./styles";
import { LiaCopyrightSolid } from "react-icons/lia";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Fragment } from "react";

const Footer = () => {
  const cat = useSelector((state) => state?.home?.catergories.filter(category => category.subcategories.length > 0));

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
          maxWidth="85%"
            container
            spacing={1}
            sx={{
              marginTop: { md: "4rem", xs: "2rem" },
              padding: { md: "0px 2rem", xs: "auto" },
            }}
          >
            {cat && cat.length > 0 ? (
              cat?.map((item, index) => (
                <Grid item xs={6} md={2} key={index}>
                  <Box>
                    <Typography variant="h3" sx={FooterStyle.Ftype}>
                      {item.name}
                    </Typography>
                    {item.subcategories.map((subCat, subIndex) => (
                      <Fragment key={subIndex}>
                        <Typography sx={FooterStyle.linkTypo}>
                          <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                          <Link href="/Insurance" sx={FooterStyle.link}>
                            {subCat.name}
                          </Link>
                        </Typography>
                      </Fragment>
                    ))}
                  </Box>
                </Grid>
              ))
            ) : (
              <Typography>No categories with subcategories found.</Typography>
            )}
          </Grid>
        </Container>
      </Box>
      <Box sx={FooterStyle.copyRightStyle}>
        <Typography sx={FooterStyle.copyRightTypo}>
          Copyright <LiaCopyrightSolid /> 2023 | All Right Reserved By JD Funnel
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
