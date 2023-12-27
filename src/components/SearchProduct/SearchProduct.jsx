/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from "react";
import Cards from "../Cards";
import Styles from "./styles";
import {
  Typography,
  Box,
  Grid,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Skeleton,
  Container,
  InputBase,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../Redux/api/api";
import InfiniteScroll from "react-infinite-scroll-component";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";

// const names = [
//   " Price ASC",
//   " Price DESC",
//   " Date ASC",
//   " Date DESC",
//   " Sell ASC",
//   "Carlos Abbott",
//   " Sell DESC",
//   " Rating ASC",
//   " Rating DESC",
// ];

const SearchProduct = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("search");
  const data = useSelector((state) => state?.allProducts?.getProducts);
  const filterCatgeory = useSelector((state) => state?.home?.catergories);
  const isLoading = useSelector((state) => state?.allProducts?.isLoading);
  const [orderBy, setOrderBy] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [products, setProducts] = useState([]);
  const [checkCatName, setCheckCatName] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    dispatch(
      fetchAllProducts({
        minPrice,
        maxPrice,
        checkCatName,
        orderBy,
        searchValue,
      })
    );
  }, [checkCatName, dispatch, searchValue]);

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
    // console.log("Working");
  };

  // const handleMinPrice = (event) => {
  //   let inputValue = parseFloat(event.target.value);

  //   if (isNaN(inputValue)) {
  //     inputValue = 0;
  //   }

  //   inputValue = Math.max(0, inputValue);

  //   setMinPrice(inputValue);
  // };

  // const handleMaxPrice = (event) => {
  //   let inputValue2 = parseFloat(event.target.value);

  //   if (isNaN(inputValue2)) {
  //     inputValue2 = 0;
  //   }

  //   inputValue2 = Math.max(0, inputValue2);

  //   setMaxPrice(inputValue2);
  // };

  // const handleOrderBy = (event) => {
  //   setOrderBy(event.target.value + 1);
  // };

  // const MenuProps = {
  //   PaperProps: {
  //     style: {
  //       maxHeight: 300,
  //       width: 250,
  //     },
  //   },
  // };
  //

  const handleInputSearch = (e) => {
    const searchItems = e.target.value;
    setInputSearch(searchItems);
  };
  const handleSearchBtn = () => {
    // console.log(inputSearch);
    navigate(`/product/search?search=${inputSearch}`);
  };
  const handleSearchKey = (e) => {
    if (e.key === "Enter") {
      navigate(`/product/search?search=${inputSearch}`);
    }
  };

  return (
    <>
      <Box>
        <Container maxWidth="100%">
          <Grid>
            <Typography sx={Styles.AuthTypo}>Search Products</Typography>
            <Box
              sx={{
                margin: "1rem 0",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <InputBase
                onKeyUp={handleSearchKey}
                placeholder={searchValue}
                value={inputSearch}
                sx={{
                  border: "1px solid gray",
                  borderRadius: "4px",
                  backgroundColor: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                  },
                  marginLeft: "0",
                  width: "40%",
                  padding: "3px",
                  transition: "background-color 0.3s",
                  "& .MuiInputBase-input": {
                    padding: "8px 12px",
                    width: "100%",
                    [theme.breakpoints.down("md")]: {
                      width: "60%",
                    },
                    [theme.breakpoints.down("sm")]: {
                      width: "40%",
                    },
                  },
                }}
                startAdornment={<IoMdSearch style={{ fontSize: "2rem" }} />}
                endAdornment={
                  <Button variant="contained" onClick={handleSearchBtn}>
                    Search
                  </Button>
                }
                onChange={handleInputSearch}
              />
            </Box>
            <Grid container>
              <Grid
                item
                xs={12}
                sm={12}
                md={2}
                sx={{
                  "@media (max-width: 1300px)": {
                    maxWidth: "100%",
                    margin: "1rem 0",
                  },
                }}
              >
                <Box sx={Styles.categoriesStyle}>
                  <Typography sx={Styles.filterRefine}>Filter </Typography>
                  <Typography sx={Styles.CategoriesText}>Categories</Typography>
                  <FormGroup sx={Styles.formCenter}>
                    {filterCatgeory?.map((category) => (
                      <FormControlLabel
                        sx={{
                          ".MuiFormControlLabel-label": {
                            letterSpacing: "0",
                          },
                        }}
                        key={category.id}
                        control={<Checkbox />}
                        label={
                          isLoading ? <Skeleton width={100} /> : category.name
                        }
                        value={category.id}
                        onChange={handleCheckBox}
                      />
                    ))}
                  </FormGroup>
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={10}
                sx={{
                  "@media (max-width: 1400px)": {
                    maxWidth: "100%",
                    margin: "1rem 0",
                  },
                }}
              >
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
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default SearchProduct;
