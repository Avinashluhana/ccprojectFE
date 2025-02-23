import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  ListItem,
  ListItemText,
  Button,
  Box,
} from "@mui/material";

const OrderReviewPage = ({ cart = [], values, prevStep, placeOrder }) => {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const orderTotal = cart.reduce((acc, item) => {
    const price = item.price || 0;
    const quantity = item.quantity || 1;
    return acc + price * quantity;
  }, 0);

  const goBackToPreviousStep = (event) => {
    event.preventDefault();
    prevStep();
  };

  const finalizeOrder = (event) => {
    event.preventDefault();
    placeOrder();
  };

  return (
    <Container sx={{ paddingTop: 4 }}>
      {/* Order Summary Card */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>
          <Grid container spacing={2}>
            {cart.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{ display: "flex", flexDirection: "column", padding: 2 }}
                >
                  <Typography variant="body1" fontWeight="bold">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.quantity} x ${item.price}
                  </Typography>
                  <Typography variant="body1" color="primary">
                    Total: ${item.price * item.quantity}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Total Amount Display */}
      <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: 2 }}>
        Total: ${total.toFixed(2)}
      </Typography>

      {/* Shipping Information Card */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Shipping Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <ListItem>
                <ListItemText
                  primary={<strong>First Name:</strong>}
                  secondary={values.firstName}
                />
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ListItem>
                <ListItemText
                  primary={<strong>Last Name:</strong>}
                  secondary={values.lastName}
                />
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ListItem>
                <ListItemText
                  primary={<strong>Email:</strong>}
                  secondary={values.email}
                />
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ListItem>
                <ListItemText
                  primary={<strong>Phone:</strong>}
                  secondary={values.phone}
                />
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ListItem>
                <ListItemText
                  primary={<strong>Address Line 1:</strong>}
                  secondary={values.addressLine1}
                />
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ListItem>
                <ListItemText
                  primary={<strong>Address Line 2:</strong>}
                  secondary={values.addressLine2}
                />
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ListItem>
                <ListItemText
                  primary={<strong>City:</strong>}
                  secondary={values.city}
                />
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ListItem>
                <ListItemText
                  primary={<strong>Postal Code:</strong>}
                  secondary={values.postalCode}
                />
              </ListItem>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Buttons for navigating */}
      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={goBackToPreviousStep}
        >
          Go Back
        </Button>
        <Button variant="contained" color="primary" onClick={finalizeOrder}>
          Complete Order
        </Button>
      </Box>
    </Container>
  );
};

export default OrderReviewPage;
