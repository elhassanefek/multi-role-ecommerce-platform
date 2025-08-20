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

// Import new auth components
import CustomerLoginForm from "./features/auth/CustomerLoginForm";
import SellerLoginForm from "./features/auth/SellerLoginForm";
import CustomerSignupForm from "./features/auth/CustomerSignupForm";
import SellerSignupForm from "./features/auth/SellerSignupForm";
import Account from "./pages/seller/Account";
import { DarkModeProvider } from "./contexts/DarkModeContext";

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
      <DarkModeProvider>
        <CustomerFilterProvider>
          <ProductFilterProvider>
            <OrdersFilterProvider>
              <ReactQueryDevtools initialIsOpen={false} />
              <GlobalStyles />
              <BrowserRouter>
                <Routes>
                  {/* Home Page */}
                  <Route index element={<HomePage />} />

                  {/* Authentication Routes */}
                  <Route path="login">
                    {/* Default login page */}
                    <Route index element={<Login />} />
                    <Route path="customer" element={<CustomerLoginForm />} />
                    <Route path="seller" element={<SellerLoginForm />} />
                  </Route>

                  <Route path="signup">
                    <Route path="customer" element={<CustomerSignupForm />} />
                    <Route path="seller" element={<SellerSignupForm />} />
                  </Route>

                  {/* Customer Store Routes - Public access */}
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

                      {/* Protected Customer Routes - Need to be logged in as customer */}
                      <Route
                        path="my-orders"
                        element={
                          <ProtectedRoute allowedRoles={["customer"]}>
                            <MyOrders />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="my-orders/:orderId"
                        element={
                          <ProtectedRoute allowedRoles={["customer"]}>
                            <OrderViewPage />
                          </ProtectedRoute>
                        }
                      />
                    </Route>
                  </Route>

                  {/* Protected Seller Routes - Only sellers can access */}
                  <Route
                    path="seller"
                    element={
                      <ProtectedRoute allowedRoles={["seller"]}>
                        <AppLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="products" element={<Products />} />
                    <Route path="orders" element={<Orders />}>
                      {/* <Route path=":orderId" element={<OrderDetailPage />} /> */}
                    </Route>
                    <Route path="customers" element={<Customers />} />
                    <Route path="account" element={<Account />} />
                  </Route>

                  {/* Admin Routes - Only admins can access  */}
                  <Route
                    path="admin"
                    element={
                      <ProtectedRoute allowedRoles={["admin"]}>
                        <AppLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="users" element={<div>User Management</div>} />
                    <Route
                      path="sellers"
                      element={<div>Seller Management</div>}
                    />
                    <Route path="orders" element={<Orders />} />
                    <Route path="products" element={<Products />} />
                    <Route
                      path="settings"
                      element={<div>System Settings</div>}
                    />
                  </Route>

                  {/* Fallback for unknown routes */}
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </BrowserRouter>

              {/* Toast notifications */}
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
      </DarkModeProvider>
    </QueryClientProvider>
  );
}

export default App;
