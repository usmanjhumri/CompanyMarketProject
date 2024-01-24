/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  OutlinedInput,
  Typography,
} from "@mui/material";
import "./Profile.css";
import BG from "../../assets/settingBg.png";
import ProfilPic from "../../assets/ProfilPics.png";
import CAMERA from "../../assets/cameraselect.png";
import profileStyles from "./styles";
import { getProfileData, sendProfileData } from "../../Redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { profileSuccessData } from "../../Redux/Slice/sendProfileData";
import Skeletoncard from "../Skeletoncard/Skeletoncard";
import Skeleton from "react-loading-skeleton";
import "./profile.css";
const ProfileSetting = () => {
  const {
    profileData,
    description,
    isLoading,
    imagePath,
    coverImage,
    logoImage,
  } = useSelector((state) => state?.getProfileData);
  const { isError, Message, success, logoImageType } = useSelector(
    (state) => state.sendProfileData
  );
  const isLoadingProfileSend = useSelector(
    (state) => state?.sendProfileData?.isLoadingProfileSend
  );

  const dispatch = useDispatch();
  const [inputFocus, setInputFocus] = useState({});
  const [inputFocusDescription, setInputFocusDescription] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [uploadCoverPhoto, setUploadCoverPhoto] = useState(null);
  const [coverImageURL, setCoverImageURL] = useState(null);
  const [logoImageURL, setLogoImageURL] = useState(null);
  const [coverPhotoName, setCoverPhotoName] = useState();
  const [companyLogo, setCompanyLogo] = useState();
  const [disable, setDisable] = useState(null);
  const [loading, setLoading] = useState(false);
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
  const [inputValues, setInputValues] = useState({
    "first name": "",
    "last name": "",
    address: "",
    state: "",
    zipCode: "",
    city: "",
    country: "",
    description: "",
  });
  const inputRefsDescription = useRef(null);

  useEffect(() => {
    // Update inputValues with the fetched data
    setInputValues((prevValues) => ({
      ...prevValues,
      "first name": profileData[0]?.firstname || "",
      "last name": profileData[0]?.lastname || "",
      address: profileData[0]?.address?.address || "",
      state: profileData[0]?.address?.state || "",
      zipCode: profileData[0]?.address?.zip || "",
      city: profileData[0]?.address?.city || "",
      description: profileData[0]?.description || "",
      companyLogo: profileData[0]?.image || "",
      coverPhoto: profileData[0]?.cover_image || "",
    }));

    if (profileData[0]?.cover_image) {
      setCoverImageURL(`${imagePath}/${coverImage}`);
    }

    if (profileData[0]?.image) {
      setLogoImageURL(`${imagePath}/${logoImage}`);
    }
  }, [profileData, description, imagePath, coverImage, logoImage]);

  const handleEditInputDescription = () => {
    setInputFocusDescription(true);
    setDisable("description");
    if (inputRefsDescription.current) {
      inputRefsDescription.current.focus();
    }
  };

  const handleEditInput = (fieldName) => () => {
    setInputFocus((prevFocus) => ({ ...prevFocus, [fieldName]: true }));

    setDisable(fieldName);
    if (inputRefs[fieldName].current) {
      inputRefs[fieldName].current.focus();
    }
  };

  const handleChoseFile = (fieldName, e) => {
    const selectedFile = e.target.files && e.target.files[0];

    if (selectedFile) {
      if (selectedFile.type !== "image/png") {
        toast.error("Logo image must be png type", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }
      setCompanyLogo(selectedFile);
      setSelectedImg(URL.createObjectURL(selectedFile));
    }
  };

  const handleChoseCoverPic = (fieldName, e) => {
    const selectedCoverPic = e.target.files && e.target.files[0];
    if (selectedCoverPic) {
      setCoverPhotoName(selectedCoverPic);
      setUploadCoverPhoto(URL.createObjectURL(selectedCoverPic));
    }
  };

  const handleInputChangeValue = (fieldName, e) => {
    if (disable === fieldName) {
      setInputValues((prevValues) => ({
        ...prevValues,
        [fieldName]: e.target.value,
      }));
    }
  };

  //   e.preventDefault();
  //   setLoading(true);

  //   const formData = new FormData();
  //   formData.append("firstname", inputValues["first name"]);
  //   formData.append("lastname", inputValues["last name"]);
  //   formData.append("address", inputValues.address);
  //   formData.append("state", inputValues.state);
  //   formData.append("zip", inputValues.zipCode);
  //   formData.append("description", inputValues.description);
  //   formData.append("city", inputValues.city);

  //   if (companyLogo) {
  //     formData.append("image", companyLogo);
  //   }

  //   if (coverPhotoName) {
  //     formData.append("cover_image", coverPhotoName);
  //   }
  //   try {
  //     await dispatch(sendProfileData(formData));
  //     await dispatch(getProfileData());
  //     toast.success("Profile updated successfully", {
  //       position: "top-right",
  //       autoClose: 1000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //     });
  //   } catch (error) {
  //     toast.error("Error updating profile", {
  //       position: "top-right",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("firstname", inputValues["first name"]);
    formData.append("lastname", inputValues["last name"]);
    formData.append("address", inputValues.address);
    formData.append("state", inputValues.state);
    formData.append("zip", inputValues.zipCode);
    formData.append("description", inputValues.description);
    formData.append("city", inputValues.city);
    if (companyLogo) {
      formData.append("image", companyLogo);
    }

    if (coverPhotoName) {
      formData.append("cover_image", coverPhotoName);
    }
    dispatch(sendProfileData(formData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(Message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      dispatch(profileSuccessData());
    } else if (success) {
      toast.success(Message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      dispatch(profileSuccessData());
      dispatch(getProfileData());
    }
  }, [isError, success, Message]);
  return (
    <>
      <Box mt={10}>
        <Container>
          <form onSubmit={handleSubmit}>
            <Box sx={profileStyles.mainBox}>
              <Box sx={profileStyles.imagePositioning}>
                {/* Cover Image */}
                {isLoading ? (
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width="100%"
                    height={280}
                    borderRadius={15}
                  />
                ) : (
                  <Box
                    component="img"
                    src={uploadCoverPhoto || coverImageURL || BG}
                    sx={{
                      width: "100%",
                      height: "280px",
                      borderRadius: "15px",
                      objectFit: "cover",
                    }}
                  />
                )}
                <Box sx={profileStyles.uploadCoverBtnPosition}>
                  <input
                    type="file"
                    ref={inputRefs.cover}
                    style={{ display: "none" }}
                    onChange={(e) => handleChoseCoverPic("cover", e)}
                  />
                  <Button
                    sx={profileStyles.uploadCoverBtnStyle}
                    onClick={() => inputRefs.cover.current.click()}
                  >
                    Upload Cover
                  </Button>
                </Box>

                {/* Profile Image */}
                <Box sx={profileStyles.profileImagePosition}>
                  {isLoading || isLoadingProfileSend ? (
                    <Skeleton
                      variant="circular"
                      animation="wave"
                      width={192}
                      height={192}
                      borderRadius={15}
                    />
                  ) : (
                    <Box
                      component="img"
                      src={selectedImg || logoImageURL || ProfilPic}
                      sx={{
                        width: "196px",
                        height: "192px",
                        borderRadius: "15px",
                      }}
                    />
                  )}

                  {/* Camera Icon */}
                  <span style={profileStyles.cameraIcon}>
                    <input
                      type="file"
                      ref={inputRefs.img}
                      style={{ display: "none" }}
                      onChange={(e) => handleChoseFile("img", e)}
                      accept="png"
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

                  {/* Profile Name and Title */}
                  <Box component="span" sx={profileStyles.profileNamePostion}>
                    <Typography sx={profileStyles.profileTitleName}>
                      {profileData[0]?.firstname || <Skeleton width={100} />}
                    </Typography>
                    <Typography sx={profileStyles.profileSubTitleName}>
                      {profileData[0]?.lastname || <Skeleton width={80} />}
                    </Typography>
                  </Box>

                  {/* Profile Picture Text */}
                  <span>
                    {isLoading || isLoadingProfileSend ? (
                      <Skeleton
                        variant="circular"
                        animation="wave"
                        width={40}
                        borderRadius={15}
                      />
                    ) : (
                      <Typography sx={profileStyles.profilePicText}>
                        Profile picture
                      </Typography>
                    )}
                  </span>
                </Box>
              </Box>

              <Grid container mt={18} spacing={3} width="100%">
                {[
                  "first name",
                  "last name",
                  "address",
                  "state",
                  "zipCode",
                  "city",
                ].map((fieldName) => (
                  <Grid item xs={12} md={6} key={fieldName}>
                    <FormControl sx={{ m: 1 }} fullWidth className="inputBase">
                      <Box sx={profileStyles.labelStyle}>
                        <label
                          htmlFor={fieldName}
                          style={profileStyles.labelFirstTextStyle}
                        >
                          {fieldName.charAt(0).toUpperCase() +
                            fieldName.slice(1) || <Skeleton width={100} />}
                        </label>
                        <Typography
                          sx={profileStyles.labelLinkStyle}
                          onClick={handleEditInput(fieldName)}
                        >
                          Edit
                        </Typography>
                      </Box>
                      {isLoading || isLoadingProfileSend ? (
                        <Skeleton variant="text" animation="wave" width={150} />
                      ) : (
                        <OutlinedInput
                          inputRef={inputRefs[fieldName]}
                          autoFocus={inputFocus[fieldName]}
                          placeholder={
                            fieldName.charAt(0).toUpperCase() +
                              fieldName.slice(1) || <Skeleton width={150} />
                          }
                          value={inputValues[fieldName]}
                          onChange={(e) => handleInputChangeValue(fieldName, e)}
                          size="small"
                          sx={profileStyles.inputStyle}
                          disabled={disable !== fieldName}
                        />
                      )}
                    </FormControl>
                  </Grid>
                ))}

                <Grid item xs={12} md={12}>
                  <FormControl sx={{ m: 1 }} className="inputBase" fullWidth>
                    <Box sx={profileStyles.labelStyle}>
                      <label
                        htmlFor="description"
                        style={profileStyles.labelFirstTextStyle}
                      >
                        Description
                      </label>
                      <Typography
                        sx={profileStyles.labelLinkStyle}
                        onClick={handleEditInputDescription}
                      >
                        Edit
                      </Typography>
                    </Box>
                    {isLoading || isLoadingProfileSend ? (
                      <Skeleton variant="text" animation="wave" width={150} />
                    ) : (
                      <OutlinedInput
                        inputRef={inputRefsDescription}
                        autoFocus={inputFocusDescription}
                        placeholder={description || <Skeleton width={150} />}
                        onChange={(e) =>
                          handleInputChangeValue("description", e)
                        }
                        size="small"
                        disabled={disable !== "description"}
                        sx={profileStyles.inputStyle}
                        value={inputValues.description}
                      />
                    )}
                  </FormControl>
                </Grid>
              </Grid>

              <Grid item xs={12} md={12} mt={4}>
                <Box>
                  <Button
                    fullWidth
                    sx={{
                      ...profileStyles.saveBtn,
                      background:
                        isLoading || isLoadingProfileSend
                          ? "#CCCCCC"
                          : "#50b948", // Change colors as needed
                      "&:hover": {
                        background:
                          isLoading || isLoadingProfileSend
                            ? "#CCCCCC"
                            : "#50b948", // Change colors as needed
                      },
                    }}
                    type="submit"
                    disabled={isLoading || isLoadingProfileSend}
                  >
                    {isLoading || isLoadingProfileSend
                      ? "Loading..."
                      : " Save Changes"}
                  </Button>
                </Box>
              </Grid>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default ProfileSetting;
