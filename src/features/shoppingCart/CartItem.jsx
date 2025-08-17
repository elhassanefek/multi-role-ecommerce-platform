import { useDeleteProductFromCart } from "./useDeleteProductFromCart";
import { useUpdateCartQuantity } from "./useUpdateCartQuantity";
import Button from "../../ui/Button";

import { formatCurrency } from "../../utils/helpers";

function CartItem({ item }) {
  const { id, name, quantity, price, stock } = item;
  const Price = price * quantity;
  const { deleteProduct } = useDeleteProductFromCart();
  const { updateQuantity } = useUpdateCartQuantity();
  let decdisabled;
  const handleDecrease = () => {
    updateQuantity({ id, quantity: quantity - 1 });
  };

  const handleIncrease = () => {
    updateQuantity({ id, quantity: quantity + 1 });
  };
  return (
    <>
      <p>
        <Button disabled={quantity === 1} onClick={handleDecrease}>
          −
        </Button>
        {quantity}× {name}
        <Button disabled={quantity >= stock} onClick={handleIncrease}>
          +
        </Button>
      </p>
      <p>{formatCurrency(Price)}</p>

      <Button onClick={() => deleteProduct(id)}>Delete</Button>
    </>
  );
}

export default CartItem;
