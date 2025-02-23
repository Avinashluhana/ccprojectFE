// src/components/UserAddressForm.js
import React from "react";
import { Container, Grid, TextField, Button, Typography } from "@mui/material";

const ShippingAddressForm = ({ nextStep, handleChange, values }) => {
  const goToNextStep = (event) => {
    event.preventDefault();
    nextStep();
  };

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Shipping Details
      </Typography>
      <form onSubmit={goToNextStep}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              required
              onChange={handleChange("firstName")}
              value={values.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              required
              onChange={handleChange("lastName")}
              value={values.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              required
              onChange={handleChange("email")}
              value={values.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              required
              onChange={handleChange("phone")}
              value={values.phone}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address Line 1"
              variant="outlined"
              fullWidth
              required
              onChange={handleChange("addressLine1")}
              value={values.addressLine1}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address Line 2"
              variant="outlined"
              fullWidth
              onChange={handleChange("addressLine2")}
              value={values.addressLine2}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              variant="outlined"
              fullWidth
              required
              onChange={handleChange("city")}
              value={values.city}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Postal Code"
              variant="outlined"
              fullWidth
              required
              onChange={handleChange("postalCode")}
              value={values.postalCode}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{ marginTop: 3 }}
        >
          Proceed
        </Button>
      </form>
    </Container>
  );
};

export default ShippingAddressForm;
