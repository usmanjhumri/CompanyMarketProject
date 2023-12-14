/* eslint-disable react-hooks/exhaustive-deps */
import  { useState, useEffect, useMemo } from "react";
import Cards from "../Cards";
import Styles from "./styles";
import {
  Typography,
  Box,
  Grid,
  Checkbox,
  FormGroup,
  FormControlLabel,
  TextField,
  Skeleton,
  Container,
  InputBase,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../Redux/api/api";
import InfiniteScroll from "react-infinite-scroll-component";

import Button from "@mui/material/Button";
import { IoIosArrowForward } from "react-icons/io";
import { styled, alpha } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation } from "react-router-dom";
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

const SearchProduct = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  // Access the search query parameter from the location object
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
    console.log("Working");
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


  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    border:"1px solid gray",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.9),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
    [theme.breakpoints.up("xs")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));
  
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "70ch",
      [theme.breakpoints.down("md")]: {
        width: "40ch",
      },
      [theme.breakpoints.down("sm")]: {
        width: "20ch",
      },
    },
  }));
  const handleSearch = () => {
    console.log('working');
  }
  return (
    <>

    <Box>
     

        <Container maxWidth="100%">
      <Typography sx={Styles.AuthTypo}>Search Products</Typography>
      <Box sx={{
        margin:"1rem 0",
        display:"flex",
        justifyContent:"center"

      }}>
      <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              // value={searchProducts}
              placeholder="(E’g Responsive Landing Pages and Websites)"
              inputProps={{ "aria-label": "search" }}
              endAdornment={
                <Button
                  variant="contained"
                  sx={Styles.buttonText1}
                  onClick={handleSearch}
                >
                  Search
                </Button>
              }
              // onChange={(e) => setSearchProducts(e.target.value)}
            />
          </Search>
          </Box>
      <Grid container  >
      

        <Grid item xs={12} sm={12} md={3}>
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
                <InputLabel id="demo-multiple-checkbox-label">
                  Price ASC
                </InputLabel>
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
                    
        <Grid item xs={12} sm={12} md={9}>
          <InfiniteScroll
            key={products?.length}
            dataLength={products?.length}
            next={fetchMoreData}
            hasMore={true}
          >
            <Grid container>
            <Cards data={products} isLoading={isLoading} />
            </Grid>
          </InfiniteScroll>
        </Grid>

      </Grid>
      </Container>
      </Box>
    </>
  );
};

export default SearchProduct;
