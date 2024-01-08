/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import stripeimg from "../../assets/5f6f1d4bc69e71601117515.jpg";
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Skeleton,
  InputLabel,
  FormControl,
  OutlinedInput,
  CardMedia,
} from "@mui/material";
import useResponsiveFontSize from "./useResponsiveFontSize";
import { paymentStripe, getCart } from "../../Redux/api/api";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { order_number } from "../../Const/CONST";
const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    [fontSize]
  );

  return options;
};
function Checkoutstrip() {
  const { trx } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    setIsProcessing(true);
    // const payload = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: elements.getElement(CardNumberElement),
    // });
    // const paymentDetails = payload;
    const { token, error } = await stripe.createToken(
      elements.getElement(CardNumberElement)
    );

    if (token) {
      const data = new FormData();

      data.append("track", trx);
      data.append("stripe_token", token.id);
      const res = await paymentStripe(data);
      if (res.success) {
        toast.success("Payment has been processed");
        navigate("/");
        const orderNumber = localStorage.getItem(order_number);

        dispatch(getCart(orderNumber));
        localStorage.removeItem(order_number);
      } else {
        toast.error("Payment failed");
      }
    } else if (error) {
      toast.error("Something went wrong");
    }
    setIsProcessing(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Card sx={{ minWidth: "400px" }}>
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
        <CardContent>
          <form onSubmit={handleSubmit}>
            <label>
              Card number
              <CardNumberElement
                options={options}
                onReady={() => {
                  console.log("CardNumberElement [ready]");
                }}
                onChange={(event) => {
                  console.log("CardNumberElement [change]", event);
                }}
                onBlur={() => {
                  console.log("CardNumberElement [blur]");
                }}
                onFocus={() => {
                  console.log("CardNumberElement [focus]");
                }}
              />
            </label>
            <label>
              Expiration date
              <CardExpiryElement
                options={options}
                onReady={() => {
                  console.log("CardNumberElement [ready]");
                }}
                onChange={(event) => {
                  console.log("CardNumberElement [change]", event);
                }}
                onBlur={() => {
                  console.log("CardNumberElement [blur]");
                }}
                onFocus={() => {
                  console.log("CardNumberElement [focus]");
                }}
              />
            </label>
            <label>
              CVC
              <CardCvcElement
                options={options}
                onReady={() => {
                  console.log("CardNumberElement [ready]");
                }}
                onChange={(event) => {
                  console.log("CardNumberElement [change]", event);
                }}
                onBlur={() => {
                  console.log("CardNumberElement [blur]");
                }}
                onFocus={() => {
                  console.log("CardNumberElement [focus]");
                }}
              />
            </label>
            <Button
              type="submit"
              variant="contained"
              disabled={isProcessing}
              id="submit"
              sx={{ mt: 4, textTransform: "capitalize", background: "#50b948" }}
              fullWidth
            >
              {isProcessing ? "Processing..." : "Pay"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Checkoutstrip;
