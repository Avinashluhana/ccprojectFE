import React from "react";
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
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ProductCart = ({ cart, setCart }) => {
  const navigate = useNavigate();

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
      <Typography
        variant="h4"
        gutterBottom
        sx={{ marginBottom: "30px", fontWeight: "bold" }}
      >
        Your Shopping Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "gray" }}>
          Your cart is empty
        </Typography>
      ) : (
        <>
          <Grid container spacing={4}>
            {cart.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    padding: "16px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    borderRadius: "12px",
                    transition: "transform 0.3s",
                    ":hover": { transform: "scale(1.05)" },
                  }}
                >
                  {/* Card Image */}
                  <CardMedia
                    component="img"
                    alt={item.name}
                    height="200"
                    image={item.image}
                    title={item.name}
                    sx={{
                      borderRadius: "8px",
                      objectFit: "contain",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <CardContent>
                    {/* Product Name */}
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", marginBottom: "10px" }}
                    >
                      {item.name}
                    </Typography>

                    {/* Product Description */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ marginBottom: "10px" }}
                    >
                      {item.description}
                    </Typography>

                    {/* Product Price */}
                    <Typography
                      variant="body1"
                      color="primary"
                      sx={{ marginBottom: "10px", fontWeight: "bold" }}
                    >
                      Price: ${item.price}
                    </Typography>

                    {/* Quantity Input */}
                    <TextField
                      label="Quantity"
                      type="number"
                      variant="outlined"
                      value={item.quantity}
                      onChange={(event) => handleQuantityChange(index, event)}
                      fullWidth
                      sx={{ marginBottom: "16px" }}
                      InputProps={{
                        inputProps: { min: 1 },
                      }}
                    />

                    {/* Total Price */}
                    <Typography
                      variant="body1"
                      color="primary"
                      sx={{ marginBottom: "20px", fontWeight: "bold" }}
                    >
                      Total: ${item.price * item.quantity}
                    </Typography>

                    {/* Remove Item Button */}
                    <IconButton
                      color="error"
                      onClick={() => handleRemove(index)}
                      aria-label="remove"
                      sx={{ marginTop: "10px" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Total Price for All Items */}
          <Typography
            variant="h6"
            color="primary"
            align="right"
            sx={{ marginTop: "20px", fontWeight: "bold" }}
          >
            Total: ${calculateTotal()}
          </Typography>

          {/* Proceed to Checkout Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckout}
            fullWidth
            sx={{
              marginTop: "20px",
              padding: "14px",
              fontWeight: "bold",
              backgroundColor: "#007BFF",
              "&:hover": { backgroundColor: "#0056b3" },
            }}
          >
            Proceed to Checkout
          </Button>
        </>
      )}
    </Container>
  );
};

export default ProductCart;
