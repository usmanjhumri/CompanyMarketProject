import {
  Box,
  Button,
  Divider,
  FormControl,
  InputAdornment,
  List,
  OutlinedInput,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { LuSearch } from "react-icons/lu";
import { Link } from "react-router-dom";
import { HeaderItemArray } from "../HeaderItemArray";
import styles from "../styles";
import { IoClose } from "react-icons/io5";

import Logo from "../../../assets/logo.png";
import { Fragment } from "react";

// eslint-disable-next-line react/prop-types
const ResponsiveDrawer = ({ mobileOpen, setMobileOpen, catergories }) => {
  return (
    <>
      <SwipeableDrawer
        open={mobileOpen}
        onClose={() => {
          setMobileOpen(!mobileOpen);
        }}
      >
        <Box>
          <Divider />
          <List key={1}>
            <Link to="/" style={{ margin: "0px 1rem" }}>
              <Box mt={2} component="img" src={Logo} />
            </Link>

            <IoClose
              onClick={() => setMobileOpen(!mobileOpen)}
              style={styles.closeIconStyle}
            />
            <Box sx={{ margin: "0.5rem 1rem" }}>
              <FormControl sx={{ padding: "7px 4px" }}>
                <OutlinedInput
                  size="small"
                  sx={{ padding: "8px 5px !important" }}
                  placeholder="E’g Responsive Landing Pages and Websites"
                  endAdornment={
                    <InputAdornment position="end">
                      <Button sx={styles.iconBtnStyle}>
                        <LuSearch style={{ color: "#FFFFFF" }} />
                      </Button>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
            {catergories?.map((item, index) => (
              <Fragment key={index}>
                <Typography
                  sx={{
                    textAlign: "justify",
                    padding: "0px 2rem",
                    margin: "2rem 0px",
                  }}
                  key={index}
                >
                  <Link
                    to={`/categories/${item.name.toLowerCase().trim()}/${
                      item.id
                    }`}
                    style={styles.drawerlink}
                  >
                    {item.name}
                  </Link>
                </Typography>
              </Fragment>
            ))}
            <Box textAlign="center">
              <Box sx={{ maxWidth: "100%" }}>
                <Button sx={styles.SidebarBtnStyle}>SignIn</Button>
              </Box>
              <Box sx={{ maxWidth: "100%" }}>
                <Button sx={styles.SidebarBtnStyle}>SignUp</Button>
              </Box>
            </Box>
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default ResponsiveDrawer;
