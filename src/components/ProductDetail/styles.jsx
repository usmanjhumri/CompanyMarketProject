import Colors from "../colors";
const styles = {
  boxMargin: {
    marginBottom: "15px",
    marginTop: "15px",
  },
  productName: {
    fontSize: { md: "40px", sm: "20px" },
    marginBottom: "5px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "normal",
  },
  createdBy: {
    fontSize: { md: "16px", sm: "20px" },
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "normal",
    marginBottom: "10px",
  },
  boxDisplay: {
    display: "flex",
    alignItems: "center",
  },
  cardContentDisplay: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonDisplay: {
    background: Colors.primary,
    color: Colors.white,
    padding: "0.4rem 0.6rem",
    textTransform: "capitalize",
    width: "100%",
    fontFamily: "Be Vietnam Pro , sans-serif",
  },
  iconShareDisplay: {
    display: "flex",
    width: "20%",
    justifyContent: "space-around",
    alignItems: "center",
  },

  productPrice: {
    fontSize: { md: "20px", sm: "20px" },
  },
  priceTitle: {
    fontSize: { md: "24px", sm: "20px" },
    color: Colors.primary,
  },
  priceText: {
    fontSize: { md: "24px", sm: "20px" },
    color: Colors.black,
  },
  detailsText: {
    fontSize: { md: "12px" },
    color: Colors.black,
  },
  addCard: {
    width: "100%",
    background: Colors.secondary,
    textTransform: "capitalize",
    padding: "0.4rem 0.6rem",
    fontFamily: "Be Vietnam Pro , sans-serif",
  },
  productsInfoHeading: {
    leadingTrim: "both",
    textEdge: "cap",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "normal",
  },
};
export default styles;
