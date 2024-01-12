import color from "../colors";
const style = {
  button: {
    borderRadius: "4px",
    background: color.secondary,

    textTransform: "capitalize",

    "&:hover": {
      background: color.secondary,
    },

    color: "white",
    marginTop: "13px",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    color: color.black,
    padding: "50px",
    fontFamily: "Be Vietnam pro",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: "500",
    "&:hover": {
      color: ` ${color.black} !important`,
      background: "none !important",
    },
    background: "none !important",
    "&:visited": {
      color: `${color.primary} !important`,
    },
    "&.Mui-selected": {
      color: `${color.primary} !important`,
    },
    "&.Mui-selected:hover": {
      color: `${color.black} !important`,
    },
  },

  flexProfilePic: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },
};

export default style;
