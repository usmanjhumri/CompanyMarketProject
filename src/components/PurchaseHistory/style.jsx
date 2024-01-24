import Colors from "../colors";
const TableStyle = {
  tbContainer: {
    overflowX: "auto",
  },
  Table: {
    width: "100%",
    minWidth: 700,
    boxShadow: "0px 0px 4px 2px rgba(0, 0, 0, 0.5)",
  },
  tbHeadRow: {
    background: "#F8F9FA",
  },
  tbHeadCell: {
    color: "#2697FA",
    fontFamily: "Be Vietnam pro",
    fontSize: "16px",
    fontWeight: "400",
    width: "10%",
  },
  tableBodyCell: {
    fontFamily: "Be Vietnam pro",
    fontSize: "12px",
    color: "#000",
    fontWeight: "400",
  },
  tbBodyYesButton: {
    borderRadius: "4px",
    background: "#50B948",
    fontFamily: "Be Vietnam pro",
    fontSize: "14px",
    color: "#fff",
    border: "none",
    padding: "7px 15px",
    fontWeight: "400",
    textTransform: "capitalize",
    cursor: "text !important",

    "&:hover": {
      background: "#50B948",
    },
  },
  tbBodyPurchseButton: {
    borderRadius: "4px",
    background: "#50B948",
    fontFamily: "Be Vietnam pro",
    fontSize: "14px",
    color: "#fff",
    border: "none",
    padding: "7px 15px",
    fontWeight: "400",
    textTransform: "capitalize",

    "&:hover": {
      background: "#50B948",
    },
  },
  AuthTypo: {
    fontWeight: 600,
    fontSize: { md: "32px", xs: "20px" },
    color: Colors.primary,
    fontFamily: "Be Vietnam Pro , sans-serif",
    lineHeight: "35.06px",
    textAlign: "center",
    margin: { md: "2rem 0px", xs: "auto" },
  },
};

export default TableStyle;
