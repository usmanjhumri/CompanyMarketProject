/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect } from "react";
import Cards from "../Cards";
import Styles from "./Styles";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../Redux/api/api";
import style from "../Cards/Styles";
const AllProducts = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state?.allProducts?.getProducts);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);
  return (
    <Fragment>
      <Typography sx={Styles.AuthTypo}>Our All Products</Typography>
      <Typography sx={Styles.AuthTypo2}>
        Designed to meet the diverse needs of entrepreneurs, creatives, and
        professionals alike, our Featured Products are more than just tools 
        they're catalysts for success.
      </Typography>
      <Cards data={data} />
    </Fragment>
  );
};

export default AllProducts;
