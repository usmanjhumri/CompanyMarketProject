/* eslint-disable react/prop-types */
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";

import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import style from "./styles";
import {  Button, Container, Hidden, InputAdornment, OutlinedInput, SwipeableDrawer } from "@mui/material";
import Signinicon from "../../assets/signin.svg";
import Logo from "../../assets/logo.png";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { HeaderItemArray } from "./HeaderItemArray";
import { Link, NavLink } from "react-router-dom";
import { PiShoppingCartLight } from "react-icons/pi";
import { LuSearch } from "react-icons/lu";
import styles from "./styles";
import Colors from "../colors";
const headerWidth = 280;
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
const Header = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const handleSearchClick = () => {
    setMobileOpen(false)
  }
  const handlesearchBtn = () => {
    setMobileOpen(true)
  }

  const header = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Divider />
      <List key={1}>
        <Link to='/'>
        <Box mt={2} component="img" src={Logo} />
        </Link>
    <Box mt={2}>
    <OutlinedInput placeholder="E’g Responsive Landing Pages and Websites" onClick={handleSearchClick}    endAdornment={
      <InputAdornment>
      <button style={{
        border:"none",
        background:"none",
        cursor:"pointer",

      }} onClick={handlesearchBtn}>
      <LuSearch/>
      </button>
      </InputAdornment>
    } />
    </Box>
        {HeaderItemArray.map((item) => (
          <>
            <Typography
              sx={{
                textAlign: "justify",
                padding: "0px 2rem",
                margin: "2rem 0px",
              }}
              key={item}
            >
              <Link to={item.link} style={styles.drawerlink}>
                {item.title}
              </Link>
            </Typography>
          </>
        ))}
       <Box sx={{maxWidth:"100%"}}>
          <Button sx={styles.SidebarBtnStyle}>SignIn</Button>
          </Box>
          <Box sx={{maxWidth:"100%"}}>
          <Button sx={styles.SidebarBtnStyle}>SignUp</Button>
          </Box>
       
       
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
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
            <SwipeableDrawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              // onOpen={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                // display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: headerWidth,
                },
              }}
            >
              {header}
            </SwipeableDrawer>
          </Hidden>
        </nav>
      </Box>
      {/* End Lower header code  */}
    </>
  );
};

export default Header;
