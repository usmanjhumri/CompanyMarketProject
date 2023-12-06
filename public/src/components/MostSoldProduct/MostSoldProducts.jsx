/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-target-blank */
import { Box, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import CategoriesStyle from "./style";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./categories.css";
import { useSelector } from "react-redux";

import MostSellCategoriesData from "./MostSellCategoriesData";
import Skeletoncard from "../Skeletoncard";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

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
  const [value, setValue] = useState(0);
  const [filterProduct, setFilterProduct] = useState([]);
  const catMostProduct = useSelector((state) => state?.home?.mostSellProduct);

  const handleChange = (event, newValue) => {
    setFilterProduct(
      catMostProduct.filter((item) => item.category.name === event.target.name)
    );
    setValue(newValue);
  };
  useEffect(() => {
    const prod = catMostProduct.filter(
      (item) => item.category.name === catMostCat[0].name
    );
    setFilterProduct(prod, " my filtered products");
  }, [catMostProduct]);

  const catMostCat = useSelector((state) => state?.home?.mostSellCat);
  // console.log(filterProduct, "after on change");

  return (
    <Box sx={CategoriesStyle.mainBox}>
      <Container maxWidth="100%" sx={{ maxWidth: { md: "90%", xs: "auto" } }}>
        <Typography sx={CategoriesStyle.CategoryTypo}>
          Most Sold Products of Different Categories
        </Typography>
        <Typography mt={3} sx={CategoriesStyle.CategoryTypo2}>
          Across various categories, certain products reign supreme. Funnels,
          Websites, Dashbaords, Logos
        </Typography>

        <Grid container>
          <Box sx={{ width: "100%", marginTop: { md: "3rem", xs: "3rem" } }}>
            <Box>
              <Tabs
                scrollButtons
                allowScrollButtonsMobile
                variant="scrollable"
                TabIndicatorProps={{ sx: { display: "none" } }}
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                sx={{
                  "& .MuiTabs-flexContainer": CategoriesStyle.flexContainer,
                }}
              >
                {catMostCat?.map((item, index) => (
                  <Tab
                    label={item.name}
                    {...a11yProps([index], item.name)}
                    key={index}
                  />
                ))}
              </Tabs>
            </Box>

            {catMostCat?.map((item, ind) => (
              <TabPanel value={value} index={ind} key={ind}>
                {filterProduct.length === 0 ? (
                  <Skeletoncard cards={3} />
                ) : (
                  <Grid
                    container
                    spacing={3}
                    sx={{ marginTop: { md: "0.4rem", xs: "0.5rem" } }}
                  >
                    <MostSellCategoriesData filterProduct={filterProduct} />
                  </Grid>
                )}
              </TabPanel>
            ))}
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default MostSoldProduct;
