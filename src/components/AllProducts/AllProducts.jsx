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
  const fetchMoreData = () => {};

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
          maxWidth: { md: "100%", lg: "auto", xs: "auto" },
        }}
        spacing={2}
      >
        <Grid item xs={12} md={2} lg={3} sx={{ order: { xs: 2, md: 1 } }}>
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
          </Box>
        </Grid>
        {/* Main Content Grid */}
        <Grid item xs={12} md={10} lg={7} sx={{ order: { xs: 2, md: 2 } }}>
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
