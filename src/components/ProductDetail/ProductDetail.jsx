/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/jsx-key */
import { useEffect, useMemo, useState } from "react";

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
  Hidden,
  Checkbox,
  TextField,
} from "@mui/material";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { PiShoppingCartLight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
import { productDetail } from "../../Redux/api/api";
import { useParams } from "react-router-dom";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { Link } from "react-router-dom";
import "./ProductDetail.css";
const ProductDetail = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const params = useParams();
  const dispatch = useDispatch();

  const [checkedItems, setCheckedItems] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [pages, setPages] = useState(0);

  const product = useSelector((state) => state?.productDetail?.data?.product);
  const isLoading = useSelector((state) => state?.productDetail?.isLoading);
  const imgPath = useSelector((state) => state?.home?.imgPath);
  const moreProduct = useSelector(
    (state) => state?.productDetail?.data?.moreProducts
  );

  useEffect(() => {
    dispatch(productDetail(params));
  }, [dispatch, params]);

  useMemo(() => {
    if (product?.bumps?.length > 0) {
      product?.bumps?.forEach((item, index) => {
        if (item.name === "Extra Pages") {
          setPages(item.min_quantity);
        }
      });
    }
    setTotalPrice(product?.regular_price);
  }, [product]);

  useEffect(() => {
    console.log(checkedItems, totalPrice);
  }, [checkedItems]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 538, min: 0 },
      items: 1,
    },
  };

  const handleCheckboxChange = (index, price, name) => {
    setCheckedItems((prevCheckedItems) => {
      const checkingItem = {
        ...prevCheckedItems,
        [index]: !prevCheckedItems[index],
      };

      if (checkingItem[index]) {
        if (name === "Extra Pages") {
          setTotalPrice(Number(totalPrice) + Number(price) * pages);
        } else {
          setTotalPrice(Number(totalPrice) + Number(price));
        }
      } else {
        if (name === "Extra Pages") {
          setTotalPrice(Number(totalPrice) - Number(price) * pages);
        } else {
          setTotalPrice(Number(totalPrice) - Number(price));
        }
      }

      return checkingItem;
    });
  };

  const handlePageChange = (e, price, index, isChecked) => {
    const newPages = e.target.value;
    setPages(newPages);

    if (isChecked) {
      setTotalPrice((prevTotalPrice) => {
        const updatedPrice =
          prevTotalPrice - Number(price) * pages + Number(price) * newPages;
        return updatedPrice;
      });
    }
  };

  const CustomRight = ({ onClick }) => (
    <button className="arrow right" onClick={onClick} style={styles.arrowRight}>
      <GoChevronRight style={{ fontSize: "50px" }} />
    </button>
  );
  const CustomLeft = ({ onClick }) => (
    <button className="arrow left" onClick={onClick} style={styles.arrowLeft}>
      <GoChevronLeft style={{ fontSize: "50px" }} />
    </button>
  );
  return (
    <Box mt={3}>
      <Container maxWidth="100%">
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
                  in {product?.tag[0]}
                  <Typography variant="span">
                    <PiShoppingCartLight /> {product?.total_sell} Sales
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
                      defaultValue={product?.total_rating}
                      readOnly
                    />
                  </Typography>
                </Typography>
              </Box>
            </>
          )}
        </Box>
        <Grid
          container
          spacing={3}
          width="100%"
          sx={{ paddingLeft: { xs: "1.2rem", md: "0" } }}
        >
          <Grid item md={6} sm={12}>
            <Card sx={{ background: "#ECECEC" }}>
              <CardContent>
                {isLoading ? (
                  <Skeleton variant="rectangular" height={200} />
                ) : (
                  <Box className="image-type">
                    <Box className="img-container">
                      <Box
                        component="img"
                        src={`${imgPath}/${product?.image}`}
                        width="100%"
                        sx={{
                          borderRadius: "5px",
                          cursor: "pointer",
                          transition: "opacity 0.3s",
                        }}
                      />
                      <Box className="img-content">
                        <a
                          href={product?.demo_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={styles.onHoverImageTextStyle}
                        >
                          Live Preview
                        </a>
                      </Box>
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>

            <Hidden smDown>
              <Box mt={5}>
                <Typography variant="h5" sx={styles.moreProduct}>
                  More Products by JD Funnel Marketplace
                </Typography>
              </Box>
              <Carousel
                responsive={responsive}
                infinite
                containerClass="container-with-dots"
                itemClass="image-item"
                arrows
                autoPlaySpeed={3000}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                customRightArrow={<CustomRight />}
                customLeftArrow={<CustomLeft />}
              >
                {moreProduct?.length > 0 &&
                  moreProduct?.map((item, index) => (
                    <div style={{ marginLeft: 5, marginRight: 5 }} key={index}>
                      <Box sx={styles.BoxStyle}>
                        <Link
                          to={`/product/${item.category_id}/${item.name
                            .toLowerCase()
                            .replace(/[\s-]/g, "-")}/${item.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Box sx={styles.imgBoxDiv}>
                            <Box
                              component="img"
                              src={`${imgPath}/${item.image}`}
                              sx={styles.ImgStyle}
                              alt="Loading"
                            />
                          </Box>
                          <Typography mt={2} sx={styles.BoxTypo}>
                            {item.name}
                          </Typography>

                          <Typography mt={1} sx={styles.BoxTypo2}>
                            By {item.user?.username}
                          </Typography>

                          <Box mt={2} sx={{ display: "flex", gap: 2 }}>
                            <Typography sx={styles.PriceTypo}>
                              $ {Number(item.extended_price).toFixed(2)}
                            </Typography>
                            <Typography sx={styles.PriceTypo2}>
                              {" "}
                              $ {Number(item.regular_price).toFixed(2)}
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
                          <Typography sx={styles.SalesTypo}>
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
                              <Button sx={styles.BtnStyle}>Live Preview</Button>
                            </a>
                          </Box>
                        </Box>
                      </Box>
                    </div>
                  ))}
              </Carousel>
            </Hidden>
          </Grid>
          <Grid item md={6} sm={12}>
            <Card sx={{ background: "#ECECEC" }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={styles.priceTitle}>
                    {isLoading ? <Skeleton width={100} /> : "Regular License"}
                  </Typography>
                  <Typography sx={styles.priceText}>
                    {isLoading ? (
                      <Skeleton width={100} />
                    ) : (
                      `$${Number(totalPrice).toFixed(2)}`
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
                {product?.bumps?.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    {product?.bumps?.map((item, index) => (
                      <Box
                        sx={{
                          ...styles.productBumps,
                        }}
                      >
                        <Box
                          display="flex"
                          sx={{
                            alignItems: "center",

                            flexDirection: "column",
                          }}
                        >
                          <Box
                            display="flex"
                            sx={{ alignItems: "center", gap: 1 }}
                          >
                            <Checkbox
                              {...label}
                              sx={{ p: 0 }}
                              onChange={(e) =>
                                handleCheckboxChange(
                                  index,
                                  item.price,
                                  item.name
                                )
                              }
                            />
                            <Typography sx={styles.detailsText}>
                              {item.name}{" "}
                            </Typography>
                            {item.name === "Extra Pages" && (
                              <input
                                style={{
                                  width: "30.944px",
                                  height: "20px",
                                }}
                                value={pages}
                                type="number"
                                min={item.min_quantity}
                                pattern="\d*"
                                onChange={(e) =>
                                  handlePageChange(
                                    e,
                                    item.price,
                                    index,
                                    checkedItems[index]
                                  )
                                }
                              />
                            )}
                          </Box>
                        </Box>
                        <Typography sx={styles.detailsText}>
                          $ {item.price}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}

                <CardActions>
                  <Button variant="contained" sx={{ ...styles.addCard, mt: 3 }}>
                    Add to cart
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
            <Card sx={{ background: "#ECECEC", mt: 2 }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={styles.productsInfoHeading}>
                    {isLoading ? <Skeleton width={100} /> : "Last Update"}
                  </Typography>
                  <Typography sx={styles.detailsText}>
                    {isLoading ? (
                      <Skeleton width={100} />
                    ) : (
                      `${new Date(product?.user?.updated_at).toLocaleDateString(
                        "en-GB"
                      )}`
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
                      `${new Date(product?.user?.created_at).toLocaleDateString(
                        "en-GB"
                      )}`
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
                    {isLoading ? <Skeleton width={100} /> : "High Resolution"}
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
                    {isLoading ? <Skeleton width={100} /> : "Firefox,safari"}
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
                    {isLoading ? <Skeleton width={100} /> : "Well Documented"}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Hidden smUp>
            <Grid container sx={{ paddingLeft: { xs: "1.2rem", md: "auto" } }}>
              <Grid item xs={12} md={6}>
                <Box mt={5}>
                  <Typography sx={styles.moreProduct}>
                    More Products by JD Funnel Marketplace
                  </Typography>
                </Box>
                <Carousel
                  responsive={responsive}
                  infinite
                  containerClass="container-with-dots"
                  itemClass="image-item"
                  arrows
                  autoPlaySpeed={3000}
                  renderButtonGroupOutside={false}
                  renderDotsOutside={false}
                  customRightArrow={<CustomRight />}
                  customLeftArrow={<CustomLeft />}
                >
                  {moreProduct?.length > 0 &&
                    moreProduct?.map((item, index) => (
                      <div
                        style={{ marginLeft: 5, marginRight: 5 }}
                        key={index}
                      >
                        <Box sx={styles.BoxStyle}>
                          <Link
                            to={`/product/${item.category_id}/${item.name
                              .toLowerCase()
                              .replace(/[\s-]/g, "-")}/${item.id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <Box sx={styles.imgBoxDiv}>
                              <Box
                                component="img"
                                src={`${imgPath}/${item.image}`}
                                sx={styles.ImgStyle}
                                alt="Loading"
                              />
                            </Box>
                            <Typography mt={2} sx={styles.BoxTypo}>
                              {item.name}
                            </Typography>

                            <Typography mt={1} sx={styles.BoxTypo2}>
                              By {item.user?.username}
                            </Typography>

                            <Box mt={2} sx={{ display: "flex", gap: 2 }}>
                              <Typography sx={styles.PriceTypo}>
                                $ {Number(item.extended_price).toFixed(2)}
                              </Typography>
                              <Typography sx={styles.PriceTypo2}>
                                {" "}
                                $ {Number(item.regular_price).toFixed(2)}
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
                            <Typography sx={styles.SalesTypo}>
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
                                <Button sx={styles.BtnStyle}>
                                  Live Preview
                                </Button>
                              </a>
                            </Box>
                          </Box>
                        </Box>
                      </div>
                    ))}
                </Carousel>
              </Grid>
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetail;
