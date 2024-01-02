import React, { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import BillStyle from "./Styles";
import stripe from "../../assets/stripe.png";
import { useSelector, useDispatch } from "react-redux";
import { paymentProcess } from "../../Redux/api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const BillDetail = () => {
  const cartData = useSelector((state) => state?.getcart?.data);
  const gateWay = useSelector((state) => state?.userCheckout?.gateWay);
  const navigate = useNavigate();
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
  const handleStripeMethod = async () => {
    const data = new FormData();
    const orderNumber = localStorage.getItem("order_Number");
    const { currency, method_code } = gateWay;
    if (currency && method_code && totalPrice && orderNumber) {
      data.append("amount", Number(totalPrice).toFixed(2));
      data.append("currency", currency);
      data.append("method_code", method_code);
      data.append("order_number", orderNumber);
      const res = await paymentProcess(data);
      if (res) {
        navigate(`/online-checkout/${res.order.trx}/${res.publishable_key}`);
      }
    } else {
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <Box sx={BillStyle.mainBox}>
        <Box sx={BillStyle.boxBillDetail}>
          <Card sx={BillStyle.billingDetailCard}>
            <CardContent>
              <Typography sx={BillStyle.billingDetailTypo}>
                Billing Details
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={BillStyle.mainBoxHis}>
          <Card sx={BillStyle.cardHis}>
            {cartData.map((item, index) => (
              <Box key={index} sx={BillStyle.boxHis}>
                <CardContent>
                  <Typography sx={BillStyle.hisTypo}>
                    {item.product.name}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Typography sx={BillStyle.hisTypo}>
                    ${Number(item.total_price).toFixed(2)}
                  </Typography>
                </CardContent>
              </Box>
            ))}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <CardContent>
                <Typography sx={BillStyle.hisTypo}>Charges</Typography>
              </CardContent>
              <CardContent>
                <Typography sx={BillStyle.hisTypo}>+5%</Typography>
              </CardContent>
            </Box>
            <hr style={BillStyle.hr} />
            <Box sx={BillStyle.boxTotal}>
              <CardContent>
                <Typography sx={BillStyle.totalTypo}>Total</Typography>
              </CardContent>
              <CardContent>
                <Typography sx={BillStyle.totalTypo}>
                  US${Number(totalPrice * 1.05).toFixed(2)}
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </Box>

        <Box sx={BillStyle.mainSelectBox}>
          <Card sx={BillStyle.paymentCard}>
            <Box sx={BillStyle.boxCardPayment} />
            <CardContent>
              <Typography sx={BillStyle.typoPaymentmethod}>
                Select Payment Method
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={BillStyle.mainBoxStripe}>
          <Card sx={BillStyle.stripeCard}>
            <Box sx={BillStyle.boxStripeCard}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  component="img"
                  src={stripe}
                  onClick={() => handleStripeMethod()}
                />
              </CardContent>
            </Box>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default BillDetail;
