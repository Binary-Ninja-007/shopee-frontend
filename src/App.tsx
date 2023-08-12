import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Collection from "./pages";
import CartProvider from "./context/cart-context";
import "./App.css";
import Header from "./layouts/header";
import CollectionProvider from "./context/collection-context";
import ASide from "./layouts/aside";
import CheckOut from "./pages/check-out";
import "react-toastify/dist/ReactToastify.css";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || "");

function App() {
  return (
    <Elements stripe={stripePromise}>
      <CartProvider>
        <CollectionProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Collection />} />
              <Route path="/checkout" element={<CheckOut />} />
            </Routes>
            <ASide />
          </BrowserRouter>
          <ToastContainer />
        </CollectionProvider>
      </CartProvider>
    </Elements>
  );
}

export default App;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            