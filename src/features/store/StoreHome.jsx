import { Outlet } from "react-router-dom";
import { ProductProvider } from "../../contexts/ProductContext";
import { StoreProvider } from "../../contexts/StoreContext";

function StoreHome() {
  return (
    <StoreProvider>
      <ProductProvider>
        <Outlet />
      </ProductProvider>
    </StoreProvider>
  );
}

export default StoreHome;
