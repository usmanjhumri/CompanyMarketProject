/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import Checkoutform from "./checkoutForm";
import { useParams } from "react-router-dom";
function Checkoutstrip() {
  const { publishable_key } = useParams();
  const [stripePromise, setStripePromise] = useState(null);
  useEffect(() => {
    setStripePromise(loadStripe(publishable_key));
  }, []);
  return (
    <>
      {stripePromise && (
        <Elements stripe={stripePromise}>
          <Checkoutform />
        </Elements>
      )}
    </>
  );
}

export default Checkoutstrip;
