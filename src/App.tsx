import { useState } from "react";
import { useQuery } from "react-query";
import { Drawer } from "@mui/material";
import LinearProgress from "@mui/material";
import Grid from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import Badge from "@mui/material";
import { Wrapper } from "./App.styles";

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> => {
  return await (await fetch("https://fakestoreapi.com/products")).json();
};
const App = () => {
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  const getTotalItems = () => {
    return null;
  };
  const handleAddToCart = (clickedItem: CartItemType) => {
    return null;
  };
  const handleRemoveFromCart = () => {
    return null;
  };
  if (isLoading) {
    return <LinearProgress />;
  }
  if (error) {
    return <div>Something went wrong...</div>;
  }
  return <div className="App">Start</div>;
};

export default App;
