import React from "react";
import { Box, Button, Container, Grid, Typography, Link } from "@mui/material";
import CardStyle from "./styles";
import Skeleton from "react-loading-skeleton";
const Skeletoncard = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((item, index) => (
      <Grid item xs={12} md={4}>
        <Box sx={CardStyle.BoxStyle} key={index}>
          <Skeleton style={{ marginBottom: "0.4rem" }} height={100} />
          <Skeleton count={4} style={{ marginBottom: "0.4rem" }} />
        </Box>
      </Grid>
    ));
};

export default Skeletoncard;
