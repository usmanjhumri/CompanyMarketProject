/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { FiUserPlus, FiUser } from "react-icons/fi";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import style from "./styles";
import { Container, Hidden, Tooltip, tooltipClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavLink, Link } from "react-router-dom";
import { PiShoppingCartLight } from "react-icons/pi";
import { useSelector } from "react-redux";
import styles from "./styles";
import ResponsiveDrawer from "./Drawer/ResponsiveDrawer";
import Useravatar from "./Useravatar";
import { storageKey } from "../../Const/CONST";
import "./Header.css";
import Navbar from "./Navbar/Navbar";
import Logo from "/companylogo.png";
const navItems = [
  { title: "Home", link: "/" },
  { title: "Products", link: "products" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false); // show drawer on mobile screen
  const catergories = useSelector((state) => state?.home?.catergories); // getting categories from API
  const totalProducts = useSelector((state) => state?.getcart?.data);
  const isLoggedIn = useSelector((state) => state?.signInReducer?.isLogedIn);
  const [activeOffeset, setActiveOffeset] = useState(false);
  const [userLogged, setUserLogged] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollYOffset = window.scrollY > 100;
      setActiveOffeset(scrollYOffset);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (localStorage.getItem(storageKey)) {
      setUserLogged(true);
    } else {
      setUserLogged(false);
    }
  }, [userLogged, isLoggedIn]);

  const [anchorElUser, setAnchorElUser] = useState(false);

  const handleOpenUserMenu = () => {
    setAnchorElUser(true);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(false);
  };

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 11,
      width: "auto",
    },
  }));

  return (
    <>
      {/* upper header code  */}
      {/* <div style={{ height: "67px" }}> */}
      <Box
        sx={activeOffeset ? styles.upperNav : styles.upperNavone}
        p={2}
        className={activeOffeset ? "navbar navbar-fixed" : "navbar"}
      >
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

            {/* <Box sx={{ position: "absolute", right: "18%" }}></Box> */}
            <Box sx={style.outter}>
              <Box sx={style.cartBox}>
                <LightTooltip
                  title={
                    totalProducts.length === 0 ? (
                      <Typography sx={{ color: "black" }}>
                        There is no product in the cart.
                      </Typography>
                    ) : (
                      totalProducts.map((item, index) => (
                        <Box sx={styles.tooltipStyle} key={index}>
                          <Typography sx={{ color: "black" }}>
                            {item.product?.name}
                          </Typography>
                          <Typography sx={{ color: "black" }}>
                            ${Number(item.total_price).toFixed(2)}
                          </Typography>
                        </Box>
                      ))
                    )
                  }
                  // arrow
                  placement="bottom"
                >
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "black",
                      display: "flex",
                      alignItems: "center",
                    }}
                    to="/cart"
                  >
                    <PiShoppingCartLight style={style.cartIcon} />
                    <Typography sx={style.cartTypo}>
                      {totalProducts?.length}
                    </Typography>
                  </Link>
                </LightTooltip>
              </Box>

              {userLogged ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Useravatar
                      setUserLogged={setUserLogged}
                      handleCloseUserMenu={handleCloseUserMenu}
                      handleOpenUserMenu={handleOpenUserMenu}
                      anchorElUser={anchorElUser}
                    />
                    {/* <Typography>{firstName}</Typography>
                      <RiArrowDropDownLine
                        style={{
                          fontSize: "1.6rem",
                          cursor: "pointer",
                        }}
                        onClick={handleopenDropDownMenue} this is for future comment Maybe it used in Future
                      /> */}
                  </Box>
                </>
              ) : (
                <>
                  <Box sx={{ display: { md: "flex", xs: "none" } }}>
                    <NavLink to="/signin" style={{ color: "black" }}>
                      <FiUser />
                    </NavLink>

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
                    <NavLink to="/signup" style={{ color: "black" }}>
                      {" "}
                      <FiUserPlus />
                    </NavLink>
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
                </>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
      {/* </div> */}
      {/* End upper header code  */}

      {/* Lower header code  */}

      <Box>
        <Hidden lgDown>
          <Box
            sx={{
              display: "flex",
              alignContent: "center",
              margin: "0.6rem 0",
            }}
          >
            <Box flexGrow={1}>
              <Container>
                <NavLink to={"/"}>
                  <img src={Logo} alt="" />
                </NavLink>
              </Container>
            </Box>
            <Navbar />
          </Box>
        </Hidden>
        <Container maxWidth="100%">
          <Hidden lgUp>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                margin: "0.6rem 0",
              }}
            >
              <Box flexGrow={1}>
                <NavLink to={"/"}>
                  <img src={Logo} alt="" />
                </NavLink>
              </Box>

              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}

                // sx={{ display: { sm: "block", md:"none" }, justifyContent: "end" }}
              >
                <MenuIcon sx={{ color: "black" }} />
              </IconButton>
            </Box>
          </Hidden>
        </Container>

        <Hidden lgUp>
          <ResponsiveDrawer
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
            catergories={catergories}
          />
        </Hidden>
      </Box>
      {/* End Lower header code  */}
    </>
  );
};

export default Header;
