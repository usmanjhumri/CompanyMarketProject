import colors from "../colors";

const CardStyle = {
  mainBox: {
    // marginTop: { md: "5rem", xs: "4rem" },
    // padding: { md: "3px 3rem", xs: "auto" },
  },
  CardTypo: {
    fontWeight: 600,
    fontSize: { md: "32px", xs: "20px" },
    color: colors.black,
    fontFamily: "Be Vietnam Pro , sans-serif",
    marginTop: "20px",
    textAlign: "center",
  },
  CardTypo2: {
    fontWeight: 400,
    fontSize: { md: "16px", xs: "14px" },
    color: colors.black,
    fontFamily: "Be Vietnam Pro , sans-serif",
    lineHeight: "23.38px",
    textAlign: "center",
  },

  BoxStyle: {
    // boxShadow: " 0px 0px 15px 0px #0000001A",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    padding: "0.7rem",
    borderRadius: "15px",
  },
  ImgStyle: {
    width: "100%",
    height: "200px",
    borderRadius: "2px, 2px, 0px, 0px",
    objectFit: "cover",
  },
  BoxTypo: {
    fontWeight: 500,
    fontSize: { md: "24px", xs: "18px" },
    color: colors.black,
    fontFamily: "Be Vietnam Pro , sans-serif",
    lineHeight: "20.45px",
    textAlign: "left",
    "@media (min-width: 900px)": {
      fontSize: "20px",
    },
  },
  BoxTypo2: {
    fontWeight: 500,
    fontSize: { md: "14px", xs: "12px" },
    color: colors.black,
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
    color: colors.primary,
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
    background: colors.primary,
    color: colors.white,
    padding: "0.4rem 0.6rem",
    textTransform: "capitalize",
    ":hover": {
      background: colors.primary,
    },
  },
  imgBoxDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
export default CardStyle;
