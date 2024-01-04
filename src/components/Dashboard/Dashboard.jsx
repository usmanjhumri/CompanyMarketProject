import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
// import style from "./Styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import img1 from "../../assets/dashboardLogo.png";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
        console.log("isIFrameloaded");
        setLoading(true);
      };
    }
  }, [iframeRef]);
  // const handleIframeLoad = () => {
  //   console.log("iframe is loaded");
  //   setLoading(true);
  // };

  const isloadingiframe = () => {
    if (!loading) {
      return <Skeleton variant="rectangular" width="100%" height={500} />;
    }
  };
  return (
    <>
      <Box
        sx={{
          minWidth: 275,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
            justifyContent: isSmallScreen ? "center" : "space-around",
            alignItems: isSmallScreen ? "center" : "flex-start",
            marginTop: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              sx={{
                width: isSmallScreen ? "80px" : "100px",
                height: "100px",
              }}
              src={img1}
              alt="funnel"
            />

            <CardContent
              sx={{
                marginLeft: isSmallScreen ? 0 : "16px",
                textAlign: isSmallScreen ? "center" : "left",
              }}
            >
              <Typography
                sx={{
                  fontSize: isSmallScreen ? "24px" : "32px",
                  fontFamily: "Be Vietnam",
                  color: "#363636",
                  fontWeight: 600,
                }}
              >
                test user
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Be Vietnam",
                  color: "black",
                  fontSize: isSmallScreen ? "12px" : "16px",
                  fontWeight: "400",
                }}
              >
                Member since December, 2023
              </Typography>
            </CardContent>
          </Box>

          <CardContent
            sx={{
              marginLeft: isSmallScreen ? 0 : "16px",
              textAlign: isSmallScreen ? "center" : "right",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Be Vietnam",
                color: "#50B948",
                fontSize: isSmallScreen ? "12px" : "16px",
                textAlign: isSmallScreen ? "center" : "right",
                fontWeight: "400",
              }}
            >
              Purchased
            </Typography>
            <Typography
              sx={{
                fontSize: isSmallScreen ? "16px" : "20px",
                fontFamily: "Be Vietnam",
                color: "#50B948",
                textAlign: isSmallScreen ? "center" : "right",
              }}
            >
              17
            </Typography>
          </CardContent>
        </Box>

        <Box
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "53px",
            marginTop: isSmallScreen
              ? "70px"
              : isMediumScreen
              ? "20px"
              : isLargeScreen
              ? "20px"
              : "",
          }}
        >
          <Tabs
            onChange={handleTabChange}
            value={tabValue}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            sx={{
              borderRadius: "4px",
              width: isSmallScreen ? "100%" : isLargeScreen ? "68%" : "100%",

              display: "flex",
              flexDirection: isSmallScreen ? "column" : "row",
              alignItems: isSmallScreen ? "center" : "flex-start",
              cursor: "pointer",
              fontFamily: "Be Vietnam",

              fontSize: isSmallScreen ? "12px" : "16px",
              fontWeight: "400",
              position: isMediumScreen ? "relative" : "absolute",
              left: isMediumScreen ? "0" : isLargeScreen ? "16%" : "0",
            }}
          >
            <Tab label="Dashboard" sx={style.list} />
            <Tab label="Deposit" sx={style.list} />
            <Tab label="Transactions" sx={style.list} />
            <Tab label="Purchase log" sx={style.list} />
            <Tab label="Ticket" sx={style.list} />
            <Tab label="Meeting All" sx={style.list} />
          </Tabs>
        </Box>
        <Box>
          {/* <CustomTabPanel value={tabValue} index={0}>
            <iframe
              title="Embedded Content"
              src={`${api_base_URL_iFrame}user/dashboard?token=${token}`}
              width="100%"
              height="700px"
              style={{ border: "0px" }}
              allowFullScreen
              onLoad={handleIframeLoad}
            />
          </CustomTabPanel> */}

          <CustomTabPanel value={tabValue} index={0}>
            {isloadingiframe()}
            <iframe
              title="Embedded Content"
              src={`${api_base_URL_iFrame}user/dashboard?token=${token}`}
              width="100%"
              height="700px"
              style={{ border: "0px" }}
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

          <CustomTabPanel value={tabValue} index={4}>
            {isloadingiframe()}
            <iframe
              title="Embedded Content"
              src={`${api_base_URL_iFrame}meetings/all?token=${token}`}
              width="100%"
              height="700px"
              style={{ border: "0px" }}
              allowFullScreen
              ref={iframeRef}
            />
          </CustomTabPanel>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
