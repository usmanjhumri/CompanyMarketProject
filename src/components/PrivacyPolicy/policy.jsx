import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import style from "./style";
import BackgroundImage from "../BackgroundImg";
import BackgroundIMG from "../../assets/privacy.png";
function policy() {
  return (
    <>
      <BackgroundImage bgImg={BackgroundIMG}>
        <Grid container>
          <Grid item md={4} sm={0}></Grid>
          <Grid item md={4} sm={12}>
            <Typography variant="h4" sx={style.textHeading}>
              Privacy Policy
            </Typography>
            <Typography variant="h4" sx={style.textHeading2}>
              Our Commitment to Protecting your Privacy
            </Typography>
            <p variant="p" style={style.textParagraph}>
              Welcome to JD Funnel Marketplace’s Privacy Policy
            </p>
          </Grid>

          <Grid item md={4} sm={0}></Grid>
        </Grid>
      </BackgroundImage>
      <Grid container>
        <Grid item md={3} xs={0} sm={0}></Grid>
        <Grid item md={6} xs={12} sm={0}>
          <Box sx={{ pl: 2, pr: 2 }}>
            <Typography
              variant="h4"
              sx={{ ...style.textHeading, mb: 3, width: "100%" }}
            >
              Information We Process
            </Typography>
            <Typography sx={{ mb: 8, lineHeight: "27px" }}>
              The types of information processed depend on how you utilize our
              Services. To create an account, users are required to provide
              details such as their name and email address. Depending on the
              specific services, additional information may be collected. For
              instance, JD Funnel Marketplace facilitates the connection between
              its community of professionals and individuals or businesses
              seeking their expertise. In order to enable this, JD Funnel
              Marketplace may collect payment data and other necessary
              information to meet legal obligations.
            </Typography>
            <Typography
              variant="h4"
              sx={{ ...style.textHeading, mb: 3, width: "100%" }}
            >
              Information We Collect
            </Typography>
            <Typography sx={{ mb: 8, lineHeight: "27px" }}>
              Personal Information: When you register an account, make a
              purchase, or interact with our platform, we may collect personal
              information such as your name, email address, and payment details.
            </Typography>
            <Typography
              variant="h4"
              sx={{ ...style.textHeading, mb: 3, width: "100%" }}
            >
              How We Use Your Information
            </Typography>
            <Typography sx={{ mb: 8, lineHeight: "27px" }}>
              We use the collected data for various purposes,
              including:Providing and maintaining our servicesPersonalizing your
              experienceProcessing transactionsSending updates and promotional
              contentImproving our platform
            </Typography>
            <Typography
              variant="h4"
              sx={{ ...style.textHeading, mb: 3, width: "100%" }}
            >
              Security
            </Typography>
            <Typography sx={{ mb: 8, lineHeight: "27px" }}>
              We implement security measures to protect your personal
              information. However, no method of transmission over the internet
              or electronic storage is 100% secure, and we cannot guarantee
              absolute security.
            </Typography>
            <Typography
              variant="h4"
              sx={{ ...style.textHeading, mb: 3, width: "100%" }}
            >
              Cookies
            </Typography>
            <Typography sx={{ mb: 8, lineHeight: "27px" }}>
              We use cookies to enhance your experience on our platform. You can
              set your browser to refuse all or some cookies, but this may limit
              functionality.
            </Typography>
            <Typography
              variant="h4"
              sx={{ ...style.textHeading, mb: 3, width: "100%" }}
            >
              How we keep your personal information secure
            </Typography>
            <Typography sx={{ mb: 8, lineHeight: "27px" }}>
              We store personal information on secure servers that are managed
              by us and our service providers, and occasionally.Personal
              information that we store or transmit is protected by security and
              access controls, including username and password authentication
              and data encryption where appropriate.
            </Typography>
            <Typography
              variant="h4"
              sx={{ ...style.textHeading, mb: 3, width: "100%" }}
            >
              Contact Us
            </Typography>
            <Typography sx={{ mb: 8, lineHeight: "27px" }}>
              If you have any questions about our Privacy Policy, please contact
              us at JD Funnel Marketplace Contact Us.
            </Typography>
            <Typography
              sx={{
                mb: 5,
                lineHeight: "27px",
                width: "100%",
                textAlign: "center",
              }}
            >
              {" "}
              By using JD Funnel Marketplace Marketplace, you agree to this
              Privacy Policy.{" "}
            </Typography>
          </Box>
        </Grid>

        <Grid item md={3} xs={0} sm={0}></Grid>
      </Grid>
    </>
  );
}

export default policy;
