import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { ShoppingCartOutlined } from "@ant-design/icons";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  TextField,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";

const ProductList = ({ cart, setCart, cartCount, setCartCount }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [productItems, setProductItems] = useState([]);
  const [productQuantities, setProductQuantities] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const loadProducts = async () => {
    try {
      const result = await axios.get("/products");
      setProductItems(result.data);
      const initialQuantity = result.data.reduce((accumulator, item) => {
        accumulator[item.id] = 1;
        return accumulator;
      }, {});
      setProductQuantities(initialQuantity);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const addProductToCart = (product) => {
    const updatedCart = [...cart];
    updatedCart.push({
      ...product,
      quantity:
        productQuantities[product.id] > 0 ? productQuantities[product.id] : 1,
    });

    setCart(updatedCart);

    // Show Snackbar alert
    setSnackbarOpen(true);
    setSnackbarMessage(
      `${product.name} has been successfully added to your cart.`
    );
  };

  const updateSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const updateSortCriteria = (e) => {
    setSortCriteria(e.target.value);
  };

  const updateCategoryFilter = (e) => {
    setCategoryFilter(e.target.value);
  };

  const filteredItems = productItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (categoryFilter === "" || item.category === categoryFilter)
  );

  const sortedItems = productItems
    .filter(
      (item) =>
        (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (categoryFilter === "" || item.category === categoryFilter)
    )
    .sort((a, b) => {
      if (sortCriteria === "price-asc") return a.price - b.price;
      if (sortCriteria === "price-desc") return b.price - a.price;
      return 0;
    });

  const categoriesList = [
    ...new Set(productItems.map((item) => item.category)),
  ];

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="container" style={{ padding: "20px" }}>
      <h2 className="my-4">Products Catalog</h2>

      <Box sx={{ flexGrow: 1, marginBottom: 3 }}>
        <Grid container spacing={3}>
          {/* Search Input */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search products"
              variant="outlined"
              value={searchQuery}
              onChange={updateSearchQuery}
              sx={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
          </Grid>

          {/* Category Filter */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                value={categoryFilter}
                onChange={updateCategoryFilter}
                defaultValue=""
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              >
                <MenuItem value="">
                  <em>All Categories</em>
                </MenuItem>
                {categoriesList.map((category, index) => (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Sort Criteria */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Sort by</InputLabel>
              <Select
                label="Sort by"
                value={sortCriteria}
                onChange={updateSortCriteria}
                defaultValue=""
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              >
                <MenuItem value="">
                  <em>Sort by</em>
                </MenuItem>
                <MenuItem value="price-asc">Price: Low to High</MenuItem>
                <MenuItem value="price-desc">Price: High to Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={4}>
        {sortedItems.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                padding: "16px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
                transition: "transform 0.3s",
                ":hover": { transform: "scale(1.05)" },
              }}
            >
              <CardMedia
                component="img"
                alt={product.name}
                height="250"
                image={product.image}
                title={product.name}
                sx={{
                  borderRadius: "8px",
                  objectFit: "contain",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: "bold", marginBottom: "10px" }}
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginBottom: "10px" }}
                >
                  {product.description}
                </Typography>
                <Typography
                  variant="body1"
                  color="primary"
                  sx={{ marginBottom: "20px", fontWeight: "bold" }}
                >
                  Price: ${product.price}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ShoppingCartOutlined />}
                onClick={() => addProductToCart(product)}
                sx={{
                  backgroundColor: "#007BFF",
                  "&:hover": { backgroundColor: "#0056b3" },
                  width: "100%",
                  padding: "14px",
                  borderRadius: "8px",
                }}
              >
                Add to Cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Snackbar for success alert */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductList;
