import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  Button,
  Grid,
  Container,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

const PaymentDetailsForm = ({ nextStep, prevStep, handleChange, values }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Create payment method with card data
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
      setOpenSnackbar(true); // Open the snackbar alert for error
    } else {
      console.log("Payment method created: ", paymentMethod);
      nextStep(); // Proceed to next step if payment method is successfully created
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Payment Information
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CardElement />
            {error && <p>{error}</p>}
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!stripe}
          sx={{ marginTop: 3 }}
        >
          Pay Now
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{ marginTop: 3, marginLeft: 2 }}
          onClick={prevStep}
        >
          Go Back
        </Button>
      </form>

      {/* Snackbar for displaying Stripe error */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PaymentDetailsForm;
