import BackgroundImage from "../../assets/aboutus.png";
import Colors from "../colors";
const styles = {
  textHeading: {
    fontFamily: "Be Vietnam Pro,sans-serif",
    fontStyle: "normal",
    fontWeight: 500,
    textAlign: "left",
    fontSize: 40,
    color: Colors.primary,
    width: { md: "630px", xs: "auto" },

    "@media (min-width: 600px)": {
      // Adjust styles for screens with a minimum width of 600px
      fontSize: "36px",
    },
    "@media (min-width: 960px)": {
      // Adjust styles for screens with a minimum width of 960px
      fontSize: "36px",
    },
    "@media (max-width: 500px)": {
      // Adjust styles for screens with a minimum width of 960px
      fontSize: "20px",
    },
    marginBottom: 2,
  },
  textHeading2: {
    fontFamily: "Be Vietnam Pro,sans-serif",
    fontStyle: "normal",
    fontWeight: 500,
    textAlign: "center",
    fontSize: 40,
    color: Colors.white,
    width: { md: "630px", xs: "auto" },

    "@media (min-width: 600px)": {
      // Adjust styles for screens with a minimum width of 600px
      fontSize: "36px",
    },
    "@media (min-width: 960px)": {
      // Adjust styles for screens with a minimum width of 960px
      fontSize: "36px",
    },
    "@media (max-width: 500px)": {
      // Adjust styles for screens with a minimum width of 960px
      fontSize: "20px",
    },
    marginBottom: 3,
  },
  textParagraph: {
    color: Colors.white,
    fontFamily: "Be Vietnam Pro,sans-serif",
    fontStyle: "normal",
    fontWeight: 400,
    textAlign: "center",
    "@media (min-width: 600px)": {
      // Adjust styles for screens with a minimum width of 600px
      fontSize: "16px",
    },
    "@media (minWidth: 960px)": {
      // Adjust styles for screens with a minimum width of 960px
    },
    "@media (max-width: 500px)": {
      // Adjust styles for screens with a minimum width of 960px
      fontSize: "16px",
      margin: "0px 3px",
    },
  },
  textCenter: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    width: "100%",
    flexDirection: "column",
  },
};

export default styles;
