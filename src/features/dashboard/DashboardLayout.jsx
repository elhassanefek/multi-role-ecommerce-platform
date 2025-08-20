import styled from "styled-components";
import Stats from "./Stats";

import Spinner from "../../ui/Spinner";
import { useRecentOrders } from "./useRecentOrders";
import { useRecentCustomers } from "./useRecentCustomers";
import SalesChart from "./SalesChart";
import { useRecentProducts } from "./useRecentProducts";
import RecentOrders from "./RecentOrders";
import ProductChart from "./ProductChart";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { orders, isLoading: isLoading1, numDays } = useRecentOrders();
  const { customers, isLoading: isLoading2 } = useRecentCustomers();
  const { products, isLoading: isLoading3 } = useRecentProducts();
  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats orders={orders} customers={customers} products={products} />
      <RecentOrders />
      <ProductChart />
      <SalesChart orders={orders} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
