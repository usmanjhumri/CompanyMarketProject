/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-unescaped-entities */

import { useEffect } from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import AuthStyle from "./styles";
import { PiShoppingCartLight } from "react-icons/pi";
// import AuthcartArray from "./AuthorCartArray";
import "react-loading-skeleton/dist/skeleton.css";
import Aos from "aos";
import { useSelector } from "react-redux";
import Skeletoncard from "../Skeletoncard";
const AuthsItem = () => {
  const authorProduct = useSelector((state) => state?.home?.authorProduct);
  const isLoading = useSelector((state) => state?.home?.isLoading);
  useEffect(() => {
    Aos.init({ duration: 2000 });
  });
  return (
    <Box sx={AuthStyle.mainBox}>
      <Container maxWidth="100%">
        <Typography sx={AuthStyle.AuthTypo} data-aos="fade-down">
          Best Author's items
        </Typography>
        <Typography sx={AuthStyle.AuthTypo2} data-aos="fade-up">
          Discover the Pinnacle of Authorship: Our Best Selections
        </Typography>

        <Grid container spacing={3}  >
          {authorProduct?.map((item, ind) => {
            return (
              <Grid item xs={12} md={4} key={ind}>
                <Box sx={AuthStyle.BoxStyle}>
                  <Box
                    component="img"
                    src={`https://marketplace.jdfunnel.com/assets/images/product/${item.image}`}
                    sx={AuthStyle.ImgStyle}
                    alt="Loading"
                  />
                  <Typography mt={2} sx={AuthStyle.BoxTypo}>
                    {item.name}
                  </Typography>

                  <Typography mt={1} sx={AuthStyle.BoxTypo2}>
                    By {item.user.username}
                  </Typography>

                  <Box mt={2} sx={{ display: "flex", gap: 2 }}>
                    <Typography sx={AuthStyle.PriceTypo}>
                      {item.pricetitle}
                    </Typography>
                    <Typography sx={AuthStyle.PriceTypo2}>
                      {item.pricetitle2}
                    </Typography>
                  </Box>

                  <Box
                    mt={4}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography sx={AuthStyle.SalesTypo}>
                      {item.salestitle}
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
                        <Button sx={AuthStyle.BtnStyle}>Live Preview</Button>
                      </a>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            );
          })}
          {isLoading && authorProduct.length === 0 && (
            <>
              <Skeletoncard cards={8} />
            </>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default AuthsItem;
