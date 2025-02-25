import React, { useState } from "react";
import {
  Container,
  Box,
  LinearProgress,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import UserAddressForm from "../components/UserAddressForm";
import UserPaymentForm from "../components/UserPaymentForm";
import OrderReview from "../components/OrderReview";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axios"; // Make sure this points to your API client

const stripePromise = loadStripe(
  "pk_test_51LgPJ6EvfAs4Cqp2NdPVjBwajIh8GtDD8NwDIbdbNUgOfiPgtjTEi5L0m3Bz5k1vYjh4FQjvNPjEOD0msutg3hVW001v86c6gv"
); // Add your Stripe API key here

const CheckoutPage = ({ cart = [] }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userDetails, setUserDetails] = useState({
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
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogSeverity, setDialogSeverity] = useState("success"); // 'success' or 'error'

  const navigate = useNavigate();

  const resetCart = () => {
    cart.length = 0; // Or use setCart([]) from the parent component if the cart is managed by state
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

  // Submit the order to the backend
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
      console.log("order details", orderDetails);
      const response = await apiClient.post("/orders", orderDetails);

      if (response.status === 201) {
        // Show success dialog
        setDialogMessage("Your order has been successfully placed!");
        setDialogTitle("Order Placed");
        setDialogSeverity("success");
        setOpenDialog(true);
        resetCart(); // Reset the cart after successful order placement
        setUserDetails({}); // Reset user details
        navigate("/user/products"); // Redirect to product page
      }
    } catch (error) {
      console.error("Error placing order:", error);
      // Show error dialog
      setDialogMessage(
        "There was an issue with placing your order. Please try again."
      );
      setDialogTitle("Order Failed");
      setDialogSeverity("error");
      setOpenDialog(true);
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

      {/* Dialog for success or error messages */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <Typography
            variant="body1"
            color={dialogSeverity === "error" ? "error" : "success"}
          >
            {dialogMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            color={dialogSeverity === "error" ? "error" : "primary"}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CheckoutPage;
