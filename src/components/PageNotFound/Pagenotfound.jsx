
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./styles";
const Pagenotfound = () => {
  return (
    <Box sx={styles.mainBox}>
      <Typography variant="h2" sx={{ color: "black", mt: 2 }}>
        This page could not be found (404)
      </Typography>
      <img
        src="https://i.imgur.com/qIufhof.png"
        alt="Page Not Found"
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <Link to="/">
        <Button variant="contained">Back to Home</Button>
      </Link>
    </Box>
  );
};

export default Pagenotfound;
