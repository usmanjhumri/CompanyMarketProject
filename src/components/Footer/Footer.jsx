import { Box, Button, Container, Grid, Link, Typography } from "@mui/material";
import Logo from "../../assets/logo.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import FooterStyle from "./styles";
import { LiaCopyrightSolid } from "react-icons/lia";

const Footer = () => {
 
  return (
    <>
      <Box mt={12} sx={FooterStyle.root}>
        <Container maxWidth="100%">
          <Box sx={FooterStyle.imgBtnstyle}>
            <Box>
              <Box component="img" src={Logo} data-aos="fade-down" />
            </Box>
            <Button
              variant="contained"
              sx={FooterStyle.button}
              data-aos="fade-up"
            >
              Join Now
            </Button>
          </Box>
          <Grid
            container
            spacing={1}
            sx={{
              marginTop: { md: "4rem", xs: "2rem" },
              padding: { md: "0px 2rem", xs: "auto" },
            }}
          >
            <Grid item xs={6} md={2}>
              <Box>
                <Typography
                  variant="h3"
                  sx={FooterStyle.Ftype}
                  data-aos="fade-up"
                >
                  Funnels
                </Typography>
                <Typography sx={FooterStyle.linkTypo} data-aos="fade-up">
                  <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                  <Link href="/Insurance" sx={FooterStyle.link}>
                    Insurance
                  </Link>
                </Typography>
                <Typography sx={FooterStyle.linkTypo} data-aos="fade-up">
                  <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                  <Link href="/Insurance" sx={FooterStyle.link}>
                    Child Education
                  </Link>
                </Typography>
                <Typography sx={FooterStyle.linkTypo} data-aos="fade-up">
                  <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                  <Link href="/Insurance" sx={FooterStyle.link}>
                    Construction
                  </Link>
                </Typography>
                <Typography sx={FooterStyle.linkTypo} data-aos="fade-up">
                  <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                  <Link href="/Insurance" sx={FooterStyle.link}>
                    Health & Fitness
                  </Link>
                </Typography>
                <Typography sx={FooterStyle.linkTypo} data-aos="fade-up">
                  <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                  <Link href="/Insurance" sx={FooterStyle.link}>
                    Financial Advisor
                  </Link>
                </Typography>
                <Typography sx={FooterStyle.linkTypo} data-aos="fade-up">
                  <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                  <Link href="/Insurance" style={FooterStyle.link}>
                    Digital Marketing
                  </Link>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              <Box>
                <Typography
                  variant="h3"
                  sx={FooterStyle.Ftype}
                  data-aos="fade-down"
                >
                  Website
                </Typography>

                <Typography sx={FooterStyle.linkTypo} data-aos="fade-down">
                  <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                  <Link href="/Insurance" style={FooterStyle.link}>
                    Blogging
                  </Link>
                </Typography>
                <Typography sx={FooterStyle.linkTypo} data-aos="fade-down">
                  <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                  <Link href="/Insurance" style={FooterStyle.link}>
                    Ecommerce
                  </Link>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              <Box>
                <Typography
                  variant="h3"
                  sx={FooterStyle.Ftype}
                  data-aos="fade-down"
                >
                  Business Cards
                </Typography>

                <Typography sx={FooterStyle.linkTypo} data-aos="fade-down">
                  <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                  <Link href="/Insurance" style={FooterStyle.link}>
                    Login Pages
                  </Link>
                </Typography>
                <Typography sx={FooterStyle.linkTypo} data-aos="fade-down">
                  <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                  <Link href="/Insurance" style={FooterStyle.link}>
                    Dashboard Designing
                  </Link>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              <Box>
                <Typography
                  variant="h3"
                  sx={FooterStyle.Ftype}
                  data-aos="fade-down"
                >
                  Logos
                </Typography>

                <Typography sx={FooterStyle.linkTypo} data-aos="fade-down">
                  <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                  <Link href="/Insurance" style={FooterStyle.link}>
                    Forms
                  </Link>
                </Typography>
                <Typography sx={FooterStyle.linkTypo} data-aos="fade-down">
                  <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                  <Link href="/Insurance" style={FooterStyle.link}>
                    Surveys
                  </Link>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              <Box>
                <Typography
                  variant="h3"
                  sx={FooterStyle.Ftype}
                  data-aos="fade-up"
                >
                  Dashboards
                </Typography>
                <Typography sx={FooterStyle.linkTypo} data-aos="fade-up">
                  <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                  <Link href="/Insurance" style={FooterStyle.link}>
                    GHL Add-on’s
                  </Link>
                </Typography>
                <Typography sx={FooterStyle.linkTypo} data-aos="fade-up">
                  <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                  <Link href="/Insurance" style={FooterStyle.link}>
                    Snapshorts
                  </Link>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              <Box>
                <Typography
                  variant="h3"
                  sx={FooterStyle.Ftype}
                  data-aos="fade-up"
                >
                  Company Policy
                </Typography>
                <Typography sx={FooterStyle.linkTypo} data-aos="fade-up">
                  <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                  <Link href="/Insurance" style={FooterStyle.link}>
                    Help Center
                  </Link>
                </Typography>
                <Typography sx={FooterStyle.linkTypo} data-aos="fade-up">
                  <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                  <Link href="/Insurance" style={FooterStyle.link}>
                    Support System
                  </Link>
                </Typography>
                <Typography sx={FooterStyle.linkTypo}>
                  <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                  <Link href="/Insurance" style={FooterStyle.link}>
                    Terms Conditions
                  </Link>
                </Typography>
                <Typography sx={FooterStyle.linkTypo}>
                  <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                  <Link href="/Insurance" style={FooterStyle.link}>
                    Privacy and Policy
                  </Link>
                </Typography>
              </Box>
            </Grid>
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
