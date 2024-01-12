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
import { order_number as orderNumber, order_number } from "../../Const/CONST";
import Cards from "../Cards";
import "react-multi-carousel/lib/styles.css";
import { PiShoppingCartLight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { resetSuccessCart } from "../../Redux/Slice/addtocart";
import styles from "./styles";
import { productDetail, addToCart, getCart } from "../../Redux/api/api";
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

const Licenese = ["Regular License"];
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

  const [checkedItems, setCheckedItems] = useState({});
  const [pages, setPages] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [extraPages, setExtraPages] = useState(0);
  const [LicenseType, setLicenseType] = useState(Licenese[0]);
  const [LinceseIndex, setLinceseIndex] = useState(1);
  const [bumpFee, setBumpfee] = useState(0);
  const [bumps, setBumps] = useState([]);
  const [products, setProducts] = useState([]);
  const [updateCartText, setUpdateCartText] = useState(false);

  const product = useSelector((state) => state?.productDetail?.data?.product);
  const isLoading = useSelector((state) => state?.productDetail?.isLoading);
  const isLoadingCart = useSelector((state) => state?.addtocart?.isLoading);
  const { isError, errorMessage } = useSelector((state) => state?.addtocart);
  const inCart = useSelector((state) => state?.productDetail?.inCart);
  const imgPath = useSelector((state) => state?.home?.imgPath);
  const successCart = useSelector((state) => state?.addtocart?.success);
  const moreProduct = useSelector(
    (state) => state?.productDetail?.data?.moreProducts
  );
  const encrypted_id = useSelector(
    (state) => state?.productDetail?.data.encrypted_id
  );
  const oldOrder = useSelector((state) => state?.productDetail?.oldOrder);

  useEffect(() => {
    dispatch(productDetail(params));
  }, [params]);

  useEffect(() => {
    let newBumps = [];
    let newCheckedItems = {};

    if (oldOrder?.bumpresponses?.length > 0) {
      setBumpfee(Number(oldOrder.bump_fee));
      oldOrder.bumpresponses.forEach((item, index) => {
        setPages((prevPages) => {
          const newBumps = { ...prevPages };
          if (!newBumps[item.bump_id]) {
            // Assign the value instead of deleting the entry
            newBumps[item.bump_id] = Number(item.pages);
          } else {
            // Update the value instead of deleting the entry
            newBumps[item.bump_id] = Number(item.pages);
          }
          const filteredBumps = Object.values(newBumps).filter(
            (value) => value !== undefined
          );

          return filteredBumps.length > 0 ? newBumps : {};
        });
        setBumps((prevBumps) => {
          const newBumps = { ...prevBumps };
          if (!newBumps[item.bump_id]) {
            // Assign the value instead of deleting the entry
            newBumps[item.bump_id] = Number(item.bump_id);
          } else {
            // Update the value instead of deleting the entry
            newBumps[item.bump_id] = Number(item.bump_id);
          }
          const filteredBumps = Object.values(newBumps).filter(
            (value) => value !== undefined
          );

          return filteredBumps.length > 0 ? newBumps : {};
        });

        if (item.bump.name.trim() === "Extra Pages") {
          setExtraPages(item.pages);
        }

        newBumps.push(Number(item.price));
        newCheckedItems = {
          ...newCheckedItems,
          [item.bump.id]: true,
        };
      });
      setLicenseType(Licenese[oldOrder?.license - 1]);

      setCheckedItems(newCheckedItems);

      setTotalPrice(Number(oldOrder.total_price).toFixed(2));
    } else if (product?.bumps?.length > 0) {
      setBumpfee(Number(0));
      product.bumps.forEach((item, index) => {
        if (item.name.trim() === "Extra Pages") {
          setExtraPages(item.min_quantity);
        }
        newBumps.push(item.price);
        newCheckedItems = {
          ...newCheckedItems,
          [index]: false,
        };
      });
      setCheckedItems(newCheckedItems);
      setTotalPrice(product.regular_price);
      setPages({});
      setBumps({});
    } else if (oldOrder?.bumpresponses?.length === 0) {
      setTotalPrice(Number(oldOrder?.total_price).toFixed(2));
      setLicenseType(Licenese[oldOrder?.license - 1]);
    } else {
      setLicenseType(Licenese[0]);
      setTotalPrice(product?.regular_price);
    }

    setProducts(product?.bumps);
  }, [oldOrder, product]);

  useEffect(() => {
    const order_number = window.localStorage.getItem(orderNumber);
    const id = window.localStorage.getItem("id");
    if (successCart) {
      toast.success("Item added to your cart");
      dispatch(resetSuccessCart());
      dispatch(getCart(id ? id : order_number));
      setUpdateCartText(true);
    } else if (isError) {
      toast.error("Something went wrong!");
      dispatch(resetSuccessCart());
    }
  }, [successCart, isError]);

  const handleCheckboxChange = (index, price, name, id) => {
    const bump = products[index];
    setBumps((prevBumps) => {
      const newBumps = { ...prevBumps };

      if (!newBumps[bump.id]) {
        newBumps[bump.id] = Number(bump.price);
      } else {
        delete newBumps[bump.id];
      }

      // Filter out undefined values
      const filteredBumps = Object.values(newBumps).filter(
        (value) => value !== undefined
      );

      return filteredBumps.length > 0 ? newBumps : {};
    });
    setPages((prevPages) => {
      const newBumps = { ...prevPages };
      if (!newBumps[bump.id]) {
        newBumps[bump.id] = Number(bump.min_quantity);
      } else {
        delete newBumps[bump.id];
      }
      const filteredBumps = Object.values(newBumps).filter(
        (value) => value !== undefined
      );

      return filteredBumps.length > 0 ? newBumps : {};
    });
    setCheckedItems((prevCheckedItems) => {
      const checkingItem = {
        ...prevCheckedItems,
        [id]: !prevCheckedItems[id],
      };

      if (checkingItem[id]) {
        if (name.trim() === "Extra Pages") {
          setTotalPrice(Number(totalPrice) + Number(price) * extraPages);
          setBumpfee(bumpFee + Number(price) * extraPages);
        } else {
          setTotalPrice(Number(totalPrice) + Number(price));
          setBumpfee(Number(price));
        }
      } else {
        if (name.trim() === "Extra Pages") {
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

  const handlePageChange = (e, price, isChecked, index) => {
    const id = products[index]?.id;

    const newPages = e.target.value;
    setExtraPages(newPages);
    let addPages;

    const updatedProducts = products.map((item) => {
      if (item.name.trim() === "Extra Pages") {
        addPages = newPages;
        return { ...item, min_quantity: newPages };
      }
      return item;
    });

    setProducts(updatedProducts);
    if (isChecked) {
      if (pages[id]) {
        pages[id] = Number(addPages);
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
    Object.keys(checkedItems).forEach((items, index) => {
      const isChecked = checkedItems[index];
      const bump = product?.bumps[index];
      console.log(bump, index);
      if (isChecked) {
        if (bump.name.trim() === "Extra Pages") {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const order_number = window.localStorage.getItem(orderNumber);
    const id = window.localStorage.getItem("id");

    if (product?.bumps?.length > 0) {
      const data = new FormData();
      data.append("_token", "BNiq5lIb9RM11nI6MvODcZCcWMyksqkayrN0A3G0");
      data.append("product_id", encrypted_id);
      data.append("bump_fee", bumpFee);
      data.append("license", LinceseIndex);
      data.append("bump", JSON.stringify(bumps));
      data.append("pages", JSON.stringify(pages));
      data.append("order_number", id ? id : order_number ? order_number : "");
      const res = await dispatch(addToCart(data));
    } else {
      const data = new FormData();
      data.append("_token", "BNiq5lIb9RM11nI6MvODcZCcWMyksqkayrN0A3G0");
      data.append("product_id", encrypted_id);
      data.append("bump_fee", bumpFee);
      data.append("license", LinceseIndex);
      data.append("order_number", id ? id : order_number ? order_number : "");
      const res = await dispatch(addToCart(data));
    }
  };

  // const handleUpdateCart = () => {
  //   console.log(
  //     bumpFee,
  //     "bumpFee",
  //     LinceseIndex,
  //     "LinceseIndex",
  //     bumps,
  //     "bumps",
  //     pages,
  //     "page"
  //   );
  // };

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
                  }}
                >
                  By{" "}
                  <Typography variant="span" style={{ color: "#2697FA" }}>
                    {product?.user?.firstname + " " + product?.user?.lastname}
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
                            By{" "}
                            {item?.user?.firstname + " " + item?.user?.lastname}
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
                      {isLoading ? (
                        <Skeleton
                          variant="rectangular"
                          width={300}
                          height={40}
                          animation="wave"
                        />
                      ) : (
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
                      )}
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
                    sx={{ borderTop: "1px soild #D9D9D9", mt: 1, mb: 1 }}
                  ></Box>
                  <Typography sx={styles.detailsText}>
                    {isLoading ? (
                      <Skeleton height={20} width="80%" />
                    ) : (
                      "1. Quality Checked by JD Funnel"
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
                    <Box sx={{ mt: 3 }} key={20}>
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
                                    item.id
                                  )
                                }
                                checked={
                                  checkedItems[item.id] === true ? true : false
                                }
                              />
                              <Typography sx={styles.detailsText}>
                                {item.name}
                              </Typography>
                              {item.name.trim() === "Extra Pages" && (
                                <input
                                  style={{ width: "18%" }}
                                  value={extraPages}
                                  type="number"
                                  min={item.min_quantity}
                                  pattern="\d*"
                                  onChange={(e) =>
                                    handlePageChange(
                                      e,
                                      item.price,
                                      checkedItems[item.id],
                                      index
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
                    {isLoading ? (
                      <Skeleton
                        variant="text"
                        width="100%"
                        height={40}
                        animation="wave"
                      />
                    ) : (
                      <Button
                        variant="contained"
                        sx={{ ...styles.addCard, mt: 3 }}
                        type="submit"
                        disabled={isLoadingCart}
                      >
                        {isLoadingCart
                          ? "Adding into cart"
                          : updateCartText || inCart
                          ? "Update cart"
                          : "Add to cart"}
                      </Button>
                    )}
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
                {/* <Box
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
                </Box> */}
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
                              By{" "}
                              {item?.user?.firstname +
                                " " +
                                item?.user?.lastname}
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
