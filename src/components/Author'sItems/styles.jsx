import Colors from "../colors";
const AuthStyle = {
  mainBox: {
    marginTop: { md: "5rem", xs: "5rem" },
    padding: { md: "0px 3rem", xs: "auto" },
  },
  AuthTypo: {
    fontWeight: 600,
    fontSize: { md: "32px", xs: "20px" },
    color: "#000000",
    fontFamily: "Be Vietnam Pro , sans-serif",
    lineHeight: "35.06px",
    textAlign: "center",
    margin: { md: "2rem 0px", xs: "auto" },
  },
  AuthTypo2: {
    fontWeight: 400,
    fontSize: { md: "16px", xs: "12px" },
    color: "#000000",
    fontFamily: "Be Vietnam Pro , sans-serif",
    lineHeight: "35.06px",
    textAlign: "center",
    marginBottom: "3rem",
  },
  BoxStyle: {
    boxShadow: " 0px 0px 15px 0px #0000001A",
    padding: "0.7rem",
    borderRadius: "15px",
  },
  ImgStyle: {
    width: "100%",

    borderRadius: "2px, 2px, 0px, 0px",
  },
  BoxTypo: {
    fontWeight: 500,
    fontSize: { md: "24px", xs: "12px", sm: "16px" },
    color: "#000000",
    fontFamily: "Be Vietnam Pro , sans-serif",
    lineHeight: "20.45px",
    textAlign: "left",
    "@media (min-width: 900px)": {
      fontSize: "15px",
      fontWeight:600,
    },
  },
  BoxTypo2: {
    fontWeight: 500,
    fontSize: { md: "14px", xs: "12px" },
    color: "#000000",
    fontFamily: "Be Vietnam Pro , sans-serif",
    lineHeight: "20.45px",
    textAlign: "left",
  },
  PriceTypo: {
    fontWeight: 400,
    fontSize: { md: "18px", xs: "14px" },
    color: "#787878",
    fontFamily: "Be Vietnam Pro , sans-serif",
    lineHeight: "26.3px",
    textAlign: "left",
  },
  PriceTypo2: {
    fontWeight: 500,
    fontSize: { md: "18px", xs: "14px" },
    color: Colors.primary,
    fontFamily: "Be Vietnam Pro , sans-serif",
    lineHeight: "26.3px",
    textAlign: "left",
  },
  SalesTypo: {
    fontWeight: 400,
    fontSize: { md: "12px", xs: "12px" },
    color: "#787878",
    fontFamily: "Be Vietnam Pro , sans-serif",
    lineHeight: "26.3px",
    textAlign: "left",
  },
  BtnStyle: {
    background: Colors.primary,
    color: "#FFFFFF",
    padding: "0.4rem 0.6rem",
    textTransform: "capitalize",
    ":hover": {
      background: Colors.primary,
    },
  },
  linkTypo: {
    fontSize: { md: "12px", xs: "8px", lg: "16px", xxl: "14px", sm: "10px" },
  },
  imgBoxDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
export default AuthStyle;
