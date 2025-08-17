import { useNavigate } from "react-router-dom";

import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import Button from "../../ui/Button";
import { useCart } from "./useCart";
import { formatCurrency, getTotalPrice } from "../../utils/helpers";

function ShoppingCart() {
  const { shoppingCartProducts, isLoading, error } = useCart();
  const navigate = useNavigate();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Button
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        &larr; Back
      </Button>
      <ul>
        {shoppingCartProducts.length > 0 ? (
          shoppingCartProducts.map((product) => (
            <li key={product.id}>
              <CartItem item={product} />
            </li>
          ))
        ) : (
          <EmptyCart />
        )}
      </ul>

      {shoppingCartProducts.length > 0 && (
        <>
          <p>
            Total Price:{formatCurrency(getTotalPrice(shoppingCartProducts))}
          </p>
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate("../order");
            }}
          >
            Checkout
          </Button>
        </>
      )}
    </div>
  );
}

export default ShoppingCart;
