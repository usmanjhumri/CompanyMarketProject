import React from "react";
import BackgroundImage from "../BackgroundImg";
import BGHelpcenter from "../../assets/Helpcenter.png";
import { Box, Typography } from "@mui/material";
import styles from "./styles";
import Faq from "./Faq";
const Helpcenter = () => {
  return (
    <>
      <BackgroundImage bgImg={BGHelpcenter}>
        <Box sx={styles.mainBox}>
          <Typography sx={styles.helpCenter}>Help Center</Typography>
          <Typography sx={styles.helpWelcome}>
            Welcome! How can we help?
          </Typography>
          <Typography sx={styles.helpInstruction}>
            Welcome to JD Funnel Marketplace Help Center! We're here to ensure
            you have a seamless and enjoyable experience, whether you're a buyer
            or a seller. Find answers to common questions and helpful resources
            below.
          </Typography>
        </Box>
      </BackgroundImage>
      <Box sx={{ mt: 12 }}>
        <Typography sx={styles.faqHeading}>
          Frequently Asked Questions
        </Typography>
      </Box>
      <Faq />
    </>
  );
};

export default Helpcenter;
