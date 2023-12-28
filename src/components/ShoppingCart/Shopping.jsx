/* eslint-disable no-unused-vars */
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
  Modal,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  CardHeader,
  CardActions,
  CardMedia,
} from "@mui/material";
import { IoCloseOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteCart, checkOutCart } from "../../Redux/api/api";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import stripeimg from "../../assets/5f6f1d4bc69e71601117515.jpg";

// import { checkOut } from "../../Redux/Slice/Checkout";

const wallet = ["Own", "Online Payment"];
const Shopping = () => {
  const cartData = useSelector((state) => state?.getcart?.data);
  // console.log(cartData.length, " cartDatasssss");
  const imgUrl = useSelector((state) => state?.home?.imgPath);
  const isLoading = useSelector((state) => state?.getcart?.isLoading);

  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [walletType, setWalletType] = useState(wallet[0]);
  const [walletIndex, setWalletIndex] = useState(0);
  const [selectedValue, setSelectedValue] = useState(0);
  const [user_balance, set_User_Balance] = useState(0);
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
    if (window?.localStorage?.getItem("user")) {
      const { balance } = JSON.parse(window?.localStorage?.getItem("user"));
      console.log(balance);
      console.log("working");
      set_User_Balance(Number(balance).toFixed(2));
    }
  }, [cartData]);
  console.log(user_balance);
  const handleRemoveProduct = async (id) => {
    const res = await dispatch(deleteCart(id));
    if (res.payload.message) {
      toast.success(res.payload.message);
    }
    if (res === 500) {
      navigate("/500");
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleOpenCard = async () => {
    if (!window.localStorage.getItem("user")) {
      toast.info("Please sign in first ");
      navigate("/signin");
    }
    if (walletType.toLowerCase().trim() === "own") {
      const orderNumber = localStorage.getItem("order_Number");
      const data = {
        wallet_type: walletType.toLowerCase(),
        subscription: 0,
        order_number: orderNumber,
      };
      const res = await dispatch(checkOutCart(data));
      if (res.payload.success) {
        console.log("working");
        toast.success(res.payload.message);
        localStorage.removeItem("order_Number");
        navigate("/");
      } else {
        return;
      }
      handleCloseModal();
    } else {
      setIsCardOpen(true);
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleCheckout = async () => {
    try {
      if (selectedValue === "own") {
        const orderResponse = await placeOrder();
        const orderNumber = orderResponse?.orderNumber;

        if (orderNumber) {
          toast.success(
            `Order placed successfully! Order Number: ${orderNumber}`
          );
        } else {
          throw new Error("Failed to place the order. Please try again.");
        }
      } else if (selectedValue === "online") {
      }

      handleCloseModal();
    } catch (error) {
      toast.error(
        error.message || "An error occurred while placing the order."
      );
    }
  };
  const handlePaymentChange = (event) => {
    setWalletType(event.target.value);
    console.log("Selected Value:", event.target.value);
    console.log("Wallet Type:", event);
  };
  const handlePaymentIndex = (e, index) => {
    console.log(index);
    setWalletIndex(index);
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
                          // width: { xs: "100%", md: "auto" },
                        }}
                        // variant="contained"
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
                    <Card
                      sx={{
                        background: "#ECECEC",

                        p: { xs: 1, md: 2 },
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
                              width="20%"
                            />
                            <Typography>
                              <Box paddingLeft={3}>
                                <Typography sx={Styles.historicHead}>
                                  {item?.product?.name}
                                </Typography>

                                {/* <br /> */}
                                <span style={Styles.byFunnel}>
                                  By JD Funnel
                                </span>
                                <br />
                                <br />
                                <Box>
                                  <span style={Styles.license}>
                                    License:
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
                    <Button
                      onClick={handleOpenModal}
                      sx={Styles.checkOut}
                      variant="contained"
                    >
                      Check out
                    </Button>
                  </CardContent>
                </Box>
              </Grid>
              {isCardOpen && (
                <Card
                  open={isCardOpen}
                  sx={{
                    width: "80%",
                    maxWidth: 300,
                    margin: "auto",
                    position: "absolute",
                    top: "26%",
                    right: "3%",
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
                        Total: {totalPrice * 1.05} USD
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
                        >
                          Pay Now
                        </Button>
                      </CardActions>
                    </CardContent>
                  </Box>
                </Card>
              )}
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
                          <MenuItem
                            value={item}
                            key={index}
                            onClick={(e) => handlePaymentIndex(e, index)}
                          >
                            {item}{" "}
                            {item === "Own" &&
                              `- $  ${Number(user_balance).toFixed(2)}`}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  <Box paddingTop={2}>
                    <Button onClick={handleCloseModal}>No</Button>
                    <Button onClick={handleOpenCard}>Yes</Button>
                  </Box>
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
