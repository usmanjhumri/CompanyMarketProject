/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { storageKey } from "../../Redux/api/api";
import { useDispatch } from "react-redux";
import { resetSuccessSignin } from "../../Redux/Slice/signin";
const settings = ["Profile", "Account", "Dashboard", "Logout"];
const Useravatar = ({ setUserLogged }) => {
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleUserAvatar = (avatarmenu) => {
    switch (avatarmenu) {
      case "Profile":
        console.log("profile");
        break;

      case "Logout":
        localStorage.removeItem(storageKey);
        setUserLogged(false);
        dispatch(resetSuccessSignin());

        break;
      //   case "Dashboard":
      //     navigate("/dashboard");
      //     break;
    }
  };
  return (
    <div>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar>
              <CiUser />
            </Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography
                textAlign="center"
                onClick={() => handleUserAvatar(setting)}
              >
                {setting}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </div>
  );
};

export default Useravatar;
