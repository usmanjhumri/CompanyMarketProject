import Colors from "../colors";
const styles = {
  backgroundImg: {
    marginBottom: 30,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "800px",
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
    position: "relative",
    height: "800px",

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
};

export default styles;
