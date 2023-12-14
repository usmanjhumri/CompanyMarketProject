import Colors from "../colors";
const Styles = {
  mainBox: {
    marginTop: { md: "1rem", xs: "1rem" },
    padding: { md: "0px 3rem", xs: "0px" },
  },
  AuthTypo: {
    fontWeight: 600,
    fontSize: { md: "32px", xs: "20px" },
    color: Colors.black,
    fontFamily: "Be Vietnam Pro , sans-serif",
    lineHeight: "35.06px",
    textAlign: "center",
    margin: { md: "2rem 0px", xs: "auto" },
  },
  buttonText1: {
    margin: "4px",
    fontFamily: "Be Vietnam Pro,sans-serif",
    fontSize: "16px",
    textTransform: "none",
    backgroundColor: Colors.primary,
  },
  AuthTypo2: {
    fontWeight: 400,
    fontSize: { md: "16px", xs: "12px" },
    color: Colors.black,
    fontFamily: "Be Vietnam Pro , sans-serif",
    textAlign: "center",
    maxWidth: "650px",
    margin: "0.8rem auto",
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
    fontSize: { md: "24px", xs: "18px" },
    color: Colors.black,
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
    color: Colors.black,
    fontFamily: "Be Vietnam Pro , sans-serif",
    lineHeight: "20.45px",
    textAlign: "left",
  },
  PriceTypo: {
    fontWeight: 400,
    fontSize: { md: "18px", xs: "14px" },
    color: Colors.gray,
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
    color: Colors.gray,
    fontFamily: "Be Vietnam Pro , sans-serif",
    lineHeight: "26.3px",
    textAlign: "left",
  },
  BtnStyle: {
    background: Colors.primary,
    color: Colors.white,
    padding: "0.4rem 0.6rem",
    textTransform: "capitalize",
    ":hover": {
      background: Colors.primary,
    },
  },
  CategoriesText: {
    fontFamily: "Be Vietnam Pro , sans-serif",
    fontSize: "24px",
    fontWeight: 500,
    lineHeight: "normal",
    color: "black",
    margin: "0.5rem",
    
  },
  filterRefine: {
    background: Colors.secondary,
    color: "white",
    padding:"0.5rem 0",
    textAlign:"center",
    fontFamily: "Be Vietnam Pro , sans-serif",
    fontSize: "24px",
    fontWeight: 500,
  },
  categoriesStyle: {
    margin:"auto",
    border: "1px solid rgb(223, 230, 233)",
    marginLeft: { md: "30px", sm: "0px" },
  },
  formCenter: {
    flexDirection: { md: "column", xs: "row" },
    alignItems: {md:"flex-start", xs:"center"},
    // justifyContent:{md:"flex-start", xs:"center"},
    marginLeft:{md:"2rem", xs:"1rem"}

  },
  priceCenter: {
    display: "flex",
    justifyContent: "center",
  },
  priceAlign: {
    width: "30%",
    margin: "7px",
    marginTop: "10px",
  },
  priceSecond: {
    width: "30%",
    marginTop: "10px",
  },
  priceButton: {
    padding: "10px",
    marginLeft: "3px",
    background: Colors.secondary,
    color: "white",
  },
  orderBy: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  buttonText: {
    margin: "4px",
    fontFamily: "Be Vietnam Pro,sans-serif",
    fontSize: "16px",
    textTransform: "none",
    backgroundColor: Colors.primary,
  },
};
export default Styles;
