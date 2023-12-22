/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { CiUser } from "react-icons/ci";
import { storageKey } from "../../Redux/api/api";
import { useDispatch } from "react-redux";
import { resetSuccessSignin } from "../../Redux/Slice/signin";
import { useNavigate } from "react-router-dom";
const settings = [
  "Profile",
  "Account",
  "Dashboard",
  "Change Password",
  "Logout",
];
const Useravatar = ({
  setUserLogged,
  handleOpenUserMenu,
  handleCloseUserMenu,
  anchorElUser,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleUserAvatar = (avatarmenu) => {
    switch (avatarmenu) {
      case "Profile":
        break;

      case "Logout":
        localStorage.removeItem(storageKey);
        setUserLogged(false);
        dispatch(resetSuccessSignin());

        break;
      case "Change Password":
        console.log("working");
        navigate("/changepassword");
        break;
    }
  };
  return (
    <div>
      <Box sx={{ flexGrow: 0 }}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            sx={{
              background: "#2697fa",
            }}
          >
            <CiUser />
          </Avatar>
        </IconButton>
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
