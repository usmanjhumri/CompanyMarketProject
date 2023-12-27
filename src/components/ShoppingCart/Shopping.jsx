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
import { deleteCart } from "../../Redux/api/api";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import stripeimg from "../../assets/5f6f1d4bc69e71601117515.jpg";
const Shopping = () => {
  const cartData = useSelector((state) => state?.getcart?.data);
  // console.log(cartData.length, " cartDatasssss");
  const imgUrl = useSelector((state) => state?.home?.imgPath);
  const isLoading = useSelector((state) => state?.getcart?.isLoading);
  const user_balance = useSelector((state) => state?.getcart?.userBalance);

  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  // console.log(totalPrice, " total price of cart");
  const [selectedValue, setSelectedValue] = useState(0);
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleOpenCard = () => {
    setIsCardOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCheckout = () => {
    handleCloseModal();
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    // console.log("Selected Value:", event.target.value);
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
                    <Card sx={{ background: "#ECECEC", p: { xs: 1, md: 2 } }}>
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

              <Card
                open={isCardOpen}
                sx={{ width: "80%", maxWidth: 300, margin: "auto" }}
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
                    <Typography>Total: 400 USD</Typography>
                    <Typography sx={{ paddingTop: 2, textAlign: "center" }}>
                      Charge: +5%
                    </Typography>
                    <CardActions>
                      <Button
                        sx={{
                          marginTop: 2,
                          padding: 1,
                        }}
                        variant="contained"
                      >
                        Contained
                      </Button>
                    </CardActions>
                  </CardContent>
                </Box>
              </Card>

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
                      <InputLabel id="dropdown-label">Select Value</InputLabel>
                      <Select
                        labelId="dropdown-label"
                        id="dropdown"
                        value={selectedValue}
                        label="Select Value"
                        onChange={handleChange}
                      >
                        {totalPrice <= user_balance && user_balance === 0 && (
                          <MenuItem value="own">
                            Wallet (${user_balance})
                          </MenuItem>
                        )}
                        <MenuItem value="online">Online Payment</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Box paddingTop={7}>
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
