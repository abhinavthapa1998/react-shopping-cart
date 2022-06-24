import { Button, Typography } from "@mui/material";
import { CartItemType } from "../App";
import { Wrapper } from "./Item.styles";
type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};
const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
  return (
    <Wrapper>
      <img src={item.images[0]} alt={item.title} />
      <div>
        <Typography variant="h6">{item.title}</Typography>
        <Typography variant="body1">{item.category.name}</Typography>
        <Typography variant="body2">{item.description}</Typography>
        <Typography variant="h6">${item.price}</Typography>
      </div>
      <Button onClick={() => handleAddToCart(item)}>Add to Cart</Button>
    </Wrapper>
  );
};

export default Item;
