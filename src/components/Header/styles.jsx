import Colors from "../colors";
const styles = {
  root: {
    background: Colors.white,
    boxShadow: "none",
    // alignItems: "center",
    // justifyContent: "space-between",
  },

  text: {
    color: Colors.black,
    fontFamily: "Be Vietnam Pro,sans-serif",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    marginLeft: "10px",
    marginRight: "10px",
    textDecoration: "none",
  },
  textActive: {
    color: Colors.secondary,
    fontFamily: "Be Vietnam Pro,sans-serif",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    borderBottom: `1px solid ${Colors.secondary}`,
    marginLeft: "10px",
    marginRight: "10px",
    textDecoration: "none",
  },
  outter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  cartBox: {
    background: Colors.cartClr,
    padding: "0.2rem 0.8rem",
    borderRadius: "15.5px",
    display: "flex",
    alignItems: "center",
    gap: 0.2,
  },
  cartTypo: {
    fontSize: "14px",
  },
  cartIcon: {
    fontSize: "14px",
  },

  link: {
    textDecoration: "none",
    lineHeight: "17.53px",
    marginLeft: "2px",
    fontFamily: "Be Vietnam",
    color: "#000000",
    "&:hover": {
      background: Colors.primary,
    },
  },
  linkbg: {
    background: Colors.primary,
    padding: "0.5rem 0.8rem",
    borderRadius: "4px",
    color: "#FFFFFF",
    textDecoration: "none",
    fontSize: { md: "12px", xs: "8px", lg: "12px", xxl: "12px" },
  },
  linkTypo: {
    fontSize: { md: "12px", xs: "8px", lg: "16px", xxl: "14px", sm: "10px" },
  },
  drawerlink: {
    textDecoration: "none",
    lineHeight: "17.53px",
    marginLeft: "2px",
    fontFamily: "Be Vietnam",
    color: "#000000",
    fontSize: "14px",
  },
  sidebarBtnBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 2,
  },
  SidebarBtnStyle: {
    fontFamily: "Be Vietnam Pro,sans-serif",
    fontSize: "16px",
    textTransform: "none",
    backgroundColor: Colors.primary,
    color: "#FFFFFF",
    width: "90%",
    margin: "1rem 0px",

    "&:hover": {
      fontFamily: "Be Vietnam Pro,sans-serif",
      fontSize: "16px",
      textTransform: "none",
      backgroundColor: Colors.primary,
      color: "#FFFFFF",
    },
  },
  closeIconStyle: {
    position: "absolute",
    left: "87%",
    top: "2%",
    background: Colors.primary,
    color: "#FFFFFF",
    padding: "0.3rem",
    borderRadius: "50%",
    fontSize: "20px",
    cursor:"pointer"
  },
  iconBtnStyle: {
    border: "none",
    background: "#2697FA",
    cursor: "pointer",
    minHeight: "45px",
    "&:hover":{
      background:Colors.primary
    }
  },
};

export default styles;
