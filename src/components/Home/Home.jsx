import  { useState } from "react";
import styles from "./styles";
import { Box, Typography, InputBase, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import AuthsItem from "../Author'sItems";
import FeatureProducts from "../FeatureProducts";
import Slider from "./Slider";
import MostSoldProduct from "../MostSoldProduct/MostSoldProducts";
import { useNavigate } from "react-router-dom";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
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

const Home = () => {
  const navigate = useNavigate();
  const [searchProducts, setSearchProducts] = useState("");

  const handleSearch = () => {
    console.log(searchProducts);
    navigate(`/product/search?search=${searchProducts}`);

  };

  return (
    <>
      <Box style={styles.backgroundImg}>
        <Box style={styles.backgroundImgColor}>
          <Typography variant="h4" sx={styles.textHeading}>
            Discover Quality Digital Products And Elevate Your Business
          </Typography>
          <Typography
            variant="p"
            sx={styles.textParagraph}
            style={{ marginTop: "30px", marginBottom: "30px" }}
          >
            Unlock a Universe of Millions Cutting-Edge Digital Creations in This
            Platform
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value={searchProducts}
              placeholder="(E’g Responsive Landing Pages and Websites)"
              inputProps={{ "aria-label": "search" }}
              endAdornment={
                <Button
                  variant="contained"
                  sx={styles.buttonText}
                  onClick={handleSearch}
                >
                  Search
                </Button>
              }
              onChange={(e) => setSearchProducts(e.target.value)}
            />
          </Search>
        </Box>
        <Slider />
      </Box>

      <FeatureProducts />
      <AuthsItem />
      <MostSoldProduct />
    </>
  );
};

export default Home;
