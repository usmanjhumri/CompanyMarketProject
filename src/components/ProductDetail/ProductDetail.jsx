/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
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
  FormControl,
  OutlinedInput,
  MenuItem,
  Select,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { PiShoppingCartLight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { resetSuccessCart } from "../../Redux/Slice/addtocart";
import styles from "./styles";
import { productDetail, addToCart } from "../../Redux/api/api";
import { useParams } from "react-router-dom";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./ProductDetail.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

const Licenese = ["Regular License", "Extended License"];
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ProductDetail = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const params = useParams();
  const dispatch = useDispatch();

  const [checkedItems, setCheckedItems] = useState([]);
  const [pages, setPages] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [extraPages, setExtraPages] = useState(0);
  const [LicenseType, setLicenseType] = useState(Licenese[0]);
  const [LinceseIndex, setLinceseIndex] = useState(1);
  const [bumpFee, setBumpfee] = useState(0);
  const [bumps, setBumps] = useState([]);
  const [products, setProducts] = useState([]);

  const product = useSelector((state) => state?.productDetail?.data?.product);
  const isLoading = useSelector((state) => state?.productDetail?.isLoading);
  const isLoadingCart = useSelector((state) => state?.addtocart?.isLoading);
  const imgPath = useSelector((state) => state?.home?.imgPath);
  const successCart = useSelector((state) => state?.addtocart?.success);
  const moreProduct = useSelector(
    (state) => state?.productDetail?.data?.moreProducts
  );
  const encrypted_id = useSelector(
    (state) => state?.productDetail?.data.encrypted_id
  );

  useEffect(() => {
    dispatch(productDetail(params));
  }, [dispatch, params]);

  useMemo(() => {
    if (product?.bumps?.length > 0) {
      let newBumps = [];
      product?.bumps?.forEach((item, index) => {
        if (item.name === "Extra Pages") {
          setExtraPages(item.min_quantity);
        }
        newBumps.push(item.price);
      });
    }
    setTotalPrice(product?.regular_price);
    setProducts(product?.bumps);
  }, [product]);

  useEffect(() => {
    if (successCart) {
      toast.success("Item added to your cart");
      dispatch(resetSuccessCart());
    }
  }, [successCart]);

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
    const bump = products[index];
    setBumps((prevBumps) => {
      const newBumps = [...prevBumps];
      if (!prevBumps[index]) {
        newBumps[index] = bump.price;
      } else {
        newBumps.splice(index, 1);
      }
      return newBumps;
    });
    setPages((prevPages) => {
      const newPages = [...prevPages];
      if (!prevPages[index]) {
        newPages[index] = bump.min_quantity;
      } else {
        newPages.splice(index, 1);
      }
      return newPages;
    });
    setCheckedItems((prevCheckedItems) => {
      const checkingItem = {
        ...prevCheckedItems,
        [index]: !prevCheckedItems[index],
      };

      if (checkingItem[index]) {
        setBumps((state) => [...state, price]);
        setBumpsPages((state) => [...state, min]);

        if (name === "Extra Pages") {
          setTotalPrice(Number(totalPrice) + Number(price) * extraPages);
          setBumpfee(bumpFee + Number(price) * extraPages);
        } else {
          setTotalPrice(Number(totalPrice) + Number(price));
          setBumpfee(Number(price));
        }
      } else {
        setBumps((state) => state.filter((item) => item !== price));
        setBumpsPages((state) => state.filter((item) => item !== min));
        if (name === "Extra Pages") {
          setTotalPrice(Number(totalPrice) - Number(price) * extraPages);
          setBumpfee(bumpFee - Number(price) * extraPages);
        } else {
          setTotalPrice(Number(totalPrice) - Number(price));
          setBumpfee(bumpFee - Number(price));
        }
      }

      return checkingItem;
    });
  };

  const handlePageChange = (e, price, isChecked) => {
    const newPages = e.target.value;
    setExtraPages(newPages);
    let addPages;

    const updatedProducts = products.map((item) => {
      if (item.name === "Extra Pages") {
        addPages = newPages;
        return { ...item, min_quantity: newPages };
      }
      return item;
    });

    setProducts(updatedProducts);
    if (isChecked) {
      if (pages[1]) {
        pages[1] = addPages;
      }
      setTotalPrice((prevTotalPrice) => {
        const updatedPrice =
          prevTotalPrice -
          Number(price) * extraPages +
          Number(price) * newPages;
        return updatedPrice;
      });
      setBumpfee((prevTotalPrice) => {
        const updatedPrice =
          prevTotalPrice -
          Number(price) * extraPages +
          Number(price) * newPages;
        return updatedPrice;
      });
    }
  };

  const theme = useTheme();

  const handleLicenseChange = (event) => {
    const {
      target: { value },
    } = event;

    let initialPrice = 0;
    if (value.includes("Regular License")) {
      initialPrice += Number(product?.regular_price);
    }
    if (value.includes("Extended License")) {
      initialPrice += Number(product?.extended_price);
    }

    let updatedTotalPrice = initialPrice;
    Object.keys(checkedItems).forEach((index) => {
      const isChecked = checkedItems[index];
      console.log(isChecked, " checked");
      const bump = product?.bumps[index];

      if (isChecked) {
        if (bump.name === "Extra Pages") {
          updatedTotalPrice += Number(bump.price) * extraPages;
        } else {
          updatedTotalPrice += Number(bump.price);
        }
      }
    });

    setTotalPrice(updatedTotalPrice);
    setLicenseType(typeof value === "string" ? value.split(",") : value);
  };
  const handleLicenseIndex = (e, index) => {
    setLinceseIndex(index + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const order_number = window.localStorage.getItem("order_Number");
    if (product?.bumps?.length > 0) {
      const formData = {
        _token: "BNiq5lIb9RM11nI6MvODcZCcWMyksqkayrN0A3G0",
        product_id: encrypted_id,
        bump_fee: bumpFee,
        license: LinceseIndex,
        bump: bumps,
        pages,
        ...(order_number && { order_number: order_number }),
      };
      dispatch(addToCart(formData));
    } else {
      const formData = {
        _token: "BNiq5lIb9RM11nI6MvODcZCcWMyksqkayrN0A3G0",
        product_id: encrypted_id,
        bump_fee: bumpFee,
        license: LinceseIndex,
        ...(order_number && { order_number: order_number }),
      };
      dispatch(addToCart(formData));
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
                <form onSubmit={handleSubmit}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <FormControl sx={{ display: "flex" }}>
                      <Select
                        displayEmpty
                        value={LicenseType}
                        onChange={(e) => handleLicenseChange(e)}
                        input={
                          <OutlinedInput
                            sx={{ ...styles.licenseName, minWidth: "300px" }}
                          />
                        }
                        MenuProps={MenuProps}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        {Licenese.map((name, index) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, LicenseType, theme)}
                            data-index={index}
                            onClick={(e) => handleLicenseIndex(e, index)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

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
                                    item.name,
                                    item.min_quantity
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
                                  value={extraPages}
                                  type="number"
                                  min={item.min_quantity}
                                  pattern="\d*"
                                  onChange={(e) =>
                                    handlePageChange(
                                      e,
                                      item.price,

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
                    <Button
                      variant="contained"
                      sx={{ ...styles.addCard, mt: 3 }}
                      type="submit"
                      disabled={isLoadingCart}
                    >
                      {isLoadingCart ? "Adding into cart" : "Add to cart"}
                    </Button>
                    <ToastContainer />
                  </CardActions>
                </form>
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
