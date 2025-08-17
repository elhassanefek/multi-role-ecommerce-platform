import { NavLink } from "react-router-dom";
function PageNav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/store">Visit Store</NavLink>
        </li>
        <li>
          <NavLink to="/seller/dashboard">Seller Dashboard</NavLink>
        </li>

        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
