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
import { getProfileData, storageKey } from "../../Redux/api/api";
import { useDispatch, useSelector } from "react-redux";
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
  const firstName = useSelector((state) => state?.getProfileData?.firstName);

  useEffect(() => {
    dispatch(getProfileData);
  }, [dispatch]);

  const handleUserAvatar = (avatarmenu) => {
    switch (avatarmenu) {
      case "Profile":
        break;

      case "Logout":
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
