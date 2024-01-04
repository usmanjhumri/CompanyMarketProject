import Colors from "../colors";
const subCategoriesStyle = {
  CatHeading: {
    fontWeight: 600,
    fontSize: { md: "32px", xs: "20px" },
    color: Colors.primary,
    fontFamily: "Be Vietnam Pro , sans-serif",
    lineHeight: "35.06px",
    textAlign: "center",
    margin: { md: "2rem 0px", xs: "auto" },
    textTransform: "capitalize",
  },
  CatSubHeading: {
    fontWeight: 500,
    fontSize: { md: "16px", xs: "12px" },
    color: Colors.black,
    fontFamily: "Be Vietnam Pro , sans-serif",
    textAlign: "center",
    maxWidth: "650px",
    margin: "0.8rem auto",
  },
  SubCatHeading: {
    fontWeight: 500,
    fontSize: { lg: "22px", md: "18px", xs: "12px" },
    color: Colors.black,
    textAlign: "center",
    maxWidth: "650px",
    margin: "0.8rem auto",
  },
  CheckBoxLabel: {
    fontWeight: 500,
    fontSize: { md: "14px", xs: "12px" },
  },

  categoriesStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid rgb(223, 230, 233)",
    marginLeft: "30px",
    justifyContent: "center",
  },
  filterRefine: {
    background: Colors.secondary,
    color: "white",
    height: "50px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Be Vietnam Pro , sans-serif",
    fontSize: "24px",
    fontWeight: 500,
  },
  formCenter: {
    flexDirection: { md: "column", xs: "row" },
    paddingLeft: { xs: "20px" },
    alignItems: "flex-start",
  },
};

export default subCategoriesStyle;
