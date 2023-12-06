/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-unescaped-entities */

import { useEffect } from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import AuthStyle from "./styles";
import { PiShoppingCartLight } from "react-icons/pi";
// import AuthcartArray from "./AuthorCartArray";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import Skeletoncard from "../Skeletoncard";
import Card from "../Cards";
const AuthsItem = () => {
  const authorProduct = useSelector((state) => state?.home?.authorProduct);
  const isLoading = useSelector((state) => state?.home?.isLoading);

  return (
    <Box sx={AuthStyle.mainBox}>
      <Container maxWidth="100%" sx={{ maxWidth: { md: "90%", xs: "auto" } }}>
        <Typography sx={AuthStyle.AuthTypo}>Best Author's items</Typography>
        <Typography sx={AuthStyle.AuthTypo2}>
          Discover the Pinnacle of Authorship: Our Best Selections
        </Typography>
        <Card data={authorProduct} isLoading={isLoading} />
      </Container>
    </Box>
  );
};

export default AuthsItem;
