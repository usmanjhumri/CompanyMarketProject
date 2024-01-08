import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import style from "./styles";
function BackgroundImage({ bgImg, children }) {
  const BGImg = `url(${bgImg})`;
  return (
    <div>
      <Box style={{ ...style.backgroundImg, backgroundImage: BGImg }}>
        <Box style={style.backgroundImgColor}>{children}</Box>
      </Box>
    </div>
  );
}

export default BackgroundImage;
