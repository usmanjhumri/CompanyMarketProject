/* eslint-disable react/prop-types */
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";


import IconButton from "@mui/material/IconButton";


import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import style from "./styles";
import {   Container, Hidden, } from "@mui/material";
import Signinicon from "../../assets/signin.svg";
import Logo from "../../assets/logo.png";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { HeaderItemArray } from "./HeaderItemArray";
import {  NavLink } from "react-router-dom";
import { PiShoppingCartLight } from "react-icons/pi";

import styles from "./styles";
import Colors from "../colors";
import ResponsiveDrawer from "./Drawer/ResponsiveDrawer";

const navItems = [
  { title: "Home", link: "/" },
  { title: "Product", link: "product" },
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

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
 
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
              {navItems.map((item) => (
                // eslint-disable-next-line react/jsx-key
                <NavLink
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
                <Box component="img" src={Signinicon} />

                <Typography
                  component="p"
                  sx={{
                    // display: { xs: "none", sm: "block" },
                    color: "black",
                  }}
                  style={style.text}
                >
                  Sign in
                </Typography>
              </Box>
              <Box sx={{ display: { md: "flex", xs: "none" } }}>
                <Box component="img" src={Signinicon} />

                <Typography
                  component="p"
                  sx={{
                    // display: { xs: "none", sm: "block" },
                    color: "black",
                  }}
                  style={style.text}
                >
                  Sign up
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
                  {HeaderItemArray.map((item) => (
                    <>
                      <Typography sx={styles.linkTypo}>
                        <NavLink
                          to={item.link}
                          style={({ isActive }) => ({
                            ...(isActive ? styles.linkbg : styles.link),
                            ":hover": styles.linkbg,
                          })}
                          // style={({ isActive }) => {
                          //   return isActive ? styles.linkbg : styles.link;
                          // }}
                        >
                          {item.title}
                        </NavLink>
                      </Typography>
                    </>
                  ))}
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
            <ResponsiveDrawer mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>
        
          </Hidden>
        </nav>
      </Box>
      {/* End Lower header code  */}
    </>
  );
};

export default Header;
