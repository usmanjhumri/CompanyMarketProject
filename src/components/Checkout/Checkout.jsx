import React from "react";
import { CardElement, useStripe, useElements } from "react-stripe-elements";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (stripe && elements) {
      const { token, error } = await stripe.createToken(
        elements.getElement(CardElement)
      );

      if (error) {
        console.error(error);
      } else {
        console.log(token);
        // Send the token to your server for further processing
        // You can handle the payment on your server using the token
      }
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Credit or Debit Card
          <CardElement />
        </label>
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default Checkout;
