/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { Box, Container, Typography, Tab, Tabs, Grid } from "@mui/material";
import Styles from "./styles";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import "./Feature.css";
import FeatureProductData from "../FeatureProductData";
import Skeletoncard from "../Skeletoncard";

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
    id: index,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const FeatureProducts = () => {
  const catergories = useSelector((state) => state?.home?.catergories);
  const isLoading = useSelector((state) => state?.home?.isLoading);
  const [val, setVal] = useState(0);
  const [filterProduct, setFilterProduct] = useState([]);
  const handleChangetab = (e, newVal) => {
    setVal(newVal);
    setFilterProduct(
      featureProduct?.filter((item) => item.category_id == e.target.id)
    );
  };
  const featureProduct = useSelector((state) => state?.home?.featureProducts);

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

  useEffect(() => {
    setFilterProduct(
      featureProduct?.filter((item) => item.category_id === catergories[0]?.id)
    );
  }, [featureProduct, catergories]);
  return (
    <>
      <Box sx={Styles.mainBox}>
        <Container maxWidth="100%" sx={{ maxWidth: { md: "90%", xs: "auto" } }}>
          <Typography sx={Styles.AuthTypo}>Our Featured Products</Typography>
          <Typography sx={Styles.AuthTypo2}>
            Designed to meet the diverse needs of entrepreneurs, creatives, and
            professionals alike, our Featured Products are more than just tools 
            they're catalysts for success.
          </Typography>

          <Box
            sx={{
              marginBottom: { md: "3rem", xs: "3rem" },
              marginTop: "2rem",
            }}
          >
            <Tabs
              scrollButtons
              allowScrollButtonsMobile
              variant="scrollable"
              TabIndicatorProps={{ sx: { display: "none" } }}
              value={val}
              onChange={handleChangetab}
              aria-label="basic tabs example"
            >
              {catergories?.map((item, index) => (
                <Tab
                  label={item.name}
                  {...a11yProps(item.id)}
                  key={index}
                  sx={{
                    margin: "0px 10px",
                  }}
                />
              ))}

              {/* <Tab label="Websites" {...a11yProps(1)} />
              <Tab label="Dashboards" {...a11yProps(2)} />
              <Tab label="GHL Add-on’s" {...a11yProps(3)} />
              <Tab label="Surveys" {...a11yProps(4)} />
              <Tab label="Business Cards" {...a11yProps(5)} />
              <Tab label="Logos" {...a11yProps(6)} /> */}
            </Tabs>
          </Box>

          {catergories?.map((item, index) => (
            <TabPanel value={val} index={index} key={index}>
              <FeatureProductData
                filterProduct={filterProduct}
                isLoading={isLoading}
              />
            </TabPanel>
          ))}
          {catergories?.length === 0 && (
            <Grid container>
              <Skeletoncard cards={8} />
            </Grid>
          )}
        </Container>
      </Box>
    </>
  );
};

export default FeatureProducts;
