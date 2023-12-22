import React, { useState, useMemo } from "react";
import { Styles } from "./Styles";
import {
  Typography,
  Box,
  Grid,
  Button,
  Card,
  CardContent,
  Container,
  Skeleton,
} from "@mui/material";
import { IoCloseOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteCart } from "../../Redux/api/api";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Shopping = () => {
  const cartData = useSelector((state) => state?.getcart?.data);
  const imgUrl = useSelector((state) => state?.home?.imgPath);
  const isLoading = useSelector((state) => state?.getcart?.isLoading);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useMemo(() => {
    const sum = cartData
      ?.reduce(
        (accumulator, currentValue) =>
          Number(accumulator + Number(currentValue.total_price)),
        0
      )
      .toFixed(2);
    setTotalPrice(sum);
  }, [cartData]);

  const handleRemoveProduct = async (id) => {
    const res = await dispatch(deleteCart(id));
    if (res.payload.message) {
      toast.success(res.payload.message);
    }
    if (res === 500) {
      navigate("/500");
    }
  };

  return (
    <>
      <Box mt={3}>
        <Container>
          <Typography sx={Styles.ShoppingHead}>Shopping Cart</Typography>

          {isLoading ? (
            <Grid container spacing={2} marginTop={1} justifyContent="center">
              {[...Array(1)].map((_, index) => (
                <Grid key={index} item xs={12} md={8} lg={8}>
                  <Card sx={{ width: "100%" }}>
                    <Skeleton variant="rectangular" width="100%" height={200} />
                    <CardContent>
                      <Skeleton variant="text" width="50%" />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : cartData?.length === 0 ? (
            <Typography sx={Styles.noProduct}>No product in cart</Typography>
          ) : (
            <Grid container spacing={2} marginTop={1} justifyContent="center">
              <Grid item xs={12} md={8} lg={8}>
                <Card sx={{ width: "100%" }}>
                  <Box sx={Styles.shoppingCard}>
                    <Link to={"/"}>
                      <Button
                        sx={{
                          ...Styles.ContinueShop,
                          width: { xs: "100%", md: "auto" },
                        }}
                        variant="contained"
                      >
                        Continue Shopping
                      </Button>
                    </Link>
                    <Button
                      sx={{
                        ...Styles.emptyCard,
                        width: { xs: "100%", md: "auto" },
                      }}
                      variant="contained"
                      size="small"
                    >
                      Empty Cart
                    </Button>
                  </Box>
                </Card>
                {cartData?.map((item, index) => (
                  <>
                    <Card sx={{ background: "#ECECEC" }}>
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                            }}
                          >
                            <Box
                              component="img"
                              src={`${imgUrl}/${item?.product?.image}`}
                              width="20%"
                            />
                            <Typography sx={{ ...Styles.productName }}>
                              {item?.product?.name}
                              <br />
                              <Typography
                                component="span"
                                sx={{ ...Styles.byUser }}
                              >
                                By JD Funnel
                              </Typography>
                              <br />
                              <Box
                                sx={{
                                  mt: 3,
                                }}
                              >
                                <Typography
                                  component="span"
                                  sx={{ fontSize: "12px", fontWeight: 400 }}
                                >
                                  License:{" "}
                                  <Typography
                                    component="span"
                                    sx={{
                                      fontSize: "12px",
                                      fontWeight: 400,
                                      color: "#959595",
                                    }}
                                  >
                                    {" "}
                                    {item.license === 1
                                      ? "Regular License"
                                      : "Extended License"}
                                  </Typography>
                                </Typography>
                              </Box>
                            </Typography>
                          </Box>
                          <Box>
                            <Box
                              sx={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "end",
                              }}
                            >
                              <IoCloseOutline
                                style={{ marginLeft: 16 }}
                                onClick={() =>
                                  handleRemoveProduct(item.encrypted_id)
                                }
                                size={25}
                              />
                            </Box>
                            <Typography
                              sx={{
                                mt: 2,
                                fontSize: "24px",
                                fontWeight: 500,
                                color: "#000",
                              }}
                            >
                              ${Number(item?.total_price).toFixed(2)}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                    <Box sx={{ mt: 2 }}></Box>
                  </>
                ))}
              </Grid>

              <Grid item xs={12} md={4} lg={4}>
                <Box
                  sx={{
                    width: "100%",
                    borderRadius: "2px",
                    background: "var(--new-bg-color, #ECECEC)",
                    display: "flex",
                    justifyContent: "center",
                    mt: { xs: 2, md: 0 },
                  }}
                >
                  <CardContent>
                    <Typography sx={Styles.total}>Your Cart Total</Typography>
                    <Typography sx={Styles.price}>US$ {totalPrice}</Typography>
                    <Button sx={Styles.checkOut} variant="contained">
                      Check out
                    </Button>
                  </CardContent>
                </Box>
              </Grid>
            </Grid>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Shopping;
