/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/prop-types */

import { Box, Button, Grid, Typography } from "@mui/material";
import "./categories.css";
import CategoriesStyle from "./style";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { order_number } from "../../Const/CONST";
export default function MostSellCategoriesData({ filterProduct }) {
  const imgPath = useSelector((state) => state?.home?.imgPath);

  const [orderNumber, setOrderNumber] = useState("");
  useEffect(() => {
    const orderNumber = localStorage.getItem(order_number);
    const id = localStorage.getItem("id");
    setOrderNumber(id ? id : orderNumber ? orderNumber : "");
  }, []);

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ width: { md: "90%", xs: "auto" } }}
        margin="auto"
      >
        {filterProduct?.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Box sx={CategoriesStyle.BoxStyle}>
              <Link
                to={`/product/${item.category_id}/${item.name
                  .toLowerCase()
                  .replace(/[\s-]/g, "-")}/${item.id}/${orderNumber}`}
                style={{ textDecoration: "none" }}
              >
                <Box sx={CategoriesStyle.imgBoxDiv}>
                  <Box
                    component="img"
                    src={`${imgPath}/${item.image}`}
                    sx={CategoriesStyle.ImgStyle}
                  />
                </Box>

                <Typography mt={2} sx={CategoriesStyle.BoxTypo}>
                  {item.name}
                </Typography>

                <Box mt={2} sx={{ display: "flex", gap: 2 }}>
                  <Typography sx={CategoriesStyle.PriceTypo}>
                    <strike>${Number(item.extended_price).toFixed(2)}</strike>
                  </Typography>
                  <Typography sx={CategoriesStyle.PriceTypo2}>
                    ${Number(item.regular_price).toFixed(2)}
                  </Typography>
                </Box>
              </Link>
              <Box
                mt={4}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={CategoriesStyle.SalesTypo}>
                  {item.total_sell} Sales
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <a href={item.demo_link} target="_blank">
                    <Button sx={CategoriesStyle.BtnStyle}>Live Preview</Button>
                  </a>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
