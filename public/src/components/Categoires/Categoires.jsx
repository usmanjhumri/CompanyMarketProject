import React, { Fragment, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Skeleton,
  Slider,
} from "@mui/material";
import Styles from "./Styles";
import { useParams } from "react-router-dom";
import Cards from "../Cards";
import { useSelector } from "react-redux";
const Categoires = () => {
  const [product, setProduct] = useState([]);
  const [subCatgeory, setSubCatgeory] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const params = useParams();
  const categoriesProduct = useSelector((state) =>
    state?.home?.catergories.find((item) => item.id == params.id)
  );
  const isLoading = useSelector((state) => state?.home?.isLoading);

  useEffect(() => {
    setProduct(categoriesProduct?.products);
    setSubCatgeory(categoriesProduct?.subcategories);
  }, [categoriesProduct]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleCheckBox = (e) => {
    const subCategoryId = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      // Add to the selected subcategories array
      setSelectedSubcategories((prev) => [...prev, subCategoryId]);
    } else {
      // Remove from the selected subcategories array
      setSelectedSubcategories((prev) =>
        prev.filter((id) => id !== subCategoryId)
      );
    }
  };
  useEffect(() => {
    // Filter products based on selected subcategories
    let subcategoryFilteredProducts = categoriesProduct?.products;
    if (selectedSubcategories.length > 0) {
      subcategoryFilteredProducts = subcategoryFilteredProducts.filter(
        (item) =>
          selectedSubcategories.includes(item.sub_category_id.toString()) &&
          Number(item.regular_price).toFixed(0) >= priceRange[0] &&
          Number(item.regular_price).toFixed(0) <= priceRange[1]
      );
    }

    // Filter products based on price range
    const priceRangeFilteredProducts = subcategoryFilteredProducts?.filter(
      (item) =>
        Number(item.regular_price).toFixed(0) >= priceRange[0] &&
        Number(item.regular_price).toFixed(0) <= priceRange[1]
    );

    // Set the final filtered products
    setProduct(
      priceRangeFilteredProducts?.length > 0
        ? priceRangeFilteredProducts
        : subcategoryFilteredProducts
    );
  }, [selectedSubcategories, categoriesProduct, priceRange]);
  return (
    <Fragment>
      <Typography sx={Styles.CatHeading}>{params.name}</Typography>
      <Typography sx={Styles.CatSubHeading}>
        Designed to meet the diverse needs of entrepreneurs, creatives, and
        professionals alike, our Featured Products are more than just tools
        they're catalysts for success.
      </Typography>
      <Grid container sx={{ marginTop: 5 }}>
        <Grid item md={2} lg={2}>
          {isLoading ? (
            <Box sx={{ width: 250, paddingLeft: 5 }}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
            </Box>
          ) : (
            <Box component="div" sx={Styles.mainBox}>
              <Box>
                <Typography sx={Styles.SubCatHeading}>
                  Sub Catogories
                </Typography>
              </Box>
              <FormGroup
                sx={{
                  flexDirection: { md: "column", xs: "row" },
                  marginTop: 1,
                  marginLeft: 3,
                }}
              >
                {subCatgeory?.map((item) => (
                  <FormControlLabel
                    key={item.id}
                    control={<Checkbox onClick={handleCheckBox} />}
                    label={item.name}
                    value={item.id}
                    sx={Styles.CheckBoxLabel}
                  />
                ))}
              </FormGroup>
              <Box
                component="div"
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Typography sx={Styles.SubCatHeading}>Price </Typography>
              </Box>
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                valueLabelFormat={`$ ${priceRange}`}
                min={0}
                max={1000}
                sx={{ width: "100%" }}
              />
            </Box>
          )}
        </Grid>

        <Grid item md={10} lg={10}>
          <Cards data={product ? product : []} isLoading={isLoading} />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Categoires;
