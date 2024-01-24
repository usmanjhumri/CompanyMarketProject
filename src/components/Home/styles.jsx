import Colors from "../colors";
import BackgroundImage from "../../assets/background.png";
const styles = {
  backgroundImg: {
    background: `url(${BackgroundImage}) lightgray 50% / cover no-repeat`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "714px", // Set a default height for the container
    position: "relative",
    "&::before": {
      content: '""',
      display: "block",
      paddingTop: "56.25%", // 16:9 aspect ratio (adjust as needed)
    },
    "@media (minWidth: 600px)": {
      // Adjust styles for screens with a minimum width of 600px
      height: "400px",
    },
    "@media (minWidth: 960px)": {
      // Adjust styles for screens with a minimum width of 960px
      height: "500px",
    },
    // Add more media queries for other screen sizes
  },
  backgroundImgColor: {
    background: "rgba(0, 0, 0, 0.80)",
    height: "714px", // Set a default height for the container
    position: "relative",
    "&::before": {
      content: '""',
      display: "block",
      paddingTop: "56.25%", // 16:9 aspect ratio (adjust as needed)
    },
    "@media (minWidth: 600px)": {
      // Adjust styles for screens with a minimum width of 600px
      height: "400px",
    },
    "@media (minWidth: 960px)": {
      // Adjust styles for screens with a minimum width of 960px
      height: "500px",
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  textHeading: {
    color: Colors.white,
    fontFamily: "Be Vietnam Pro,sans-serif",
    fontStyle: "normal",
    fontWeight: 500,
    textAlign: "center",
    fontSize: 40,
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
  buttonText: {
    margin: "4px",
    fontFamily: "Be Vietnam Pro,sans-serif",
    fontSize: "16px",
    textTransform: "none",
    backgroundColor: Colors.primary,
  },
  sliderBoxDiv: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginTop: "-50px",
  },

  sliderOuterCard: {
    width: "1104px",
    height: "374px",
    flexShrink: "0",
    borderRadius: "15px",
    background: "#FFF",
    boxShadow: " 0px 0px 20px 1px rgba(0, 0, 0, 0.15)",
    zIndex: "1",
    margintop: "",
  },

  innerCardDisplay: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "40px",
    marginBottom: "40px",
  },
  innerCardDisplaySwiper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "40px",
    marginBottom: "40px",
    opacity: "1",
  },
  InnerCardStyle: {
    borderRadius: "10px",
    background: "#F8F9FA",
    minWidth: "200px",
    minHeight: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  InnerCardStyleActive: {
    borderRadius: "10px",
    background: Colors.primary,
    minWidth: "200px",
    width: "100%",
    minHeight: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 10px",
  },

  cardText: {
    fontFamily: "Be Vietnam Pro,sans-serif",
    fontSize: "16px",
    marginTop: "10px",
  },
  cardTextActive: {
    fontFamily: "Be Vietnam Pro,sans-serif",
    fontSize: "16px",
    color: Colors.white,
    marginTop: "10px",
  },

  cardContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  silderHeading: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "Be Vietnam Pro,sans-serif",
    color: Colors.primary,
    fontWeight: "500",
    "@media (max-width: 500px)": {
      // Adjust styles for screens with a minimum width of 960px
      fontSize: "25px",
      padding: "0px 2px",
    },
  },
  shadowDiv: {
    display: "flex",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, rgba(254,254,254,1) 0%, rgba(255,255,255,0) 50%, rgba(254,254,254,1) 100%)",
  },
};

export default styles;
