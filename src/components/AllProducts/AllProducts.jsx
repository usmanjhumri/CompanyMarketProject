/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
// import React, { useState, Fragment, useEffect, useMemo } from "react";
// import Cards from "../Cards";
// import Styles from "./Styles";
// import {
//   Typography,
//   Box,
//   Grid,
//   Checkbox,
//   FormGroup,
//   FormControlLabel,
//   TextField,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllProducts } from "../../Redux/api/api";
// import InfiniteScroll from "react-infinite-scroll-component";

// import Button from "@mui/material/Button";
// import { IoIosArrowForward } from "react-icons/io";

// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";

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

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }
// const AllProducts = () => {
//   const [personName, setPersonName] = React.useState([]);

//   const dispatch = useDispatch();
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(1000);
//   const [subCatgeory, setSubCatgeory] = useState([]);
//   const [selectedSubcategories, setSelectedSubcategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [checkCatName, setCheckCatName] = useState([]);
//   const [firstTimeData, setFirstTimeData] = useState(true);
//   const [count, setCount] = useState(1);

//   const filterCatgeory = useSelector((state) => state?.home?.catergories);
//   const isLoading = useSelector((state) => state.allProducts.isLoading);
//   const data = useSelector((state) => state?.allProducts?.getProducts);

//   useEffect(() => {
//     dispatch(fetchAllProducts({ minPrice, maxPrice, checkCatName }));
//   }, [checkCatName, dispatch]);

//   useEffect(() => {
//     const productsShow = () => {
//       if (firstTimeData) {
//         setProducts(data);
//       }
//       setSubCatgeory(filterCatgeory);
//     };

//     return () => productsShow();
//   }, [filterCatgeory, data]);

//   const filteredProducts = useMemo(() => {
//     if (selectedSubcategories.length > 0) {
//       return products.filter((item) =>
//         selectedSubcategories.includes(item.category_id.toString())
//       );
//     } else {
//       return products;
//     }
//   }, [selectedSubcategories, products]);

//   const handleCheckBox = (e) => {
//     const subCategoryId = e.target.value;
//     const isChecked = e.target.checked;

//     if (isChecked) {
//       setCheckCatName((prev) => [...prev, e.target.value]);
//       setSelectedSubcategories((prev) => [...prev, subCategoryId]);
//     } else {
//       setCheckCatName((prev) => prev.filter((name) => name !== e.target.value));
//       setSelectedSubcategories((prev) =>
//         prev.filter((id) => id !== subCategoryId)
//       );
//     }
//   };
//   const fetchMoreData = () => {
//     if (data.length > 0) {
//       const nextPage = count + 1;
//       setFirstTimeData(false);
//       setCount(nextPage);

//       // Assuming each product has a unique identifier, like an 'id' field
//       const newDataIds = data.map((item) => item.id);

//       // Filter out duplicates based on unique identifiers
//       const uniqueProducts = products.filter(
//         (product) => !newDataIds.includes(product.id)
//       );

//       // Concatenate the current products with the new data
//       const updatedProducts = [...uniqueProducts, ...data];

//       // Ensure only the last 25 products are retained
//       const truncatedProducts = updatedProducts.slice(-25);

//       // Show 10 more products with each scroll, up to a total of 25
//       const productsToShow = truncatedProducts.slice(
//         0,
//         Math.min(10 * nextPage, 25)
//       );

//       setProducts(productsToShow);

//       if (productsToShow.length >= 25) {
//         // Disable further loading when the total reaches 25
//       }
//     } else {
//     }
//   };

//   const handleInputChange = (event) => {
//     let inputValue = parseFloat(event.target.value);

//     if (isNaN(inputValue)) {
//       inputValue = 0;
//     }

//     inputValue = Math.max(0, inputValue);

//     setMinPrice(inputValue);
//   };

//   const handleInputChange2 = (event) => {
//     let inputValue2 = parseFloat(event.target.value);

//     if (isNaN(inputValue2)) {
//       inputValue2 = 0;
//     }

//     inputValue2 = Math.max(0, inputValue2);

//     setMaxPrice(inputValue2);
//   };

//   const handleChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setPersonName(
//       // On autofill we get a stringified value.
//       typeof value === "string" ? value.split(",") : value
//     );
//   };

//   const MenuProps = {
//     PaperProps: {
//       style: {
//         maxHeight: 300,
//         width: 250,
//       },
//     },
//   };
//   return (
//     <Fragment>
//       <Typography sx={Styles.AuthTypo}>Our All Products</Typography>
//       <Typography sx={Styles.AuthTypo2}>
//         Designed to meet the diverse needs of entrepreneurs, creatives, and
//         professionals alike, our Featured Products are more than just tools
//         they're catalysts for success.
//       </Typography>

//       <Grid
//         container
//         sx={{
//           maxWidth: { md: "100%", lg: "100%", xs: "auto" },
//           margin: "auto",
//           marginTop: "4rem",
//         }}
//       >
//         {/* Categories Grid */}
//         <Grid item xs={12} md={2}>
//           <Box sx={Styles.categoriesStyle}>
//             <Typography sx={Styles.filterRefine}>Filter </Typography>
//             <Typography sx={Styles.CategoriesText}>Categories</Typography>
//             <FormGroup sx={Styles.formCenter}>
//               {subCatgeory?.map((category) => (
//                 <FormControlLabel
//                   type="checkbox"
//                   key={category.id}
//                   control={<Checkbox />}
//                   label={category.name}
//                   value={category.id}
//                   onChange={handleCheckBox}
//                 />
//               ))}
//             </FormGroup>

//             <Box sx={{ marginTop: "20px" }}>
//               <Typography sx={Styles.CategoriesText}>Price</Typography>
//             </Box>
//             <Box sx={Styles.priceCenter}>
//               <Box sx={Styles.priceAlign}>
//                 <TextField
//                   label=" $"
//                   value={minPrice}
//                   onChange={handleInputChange}
//                   type="number"
//                 />
//               </Box>

//               <Box sx={Styles.priceSecond}>
//                 <TextField
//                   label="$"
//                   value={maxPrice}
//                   onChange={handleInputChange2}
//                   type="number"
//                 />
//               </Box>
//               <Box sx={{ marginTop: "20px" }}>
//                 <Button
//                   sx={Styles.priceButton}
//                   color="success"
//                   variant="contained"
//                   size="small"
//                 >
//                   <IoIosArrowForward />
//                 </Button>
//               </Box>
//             </Box>
//             <Typography sx={Styles.CategoriesText}>Order By</Typography>

//             <Box sx={Styles.orderBy}>
//               {/* Use responsive styles for the FormControl */}
//               <FormControl
//                 sx={{
//                   m: 1,
//                   minWidth: 120,
//                   maxWidth: 250,
//                   width: "100%", // 100% width for all screen sizes
//                 }}
//               >
//                 <InputLabel id="demo-multiple-checkbox-label">
//                   Price ASC
//                 </InputLabel>
//                 <Select
//                   labelId="demo-multiple-checkbox-label"
//                   id="demo-multiple-checkbox"
//                   value={personName} // Use a single value instead of an array
//                   onChange={handleChange}
//                   input={<OutlinedInput label="Tag" />}
//                   MenuProps={MenuProps}
//                   variant="standard" // Corrected typo in variant
//                 >
//                   {names.map((name) => (
//                     <MenuItem key={name} value={name}>
//                       {/* Remove Checkbox and ListItemText */}
//                       {name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Box>
//           </Box>

//         </Grid>

//         {/* Main Content Grid */}
//         <Grid item xs={12} md={10}>
//           <InfiniteScroll
//             key={products?.length}
//             dataLength={products?.length}
//             next={fetchMoreData}
//             hasMore={true}
//           >
//             <Cards data={filteredProducts} isLoading={isLoading} />
//           </InfiniteScroll>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               marginTop: "2rem",
//             }}
//           ></Box>
//         </Grid>
//       </Grid>
//     </Fragment>
//   );
// };

// export default AllProducts;

import React, { useState, Fragment, useEffect, useMemo } from "react";
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
import Skeletoncard from "../Skeletoncard";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const AllProducts = () => {
  const [personName, setPersonName] = React.useState([]);

  const dispatch = useDispatch();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [subCategory, setSubCatgeory] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checkCatName, setCheckCatName] = useState([]);
  const [firstTimeData, setFirstTimeData] = useState(true);
  const [count, setCount] = useState(1);

  const filterCatgeory = useSelector((state) => state?.home?.catergories);
  const isLoading = useSelector((state) => state.allProducts.isLoading);
  const data = useSelector((state) => state?.allProducts?.getProducts);

  useEffect(() => {
    dispatch(fetchAllProducts({ minPrice, maxPrice, checkCatName }));
  }, [checkCatName, dispatch]);

  useEffect(() => {
    const productsShow = () => {
      if (firstTimeData) {
        setProducts(data);
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
      setCheckCatName((prev) => [...prev, e.target.value]);
      setSelectedSubcategories((prev) => [...prev, subCategoryId]);
    } else {
      setCheckCatName((prev) => prev.filter((name) => name !== e.target.value));
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

      // Assuming each product has a unique identifier, like an 'id' field
      const newDataIds = data.map((item) => item.id);

      // Filter out duplicates based on unique identifiers
      const uniqueProducts = products.filter(
        (product) => !newDataIds.includes(product.id)
      );

      // Concatenate the current products with the new data
      const updatedProducts = [...uniqueProducts, ...data];

      // Ensure only the last 25 products are retained
      const truncatedProducts = updatedProducts.slice(-25);

      // Show 10 more products with each scroll, up to a total of 25
      const productsToShow = truncatedProducts.slice(
        0,
        Math.min(10 * nextPage, 25)
      );

      setProducts(productsToShow);

      if (productsToShow.length >= 25) {
        // Disable further loading when the total reaches 25
      }
    } else {
    }
  };

  const handleInputChange = (event) => {
    let inputValue = parseFloat(event.target.value);

    if (isNaN(inputValue)) {
      inputValue = 0;
    }

    inputValue = Math.max(0, inputValue);

    setMinPrice(inputValue);
  };

  const handleInputChange2 = (event) => {
    let inputValue2 = parseFloat(event.target.value);

    if (isNaN(inputValue2)) {
      inputValue2 = 0;
    }

    inputValue2 = Math.max(0, inputValue2);

    setMaxPrice(inputValue2);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
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
          margin: "auto",
          marginTop: "4rem",
        }}
      >
        {/* Categories Grid */}

        <Grid item xs={12} md={2}>
          <Box sx={Styles.categoriesStyle}>
            <Typography sx={Styles.filterRefine}>Filter </Typography>
            <Typography sx={Styles.CategoriesText}>Categories</Typography>
            <FormGroup sx={Styles.formCenter}>
              {subCategory?.map((category) => (
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
                  onChange={handleInputChange}
                  type="number"
                />
              </Box>

              <Box sx={Styles.priceSecond}>
                <TextField
                  label="$"
                  value={isLoading ? <Skeleton width={50} /> : maxPrice}
                  onChange={handleInputChange2}
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
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput label="Tag" />}
                  MenuProps={MenuProps}
                  variant="standard"
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      {isLoading ? <Skeleton width={50} /> : name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Grid>
        {/* Main Content Grid */}
        <Grid item xs={12} md={10}>
          <InfiniteScroll
            key={products?.length}
            dataLength={products?.length}
            next={fetchMoreData}
            hasMore={true}
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
