import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  TextField,
  Box,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { ShoppingCartOutlined } from "@ant-design/icons";

const ProductList = ({ cart, setCart }) => {
  // Dummy data for products
  const productItems = [
    {
      id: 1,
      name: "Product 1",
      description: "This is a description for product 1.",
      price: 12.99,
      image: "https://via.placeholder.com/200",
      category: "Category 1",
    },
    {
      id: 2,
      name: "Product 2",
      description: "This is a description for product 2.",
      price: 25.99,
      image: "https://via.placeholder.com/200",
      category: "Category 2",
    },
    {
      id: 3,
      name: "Product 3",
      description: "This is a description for product 3.",
      price: 8.99,
      image: "https://via.placeholder.com/200",
      category: "Category 1",
    },
  ];

  const [cartQuantities, setCartQuantities] = useState({});

  const addProductToCart = (product) => {
    const updatedCart = [...cart];
    updatedCart.push({
      ...product,
      quantity: cartQuantities[product.id] || 1,
    });
    setCart(updatedCart);
  };

  const handleQuantityUpdate = (productId, event) => {
    setCartQuantities({
      ...cartQuantities,
      [productId]: Number(event.target.value),
    });
  };

  return (
    <Box sx={{ padding: "16px" }}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      <Grid container spacing={3}>
        {/* Dummy Products */}
        {productItems.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ padding: "16px" }}>
              <CardMedia
                component="img"
                alt={product.name}
                height="200"
                image={product.image}
                title={product.name}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography
                  variant="body1"
                  color="primary"
                  style={{ marginTop: "10px" }}
                >
                  Price: ${product.price}
                </Typography>
                <TextField
                  label="Quantity"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  value={cartQuantities[product.id] || 1}
                  onChange={(event) => handleQuantityUpdate(product.id, event)}
                  InputProps={{
                    inputProps: {
                      min: 1,
                      step: 1,
                    },
                  }}
                  fullWidth
                  style={{ marginTop: "10px" }}
                />
              </CardContent>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ShoppingCartOutlined />}
                onClick={() => addProductToCart(product)}
                style={{ margin: "10px" }}
              >
                Add to Cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Snackbar for success alert */}
      <Snackbar
        open={false}
        autoHideDuration={1500}
        onClose={() => {}}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => {}} severity="success" sx={{ width: "100%" }}>
          Product added to cart
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductList;
