import { useState, useRef } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  OutlinedInput,
  Typography,
} from "@mui/material";
import BG from "../../assets/settingBg.png";
import ProfilPic from "../../assets/profilePic.png";
import CAMERA from "../../assets/cameraselect.png";
import profileStyles from "./styles";

const ProfileSetting = () => {
  const [inputFocus, setInputFocus] = useState({});
  const [inputValues, setInputValues] = useState({
    firstName: "usman",
    lastName: "latif",
    address: "address",
    state: "state",
    zipCode: "zipcode",
    city: "city",
  });
  const [inputFocusDescription, setInputFocusDescription] = useState(false);
  const inputRefs = {
    img: useRef(null),
    cover: useRef(null),
    firstName: useRef(null),
    lastName: useRef(null),
    address: useRef(null),
    state: useRef(null),
    zipCode: useRef(null),
    city: useRef(null),
  };
  const inputRefsDescription = useRef(null);
  const handleEditInputDescription = () => {
    setInputFocusDescription(true);
    if (inputRefsDescription.current) {
      inputRefsDescription.current.focus();
    }
  };
  const handleEditInput = (fieldName) => () => {
    setInputFocus((prevFocus) => ({ ...prevFocus, [fieldName]: true }));

    if (inputRefs[fieldName].current) {
      inputRefs[fieldName].current.focus();
    }
  };

  const handleChoseFile = (fieldName, e) => {
    const selectedFile = e.target.files && e.target.files[0];

    if (selectedFile) {
      console.log(`Selected ${fieldName} file:`, selectedFile);
    }
  };
  const handleInputChangeValue = (fieldName, e) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [fieldName]: e.target.value,
    }));
  };

  return (
    <>
      <Box mt={10}>
        <Container>
          <Box sx={profileStyles.mainBox}>
            <Box sx={profileStyles.imagePositioning}>
              <Box
                component="img"
                src={BG}
                sx={{
                  width: "100%",
                }}
              />
              <Box sx={profileStyles.uploadCoverBtnPosition}>
                <input
                  type="file"
                  ref={inputRefs.cover}
                  style={{ display: "none" }}
                  onChange={(e) => handleChoseFile("cover", e)}
                />
                <Button
                  sx={profileStyles.uploadCoverBtnStyle}
                  onClick={() => inputRefs.cover.current.click()}
                >
                  Upload Cover
                </Button>
              </Box>
              <Box sx={profileStyles.profileImagePosition}>
                <Box
                  component="img"
                  src={ProfilPic}
                  sx={{
                    width: "20%",
                  }}
                />

                <span style={profileStyles.cameraIcon}>
                  <input
                    type="file"
                    ref={inputRefs.img}
                    style={{ display: "none" }}
                    onChange={(e) => handleChoseFile("img", e)}
                  />
                  <Box
                    component="img"
                    src={CAMERA}
                    sx={{
                      width: "37px",
                      cursor: "pointer",
                    }}
                    onClick={() => inputRefs.img.current.click()}
                  />
                </span>
                <span style={profileStyles.profileNamePostion}>
                  <Typography sx={profileStyles.profileTitleName}>
                    usman
                  </Typography>
                  <Typography sx={profileStyles.profileSubTitleName}>
                    usman
                  </Typography>
                </span>
                <span>
                  <Typography sx={profileStyles.profilePicText}>
                    profile Picture
                  </Typography>
                </span>
              </Box>
            </Box>

            <Grid container mt={18} spacing={3} width="100%">
              {[
                "firstName",
                "lastName",
                "address",
                "state",
                "zipCode",
                "city",
              ].map((fieldName) => (
                <Grid item xs={12} md={6} key={fieldName}>
                  <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                    <Box sx={profileStyles.labelStyle}>
                      <label
                        htmlFor={fieldName}
                        style={profileStyles.labelFirstTextStyle}
                      >
                        {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                      </label>
                      <Typography
                        style={profileStyles.labelLinkStyle}
                        onClick={handleEditInput(fieldName)}
                      >
                        Edit
                      </Typography>
                    </Box>
                    <OutlinedInput
                      inputRef={inputRefs[fieldName]}
                      autoFocus={inputFocus[fieldName]}
                      placeholder={
                        fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
                      }
                      value={inputValues[fieldName]}
                      onChange={(e) => handleInputChangeValue(fieldName, e)}
                      size="small"
                      sx={profileStyles.inputStyle}
                    />
                  </FormControl>
                </Grid>
              ))}
              <Grid item xs={12} md={12}>
                <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                  <Box sx={profileStyles.labelStyle}>
                    <label
                      htmlFor="description"
                      style={profileStyles.labelFirstTextStyle}
                    >
                      Description
                    </label>
                    <Typography
                      style={profileStyles.labelLinkStyle}
                      onClick={handleEditInputDescription}
                    >
                      Edit
                    </Typography>
                  </Box>
                  <OutlinedInput
                    inputRef={inputRefsDescription}
                    autoFocus={inputFocusDescription}
                    placeholder="Description"
                    size="small"
                    sx={profileStyles.inputStyle}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid item xs={12} md={12} mt={4}>
              <Box>
                <Button
                  fullWidth
                  sx={{
                    background: "#50b948",
                    textTransform: "capitalize",
                    color: "#FFFFFF",
                    fontSize: "20px",
                    boxShadow: "0px 0px 6px 2px #00000040",
                    borderRadius: "15px",
                    "&:hover": {
                      background: "#50b948",
                    },
                  }}
                >
                  Save Changes
                </Button>
              </Box>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProfileSetting;
