import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import style from "./styles";
import BackgroundImage from "../BackgroundImg";
import BackgroundIMG from "../../assets/terms.png";

function conditions() {
  return (
    <>
      <BackgroundImage bgImg={BackgroundIMG}>
        <Grid container>
          <Grid item md={4} sm={0}></Grid>
          <Grid item md={4} sm={12}>
            <Typography variant="h4" sx={style.textHeading}>
              Terms & Conditions
            </Typography>
            <Typography variant="h4" sx={style.textHeading2}>
              Our Terms of Service Welcome to JD Funnel Marketplace’s Terms &
              Conditions
            </Typography>
            <p variant="p" style={style.textParagraph}>
              By accessing or using our services, you agree to be bound by these
              Terms and Conditions. Please read them carefully.
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
              Account Creation
            </Typography>
            <Typography sx={{ mb: 8, lineHeight: "27px" }}>
              You may need to create an account to use certain services.You are
              responsible for maintaining the confidentiality of your account
              information.
            </Typography>
            <Typography
              variant="h4"
              sx={{ ...style.textHeading, mb: 3, width: "100%" }}
            >
              User Responsibilities
            </Typography>
            <Typography sx={{ mb: 8, lineHeight: "27px" }}>
              You agree to use our services in compliance with applicable laws
              and regulations.You are solely responsible for any content you
              submit or share on the platform.
            </Typography>
            <Typography
              variant="h4"
              sx={{ ...style.textHeading, mb: 3, width: "100%" }}
            >
              Privacy Policy
            </Typography>
            <Typography sx={{ mb: 8, lineHeight: "27px" }}>
              Our Privacy Policy governs the collection and use of your personal
              information. Please review the Privacy Policy to understand how
              your data is handled.
            </Typography>
            <Typography
              variant="h4"
              sx={{ ...style.textHeading, mb: 3, width: "100%" }}
            >
              Intellectual Property
            </Typography>
            <Typography sx={{ mb: 8, lineHeight: "27px" }}>
              All content provided by the service is protected by intellectual
              property laws.You may not use, modify, or distribute our content
              without permission.
            </Typography>
            <Typography
              variant="h4"
              sx={{ ...style.textHeading, mb: 3, width: "100%" }}
            >
              Service Modifications
            </Typography>
            <Typography sx={{ mb: 8, lineHeight: "27px" }}>
              We reserve the right to modify or discontinue services at any
              time. We are not liable for any loss resulting from service
              changes.
            </Typography>
            <Typography
              variant="h4"
              sx={{ ...style.textHeading, mb: 3, width: "100%" }}
            >
              Termination
            </Typography>
            <Typography sx={{ mb: 8, lineHeight: "27px" }}>
              We may terminate or suspend your account if you violate these
              terms. You may terminate your account at any time by following the
              provided instructions.
            </Typography>
            <Typography
              variant="h4"
              sx={{ ...style.textHeading, mb: 3, width: "100%" }}
            >
              Disclaimer of Warranties
            </Typography>
            <Typography sx={{ mb: 8, lineHeight: "27px" }}>
              Our services are provided "as is" without any warranty or
              guarantee. We do not guarantee the accuracy, completeness, or
              reliability of our services.
            </Typography>
            <Typography
              variant="h4"
              sx={{ ...style.textHeading, mb: 3, width: "100%" }}
            >
              Limitation of Liability
            </Typography>
            <Typography sx={{ mb: 8, lineHeight: "27px" }}>
              We are not liable for any direct, indirect, or consequential
              damages arising from the use of our services.
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
              For questions or concerns regarding these terms, please contact .
              By using our services, you acknowledge that you have read and
              understood these terms and agree to be bound by them.{" "}
            </Typography>
          </Box>
        </Grid>

        <Grid item md={3} xs={0} sm={0}></Grid>
      </Grid>
    </>
  );
}

export default conditions;
