import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useOrders } from "./useOrders";
import toast from "react-hot-toast";
import OrderRow from "./OrderRow";
import { useOrdersFilter } from "../../contexts/OrdersFilterContext";
import { applyOrderFilters } from "./filterUtils";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";

function OrdersTable() {
  const { orders, isLoading, error } = useOrders();
  const { filters, searchTerm } = useOrdersFilter();
  const [searchParams] = useSearchParams();

  if (isLoading) return <p>Loading...</p>;
  if (error) return toast.error(error);

  const filteredOrders = applyOrderFilters(orders, filters, searchTerm);
  //sorting
  const sortBy = searchParams.get("sortBy") || "createdAt-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedOrders = filteredOrders.sort((a, b) => {
    const aField = a[field];
    const bField = b[field];
    if (field === "createdAt") {
      return (new Date(aField) - new Date(bField)) * modifier;
    }
    if (typeof aField === "number" && typeof bField === "number") {
      return (aField - bField) * modifier;
    }
    return String(aField).localeCompare(String(bField)) * modifier;
  });

  return (
    <Menus>
      <Table columns="1.2fr 1.5fr 1.2fr 1fr 1fr 1fr 1.2fr 0.5fr">
        <Table.Header>
          <div>Order ID</div>
          <div>Customer ID</div>
          <div>Items</div>
          <div>Total Price</div>
          <div>Payment Status</div>
          <div>Delivery Status</div>
          <div>Date</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedOrders}
          render={(order) => <OrderRow order={order} key={order.id} />}
        />
        <Table.Footer>
          <Pagination count={20} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default OrdersTable;
