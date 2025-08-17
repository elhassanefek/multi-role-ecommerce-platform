import { Link } from "react-router-dom";

function Product({ product, link }) {
  const { name, price } = product;

  return (
    <Link to={link}>
      <h3>{name}</h3>
      <p>${price}</p>
    </Link>
  );
}

export default Product;
