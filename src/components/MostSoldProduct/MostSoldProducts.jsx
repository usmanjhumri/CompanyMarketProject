/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-target-blank */
import { Box, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import CategoriesStyle from "./style";
import {  useState, useMemo, Fragment } from "react";
import { useSelector } from "react-redux";
import Skeletoncard from "../Skeletoncard";
import MostSellCategoriesData from "./MostSellCategoriesData";
import PropTypes from "prop-types";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index, name) {
  return {
    id: `${index}`,
    name: name,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const MostSoldProduct = () => {
  const [state, setState] = useState({
    value: 0,
    filterProduct: [],
  });

  const catMostProduct = useSelector((state) => state?.home?.mostSellProduct);
  const catMostCat = useSelector((state) => state?.home?.mostSellCat);

  const handleChange = (event, newValue) => {
    setState({
      ...state,
      filterProduct: catMostProduct.filter(
        (item) => item.category.name === event.target.name
      ),
      value: newValue,
    });
  };

  useMemo(() => {
    const prod = catMostProduct?.filter(
      (item) => item.category.name === catMostCat[0].name
    );
    setState({
      ...state,
      filterProduct: prod,
    });
  }, [catMostProduct]);

  return (
    <Box sx={CategoriesStyle.mainBox}>
      <Container maxWidth="100%">
        <Typography sx={CategoriesStyle.CategoryTypo}>
          Most Sold Products of Different Categories
        </Typography>
        <Typography mt={3} sx={CategoriesStyle.CategoryTypo2}>
          Across various categories, certain products reign supreme. Funnels,
          Websites, Dashboards, Logos
        </Typography>

        <Grid container>
          <Box sx={{ width: "100%", marginTop: { md: "3rem", xs: "3rem" } }}>
            <Box
              sx={{
                marginBottom: { md: "3rem", xs: "3rem" },
              }}
            >
              <Tabs
                scrollButtons
                allowScrollButtonsMobile
                variant="scrollable"
                TabIndicatorProps={{ sx: { display: "none" } }}
                value={state.value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                {catMostCat?.map((item, index) => (
                  <Tab
                    label={item.name}
                    {...a11yProps(index, item.name)}
                    key={index}
                    sx={{
                      margin: "0px 10px",
                    }}
                  />
                ))}
              </Tabs>
            </Box>

            {catMostCat?.map((item, index) => (
              <Fragment key={index}>
                <TabPanel value={state.value} index={index}>
                  {state.filterProduct.length === 0 ? (
                    <Skeletoncard cards={3} />
                  ) : (
                    <Grid
                      container
                      spacing={2}
                      sx={{ marginTop: { md: "0rem", xs: "0.5rem" } }}
                    >
                      <MostSellCategoriesData
                        filterProduct={state.filterProduct}
                      />
                    </Grid>
                  )}
                </TabPanel>
              </Fragment>
            ))}
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default MostSoldProduct;
