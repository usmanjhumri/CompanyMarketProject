import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { sendProfileData } from "../Redux/api/api";

const useProfileSettings = () => {
  const { imagePath, coverImage, logoImage, profileData } = useSelector(
    (state) => state?.getProfileData
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

    setSelectedImg(URL.createObjectURL(selectedFile));
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

  const setProfileData = () => {
    setInputValues((prevValues) => ({
      ...prevValues,
      "first name": profileData[0]?.firstname || "",
      "last name": profileData[0]?.lastname || "",
      address: profileData[0]?.address?.address || "",
      state: profileData[0]?.address?.state || "",
      zipCode: profileData[0]?.address?.zip || "",
      city: profileData[0]?.address?.city || "",
      country: profileData[0]?.address?.country || "",
      description: profileData[0]?.description || "",
    }));

    if (profileData[0]?.cover_image) {
      setCoverImageURL(`${imagePath}/${coverImage}`);
    }

    if (profileData[0]?.image) {
      setLogoImageURL(`${imagePath}/${logoImage}`);
    }
  };

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

  return {
    inputFocus,
    inputFocusDescription,
    selectedImg,
    uploadCoverPhoto,
    coverImageURL,
    logoImageURL,
    coverPhotoName,
    companyLogo,
    disable,
    loading,
    inputValues,
    inputRefs,
    inputRefsDescription,
    handleEditInputDescription,
    handleEditInput,
    handleChoseFile,
    handleChoseCoverPic,
    handleInputChangeValue,
    setProfileData,
    handleSubmit,
  };
};

export default useProfileSettings;
