/* eslint-disable no-unused-vars */
import React, { useState, useMemo, Fragment, useEffect } from "react";
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
  Modal,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  CardHeader,
  CardActions,
  CardMedia,
  Checkbox,
} from "@mui/material";
import { IoCloseOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteCart,
  checkOutCart,
  emptyCart,
  getCart,
} from "../../Redux/api/api";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import stripeimg from "../../assets/5f6f1d4bc69e71601117515.jpg";
import { order_number, id } from "../../Const/CONST";
import styles from "../Header/styles";
import { BiSolidCheckboxChecked } from "react-icons/bi";
import { ImCheckboxChecked } from "react-icons/im";

// import { checkOut } from "../../Redux/Slice/Checkout";

const wallet = ["Own", "Online Payment"];
const Shopping = () => {
  const cartData = useSelector((state) => state?.getcart?.data);
  const imgUrl = useSelector((state) => state?.home?.imgPath);
  const isLoading = useSelector((state) => state?.getcart?.isLoading);
  const isLoadingCheck = useSelector((state) => state?.userCheckout?.loading);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [walletType, setWalletType] = useState(wallet[0]);
  const [user_balance, set_User_Balance] = useState(0);
  const [orderNumber, setOrderNumber] = useState("");
  const [loginId, setLoginId] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useMemo(() => {
    setOrderNumber(window.localStorage.getItem(order_number));
    setLoginId(window.localStorage.getItem(id));
    const sum = cartData
      ?.reduce(
        (accumulator, currentValue) =>
          Number(accumulator + Number(currentValue.total_price)),
        0
      )
      .toFixed(2);
    setTotalPrice(sum);
    if (window?.localStorage?.getItem("user")) {
      const { balance } = JSON.parse(window?.localStorage?.getItem("user"));

      set_User_Balance(Number(balance).toFixed(2));
    }
    if (cartData?.length === 0) {
      localStorage.removeItem(order_number);
    }
  }, [cartData]);

  const handleRemoveProduct = async (id) => {
    const res = await dispatch(deleteCart(id));
    if (res.payload.message) {
      toast.success(res.payload.message);
      dispatch(getCart(loginId ? loginId : orderNumber));
    }
    if (res === 500) {
      navigate("/500");
    }
  };

  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  // };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePaymentChange = (event) => {
    setWalletType(event.target.value);
  };

  const handleCheckout = async () => {
    const orderNumber = localStorage.getItem(order_number);
    const id = localStorage.getItem("id");
    if (!window.localStorage.getItem("user")) {
      toast.info("Please sign in first ");
      navigate("/signin");
    }
    const data = {
      wallet_type: "online",
      subscription: 0,
      order_number: id ? id : orderNumber,
    };
    const res = await dispatch(checkOutCart(data));
    if (res.payload.success) {
      navigate(
        `/billing-detail/${res.payload.data.order.trx}/${res.payload.data.publishable_keys.stripe}`
      );
    }
  };

  const deleteAllProducts = async () => {
    if (cartData[0].encrypted_order_number) {
      const res = await emptyCart(cartData[0].encrypted_order_number);
      if (res.status === "Success") {
        toast.success(res.message);
        dispatch(getCart(loginId ? loginId : orderNumber));
        localStorage.removeItem(order_number);
      }
    }
  };

  return (
    <>
      <Box mt={3} className="height-footer">
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
            <Typography sx={Styles.noProduct} key={"NoProduct"}>
              No product in cart
            </Typography>
          ) : (
            <Grid container spacing={2} marginTop={1} justifyContent="center">
              <Grid item xs={12} md={8} lg={8}>
                <Card sx={{ width: "100%" }}>
                  <Box sx={Styles.shoppingCard}>
                    <Link to={"/"}>
                      <Button
                        sx={{
                          ...Styles.ContinueShop,
                          // width: { xs: "100%", md: "auto" },
                        }}
                        // variant="contained"
                      >
                        Continue Shopping
                      </Button>
                    </Link>

                    {cartData?.length > 0 && (
                      <Button
                        sx={{
                          ...Styles.emptyCard,
                          // width: { xs: "100%", md: "auto" },
                        }}
                        // variant="contained"
                        onClick={deleteAllProducts}
                      >
                        Empty Cart
                      </Button>
                    )}
                  </Box>
                </Card>
                {cartData?.map((item, index) => (
                  <Fragment key={index}>
                    <Card
                      sx={{
                        background: "#fff",
                        boxShadow: "0px 0px 6px 2px rgba(0, 0, 0, 0.10)",
                        borderRadius: "2px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate(
                          `/product/${
                            item?.product?.category_id
                          }/${item?.product?.name
                            .toLowerCase()
                            .replace(/[\s-]/g, "-")}/${item?.product?.id}/${
                            item?.order_number
                          }`
                        );
                      }}
                    >
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
                              sx={Styles.logoImg}
                              src={`${imgUrl}/${item?.product?.image}`}
                            />
                            <Typography>
                              <Box paddingLeft={3}>
                                <Typography sx={Styles.historicHead}>
                                  {item?.product?.name}
                                </Typography>

                                {/* <br /> */}
                                <span style={Styles.byFunnel}>
                                  By JD Funnel Marketplace
                                </span>
                                <br />
                                <br />
                                <Box>
                                  <span style={Styles.license}>License:</span>
                                  <span style={Styles.regularLicense}>
                                    {item.license === 1
                                      ? "Regular License"
                                      : "Extended License"}
                                  </span>
                                </Box>
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
                                style={{ marginLeft: 16, cursor: "pointer" }}
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
                        <Box mt={2}>
                          {item?.bumpresponses.length > 0 && (
                            <Typography
                              mb={2}
                              sx={{
                                fontSize: "16px",
                                color: "#2697fa",
                                marginLeft: { md: "7rem", xs: "0rem" },
                                fontFamily: "Be Vietnam Pro,sans-serif",
                              }}
                            >
                              Extra Bumps
                            </Typography>
                          )}

                          {item?.bumpresponses?.map((bumpResponse, index) => (
                            <div key={index}>
                              <>
                                <Box
                                  sx={{
                                    ...Styles.productBumps,
                                  }}
                                >
                                  <Box
                                    display="flex"
                                    sx={{
                                      alignItems: "center",
                                      gap: 1,
                                      marginLeft: { md: "7rem", xs: "0rem" },
                                    }}
                                  >
                                    <ImCheckboxChecked />

                                    <Box>
                                      <Box>{bumpResponse.bump.name}</Box>
                                    </Box>
                                  </Box>

                                  {bumpResponse.pages ? (
                                    <>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: 2,
                                        }}
                                      >
                                        <Typography
                                          sx={{
                                            fontSize: {
                                              md: "1.4rem",
                                              xs: "16px",
                                            },
                                          }}
                                        >
                                          Qty
                                        </Typography>
                                        <input
                                          type="number"
                                          value={bumpResponse.pages}
                                          style={{
                                            width: "70px",
                                          }}
                                          disabled={true}
                                        />
                                        <Typography
                                          sx={{
                                            fontSize: {
                                              md: "1.4rem",
                                              xs: "16px",
                                            },
                                          }}
                                        >
                                          Price
                                        </Typography>
                                      </Box>
                                    </>
                                  ) : null}

                                  <Typography
                                    sx={{
                                      ...Styles.detailsText,
                                      textAlign: "right",
                                    }}
                                  >
                                    $ {Number(bumpResponse.price).toFixed(2)}
                                  </Typography>
                                </Box>
                              </>
                            </div>
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  </Fragment>
                ))}
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Box
                  sx={{
                    width: "100%",
                    borderRadius: "2px",
                    background: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    boxShadow: " 0px 0px 6px 2px rgba(0, 0, 0, 0.10)",

                    mt: { xs: 2, md: 0 },
                  }}
                >
                  <CardContent>
                    <Typography sx={Styles.total}>Your Cart Total</Typography>
                    <Typography sx={Styles.price}>US$ {totalPrice}</Typography>
                    <Button
                      onClick={handleCheckout}
                      sx={Styles.checkOut}
                      variant="contained"
                      disabled={isLoadingCheck}
                    >
                      {isLoadingCheck ? "Checking out" : "Check out"}
                    </Button>
                  </CardContent>
                </Box>
              </Grid>

              <Grid item xs={12} md={4} lg={8}>
                {isCardOpen && (
                  <Card
                    open={isCardOpen}
                    sx={{
                      // width: "80%",
                      maxWidth: 300,
                      margin: "auto",
                      // position: "absolute",
                      // top: "26%",
                      // right: "3%",
                      "@media (max-width: 600px)": {
                        width: "90%",
                        top: "20%",
                      },
                    }}
                  >
                    <CardContent sx={{ background: "#50b948" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          borderRadius: 4,
                        }}
                      >
                        <Box sx={{ marginRight: 2 }}>
                          <CardMedia
                            component="img"
                            height="70px"
                            width="30px"
                            image={stripeimg}
                            alt="Stripe Logo"
                            borderRadius="10px"
                          />
                        </Box>
                        <Typography
                          sx={{
                            color: "white",
                            display: "inline",
                            fontSize: "20px",
                          }}
                        >
                          Pay by card
                        </Typography>
                      </Box>
                    </CardContent>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <CardContent>
                        <Typography sx={{ textAlign: "center" }}>
                          Total: {Number(totalPrice * 1.05).toFixed(2)} USD
                        </Typography>
                        <Typography sx={{ paddingTop: 2, textAlign: "center" }}>
                          Charge: +5%
                        </Typography>
                        <CardActions>
                          <Button
                            style={{
                              marginTop: 2,
                              padding: 1,
                            }}
                            sx={Styles.checkOut}
                            variant="contained"
                            onClick={() => navigate("/billing-detail")}
                          >
                            Pay Now
                          </Button>
                        </CardActions>
                      </CardContent>
                    </Box>
                  </Card>
                )}
              </Grid>

              <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    borderRadius: "10px",
                    height: "18%",
                    background: "#ECECEC",
                    p: 2,
                  }}
                >
                  <Typography variant="h6" component="div">
                    Checkout
                  </Typography>
                  <Box paddingTop={2}>
                    <FormControl fullWidth>
                      <InputLabel id="dropdown-label">
                        Payment Method
                      </InputLabel>
                      <Select
                        labelId="dropdown-label"
                        id="dropdown"
                        value={walletType}
                        label="Payment Method"
                        onChange={(e) => handlePaymentChange(e)}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        {wallet.map((item, index) => (
                          <MenuItem value={item} key={index}>
                            {item}{" "}
                            {item === "Own" &&
                              `- $  ${Number(user_balance).toFixed(2)}`}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  {/* <Box paddingTop={2}>
                    <Button onClick={handleCloseModal}>No</Button>
                    <Button onClick={handleOpenCard}>Yes</Button>
                  </Box> */}
                </Box>
              </Modal>
            </Grid>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Shopping;
