import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  CardMedia,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Delete as DeleteIcon } from "@mui/icons-material";

const ProductCart = () => {
  const navigate = useNavigate();

  // Dummy cart data
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Product 1",
      description: "This is a product description.",
      price: 10.99,
      quantity: 1,
      image: "https://via.placeholder.com/150", // Example image URL
    },
    {
      id: 2,
      name: "Product 2",
      description: "This is another product description.",
      price: 15.49,
      quantity: 2,
      image: "https://via.placeholder.com/150", // Example image URL
    },
    {
      id: 3,
      name: "Product 3",
      description: "This is a different product description.",
      price: 20.0,
      quantity: 1,
      image: "https://via.placeholder.com/150", // Example image URL
    },
  ]);

  // Function to update the quantity of an item in the cart
  const handleQuantityChange = (index, event) => {
    const updatedCart = [...cart];
    const newQuantity = event.target.value > 0 ? event.target.value : 1;
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
  };

  // Function to remove an item from the cart
  const handleRemove = (index) => {
    const newCart = cart.filter((item, i) => i !== index);
    setCart(newCart);
  };

  const handleCheckout = () => {
    navigate("/user/checkout");
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Product Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="h6">Your cart is empty</Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {cart.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    alt={item.name}
                    height="200"
                    image={item.image} // Example image
                    title={item.name}
                  />
                  <CardContent>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.description}
                    </Typography>
                    <Typography variant="body1" color="primary">
                      Price: ${item.price}
                    </Typography>
                    <TextField
                      label="Quantity"
                      type="number"
                      variant="outlined"
                      value={item.quantity}
                      onChange={(event) => handleQuantityChange(index, event)}
                      fullWidth
                      InputProps={{
                        inputProps: {
                          min: 1,
                        },
                      }}
                      style={{ marginTop: "10px" }}
                    />
                    <Typography
                      variant="body1"
                      color="primary"
                      style={{ marginTop: "10px" }}
                    >
                      Total: ${item.price * item.quantity}
                    </Typography>
                    <IconButton
                      color="error"
                      onClick={() => handleRemove(index)}
                      aria-label="remove"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h6" color="primary" align="right" gutterBottom>
            Total: ${calculateTotal()}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckout}
            fullWidth
          >
            Proceed to Checkout
          </Button>
        </>
      )}
    </Container>
  );
};

export default ProductCart;
