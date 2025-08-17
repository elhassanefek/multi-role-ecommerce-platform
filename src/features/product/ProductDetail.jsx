import { useState } from "react";

import { useProduct } from "./useProduct";
import { formatCurrency } from "../../utils/helpers";
import { useAddProductToCart } from "../shoppingCart/useAddProductToCart";

function ProductDetail() {
  const { product: currentProduct, isLoading, error } = useProduct();

  const [quantity, setQuantity] = useState(1);
  const { addProduct } = useAddProductToCart();

  if (isLoading || !currentProduct?.id) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!currentProduct) return <p>Product not found</p>;

  return (
    <div>
      <h3>{currentProduct.name}</h3>
      <img src={currentProduct.image} alt={currentProduct.name} width={300} />
      <p>{currentProduct.description}</p>
      <p>Price: {formatCurrency(currentProduct.price)}</p>
      <p>Category: {currentProduct.category}</p>

      <button
        onClick={() =>
          addProduct({
            ...currentProduct,
            quantity: Number(quantity),
            stock: currentProduct.quantity,
          })
        }
      >
        add to cart
      </button>
      <label>
        Quantity:
        <input
          type="number"
          min="1"
          max={currentProduct.quantity}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </label>
    </div>
  );
}

export default ProductDetail;
