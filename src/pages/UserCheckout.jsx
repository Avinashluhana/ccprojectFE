import React, { useState } from "react";
import { Container, Box, LinearProgress, Typography } from "@mui/material";
import UserAddressForm from "../components/UserAddressForm";
import UserPaymentForm from "../components/UserPaymentForm";
import OrderReview from "../components/OrderReview";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51LgPJ6EvfAs4Cqp2NdPVjBwajIh8GtDD8NwDIbdbNUgOfiPgtjTEi5L0m3Bz5k1vYjh4FQjvNPjEOD0msutg3hVW001v86c6gv"
);

const UserCheckout = ({ cart = [] }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const initialCustomerDetails = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  };

  const [userDetails, setUserDetails] = useState(initialCustomerDetails);
  const navigate = useNavigate();

  const resetCart = () => {
    cart.length = 0; // or call setCart([]) from the parent component if cart is managed by the parent state
  };

  const proceedToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const goBackToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleInputChange = (inputField) => (event) => {
    setUserDetails({ ...userDetails, [inputField]: event.target.value });
  };

  const submitOrder = async () => {
    const orderDetails = {
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
      customer: userDetails,
      items: cart.map((item) => ({
        product: {
          id: item.id,
          name: item.name,
        },
        quantity: item.quantity,
      })),
    };

    try {
      // Simulate sending order to the backend
      Swal.fire({
        icon: "success",
        title: "Order Placed",
        text: "Your order has been successfully placed!",
      }).then(() => {
        resetCart(); // Reset the cart after successful order placement
        setUserDetails(initialCustomerDetails);
        navigate("/customer/products");
      });
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Order placement failed.");
    }
  };

  const displayCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <UserAddressForm
            nextStep={proceedToNextStep}
            handleChange={handleInputChange}
            values={userDetails}
          />
        );
      case 2:
        return (
          <UserPaymentForm
            nextStep={proceedToNextStep}
            prevStep={goBackToPreviousStep}
            handleChange={handleInputChange}
            values={userDetails}
          />
        );
      case 3:
        return (
          <OrderReview
            cart={cart}
            prevStep={goBackToPreviousStep}
            values={userDetails}
            placeOrder={submitOrder}
          />
        );
      default:
        return (
          <UserAddressForm
            nextStep={proceedToNextStep}
            handleChange={handleInputChange}
            values={userDetails}
          />
        );
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      {/* Progress Bar */}
      <Box sx={{ width: "100%", marginBottom: 3 }}>
        <LinearProgress variant="determinate" value={(currentStep / 3) * 100} />
      </Box>

      <Elements stripe={stripePromise}>{displayCurrentStep()}</Elements>
    </Container>
  );
};

export default UserCheckout;
