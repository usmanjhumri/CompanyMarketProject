import colors from "../colors";
const style = {
  mainBox: {
    display: "flex",
    width: { lg: "50%", md: "50%", sm: "70%", width: "90%" },
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  helpCenter: {
    fontSize: { md: "32px", sm: "28px", xs: "24px" },
    textAlign: "center",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "normal",
    color: colors.primary,
    margin: "10px 0px 10px 0px",
  },
  helpWelcome: {
    fontSize: { md: "40px", sm: "36px", xs: "28px" },
    textAlign: "center",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "normal",
    color: colors.white,
    margin: "10px 0px 10px 0px",
  },
  helpInstruction: {
    fontSize: { md: "16px", sm: "12px" },
    textAlign: "center",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: 1.8,
    color: colors.white,
    margin: "10px 0px 10px 0px",
  },
  faqHeading: {
    fontSize: { md: "40px", sm: "36px" },
    textAlign: "center",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "normal",
    color: colors.primary,
    margin: "10px 0px 10px 0px",
  },
  accordionRoot: {
    boxShadow: "0px 0px 15px 5px rgba(0, 0, 0, 0.05)",
    padding: "15px",
    marginBottom: "15px",
  },
  faqQuestion: {
    fontStyle: "normal",
    fontSize: "20px",
    fontWeight: 500,
    lineHeight: "normal",
    color: colors.primary,
  },
  faqAnswer: {
    fontStyle: "normal",
    fontSize: "18px",
    fontWeight: 400,
    lineHeight: "normal",
    color: colors.black,
  },
};

export default style;
