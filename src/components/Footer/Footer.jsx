import { Box, Button, Container, Grid, Link, Typography } from "@mui/material";
import Logo from "../../assets/logo.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import FooterStyle from "./styles";

const Footer = () => {
  return (
    <Box mt={12}  sx={FooterStyle.root}>
      <Container maxWidth="100%">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap:5,
            maxWidth:{md:"100%", xs:"auto"},
            padding:{md:"0px 2rem", xs:"auto"}
          }}
        >
          <Box>
            <Box component="img" src={Logo} />
          </Box>
          <Button sx={FooterStyle.button}>Join Now</Button>
        </Box>
        <Grid container spacing={5} sx={{marginTop:{md:"4rem", xs:"2rem"}, padding:{md:"0px 2rem", xs:"auto"}}}>
          <Grid item xs={6} md={2}>
            <Box>
              <Typography variant="h3" sx={FooterStyle.Ftype}>
                Funnels
              </Typography>
              <Typography sx={FooterStyle.linkTypo}>
                <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                <Link href="/Insurance" sx={FooterStyle.link}>
                  Insurance
                </Link>
              </Typography>
              <Typography sx={FooterStyle.linkTypo}>
                <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                <Link href="/Insurance" sx={FooterStyle.link}>
                  Child Education
                </Link>
              </Typography>
              <Typography sx={FooterStyle.linkTypo}>
                <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                <Link href="/Insurance" sx={FooterStyle.link}>
                  Construction
                </Link>
              </Typography>
              <Typography sx={FooterStyle.linkTypo}>
                <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                <Link href="/Insurance" sx={FooterStyle.link}>
                  Health & Fitness
                </Link>
              </Typography>
              <Typography sx={FooterStyle.linkTypo}>
                <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                <Link href="/Insurance" sx={FooterStyle.link}>
                  Financial Advisor
                </Link>
              </Typography>
              <Typography sx={FooterStyle.linkTypo}>
                <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                <Link href="/Insurance" style={FooterStyle.link}>
                  Digital Marketing
                </Link>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={2}>
            <Box>
              <Typography variant="h3" sx={FooterStyle.Ftype}>
                Website
              </Typography>

              <Typography sx={FooterStyle.linkTypo}>
                <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                <Link href="/Insurance" style={FooterStyle.link}>
                  Blogging
                </Link>
              </Typography>
              <Typography sx={FooterStyle.linkTypo}>
                <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                <Link href="/Insurance" style={FooterStyle.link}>
                  Ecommerce
                </Link>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={2}>
            <Box>
              <Typography variant="h3" sx={FooterStyle.Ftype}>
                Business Cards
              </Typography>

              <Typography sx={FooterStyle.linkTypo}>
                <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                <Link href="/Insurance" style={FooterStyle.link}>
                  Login Pages
                </Link>
              </Typography>
              <Typography sx={FooterStyle.linkTypo}>
                <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                <Link href="/Insurance" style={FooterStyle.link}>
                  Dashboard Designing
                </Link>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={2}>
            <Box>
              <Typography variant="h3" sx={FooterStyle.Ftype}>
                Logos
              </Typography>

              <Typography sx={FooterStyle.linkTypo}>
                <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                <Link href="/Insurance" style={FooterStyle.link}>
                  Forms
                </Link>
              </Typography>
              <Typography sx={FooterStyle.linkTypo}>
                <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                <Link href="/Insurance" style={FooterStyle.link}>
                  Surveys
                </Link>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={2}>
            <Box>
              <Typography variant="h3" sx={FooterStyle.Ftype}>
                Dashboards
              </Typography>
              <Typography sx={FooterStyle.linkTypo}>
                <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                <Link href="/Insurance" style={FooterStyle.link}>
                  GHL Add-on’s
                </Link>
              </Typography>
              <Typography sx={FooterStyle.linkTypo}>
                <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                <Link href="/Insurance" style={FooterStyle.link}>
                  Snapshorts
                </Link>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={2}>
            <Box>
              <Typography variant="h3" sx={FooterStyle.Ftype}>
                Company Policy
              </Typography>
              <Typography sx={FooterStyle.linkTypo}>
                <MdKeyboardArrowRight style={FooterStyle.iconStyle} />
                <Link href="/Insurance" style={FooterStyle.link}>
                  Help Center
                </Link>
              </Typography>
              <Typography sx={FooterStyle.linkTypo}>
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
  );
};

export default Footer;
