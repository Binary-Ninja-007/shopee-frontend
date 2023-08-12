import React, { useContext, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Cart from "../components/cart";
import { CartContext } from "../context/cart-context";
import LoadingSkeleton from "../components/loading-skeleton";

interface CheckOutFormData {
  name: string;
  email: string;
  address: string;
}

function CheckOut() {
  const stripe = useStripe();
  const elements = useElements();
  elements?.create("payment", {
    fields: {
      billingDetails: {
        name: "auto",
        email: "auto",
        address: "auto",
      },
    },
  });
  const { purchasing, setPurchasing } = useContext(CartContext);
  const [formData, setFormData] = useState<CheckOutFormData>({
    name: "",
    email: "",
    address: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setPurchasing(true);
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
    setPurchasing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section>
      {purchasing && <LoadingSkeleton />}
      <h2>Check Out</h2>
      <div>
        <form action="/checkout" method="post" onSubmit={handleSubmit}>
          <h3>Information</h3>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <CardElement />
          <button>Confirm & Pay</button>
        </form>
        <Cart readOnly />
      </div>
    </section>
  );
}

export default CheckOut;
