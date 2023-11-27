import {
  Box,
  Button,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import CategoriesStyle from "./style";
import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import "./categories.css";
import { PiShoppingCartLight } from "react-icons/pi";
import CategoriesArrayItem from "./CategoriesArray";
import { useSelector } from "react-redux";
import Aos from "aos";

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

function a11yProps(index) {
  return {
    id: `${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Categories = () => {
  const [value, setValue] = useState(0);
  const [filterProduct,setFilterProduct] = useState([])
  const catMostProduct = useSelector((state) => state?.home?.mostSellProduct);
  console.log(catMostProduct, ' mostProduct');

  const handleChange = (event, newValue) => {
    console.log(event.target.id, ' get the id')
    setValue(newValue);
    const prod = catMostProduct.filter(item=>item.category_id == event.target.id)
    // setFilterProduct(prod)
    console.log(prod, ' products');
  };


  const catMostCat = useSelector((state) => state?.home?.mostSellCat);
  console.log(filterProduct,"working")
  return (
    <Box sx={CategoriesStyle.mainBox}>
      <Container maxWidth="100%">
        <Typography sx={CategoriesStyle.CategoryTypo} data-aos="fade-down">
          Most Sold Products of Different Categories
        </Typography>
        <Typography
          mt={3}
          sx={CategoriesStyle.CategoryTypo2}
          data-aos="fade-up"
        >
          Across various categories, certain products reign supreme. Funnels,
          Websites, Dashbaords, Logos
        </Typography>

        <Grid container>
          <Box sx={{ width: "100%", marginTop: { md: "3rem", xs: "3rem" } }}>
            <Box data-aos="fade-up">
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
                      // lg: "space-around",
                    },
                    display: { sm: "flex", md: "flex" },
                    // flexDirection: { xs: "column" },
                    gap: 2,
                  },
                  "@media (max-width: 1380px)": {
                    "& .MuiTabs-flexContainer": {
                      justifyContent: "flex-start",
                    },
                  },
                }}
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                {catMostCat?.map((item, index) => (
                  <Tab label={item.name} {...a11yProps(item.id)} key={index}/>
                ))}

                {/* <Tab label="Websites" {...a11yProps(1)} />
                <Tab label="Dashboards" {...a11yProps(2)} />
                <Tab label="GHL Add-on’s" {...a11yProps(3)} />
                <Tab label="Surveys" {...a11yProps(4)} />
                <Tab label="Business Cards" {...a11yProps(5)} />
                <Tab label="Logos" {...a11yProps(6)} /> */}
              </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
              <Grid
                container
                spacing={3}
                sx={{ marginTop: { md: "0.4rem", xs: "0.5rem" } }}
              >
                {CategoriesArrayItem.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      <Grid item xs={12} md={4} key={index}>
                        <Box sx={CategoriesStyle.BoxStyle}>
                          <Box
                            component="img"
                            src={item.img}
                            sx={CategoriesStyle.ImgStyle}
                          />
                          <Typography mt={2} sx={CategoriesStyle.BoxTypo}>
                            {item.title1}
                          </Typography>

                          <Typography mt={1} sx={CategoriesStyle.BoxTypo2}>
                            {item.title2}
                          </Typography>

                          <Box mt={2} sx={{ display: "flex", gap: 2 }}>
                            <Typography sx={CategoriesStyle.PriceTypo}>
                              {item.pricetitle}
                            </Typography>
                            <Typography sx={CategoriesStyle.PriceTypo2}>
                              {item.pricetitle2}
                            </Typography>
                          </Box>

                          <Box
                            mt={4}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography sx={CategoriesStyle.SalesTypo}>
                              {item.salestitle}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                              }}
                            >
                              <PiShoppingCartLight
                                style={{
                                  padding: "0.6rem",
                                  border: "1px solid #787878",
                                  borderRadius: "2px",
                                  color: "#787878",
                                }}
                              />
                              <Button sx={CategoriesStyle.BtnStyle}>
                                Live Preview
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                    </Fragment>
                  );
                })}
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid
                container
                spacing={3}
                sx={{ marginTop: { md: "0.4rem", xs: "0.5rem" } }}
              >
                {CategoriesArrayItem.map((item, index) => {
                  return (
                    <>
                      <Grid item xs={12} md={4} key={index}>
                        <Box sx={CategoriesStyle.BoxStyle}>
                          <Box
                            component="img"
                            src={item.img}
                            sx={CategoriesStyle.ImgStyle}
                          />
                          <Typography mt={2} sx={CategoriesStyle.BoxTypo}>
                            {item.title1}
                          </Typography>

                          <Typography mt={1} sx={CategoriesStyle.BoxTypo2}>
                            {item.title2}
                          </Typography>

                          <Box mt={2} sx={{ display: "flex", gap: 2 }}>
                            <Typography sx={CategoriesStyle.PriceTypo}>
                              {item.pricetitle}
                            </Typography>
                            <Typography sx={CategoriesStyle.PriceTypo2}>
                              {item.pricetitle2}
                            </Typography>
                          </Box>

                          <Box
                            mt={4}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography sx={CategoriesStyle.SalesTypo}>
                              {item.salestitle}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                              }}
                            >
                              <PiShoppingCartLight
                                style={{
                                  padding: "0.6rem",
                                  border: "1px solid #787878",
                                  borderRadius: "2px",
                                  color: "#787878",
                                }}
                              />
                              <Button sx={CategoriesStyle.BtnStyle}>
                                Live Preview
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Grid
                container
                spacing={3}
                sx={{ marginTop: { md: "0.4rem", xs: "0.5rem" } }}
              >
                {CategoriesArrayItem.map((item, index) => {
                  return (
                    <>
                      <Grid item xs={12} md={4} key={index}>
                        <Box sx={CategoriesStyle.BoxStyle}>
                          <Box
                            component="img"
                            src={item.img}
                            sx={CategoriesStyle.ImgStyle}
                          />
                          <Typography mt={2} sx={CategoriesStyle.BoxTypo}>
                            {item.title1}
                          </Typography>

                          <Typography mt={1} sx={CategoriesStyle.BoxTypo2}>
                            {item.title2}
                          </Typography>

                          <Box mt={2} sx={{ display: "flex", gap: 2 }}>
                            <Typography sx={CategoriesStyle.PriceTypo}>
                              {item.pricetitle}
                            </Typography>
                            <Typography sx={CategoriesStyle.PriceTypo2}>
                              {item.pricetitle2}
                            </Typography>
                          </Box>

                          <Box
                            mt={4}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography sx={CategoriesStyle.SalesTypo}>
                              {item.salestitle}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                              }}
                            >
                              <PiShoppingCartLight
                                style={{
                                  padding: "0.6rem",
                                  border: "1px solid #787878",
                                  borderRadius: "2px",
                                  color: "#787878",
                                }}
                              />
                              <Button sx={CategoriesStyle.BtnStyle}>
                                Live Preview
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Grid
                container
                spacing={3}
                sx={{ marginTop: { md: "0.4rem", xs: "0.5rem" } }}
              >
                {CategoriesArrayItem.map((item, index) => {
                  return (
                    <>
                      <Grid item xs={12} md={4} key={index}>
                        <Box sx={CategoriesStyle.BoxStyle}>
                          <Box
                            component="img"
                            src={item.img}
                            sx={CategoriesStyle.ImgStyle}
                          />
                          <Typography mt={2} sx={CategoriesStyle.BoxTypo}>
                            {item.title1}
                          </Typography>

                          <Typography mt={1} sx={CategoriesStyle.BoxTypo2}>
                            {item.title2}
                          </Typography>

                          <Box mt={2} sx={{ display: "flex", gap: 2 }}>
                            <Typography sx={CategoriesStyle.PriceTypo}>
                              {item.pricetitle}
                            </Typography>
                            <Typography sx={CategoriesStyle.PriceTypo2}>
                              {item.pricetitle2}
                            </Typography>
                          </Box>

                          <Box
                            mt={4}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography sx={CategoriesStyle.SalesTypo}>
                              {item.salestitle}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                              }}
                            >
                              <PiShoppingCartLight
                                style={{
                                  padding: "0.6rem",
                                  border: "1px solid #787878",
                                  borderRadius: "2px",
                                  color: "#787878",
                                }}
                              />
                              <Button sx={CategoriesStyle.BtnStyle}>
                                Live Preview
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={4}>
              <Grid
                container
                spacing={3}
                sx={{ marginTop: { md: "0.4rem", xs: "0.5rem" } }}
              >
                {CategoriesArrayItem.map((item, index) => {
                  return (
                    <>
                      <Grid item xs={12} md={4} key={index}>
                        <Box sx={CategoriesStyle.BoxStyle}>
                          <Box
                            component="img"
                            src={item.img}
                            sx={CategoriesStyle.ImgStyle}
                          />
                          <Typography mt={2} sx={CategoriesStyle.BoxTypo}>
                            {item.title1}
                          </Typography>

                          <Typography mt={1} sx={CategoriesStyle.BoxTypo2}>
                            {item.title2}
                          </Typography>

                          <Box mt={2} sx={{ display: "flex", gap: 2 }}>
                            <Typography sx={CategoriesStyle.PriceTypo}>
                              {item.pricetitle}
                            </Typography>
                            <Typography sx={CategoriesStyle.PriceTypo2}>
                              {item.pricetitle2}
                            </Typography>
                          </Box>

                          <Box
                            mt={4}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography sx={CategoriesStyle.SalesTypo}>
                              {item.salestitle}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                              }}
                            >
                              <PiShoppingCartLight
                                style={{
                                  padding: "0.6rem",
                                  border: "1px solid #787878",
                                  borderRadius: "2px",
                                  color: "#787878",
                                }}
                              />
                              <Button sx={CategoriesStyle.BtnStyle}>
                                Live Preview
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={5}>
              <Grid
                container
                spacing={3}
                sx={{ marginTop: { md: "0.4rem", xs: "0.5rem" } }}
              >
                {CategoriesArrayItem.map((item, index) => {
                  return (
                    <>
                      <Grid item xs={12} md={4} key={index}>
                        <Box sx={CategoriesStyle.BoxStyle}>
                          <Box
                            component="img"
                            src={item.img}
                            sx={CategoriesStyle.ImgStyle}
                          />
                          <Typography mt={2} sx={CategoriesStyle.BoxTypo}>
                            {item.title1}
                          </Typography>

                          <Typography mt={1} sx={CategoriesStyle.BoxTypo2}>
                            {item.title2}
                          </Typography>

                          <Box mt={2} sx={{ display: "flex", gap: 2 }}>
                            <Typography sx={CategoriesStyle.PriceTypo}>
                              {item.pricetitle}
                            </Typography>
                            <Typography sx={CategoriesStyle.PriceTypo2}>
                              {item.pricetitle2}
                            </Typography>
                          </Box>

                          <Box
                            mt={4}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography sx={CategoriesStyle.SalesTypo}>
                              {item.salestitle}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                              }}
                            >
                              <PiShoppingCartLight
                                style={{
                                  padding: "0.6rem",
                                  border: "1px solid #787878",
                                  borderRadius: "2px",
                                  color: "#787878",
                                }}
                              />
                              <Button sx={CategoriesStyle.BtnStyle}>
                                Live Preview
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={6}>
              <Grid
                container
                spacing={3}
                sx={{ marginTop: { md: "0.4rem", xs: "0.5rem" } }}
              >
                {CategoriesArrayItem.map((item, index) => {
                  return (
                    <>
                      <Grid item xs={12} md={4} key={index}>
                        <Box sx={CategoriesStyle.BoxStyle}>
                          <Box
                            component="img"
                            src={item.img}
                            sx={CategoriesStyle.ImgStyle}
                          />
                          <Typography mt={2} sx={CategoriesStyle.BoxTypo}>
                            {item.title1}
                          </Typography>

                          <Typography mt={1} sx={CategoriesStyle.BoxTypo2}>
                            {item.title2}
                          </Typography>

                          <Box mt={2} sx={{ display: "flex", gap: 2 }}>
                            <Typography sx={CategoriesStyle.PriceTypo}>
                              {item.pricetitle}
                            </Typography>
                            <Typography sx={CategoriesStyle.PriceTypo2}>
                              {item.pricetitle2}
                            </Typography>
                          </Box>

                          <Box
                            mt={4}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography sx={CategoriesStyle.SalesTypo}>
                              {item.salestitle}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                              }}
                            >
                              <PiShoppingCartLight
                                style={{
                                  padding: "0.6rem",
                                  border: "1px solid #787878",
                                  borderRadius: "2px",
                                  color: "#787878",
                                }}
                              />
                              <Button sx={CategoriesStyle.BtnStyle}>
                                Live Preview
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </TabPanel>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default Categories;
