/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */


import { useState, Fragment, useEffect, useMemo } from "react";
import Cards from "../Cards";
import Styles from "./Styles";
import {
  Typography,
  Box,
  Grid,
  Checkbox,
  FormGroup,
  FormControlLabel,
  TextField,
  Skeleton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../Redux/api/api";
import InfiniteScroll from "react-infinite-scroll-component";

import Button from "@mui/material/Button";
import { IoIosArrowForward } from "react-icons/io";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

const names = [
  " Price ASC",
  " Price DESC",
  " Date ASC",
  " Date DESC",
  " Sell ASC",
  "Carlos Abbott",
  " Sell DESC",
  " Rating ASC",
  " Rating DESC",
];

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }
const AllProducts = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state?.allProducts?.getProducts);
  const filterCatgeory = useSelector((state) => state?.home?.catergories);
  const isLoading = useSelector((state) => state?.allProducts?.isLoading);

  const [orderBy, setOrderBy] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [products, setProducts] = useState([]);
  const [checkCatName, setCheckCatName] = useState([]);

  useEffect(() => {
    dispatch(fetchAllProducts({ minPrice, maxPrice, checkCatName, orderBy }));
  }, [checkCatName, dispatch, orderBy]);

  useMemo(() => {
    setProducts(data);
  }, [data]);
  const handleCheckBox = (e) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setCheckCatName((prev) => [...prev, e.target.value]);
    } else {
      setCheckCatName((prev) => prev.filter((name) => name !== e.target.value));
    }
  };
  const fetchMoreData = () => {
    // if (data.length > 0) {
    //   const nextPage = count + 1;
    //   setFirstTimeData(false);
    //   setCount(nextPage);
    //   // Assuming each product has a unique identifier, like an 'id' field
    //   const newDataIds = data.map((item) => item.id);
    //   // Filter out duplicates based on unique identifiers
    //   const uniqueProducts = products.filter(
    //     (product) => !newDataIds.includes(product.id)
    //   );
    //   // Concatenate the current products with the new data
    //   const updatedProducts = [...uniqueProducts, ...data];
    //   // Ensure only the last 25 products are retained
    //   const truncatedProducts = updatedProducts.slice(-25);
    //   // Show 10 more products with each scroll, up to a total of 25
    //   const productsToShow = truncatedProducts.slice(
    //     0,
    //     Math.min(10 * nextPage, 25)
    //   );
    //   setProducts(productsToShow);
    //   if (productsToShow.length >= 25) {
    //     // Disable further loading when the total reaches 25
    //   }
    // }
  };

  const handleMinPrice = (event) => {
    let inputValue = parseFloat(event.target.value);

    if (isNaN(inputValue)) {
      inputValue = 0;
    }

    inputValue = Math.max(0, inputValue);

    setMinPrice(inputValue);
  };

  const handleMaxPrice = (event) => {
    let inputValue2 = parseFloat(event.target.value);

    if (isNaN(inputValue2)) {
      inputValue2 = 0;
    }

    inputValue2 = Math.max(0, inputValue2);

    setMaxPrice(inputValue2);
  };

  const handleOrderBy = (event) => {
    setOrderBy(event.target.value + 1);
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 300,
        width: 250,
      },
    },
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
          maxWidth: { md: "100%", lg: "100%", xs: "auto" },
        }}
        spacing={2}
      >
        {/* Categories Grid */}

        <Grid item xs={12} md={2} sx={{ order: { xs: 2, md: 1 } }}>
          <Box sx={Styles.categoriesStyle}>
            <Typography sx={Styles.filterRefine}>Filter </Typography>
            <Typography sx={Styles.CategoriesText}>Categories</Typography>
            <FormGroup sx={Styles.formCenter}>
              {filterCatgeory?.map((category) => (
                <FormControlLabel
                  key={category.id}
                  control={<Checkbox />}
                  label={isLoading ? <Skeleton width={100} /> : category.name}
                  value={category.id}
                  onChange={handleCheckBox}
                />
              ))}
            </FormGroup>

            <Box sx={{ marginTop: "20px" }}>
              <Typography sx={Styles.CategoriesText}>Price</Typography>
            </Box>
            <Box sx={Styles.priceCenter}>
              <Box sx={Styles.priceAlign}>
                <TextField
                  label=" $"
                  value={isLoading ? <Skeleton width={50} /> : minPrice}
                  onChange={handleMinPrice}
                  type="number"
                />
              </Box>

              <Box sx={Styles.priceSecond}>
                <TextField
                  label="$"
                  value={isLoading ? <Skeleton width={50} /> : maxPrice}
                  onChange={handleMaxPrice}
                  type="number"
                />
              </Box>
              <Box sx={{ marginTop: "20px" }}>
                <Button
                  sx={Styles.priceButton}
                  color="success"
                  variant="contained"
                  size="small"
                >
                  <IoIosArrowForward />
                </Button>
              </Box>
            </Box>
            <Typography sx={Styles.CategoriesText}>Order By</Typography>

            <Box sx={Styles.orderBy}>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  maxWidth: 250,
                  width: "100%",
                }}
              >
                <InputLabel id="demo-multiple-checkbox-label">Order</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  value={orderBy}
                  onChange={handleOrderBy}
                  input={<OutlinedInput label="Tag" />}
                  MenuProps={MenuProps}
                  variant="standard"
                >
                  {names.map((name, index) => (
                    <MenuItem key={name} value={index} name={name}>
                      {isLoading ? <Skeleton width={50} /> : name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Grid>
        {/* Main Content Grid */}
        <Grid item xs={12} md={10} sx={{ order: { xs: 1, md: 2 } }}>
          <InfiniteScroll
            key={products?.length}
            dataLength={products?.length}
            next={fetchMoreData}
            hasMore={true}
          >
            <Cards data={products} isLoading={isLoading} />
          </InfiniteScroll>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default AllProducts;
