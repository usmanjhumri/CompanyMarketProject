import React from "react";
import { PiShoppingCartLight } from "react-icons/pi";
import { Box, Button, Grid, Typography, Container } from "@mui/material";
import Styles from "./Styles";
import SkeletonCard from "../Skeletoncard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cards = ({ data, isLoading }) => {
  const imgPath = useSelector((state) => state?.home?.imgPath);
  return (
    <Box sx={Styles.mainBox}>
      <Container maxWidth="100%">
        <Grid container spacing={3}>
          {data?.map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box sx={Styles.BoxStyle}>
                <Link
                  to={`/product/${item.category_id}/${item.name
                    .toLowerCase()
                    .replace(/[\s-]/g, "-")}/${item.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Box sx={Styles.imgBoxDiv}>
                    <Box
                      component="img"
                      src={`${imgPath}/${item.image}`}
                      sx={Styles.ImgStyle}
                      alt="Loading"
                    />
                  </Box>
                  <Typography mt={2} sx={Styles.BoxTypo}>
                    {item.name}
                  </Typography>

                  <Typography mt={1} sx={Styles.BoxTypo2}>
                    By {item.user?.username}
                  </Typography>

                  <Box mt={2} sx={{ display: "flex", gap: 2 }}>
                    <Typography sx={Styles.PriceTypo}>
                      $ {Number(item.extended_price).toFixed(2)}
                    </Typography>
                    <Typography sx={Styles.PriceTypo2}>
                      {" "}
                      $ {Number(item.regular_price).toFixed(2)}
                    </Typography>
                  </Box>
                </Link>

                <Box
                  mt={4}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography sx={Styles.SalesTypo}>
                    {item.total_sell} Sales
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <PiShoppingCartLight
                      style={{
                        padding: "0.6rem",
                        border: "1px solid #787878",
                        borderRadius: "2px",
                        color: "#787878",
                      }}
                    />

                    <a href={item.demo_link} target="_blank">
                      <Button sx={Styles.BtnStyle}>Live Preview</Button>
                    </a>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
          {isLoading && <SkeletonCard cards={20} />}
          {!data?.length && !isLoading && (
            <Typography sx={Styles.CardTypo}>No Product Found</Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Cards;
