import colors from "../colors";
export const Styles = {
  ShoppingHead: {
    color: colors.black,
    fontFamily: "Be Vietnam",
    fontSize: "40px",
    fontWeight: "500",
  },
  noProduct: {
    color: colors.black,
    fontFamily: "Be Vietnam",
    fontSize: "24px",
    fontWeight: "500",
    marginTop: 5,
  },
  shoppingCard: {
    padding: "0rem 0.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "50px",
    borderRadius: "2px",
    background:
      "linear-gradient(0deg, #787878 0%, #787878 100%), var(--Header-Bg, #F3F4F9)",
  },
  ContinueShop: {
    borderRadius: "4px",
    background: "#50B948",
    "&:hover": {
      background: "#50B948",
    },

    padding: "0.2rem 5rem",
    textTransform: "capitalize",

    color: "white",
    "@media (max-width: 600px)": {
      padding: "0.1rem 0.5rem",
    },
  },
  emptyCard: {
    color: "#787878 ",
    width: "104px",
    borderRadius: "4px",
    "&:hover": {
      background: " #F3F4F9",
    },
    background: " #F3F4F9",
    textTransform: "capitalize",
    maxWidth: { xs: "104px", md: "104px" },
    minWidth: { xs: "100px", md: "100px" },
  },
  logoImg: {
    width: "90px",
    height: "90px",
    "@media (max-width: 600px)": {
      textAlign: "center",
    },
  },
  historicHead: {
    color: "#2697FA",
    fontFamily: "Be Vietnam",
    fontSize: "18px",
    fontWeight: "500",
    lineHeight: "normal",
  },

  byFunnel: {
    color: "#787878 ",
    fontSize: "12px",
    marginTop: "3px",
    "@media (max-width: 600px)": {
      textAlign: "center",
    },
  },
  regularLicense: {
    color: "#787878 ",
    fontSize: "12px",
  },
  license: {
    color: "#2697FA",
    fontSize: "12px",
    fontWeight: 400,
    "@media (max-width: 600px)": {
      textAlign: "center",
    },
  },
  qty: {
    fontFamily: "Be Vietnam",
    fontSize: "14px",
    color: "#000000",
    textAlign: "center",
    "@media (max-width: 600px)": {
      textAlign: "center",
    },
  },
  price: {
    color: "var(--black, #000)",
    fontFamily: "Be Vietnam",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: "500",
    textAlign: "center",
    marginTop: "20px",
    "@media (max-width: 600px)": {
      textAlign: "center",
    },
  },
  total: {
    fontFamily: "Be Vietnam",
    fontSize: "24px",
    fontWeight: "100",
    textAlign: "center",
    marginTop: "20px",
  },
  checkOut: {
    borderRadius: "4px",
    background: "#50B948",

    textTransform: "capitalize",

    "&:hover": {
      background: "#50B948",
    },
    width: "273px",
    height: "46px",
    padding: "14px 34px",

    marginTop: "13px",
  },
  inputNumber: {
    width: "45px",
    height: "22px",
    textAlign: "center",
    fontSize: "14px",
    borderRadius: "1px",
    border: "1px solid #D9D9D9",
    background: " var(--new-bg-color, #ECECEC)",
    WebkitAppearance: "none",
    marginLeft: "5px",
  },
  productName: {
    color: "#2697FA",
    leadingTrim: "both",
    textEdge: "cap",
    fontFamily: "Be Vietnam Pro",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "normal",
    marginLeft: 3,
  },
  byUser: {
    fontFamily: "Be Vietnam Pro",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    color: "#959595",
  },
  withdrawCard: {
    backgroundColor: "#002046",
    borderRadius: "15px",
    boxShadow: "0 5px 5px rgba(0, 0, 0, 0.1)",
    width: "100%",
  },
  withdrawCardHeader: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    padding: "1.875rem 1.25rem",
  },
  thumb: {
    width: "70px",
    height: "70px",
    borderRadius: "8px",
    overflow: "hidden",
  },
  content: {
    width: "calc(100% - 70px)",
    paddingLeft: "1.25rem",
  },
  withdrawCardBody: {
    marginTop: "0.625rem",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    textAlign: "center",
  },
  btnBase: {
    color: "#fff",
    padding: "0.625rem 1.25rem",
  },
};

//   withdrawCard: {
//     maxWidth: "100%",
//     margin: "16px",
//   },
//   withdrawInfoList: {
//     listStyleType: "none",
//     padding: 0,
//   },
//   withdrawCardBody: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//
