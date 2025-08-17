import { Outlet } from "react-router-dom";
import OrdersTable from "../../features/orders/OrdersTable";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { useOrdersFilter } from "../../contexts/OrdersFilterContext";
import OrderTableOperations from "../../features/orders/OrderTableoperations";
import Search from "../../ui/Search";
import { useState, useEffect } from "react";

function Orders() {
  const [query, setQuery] = useState("");

  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const { setSearchTerm } = useOrdersFilter();
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    setSearchTerm(debouncedQuery);
  }, [debouncedQuery, setSearchTerm]);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Orders</Heading>
        <Search query={query} setQuery={setQuery} elements="orders" />
        <OrderTableOperations />
      </Row>
      <Outlet />
      <Row>
        <OrdersTable />
      </Row>
    </>
  );
}

export default Orders;
