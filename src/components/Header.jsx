import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";

const Header = ({ cart }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            {/* Removed the Menu icon */}
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Webshop
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex", sm: "none" } }}>
            {/* Products and Cart buttons for mobile */}
            <Link to="/products" style={{ textDecoration: "none" }}>
              <Button color="inherit" sx={{ color: "white" }}>
                Products
              </Button>
            </Link>
            <Link to="/user/productCart" style={{ textDecoration: "none" }}>
              <IconButton color="inherit">
                <Badge badgeContent={cart ? cart.length : 0} color="error">
                  <ShoppingCartIcon sx={{ color: "white" }} />
                </Badge>
              </IconButton>
            </Link>
          </Box>

          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            {/* Products and Cart buttons for desktop */}
            <Link to="/products" style={{ textDecoration: "none" }}>
              <Button color="inherit" sx={{ color: "white" }}>
                Products
              </Button>
            </Link>
            <Link to="/user/productCart" style={{ textDecoration: "none" }}>
              <IconButton color="inherit">
                <Badge badgeContent={cart ? cart.length : 0} color="error">
                  <ShoppingCartIcon sx={{ color: "white" }} />
                </Badge>
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
