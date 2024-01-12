import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
// import style from "./Styles";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import img1 from "../../assets/dashboardLogo.png";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import PropTypes from "prop-types";
import { api_base_URL_iFrame } from "../../Const/CONST";
import style from "./Styles";
import Skeleton from "@mui/material/Skeleton";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Typography>{children}</Typography>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const iframeRef = useRef(null);
  const isSmallScreen = useMediaQuery("(max-width:200px)");
  const isMediumScreen = useMediaQuery(
    "(min-width:601px) and (max-width:960px)"
  );
  const isLargeScreen = useMediaQuery("(min-width:961px)");

  const [tabValue, setTabValue] = React.useState(0);
  const firstName = useSelector((state) => state?.getProfileData?.firstName);
  const {
    profileData,
    description,
    isLoading,
    imagePath,
    coverImage,
    logoImage,
  } = useSelector((state) => state?.getProfileData);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  useEffect(() => {
    const tokenUser = JSON.parse(localStorage.getItem("user")).token;
    setToken(tokenUser);
  }, []);
  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.onload = () => {
        setLoading(true);
      };
    }
  }, [iframeRef]);

  const isloadingiframe = () => {
    if (!loading) {
      return <Skeleton variant="rectangular" width="100%" height={500} />;
    }
  };
  return (
    <>
      <Grid container>
        <Grid item md={1}></Grid>
        <Grid item md={10}>
          <Box sx={{ ...style.flexProfilePic }}>
            <Box component={"img"} src={img1}></Box>
            <Typography
              sx={{
                fontSize: isSmallScreen ? "24px" : "32px",
                fontFamily: "Be Vietnam",
                color: "#363636",
                fontWeight: 600,
                ml: 2,
              }}
            >
              {firstName}
            </Typography>
          </Box>
          <Tabs
            onChange={handleTabChange}
            value={tabValue}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            sx={{ mt: 4 }}
          >
            <Tab label="Dashboard" sx={style.list} />
            <Tab label="Deposit" sx={style.list} />
            <Tab label="Transactions" sx={style.list} />
            <Tab label="Purchase log" sx={style.list} />
            <Tab label="Ticket" sx={style.list} />
          </Tabs>
          <CustomTabPanel value={tabValue} index={0}>
            {isloadingiframe()}
            <iframe
              title="Embedded Content"
              src={`${api_base_URL_iFrame}user/dashboard?token=${token}`}
              width="100%"
              height="800px"
              style={{ border: "0px", overflow: "hidden" }}
              allowFullScreen
              ref={iframeRef}
            />
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={1}>
            {isloadingiframe()}
            <iframe
              title="Embedded Content"
              src={`${api_base_URL_iFrame}deposit/history?token=${token}`}
              width="100%"
              height="700px"
              style={{ border: "0px" }}
              allowFullScreen
              ref={iframeRef}
            />
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={2}>
            {isloadingiframe()}
            <iframe
              title="Embedded Content"
              src={`${api_base_URL_iFrame}transaction?token=${token}`}
              width="100%"
              height="700px"
              style={{ border: "0px" }}
              allowFullScreen
              ref={iframeRef}
            />
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={3}>
            {isloadingiframe()}
            <iframe
              title="Embedded Content"
              src={`${api_base_URL_iFrame}purchased-product/list?token=${token}`}
              width="100%"
              height="700px"
              style={{ border: "0px" }}
              allowFullScreen
              ref={iframeRef}
            />
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={4}>
            {isloadingiframe()}
            <iframe
              title="Embedded Content"
              src={`${api_base_URL_iFrame}ticket?token=${token}`}
              width="100%"
              height="700px"
              style={{ border: "0px" }}
              allowFullScreen
              ref={iframeRef}
            />
          </CustomTabPanel>
        </Grid>
        <Grid item md={1}></Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
