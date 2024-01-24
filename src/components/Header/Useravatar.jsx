/* eslint-disable no-case-declarations */
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
import { userLogout, getCart } from "../../Redux/api/api";
import { storageKey, id, order_number } from "../../Const/CONST";
import { resetSuccessSignin } from "../../Redux/Slice/signin";
import { useNavigate } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import ProfilPic from "../../assets/ProfilPics.png";

const settings = [
  "Profile Setting",
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
  const baseUrl = useSelector(
    (state) => state?.getProfileData?.profileData[0]?.base_url
  );
  const userImage = useSelector(
    (state) => state?.getProfileData?.profileData[0]?.image
  );
  // console.log(baseUrl, userImage, " logoImage");

  const handleUserAvatar = async (avatarmenu) => {
    switch (avatarmenu) {
      case "Profile":
        break;

      case "Sign out":
        // const orderNumber = localStorage.getItem(order_number);
        // const userId = localStorage.getItem(id);
        dispatch(getCart(""));

        setUserLogged(false);
        dispatch(resetSuccessSignin());
        navigate("/signin");
        localStorage.removeItem(storageKey);
        localStorage.removeItem(id);

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
            {/* <Box component="img" src={logoImage} width="20%" /> */}
            <Avatar
              src={`${baseUrl}/${userImage}`}
              sx={{
                background: "#2697fa",
                // background: logoImage ? `url${logoImage}` : "#2697fa",

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
