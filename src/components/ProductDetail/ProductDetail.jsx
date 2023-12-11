import React, { useMemo, useEffect, useState } from "react";

import {
  Container,
  Typography,
  Box,
  Grid,
  Rating,
  Card,
  CardActions,
  CardContent,
  Button,
  Skeleton,
} from "@mui/material";
// import { FaFacebookF } from "react-icons/fa6";
// import { FaTwitter } from "react-icons/fa6";
// import { FaPinterestP } from "react-icons/fa6";
// import { FaLinkedinIn } from "react-icons/fa6";
import { PiShoppingCartLight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
import { productDetail } from "../../Redux/api/api";
import { useParams } from "react-router-dom";
import { BorderClear } from "@mui/icons-material";
import { PhotoView } from "react-photo-view";

const ProductDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) => state?.productDetail?.data?.product);
  const isLoading = useSelector((state) => state?.productDetail?.isLoading);
  const imgPath = useSelector((state) => state?.home?.imgPath);

  useEffect(() => {
    dispatch(productDetail(params));
  }, [dispatch, params]);
  return (
    <Box sx={{ pl: 2, pr: 2 }}>
      <Container maxWidth="100%">
        <Grid container width="100%">
          <Grid item md={12}>
            <Box>
              {isLoading ? (
                <>
                  <Skeleton animation="wave" height={40} width="80%" />
                  <Skeleton animation="wave" height={20} width="50%" />
                  <Skeleton animation="wave" height={20} width="70%" />
                  <Skeleton animation="wave" height={20} width="30%" />
                </>
              ) : (
                <>
                  <Typography variant="h5" sx={styles.productName}>
                    {product?.name}
                  </Typography>
                  <Box>
                    <Typography
                      sx={{
                        ...styles.createdBy,
                        display: "inline-flex",
                        gap: "8px",
                        flexWrap: "wrap",
                      }}
                    >
                      By
                      <Typography variant="span" style={{ color: "#2697FA" }}>
                        {product?.user?.username}
                      </Typography>
                      in Tourism
                      <Typography variant="span">
                        <PiShoppingCartLight /> 111 Sales
                      </Typography>
                      <Typography
                        variant="span"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        Reviews
                        <Rating
                          size="small"
                          sx={{ ml: 1 }}
                          defaultValue={5}
                          readOnly
                        />
                      </Typography>
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
            <Grid container spacing={2}>
              <Grid md={6} sm={12} sx={{ paddingLeft: 2 }}>
                <Card sx={{ mt: 2, background: "#ECECEC" }}>
                  <CardContent sx={{ p: 0 }}>
                    {isLoading ? (
                      <Skeleton variant="rectangular" height={200} />
                    ) : (
                      <Box component="div">
                        <PhotoView src={`${imgPath}/${product?.image}`}>
                          <Box
                            component="img"
                            src={`${imgPath}/${product?.image}`}
                            width="100%"
                            sx={{
                              borderRadius: "5px",
                              cursor: "pointer",
                              transition: "opacity 0.3s", // Add a smooth transition for opacity change
                              "&:hover": {
                                opacity: 0.8, // Change this value to set the desired opacity on hover
                              },
                            }}
                          ></Box>
                        </PhotoView>
                      </Box>
                    )}
                  </CardContent>
                  <CardActions sx={{ p: 5, justifyContent: "center" }}>
                    <Box component="div" sx={{ width: "30%" }}>
                      <a href={product?.demo_link} target="_blank">
                        <Button variant="contained" sx={styles.buttonDisplay}>
                          Live Preview
                        </Button>
                      </a>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item md={6} sm={12}>
                <Card sx={{ background: "#ECECEC", mr: 2 }}>
                  <CardContent>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography sx={styles.priceTitle}>
                        {isLoading ? (
                          <Skeleton width={100} />
                        ) : (
                          "Regular License"
                        )}
                      </Typography>
                      <Typography sx={styles.priceText}>
                        {isLoading ? (
                          <Skeleton width={100} />
                        ) : (
                          `$${Number(product?.regular_price).toFixed(2)}`
                        )}
                      </Typography>
                    </Box>
                    <Box
                      component="hr"
                      sx={{ borderTop: "1px soild #D9D9D9" }}
                    ></Box>
                    <Typography sx={styles.detailsText}>
                      {isLoading ? (
                        <Skeleton height={20} width="80%" />
                      ) : (
                        "1. Quality Checked by JD Funnel Marketplace Future Updates 6 Months"
                      )}
                    </Typography>
                    <Typography sx={styles.detailsText}>
                      {isLoading ? (
                        <Skeleton height={20} width="50%" />
                      ) : (
                        "2. Future Updates"
                      )}
                    </Typography>
                    <Typography sx={styles.detailsText}>
                      {isLoading ? (
                        <Skeleton height={20} width="70%" />
                      ) : (
                        "3. 6 Months support from JD Funnel"
                      )}
                    </Typography>
                    <CardActions>
                      <Button
                        variant="contained"
                        sx={{ ...styles.addCard, mt: 3 }}
                      >
                        Add to cart
                      </Button>
                    </CardActions>
                  </CardContent>
                </Card>
                <Card sx={{ background: "#ECECEC", mr: 2, mt: 2 }}>
                  <CardContent>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography sx={styles.productsInfoHeading}>
                        {isLoading ? <Skeleton width={100} /> : "Last Update"}
                      </Typography>
                      <Typography sx={styles.detailsText}>
                        {isLoading ? (
                          <Skeleton width={100} />
                        ) : (
                          "3 December 2023"
                        )}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 3,
                      }}
                    >
                      <Typography sx={styles.productsInfoHeading}>
                        {isLoading ? <Skeleton width={100} /> : "Published"}
                      </Typography>
                      <Typography sx={styles.detailsText}>
                        {isLoading ? (
                          <Skeleton width={100} />
                        ) : (
                          "16 August 2012"
                        )}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 3,
                      }}
                    >
                      <Typography sx={styles.productsInfoHeading}>
                        {isLoading ? (
                          <Skeleton width={100} />
                        ) : (
                          "Gutenberg Optimized"
                        )}
                      </Typography>
                      <Typography sx={styles.detailsText}>
                        {" "}
                        {isLoading ? <Skeleton width={100} /> : "Yes"}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 3,
                      }}
                    >
                      <Typography sx={styles.productsInfoHeading}>
                        {isLoading ? (
                          <Skeleton width={100} />
                        ) : (
                          "High Resolution"
                        )}
                      </Typography>
                      <Typography sx={styles.detailsText}>
                        {" "}
                        {isLoading ? <Skeleton width={100} /> : "Yes"}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 3,
                      }}
                    >
                      <Typography sx={styles.productsInfoHeading}>
                        {isLoading ? <Skeleton width={100} /> : "Widget Ready"}
                      </Typography>
                      <Typography sx={styles.detailsText}>
                        {" "}
                        {isLoading ? <Skeleton width={100} /> : "Yes"}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 3,
                      }}
                    >
                      <Typography sx={styles.productsInfoHeading}>
                        {isLoading ? (
                          <Skeleton width={100} />
                        ) : (
                          "Compatible Browsers"
                        )}
                      </Typography>
                      <Typography sx={styles.detailsText}>
                        {isLoading ? (
                          <Skeleton width={100} />
                        ) : (
                          "Firefox,safari"
                        )}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 3,
                      }}
                    >
                      <Typography sx={styles.productsInfoHeading}>
                        {isLoading ? <Skeleton width={100} /> : "Columns"}
                      </Typography>
                      <Typography sx={styles.detailsText}>
                        {isLoading ? <Skeleton width={100} /> : "4"}+
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 3,
                      }}
                    >
                      <Typography sx={styles.productsInfoHeading}>
                        {isLoading ? <Skeleton width={100} /> : "Sections"}
                      </Typography>
                      <Typography sx={styles.detailsText}>
                        {isLoading ? <Skeleton width={100} /> : "15+"}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 3,
                      }}
                    >
                      <Typography sx={styles.productsInfoHeading}>
                        {isLoading ? <Skeleton width={100} /> : " Layout"}
                      </Typography>
                      <Typography sx={styles.detailsText}>
                        {isLoading ? <Skeleton width={100} /> : "Responsive"}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 3,
                      }}
                    >
                      <Typography sx={styles.productsInfoHeading}>
                        {isLoading ? <Skeleton width={100} /> : "Documentation"}
                      </Typography>
                      <Typography sx={styles.detailsText}>
                        {isLoading ? (
                          <Skeleton width={100} />
                        ) : (
                          "Well Documented"
                        )}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetail;
