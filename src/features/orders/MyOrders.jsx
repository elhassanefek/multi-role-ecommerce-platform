import { useOrders } from "./useOrders";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import CustomerOrderRow from "./CustomerOrderRow";

function MyOrders() {
  const { orders, isLoading, error } = useOrders();
  const currentCustomerId = "cust1001";
  const customerOrders = orders.filter(
    (order) => order.customerId === currentCustomerId
  );
  return (
    <Menus>
      <Table columns="2fr 1fr 1.5fr 1.5fr 1.5fr 2fr 1fr">
        <Table.Header>
          <div>OrderId</div>
          <div>Items</div>
          <div>Total Amount</div>
          <div>Payment Method</div>
          <div>Status</div>
          <div>Date</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={customerOrders}
          render={(order) => <CustomerOrderRow order={order} key={order.id} />}
        />
      </Table>
    </Menus>
  );
}

export default MyOrders;
