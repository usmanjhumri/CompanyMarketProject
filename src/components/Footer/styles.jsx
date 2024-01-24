import Colors from "../colors";
const FooterStyle = {
  footerBottom: {
    position: "relative",
    bottom: "0",
    width: "100%",
    zIndex: 100000000000000,
  },
  root: {
    background: "#F4F4F4",
    padding: "4rem 0px",
  },
  Ftype: {
    fontWeight: 500,
    fontSize: { md: "24px", xs: "16px" },
    color: Colors.secondary,
    fontFamily: "Be Vietnam Pro , sans-serif",
    lineHeight: "35.06px",
    "@media (max-width: 1024px)": {
      fontSize: "15px",
    },
  },
  button: {
    borderRadius: "4px",
    background: Colors.primary,
    fontWeight: 400,
    fontSize: "14px",
    color: "#FFFFFF",
    textTransform: "capitalize",
  },
  link: {
    textDecoration: "none",
    lineHeight: "17.53px",
    marginLeft: "2px",
    fontFamily: "Be Vietnam Pro , sans-serif",
    color: "black",
  },
  linkTypo: {
    marginTop: "1rem",
    fontSize: { md: "14px", xs: "12px" },
    "@media (max-width: 1024px)": {
      fontSize: "12px",
    },
  },
  iconStyle: {
    color: "#000000",
    fontSize: "14px",
  },
  footerItem: {
    display: "flex",
    justifyContent: "center",
    gap: { md: 6, xs: 1 },
    "@media (min-width: 890px)": {
      // display: "flex",
      display: "block",
    },
  },
  imgBtnstyle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    // gap: 5,
    maxWidth: { md: "100%", xs: "auto" },
    padding: { md: "0px 2rem", xs: "auto" },
  },
  copyRightStyle: {
    background: Colors.primary,
    padding: "1.5rem",
  },
  copyRightTypo: {
    fontSize: "14px",
    fontFamily: "Be Vietnam Pro , sans-serif",
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 0.4,
  },
  LinkUnderline: {
    textDecoration: "none",
  },
};
export default FooterStyle;
