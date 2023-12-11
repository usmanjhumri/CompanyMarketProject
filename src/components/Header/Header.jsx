/* eslint-disable react/prop-types */
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { FiUserPlus } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import style from "./styles";
import { Container, Hidden } from "@mui/material";
import Logo from "../../assets/logo.png";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
// import { HeaderItemArray } from "./HeaderItemArray";
import { NavLink, useNavigate } from "react-router-dom";
import { PiShoppingCartLight } from "react-icons/pi";
import { useSelector } from "react-redux";
// import './Header.css'
import styles from "./styles";
import Colors from "../colors";
import ResponsiveDrawer from "./Drawer/ResponsiveDrawer";
import { Fragment } from "react";

const navItems = [
  { title: "Home", link: "/" },
  { title: "Products", link: "products" },
];

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
const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false); // show drawer on mobile screen
  const [anchorEl, setAnchorEl] = useState(null); // Open and Closing menu
  const [selectedCat, setSelectedCat] = useState(null); // selecting catgoery for subcat
  const catergories = useSelector((state) => state?.home?.catergories); // getting categories from API
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  function handleHover(event, catergoryId) {
    event.preventDefault(); // Prevents the default behavior of the event
    event.stopPropagation(); // Stops the event from propagating up or down the DOM
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
      const selectdCategory = catergories.find(
        (category) => category.id == catergoryId
      );
      setSelectedCat(selectdCategory);
    }
  }

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      {/* upper header code  */}
      <Box p={2} bgcolor="#F8F9FA">
        <Container maxWidth="100%">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              {navItems?.map((item, index) => (
                // eslint-disable-next-line react/jsx-key
                <NavLink
                  key={index}
                  to={item.link}
                  style={({ isActive }) => {
                    return isActive ? styles.textActive : styles.text;
                  }}
                >
                  {item.title}
                </NavLink>
              ))}
            </Box>
            <Box sx={style.outter}>
              <Box sx={style.cartBox}>
                <PiShoppingCartLight style={style.cartIcon} />
                <Typography sx={style.cartTypo}>0</Typography>
              </Box>
              <Box sx={{ display: { md: "flex", xs: "none" } }}>
                <FiUser />
                <Typography
                  component="p"
                  sx={{
                    // display: { xs: "none", sm: "block" },
                    color: "black",
                  }}
                  style={style.text}
                >
                  <NavLink to="/signin" style={style.signupLoginStyle}>
                    Sign In
                  </NavLink>
                </Typography>
              </Box>
              <Box sx={{ display: { md: "flex", xs: "none" } }}>
                <FiUserPlus />
                <Typography
                  component="p"
                  sx={{
                    // display: { xs: "none", sm: "block" },
                    color: "black",
                  }}
                  style={style.text}
                >
                  <NavLink to="/signup" style={style.signupLoginStyle}>
                    Sign Up
                  </NavLink>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      {/* End upper header code  */}

      {/* Lower header code  */}
      <Box sx={{ display: "flex" }}>
        <AppBar component="nav" sx={style.root} position="static">
          <Container
            maxWidth="100%"
            sx={{ padding: { md: "16px", xs: "auto" } }}
          >
            <Toolbar>
              <Box sx={{ flexGrow: 1 }}>
                <NavLink to={"/"}>
                  <Box component="img" src={Logo} />
                </NavLink>
              </Box>
              <Hidden mdDown>
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                  {catergories?.map((item, index) => (
                    <Fragment key={index}>
                      <Typography
                        aria-owns={open ? "mouse-over-popover" : undefined}
                        aria-haspopup="true"
                        onMouseEnter={handlePopoverOpen}
                        onClick={handlePopoverClose}
                        sx={{ zIndex: 10000 }}
                      >
                        <NavLink
                          to={`/categories/${item.name.toLowerCase().trim()}/${
                            item.id
                          }`}
                          style={({ isActive }) => ({
                            ...(isActive ? styles.linkbg : styles.link),
                          })}
                          onMouseEnter={(e) => handleHover(e, item.id)}
                        >
                          {item.name}
                        </NavLink>
                      </Typography>
                    </Fragment>
                  ))}

                  {selectedCat?.subcategories?.length > 0 && (
                    <Popover
                      open={open}
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                      onClose={handlePopoverClose}
                      sx={{ mt: 1 }}
                      onMouseLeave={handlePopoverClose}
                      onClick={handlePopoverClose}
                    >
                      {selectedCat?.subcategories?.map((item, index) => (
                        <div key={index}>
                          <NavLink
                            style={{ textDecoration: "none", color: "black" }}
                            to={`${selectedCat.id}/sub-categories/${item.name
                              .toLowerCase()
                              .trim()}/${item.id}`}
                          >
                            <Typography sx={{ p: 2 }}>{item.name}</Typography>
                          </NavLink>
                        </div>
                      ))}
                    </Popover>
                  )}
                </Box>
              </Hidden>
              <Hidden mdUp>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                  // sx={{ display: { sm: "block", md:"none" }, justifyContent: "end" }}
                >
                  <MenuIcon sx={{ color: "black" }} />
                </IconButton>
              </Hidden>
              <Search
                sx={{
                  display: { xs: "none", sm: "none", md: "none ", lg: "block" },
                }}
              >
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="(E’g Responsive Landing Pages and Websites)"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Toolbar>
          </Container>
        </AppBar>

        <nav>
          <Hidden lgUp>
            <ResponsiveDrawer
              mobileOpen={mobileOpen}
              setMobileOpen={setMobileOpen}
              catergories={catergories}
            />
          </Hidden>
        </nav>
      </Box>
      {/* End Lower header code  */}
      {/* <Menu
        anchorEl={anchorEl}
        handleClose={handleClose}
        subcategories={selectedCat?.subcategories || []}
      /> */}
    </>
  );
};

export default Header;
