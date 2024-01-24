import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import style from "./styles";
import BackgroundImage from "../BackgroundImg";
import BackgroundIMG from "../../assets/aboutus.png";
function about() {
  return (
    <>
      <BackgroundImage bgImg={BackgroundIMG}>
        <Grid container>
          <Grid item md={4} sm={0}></Grid>
          <Grid item md={4} sm={12}>
            <Box
              sx={{
                ...style.heroHeadingAboutUs,
              }}
            >
              <Typography variant="h4" sx={style.textHeading}>
                About Us
              </Typography>
              <Typography variant="h4" sx={style.textHeading2}>
                The Premier Global Community for Creative Tools and Assets.
              </Typography>
              <p variant="p" style={style.textParagraph}>
                Our goal is to create the ultimate community for creatives
                worldwide, promoting sharing and growth
              </p>
            </Box>
          </Grid>

          <Grid item md={4} sm={0}></Grid>
        </Grid>
      </BackgroundImage>
      <Grid container>
        <Grid item md={3} xs={0} sm={0}></Grid>
        <Grid item md={6} xs={12} sm={0}>
          <Box sx={{ pl: 2, pr: 2 }}>
            <Typography sx={{ mb: 5, lineHeight: "27px" }}>
              Welcome to JD Funnel Marketplace, where design inspiration meets
              opportunity! Every day, hundreds of millions of individuals turn
              to us for creative inspiration and feedback. At JD Funnel
              Marketplace, we empower creators like you to showcase your
              projects through captivating snapshots, fostering portfolio growth
              and a love for your craft—no matter your creative profession.we're
              a self-sustained success story. Our focus is on empowering design
              talents like you, providing a space to share your unique work,
              expand your skills, and seize opportunities with today's most
              innovative brands worldwide. Join us on this creative expedition,
              exclusive to JD Funnel, where your journey to success begins.
            </Typography>
            <Typography
              variant="h4"
              sx={{ ...style.textHeading, mb: 5, width: "100%" }}
            >
              Unleash Your Creative Potential with Us
            </Typography>
            <Typography sx={{ mb: 5, lineHeight: "27px" }}>
              We are more than just a platform — we're a self-sustained success
              story dedicated to empowering design talents. Whether you're in
              need of business card templates, website designs, logos,
              captivating graphics, or various other digital assets, we have you
              covered. Our mission is to provide a space where you can showcase
              your unique work, expand your skills, and expand your skills and
              capture opportunities with today's most innovative brands
              worldwide. Your path to success starts here.
            </Typography>
          </Box>
        </Grid>

        <Grid item md={3} xs={0} sm={0}></Grid>
      </Grid>
    </>
  );
}

export default about;
