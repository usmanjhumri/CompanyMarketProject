import Colors from "../colors";
const FooterStyle = {
  root: {
    background: "#F4F4F4",
    padding: "4rem 0px",
  },
  Ftype: {
    fontWeight: 500,
    fontSize: { md: "24px", xs: "18px" },
    color: Colors.secondary,
    fontFamily: "Be Vietnam",
    lineHeight: "35.06px",
  },
  button: {
    width: "127px",
    height: "38px",
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
    fontFamily: "Be Vietnam",
    color: "#000000",
    fontSize: "14px",
  },
  linkTypo: {
    display: "flex",
    alignItems: "center",
    // marginLeft: "-3px",
    marginTop: "1rem",
  },
  iconStyle: {
    color: "#000000",
    fontSize: "14px",
  },
};
export default FooterStyle;
