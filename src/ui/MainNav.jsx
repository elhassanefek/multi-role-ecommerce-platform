import styled from "styled-components";
import { Link } from "react-router-dom";
const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;
function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <Link to="dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="products">Products</Link>
        </li>
        <li>
          <Link to="orders">Orders</Link>
        </li>
        <li>
          <Link to="customers">Customers</Link>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
