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
import { useDispatch, useSelector } from "react-redux";
import { storageKey } from "../../Const/CONST";
import { resetSuccessSignin } from "../../Redux/Slice/signin";
import { useNavigate } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useEffect } from "react";
const settings = [
  "Profile Setting",
  "Account",
  "Dashboard",
  "Change Password",
  "Purchase History",
  "Sign out",
];
const Useravatar = ({
  setUserLogged,
  handleOpenUserMenu,
  handleCloseUserMenu,
  anchorElUser,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const firstName = useSelector((state) => state?.getProfileData?.firstName);

  const handleUserAvatar = (avatarmenu) => {
    switch (avatarmenu) {
      case "Profile":
        break;

      case "Sign out":
        localStorage.removeItem(storageKey);
        setUserLogged(false);
        dispatch(resetSuccessSignin());
        navigate("/signin");

        break;
      case "Change Password":
        navigate("/changepassword");
        break;
      case "Profile Setting":
        navigate("/profile-setting");
        break;
      case "Purchase History":
        navigate("/purchase-history");
        break;
      case "Dashboard":
        navigate("/dashboard");
        break;
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
        }}
      >
        <Box>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              sx={{
                background: "#2697fa",
                width: "35px",
                height: "35px",
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
              <MenuItem
                key={setting}
                onClick={() => {
                  handleUserAvatar(setting);
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box
          sx={{
            display: "flex",
            // gap: 1,
            alignItems: "center",
          }}
          onClick={handleOpenUserMenu}
        >
          <Typography
            sx={{
              cursor: "pointer",
            }}
          >
            {firstName}
          </Typography>
          <RiArrowDropDownLine
            style={{
              fontSize: "1.6rem",
              cursor: "pointer",
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Useravatar;
