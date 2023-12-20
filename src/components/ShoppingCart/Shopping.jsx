import { useState, useMemo } from "react";
import { Styles } from "./Styles";
import {
  Typography,
  Box,
  Grid,
  Button,
  Card,
  CardContent,
  Container,
} from "@mui/material";
// import img1 from "../../assets/jd.png";
import { IoCloseOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Shopping = () => {
  const cartData = useSelector((state) => state.getcart.data);
  const imgUrl = useSelector((state) => state?.home?.imgPath);
  const [totalPrice, setTotalPrice] = useState(0);

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
  return (
    <>
      <Box mt={3}>
        <Container>
          <Typography sx={Styles.ShoppingHead}>Shopping Cart</Typography>

          <Grid container spacing={2} marginTop={1} justifyContent="center">
            <Grid item xs={12} md={8} lg={8}>
              <Card sx={{ width: "100%" }}>
                <Box sx={Styles.shoppingCard}>
                  <Link to={"/"}>
                    <Button sx={Styles.ContinueShop} variant="contained">
                      Continue Shopping
                    </Button>
                  </Link>
                  <Button
                    sx={Styles.emptyCard}
                    variant="contained"
                    size="small"
                  >
                    Empty Cart
                  </Button>
                </Box>
              </Card>

              <Grid
                container
                justifyContent="center"
                sx={{
                  background: "var(--new-bg-color, #ECECEC)",

                  display: "flex",
                  paddingTop: "24px",
                }}
              >
                {cartData?.map((item) => (
                  <>
                    <Grid item lg={2}>
                      <img
                        style={Styles.logoImg}
                        src={`${imgUrl}/${item?.product?.image}`}
                        alt="img1"
                        width="80%"
                      />
                    </Grid>
                    <Grid item lg={5}>
                      <Typography sx={Styles.historicHead}>
                        {item?.product?.name}
                      </Typography>
                      <Typography sx={Styles.byFunnel}>By JD Funnel</Typography>

                      <Box
                        sx={{
                          display: "flex",
                          paddingTop: "10px",
                          marginBottom: "24px",
                        }}
                      >
                        <Typography>
                          <span style={Styles.license}>License:</span>
                          <span style={Styles.regularLicense}>
                            {item.license === 1
                              ? "Regular License"
                              : "Extended License"}
                          </span>
                          <span style={Styles.license}> Support:</span>
                          <span style={Styles.regularLicense}>
                            6 months Support
                          </span>
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid lg={3}>
                      <Box
                        sx={{
                          display: "flex",
                          marginLeft: "100px",
                        }}
                      >
                        <label style={Styles.qty} htmlFor="quantity">
                          Qty
                        </label>
                        <input
                          type="number"
                          id="quantity"
                          name="quantity"
                          min="0"
                          style={Styles.inputNumber}
                        />
                      </Box>
                    </Grid>
                    <Grid lg={2}>
                      <Box sx={{ paddingLeft: "70px" }}>
                        <IoCloseOutline
                          style={{
                            width: "21px",
                            height: "21px",
                            paddingLeft: "30px",
                          }}
                        />
                        <Typography
                          sx={{
                            marginTop: "23px",
                            fontWeight: "500",
                            fontSize: "24px",
                          }}
                        >
                          ${Number(item?.total_price).toFixed(2)}
                        </Typography>
                      </Box>
                    </Grid>
                  </>
                ))}
              </Grid>
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
        </Container>
      </Box>
    </>
  );
};

export default Shopping;
