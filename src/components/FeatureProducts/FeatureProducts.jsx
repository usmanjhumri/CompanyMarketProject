/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Box, Container, Typography, Tab, Tabs } from "@mui/material";
import Styles from "./styles";

import PropTypes from "prop-types";
import "./Feature.css";
import DummyData from "../DummyData";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ paddingLeft: { md: "16px", xs: "0px !important" } }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
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

const FeatureProducts = () => {
  const [val, setVal] = useState(0);

  const handleChangetab = (e, newVal) => {
    setVal(newVal);
  };
  return (
    <>
      <Box sx={Styles.mainBox}>
        <Container maxWidth="100%">
          <Typography sx={Styles.AuthTypo} data-aos="fade-up">
            Our Featured Products
          </Typography>
          <Typography sx={Styles.AuthTypo2} data-aos="fade-down">
            Designed to meet the diverse needs of entrepreneurs, creatives, and
            professionals alike, our Featured Products are more than just tools 
            they're catalysts for success.
          </Typography>

          <Box
            data-aos="fade-up"
            sx={{
              marginBottom: { md: "3rem", xs: "3rem" },
              marginTop: "2rem",
            }}
          >
            <Tabs
              scrollButtons
              allowScrollButtonsMobile
              variant="scrollable"
              // disable the tab indicator because it doesn't work well with wrapped container
              TabIndicatorProps={{ sx: { display: "none" } }}
              sx={{
                "& .MuiTabs-flexContainer": {
                  justifyContent: {
                    md: "space-around",
                    xs: "auto",
                    sm: "auto",
                  },

                  gap: 2,
                },
                // "@media (max-width: 1024px)":{
                //   "& .MuiTabs-flexContainer":{
                //     justifyContent:"flex-start",

                //   }
                // },
                "@media (max-width: 1380px)": {
                  "& .MuiTabs-flexContainer": {
                    justifyContent: "flex-start",
                  },
                },
              }}
              value={val}
              onChange={handleChangetab}
              aria-label="basic tabs example"
            >
              <Tab label="Funnels" {...a11yProps(0)} />

              <Tab label="Websites" {...a11yProps(1)} />
              <Tab label="Dashboards" {...a11yProps(2)} />
              <Tab label="GHL Add-on’s" {...a11yProps(3)} />
              <Tab label="Surveys" {...a11yProps(4)} />
              <Tab label="Business Cards" {...a11yProps(5)} />
              <Tab label="Logos" {...a11yProps(6)} />
            </Tabs>
          </Box>

          <TabPanel value={val} index={0}>
            <DummyData />
          </TabPanel>

          <TabPanel value={val} index={1}>
            <DummyData />
          </TabPanel>
          <TabPanel value={val} index={2}>
            <DummyData />
          </TabPanel>
          <TabPanel value={val} index={3}>
            <DummyData />
          </TabPanel>
          <TabPanel value={val} index={4}>
            <DummyData />
          </TabPanel>
          <TabPanel value={val} index={5}>
            <DummyData />
          </TabPanel>
          <TabPanel value={val} index={6}>
            <DummyData />
          </TabPanel>
        </Container>
      </Box>
    </>
  );
};

export default FeatureProducts;
