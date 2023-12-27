/* eslint-disable react/no-unescaped-entities */
import { Fragment, useState, useMemo } from "react";
import { Typography, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import Cards from "../Cards";
import { useSelector } from "react-redux";
import Styles from "./Styles";
const Subcategory = () => {
  const [products, setProducts] = useState([]);
  const params = useParams();
  const subCatgeoryProduct = useSelector((state) =>
    state?.home?.catergories.find((item) => params.category_id == item.id)
  );
  const isLoading = useSelector((state) => state.home.isLoading);
  useMemo(() => {
    const filterProduct = subCatgeoryProduct?.products.filter(
      (item) => item.sub_category_id == params.id
    );
    setProducts(filterProduct);
  }, [subCatgeoryProduct, params]);
  return (
    <Fragment>
      <Typography sx={Styles.CatHeading}>{params.name}</Typography>
      <Typography sx={Styles.CatSubHeading}>
        Designed to meet the diverse needs of entrepreneurs, creatives, and
        professionals alike, our Featured Products are more than just tools
        they're catalysts for success.
      </Typography>
      <Grid
        container
        sx={{
          maxWidth: { md: "100%", xs: "auto" },
          margin: "auto",
          marginTop: "4rem",
        }}
      >
        <Grid item md={12}>
          <Cards data={products} isLoading={isLoading} />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Subcategory;
