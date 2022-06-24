import { Button, Typography } from "@mui/material";
import { CartItemType } from "../App";
import { Wrapper } from "./CartItem.styles";

type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => {
  return (
    <Wrapper>
      <div>
        <Typography variant="h3">{item.title}</Typography>
        <div className="information">
          <Typography variant="body1">Price: ${item.price}</Typography>
          <Typography variant="body1">
            Total: ${(item.amount * item.price).toFixed(2)}
          </Typography>
        </div>
        <div className="button">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCart(item.id)}
          >
            -
          </Button>
          <Typography variant="body1">{item.amount}</Typography>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToCart(item)}
          >
            +
          </Button>
        </div>
      </div>
      <img src={item.images[0]} alt={item.title} />
    </Wrapper>
  );
};

export default CartItem;
