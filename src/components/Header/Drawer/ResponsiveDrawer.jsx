/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Collapse,
  Divider,
  Drawer,
  FormControl,
  InputAdornment,
  List,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { LuSearch } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles";
import { IoClose } from "react-icons/io5";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import Logo from "/companylogo.png";
import { Fragment, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storageKey, id } from "../../../Const/CONST";
import { resetSuccessSignin } from "../../../Redux/Slice/signin";
const ResponsiveDrawer = ({ mobileOpen, setMobileOpen, catergories }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state?.signInReducer?.isLogedIn);
  const [userLogged, setUserLogged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(storageKey)) {
      setUserLogged(true);
    } else {
      setUserLogged(false);
    }
  }, [userLogged, isLoggedIn]);

  const handleLogOut = () => {
    localStorage.removeItem(storageKey);
    localStorage.removeItem(id);
    dispatch(resetSuccessSignin());
    navigate("/signin");
  };

  const [openMenu, setOpenMenu] = useState(null);
  const [changeIcon, setChangeIcon] = useState(true);
  const handleMenuOpen = (index) => {
    setChangeIcon(!changeIcon);
    setOpenMenu(openMenu === index ? null : index);
  };
  const handleCloseDrawer = () => {
    setMobileOpen(false);
  };
  const navigateRout = useNavigate();
  const [serachProduct, setSearchProduct] = useState("");
  const handleSearchBtn = () => {
    navigateRout(`/product/search?search=${serachProduct}`);
    handleCloseDrawer();
  };
  const handleLogOutandCloseDrawer = () => {
    handleLogOut();
    handleCloseDrawer();
  };
  return (
    <>
      <Drawer
        open={mobileOpen}
        onClose={() => {
          setMobileOpen(!mobileOpen);
        }}
      >
        <Box>
          <Divider />
          <List key={1}>
            <Link
              to="/"
              style={{ margin: "0px 1rem" }}
              onClick={() => handleCloseDrawer()}
            >
              <Box mt={2} component="img" src={Logo} />
            </Link>

            <IoClose
              onClick={() => setMobileOpen(!mobileOpen)}
              style={styles.closeIconStyle}
            />
            <Box sx={{ margin: "0.5rem 1rem" }}>
              <FormControl sx={{ padding: "7px 4px" }}>
                <OutlinedInput
                  onChange={(e) => setSearchProduct(e.target.value)}
                  size="small"
                  sx={{ padding: "8px 5px !important" }}
                  placeholder="Search..."
                  endAdornment={
                    <InputAdornment position="end">
                      <Button
                        sx={styles.iconBtnStyle}
                        onClick={handleSearchBtn}
                      >
                        <LuSearch style={{ color: "#FFFFFF" }} />
                      </Button>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
            {catergories?.map((item, index) => (
              <Fragment key={index}>
                <Box
                  sx={{
                    textAlign: "justify",
                    padding: "0px 2rem",
                    margin: "2rem 0px",
                    display: "flex",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                >
                  <Box>
                    <Typography>
                      <Link
                        to={`/categories/${item.name.toLowerCase().trim()}/${
                          item.id
                        }`}
                        style={styles.drawerlink}
                        onClick={() => handleCloseDrawer()}
                      >
                        {item.name}
                      </Link>
                    </Typography>
                    {item.subcategories && (
                      <Box>
                        <Collapse
                          in={openMenu === index}
                          timeout={400}
                          unmountOnExit
                        >
                          {openMenu === index && (
                            <List>
                              {item.subcategories.map((child, childIndex) => (
                                <>
                                  <Typography key={childIndex}>
                                    <Link
                                      to={`/${
                                        item.id
                                      }/sub-categories/${child.name
                                        .toLowerCase()
                                        .trim()}/${child.id}`}
                                      key={childIndex}
                                      style={styles.drawerChildlink}
                                      onClick={() => handleCloseDrawer()}
                                    >
                                      {child.name}
                                    </Link>
                                  </Typography>
                                </>
                              ))}
                            </List>
                          )}
                        </Collapse>
                      </Box>
                    )}
                  </Box>
                  {item.subcategories && (
                    <>
                      {changeIcon ? (
                        <RiArrowDropDownLine
                          style={styles.arrowIconStyle}
                          onClick={() => handleMenuOpen(index)}
                        />
                      ) : (
                        <RiArrowDropUpLine
                          style={styles.arrowIconStyle}
                          onClick={() => handleMenuOpen(index)}
                        />
                      )}
                    </>
                  )}
                </Box>
              </Fragment>
            ))}
            {userLogged ? (
              <Box sx={{ maxWidth: "100%", textAlign: "center" }}>
                <Button
                  sx={styles.SidebarBtnStyle}
                  onClick={handleLogOutandCloseDrawer}
                >
                  Sign out
                </Button>
              </Box>
            ) : (
              <Box textAlign="center">
                <Box sx={{ maxWidth: "100%" }}>
                  <Link to="/signin">
                    <Button
                      sx={styles.SidebarBtnStyle}
                      onClick={handleCloseDrawer}
                    >
                      Sign in
                    </Button>
                  </Link>
                </Box>
                <Box sx={{ maxWidth: "100%" }}>
                  <Link to="/signup">
                    <Button
                      sx={styles.SidebarBtnStyle}
                      onClick={handleCloseDrawer}
                    >
                      Sign up
                    </Button>
                  </Link>
                </Box>
              </Box>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default ResponsiveDrawer;
// http://localhost:5173/product/search?search=web
