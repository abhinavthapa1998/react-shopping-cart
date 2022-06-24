import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Button, Drawer, Typography } from "@mui/material";
import { LinearProgress } from "@mui/material";
import { Grid } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { StyledButton, Wrapper } from "./App.styles";
import Item from "./Item/Item";
import Cart from "./Cart/Cart";
export type CartItemType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: any;
  images: string[];
  amount: number;
};

const App = () => {
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const [offset, setOffset] = useState<number>(0);
  const [data, setData] = useState<CartItemType[]>([]);
  const isLoading = false;
  const error = false;
  const getProducts = async (): Promise<void> => {
    const payload = await (
      await fetch(
        `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=20`
      )
    ).json();
    setData(payload);
  };
  // const { data, isLoading, error } = useQuery<CartItemType[]>(
  //   "products",
  //   getProducts
  // );

  const getTotalItems = (items: CartItemType[]) => {
    return items.reduce((acc: number, item) => acc + item.amount, 0);
  };
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, [] as CartItemType[])
    );
  };
  const handlePage = (nav: string) => {
    if (nav === "next") {
      setOffset(offset + 20);
    }
    if (nav === "prev") {
      if (offset >= 20) {
        setOffset(offset - 20);
      }
      setOffset(0);
    }
  };

  useEffect(() => {
    getProducts();
    window.scrollTo(0, 0);
  }, [offset]);

  if (isLoading) {
    return <LinearProgress />;
  }
  if (error) {
    return <div>Something went wrong...</div>;
  }
  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCart />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4} md={2}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
      <div style={{ position: "relative", left: "50%" }}>
        <Button onClick={() => handlePage("prev")} variant="contained">
          Previous
        </Button>
        <Button onClick={() => handlePage("next")} variant="contained">
          Next
        </Button>
      </div>
    </Wrapper>
  );
};

export default App;
