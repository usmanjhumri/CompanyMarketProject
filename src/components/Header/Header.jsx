/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useCallback, useEffect } from "react";
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
import { Container, Hidden, Tooltip, tooltipClasses } from "@mui/material";
import Logo from "../../assets/logo.png";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { PiShoppingCartLight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
import Colors from "../colors";
import ResponsiveDrawer from "./Drawer/ResponsiveDrawer";
import { Fragment } from "react";
import Useravatar from "./Useravatar";
import { getProfileData, storageKey } from "../../Redux/api/api";
import "./Header.css";
import { RiArrowDropDownLine } from "react-icons/ri";
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
  const firstName = useSelector((state) => state?.getProfileData?.firstName);
  const [mobileOpen, setMobileOpen] = useState(false); // show drawer on mobile screen
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElCart, setAnchorElCart] = useState(null); // Open and Closing menu
  const [selectedCat, setSelectedCat] = useState(null); // selecting catgoery for subcat
  const [userBalance, setUserBalance] = useState(0);
  const catergories = useSelector((state) => state?.home?.catergories); // getting categories from API
  const totalProducts = useSelector((state) => state?.getcart?.data);
  const isLoggedIn = useSelector((state) => state?.signInReducer?.isLogedIn);
  const [activeOffeset, setActiveOffeset] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChnageProduct = (e) => {
    if (e.key === "Enter") {
      navigate(`/product/search?search=${searchProduct}`);
    }
  };
  const handleChangeRouteToCart = () => {
    navigate("/cart");
  };
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      setActiveOffeset(true);
    } else {
      setActiveOffeset(false);
    }
  });

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (localStorage.getItem(storageKey)) {
      setUserLogged(true);
      const { balance } = JSON.parse(window.localStorage.getItem(storageKey));
      setUserBalance(Number(balance).toFixed(2));
      dispatch(getProfileData());
    } else {
      setUserLogged(false);
    }
  }, [userLogged, isLoggedIn, dispatch]);

  const callfunction = useCallback(
    (event, catergoryId) => {
      event.preventDefault(); // Prevents the default behavior of the event
      event.stopPropagation(); // Stops the event from propagating up or down the DOM
      if (anchorEl !== event.currentTarget) {
        setAnchorEl(event.currentTarget);
        const selectdCategory = catergories.find(
          (category) => category.id == catergoryId
        );
        setSelectedCat(selectdCategory);
      }
    },
    [catergories, anchorEl, setAnchorEl, setSelectedCat]
  );

  const handlePopoverOpenCart = (event) => {
    setAnchorElCart(event.currentTarget);
  };

  const handlePopoverCloseCart = () => {
    setAnchorElCart(null);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const openCartPopup = Boolean(anchorElCart);
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
  const handleopenDropDownMenue = () => {
    console.log("working");
  };
  return (
    <>
      {/* upper header code  */}
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
                  onClick={handlePopoverCloseCart}
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
              {/* <Box
                sx={style.cartBox}
                aria-owns={openCartPopup ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpenCart}
                onClick={handleChangeRouteToCart}
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
                <Popover
                  open={openCartPopup}
                  anchorEl={anchorElCart}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  onClose={handlePopoverCloseCart}
                  sx={{ mt: 1, zIndex: 10000 }}
                  onClick={handlePopoverCloseCart}
                >
                  {totalProducts?.map((item, index) => (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        width: "100%",
                      }}
                      key={index}
                    >
                      <Typography
                        sx={{ padding: "10px", ...style.popoverProduct }}
                        onMouseLeave={handlePopoverCloseCart}
                      >
                        {item.product?.name}
                      </Typography>
                      <Typography
                        sx={{ padding: "10px" }}
                        onMouseLeave={handlePopoverCloseCart}
                      >
                        ${Number(item.total_price).toFixed(2)}
                      </Typography>
                    </Box>
                  ))}
                  {totalProducts.length === 0 && (
                    <Typography
                      sx={{ padding: "10px" }}
                      onMouseLeave={handlePopoverCloseCart}
                    >
                      There is no product in the cart.
                    </Typography>
                  )}
                </Popover>
              </Box> */}
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
                </>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
      {/* End upper header code  */}

      {/* Lower header code  */}
      <Box>
        <AppBar component="nav" sx={style.root} position="static">
          <Container
            maxWidth="100%"
            className={anchorElUser ? "zIndex" : "zIndexs"}
            sx={{ padding: { md: "16px", xs: "auto" } }}
          >
            <Toolbar>
              <Box sx={{ flexGrow: 1 }}>
                <NavLink to={"/"}>
                  <Box component="img" src={Logo} />
                </NavLink>
              </Box>

              <Hidden lgDown>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    zIndex: 1,
                  }}
                >
                  {catergories?.map((item, index) => (
                    <Fragment key={index}>
                      <Typography
                        aria-owns={open ? "mouse-over-popover" : undefined}
                        aria-haspopup="true"
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
                          onMouseEnter={(e) => callfunction(e, item.id)}
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
                      sx={{ mt: 1, zIndex: 0 }}
                      onMouseLeave={handlePopoverClose}
                      onClick={handlePopoverClose}
                    >
                      {selectedCat?.subcategories?.map((item, index) => (
                        <div key={index}>
                          <NavLink
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                            to={`${selectedCat.id}/sub-categories/${item.name
                              .toLowerCase()
                              .trim()}/${item.id}`}
                          >
                            <Typography
                              sx={{
                                p: 2,
                                "&:hover": {
                                  background: "#F8F9FA",
                                },
                              }}
                            >
                              {item.name}
                            </Typography>
                          </NavLink>
                        </div>
                      ))}
                    </Popover>
                  )}
                </Box>
              </Hidden>

              <Hidden lgUp>
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
                  onChange={(e) => setSearchProduct(e.target.value)}
                  onKeyDown={handleChnageProduct}
                  placeholder="Search"
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
    </>
  );
};

export default Header;
