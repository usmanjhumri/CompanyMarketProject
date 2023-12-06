/* eslint-disable react/no-unescaped-entities */
import  { useState, Fragment, useEffect, useMemo } from "react";
import Cards from "../Cards";
import Styles from "./Styles";
import {
  Typography,
  Box,
  Grid,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../Redux/api/api";
import InfiniteScroll from "react-infinite-scroll-component";

const AllProducts = () => {
  const dispatch = useDispatch();
  const [subCatgeory, setSubCatgeory] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [firstTimeData, setFirstTimeData] = useState(true);
  const [count, setCount] = useState(1);

  const filterCatgeory = useSelector((state) => state?.home?.catergories);
  const isLoading = useSelector((state) => state.allProducts.isLoading);
  const data = useSelector((state) => state?.allProducts?.getProducts);

  useEffect(() => {
    dispatch(fetchAllProducts(count));
  }, [dispatch, count]);

  useEffect(() => {
    const productsShow = () => {
      if (firstTimeData) {
        setProducts(data);
        console.log(products, "checking");
      }
      setSubCatgeory(filterCatgeory);
    };

    return () => productsShow();
  }, [filterCatgeory, data]);

  const filteredProducts = useMemo(() => {
    if (selectedSubcategories.length > 0) {
      return products.filter((item) =>
        selectedSubcategories.includes(item.category_id.toString())
      );
    } else {
      return products;
    }
  }, [selectedSubcategories, products]);

  const handleCheckBox = (e) => {
    const subCategoryId = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedSubcategories((prev) => [...prev, subCategoryId]);
    } else {
      setSelectedSubcategories((prev) =>
        prev.filter((id) => id !== subCategoryId)
      );
    }
  };

  const fetchMoreData = () => {
    if (data.length > 0) {
      const nextPage = count + 1;
      setFirstTimeData(false);
      setCount(nextPage);

      // Check for duplicates before updating the state
      const uniqueProducts = [...new Set([...products, ...data])];

      // Update the state with unique products
      setProducts(uniqueProducts);

      console.log(uniqueProducts, "after scroll");
    } else {
      console.log("No more data to load");
    }
  };

  return (
    <Fragment>
      <Typography sx={Styles.AuthTypo}>Our All Products</Typography>
      <Typography sx={Styles.AuthTypo2}>
        Designed to meet the diverse needs of entrepreneurs, creatives, and
        professionals alike, our Featured Products are more than just tools
        they're catalysts for success.
      </Typography>

      <Grid
        container
        sx={{
          maxWidth: { md: "100%", xs: "auto" },
          margin: "auto",
          marginTop: "4rem",
        }}
      >
        {/* Categories Grid */}
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography sx={Styles.CategoriesText}>Categories</Typography>
            <FormGroup
              sx={{
                flexDirection: { md: "column", xs: "row" },
                paddingLeft: { xs: "20px" },
                alignItems: "flex-start",
              }}
            >
              {subCatgeory?.map((category) => (
                <FormControlLabel
                  type="checkbox"
                  key={category.id}
                  control={<Checkbox />}
                  label={category.name}
                  value={category.id}
                  onChange={handleCheckBox}
                />
              ))}
            </FormGroup>
          </Box>
        </Grid>

        {/* Main Content Grid */}
        <Grid item xs={12} md={9}>
          <InfiniteScroll
            key={products?.length}
            dataLength={products?.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<h4>Loading...</h4>} // Add this line for the loading indicator
          >
            <Cards data={filteredProducts} isLoading={isLoading} />
          </InfiniteScroll>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          ></Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default AllProducts;
