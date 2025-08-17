import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Store from "./pages/store/Store";
import Dashboard from "./pages/seller/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import StoreEntry from "./features/store/StoreEntry";

import StoreHome from "./features/store/StoreHome";
import ProductList from "./features/product/ProductList";
import ProductDetail from "./features/product/ProductDetail";
import ShoppingCart from "./features/shoppingCart/ShoppingCart";
import StoreFront from "./features/store/StoreFront";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Products from "./pages/seller/Products";
import Orders from "./pages/seller/Orders";
import Customers from "./pages/seller/Customers";
import AppLayout from "./ui/AppLayout";
import GlobalStyles from "./styles/GlobalStyles";
import { Toaster } from "react-hot-toast";
import Checkout from "./pages/store/Checkout";

import MyOrders from "./features/orders/MyOrders";
import OrderViewPage from "./features/orders/OrderViewPage";
import { OrdersFilterProvider } from "./contexts/OrdersFilterContext";
import { ProductFilterProvider } from "./contexts/ProductFilterContext";
import { CustomerFilterProvider } from "./contexts/CustomerFilterContext";
import ProtectedRoute from "./ui/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CustomerFilterProvider>
        <ProductFilterProvider>
          <OrdersFilterProvider>
            <ReactQueryDevtools initialIsOpen={false} />
            <GlobalStyles />
            <BrowserRouter>
              <Routes>
                <Route index element={<HomePage />} />

                <Route path="store" element={<Store />}>
                  <Route index element={<StoreEntry />} />
                  <Route path=":storeId" element={<StoreHome />}>
                    <Route index element={<StoreFront />} />
                    <Route path="products" element={<ProductList />} />

                    <Route
                      path="products/:productId"
                      element={<ProductDetail />}
                    />

                    <Route path="shoppingCart" element={<ShoppingCart />} />
                    <Route path="order" element={<Checkout />} />
                    <Route path="my-orders" element={<MyOrders />} />
                    <Route
                      path="my-orders/:orderId"
                      element={<OrderViewPage />}
                    />
                  </Route>
                </Route>
                <Route
                  path="seller"
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="products" element={<Products />} />
                  <Route path="orders" element={<Orders />}>
                    {/* <Route path="orders/:orderId" element={} /> */}
                  </Route>
                  <Route path="customers" element={<Customers />} />
                </Route>

                <Route path="login" element={<Login />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>
            <Toaster
              position="top-center"
              gutter={12}
              containerStyle={{ margin: "8px" }}
              toastOptions={{
                success: {
                  duration: 3000,
                },
                error: {
                  duration: 5000,
                },
                style: {
                  fontSize: "16px",
                  maxWidth: "500px",
                  padding: "16px 24px",
                  backgroundColor: "var(--color-grey-0)",
                  color: "var(--color-grey-700)",
                },
              }}
            />
          </OrdersFilterProvider>
        </ProductFilterProvider>
      </CustomerFilterProvider>
    </QueryClientProvider>
  );
}

export default App;
