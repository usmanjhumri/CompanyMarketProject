import { useState, useMemo } from "react";
import { Grid, Typography, CardContent, Card, Box } from "@mui/material";
import BillStyle from "./Styles";
import StripeChekout from "../Onlinepaymentstripe/index";
import { useSelector } from "react-redux";
// import { paymentProcess } from "../../Redux/api/api";
import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";
const BillDetail = () => {
  const cartData = useSelector((state) => state?.getcart?.data);
  // const gateWay = useSelector((state) => state?.userCheckout?.gateWay);
  // const navigate = useNavigate();
  const { publishable_key, trx } = useParams();
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
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item lg={8} sm={12}>
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
                  <Typography sx={BillStyle.hisTypo}>Stripe Charges</Typography>
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
        </Box>
      </Grid>
      <Grid item lg={4} sm={12}>
        <StripeChekout publishable_key={publishable_key} trx={trx} />
      </Grid>
    </Grid>
  );
};

export default BillDetail;
