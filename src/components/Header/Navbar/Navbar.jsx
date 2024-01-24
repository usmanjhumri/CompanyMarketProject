import { useCallback, useState } from "react";
import { styled } from "@mui/material/styles";
import { Container, InputBase } from "@mui/material";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import Colors from "../../colors";
import { NavLink, useNavigate } from "react-router-dom";

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  cursor: "pointer",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: Colors.secondary,
  "&:hover": {
    backgroundColor: Colors.secondary,
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  placeholder: "(E’g Responsive Landing Pages and Websites)",
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "0ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Navbar = () => {
  const navigate = useNavigate();

  const [subCategory, setSubCategory] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");

  const catergories = useSelector((state) => state?.home?.catergories);
  const subCategories = useCallback(
    (event, catergoryId) => {
      const fetchSubCategory = catergories.find(({ id }) => id === catergoryId);
      setSubCategory(fetchSubCategory.subcategories);
    },
    [catergories]
  );

  const handleChnageProduct = (e) => {
    if (e.key === "Enter") {
      setSearchProduct("");

      if (searchProduct === "") {
        return toast.error("Please enter product name!");
      } else {
        navigate(`/product/search?search=${searchProduct}`);
      }
    }
  };

  return (
    <nav>
      <Container maxWidth="100%">
        {/* <Box sx={{ flexGrow: 1 }}>
            <NavLink to={"/"}>
              <img src={Logo} alt="" />
            </NavLink>
          </Box> */}

        <div className="nav-bar">
          <div className="nav-bar-cat">
            {catergories?.map((item, index) => (
              <div key={index} onMouseEnter={(e) => subCategories(e, item.id)}>
                <NavLink
                  to={`/categories/${item.name.toLowerCase().trim()}/${
                    item.id
                  }`}
                  className="navitem"
                >
                  <span>{item.name}</span>
                  {subCategory.length > 0 && (
                    <div className="dropdown">
                      {subCategory?.map((x, index) => {
                        return (
                          <NavLink
                            style={{ textDecoration: "none", color: "black" }}
                            key={index + 2}
                            to={`${item.id}/sub-categories/${x.name
                              .toLowerCase()
                              .trim()}/${x.id}`}
                          >
                            {x.name}
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </NavLink>
              </div>
            ))}
            <Search
              sx={{
                display: { xs: "none", sm: "none", md: "none ", lg: "block" },
              }}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search"
                onChange={(e) => setSearchProduct(e.target.value)}
                onKeyDown={handleChnageProduct}
              />
            </Search>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
