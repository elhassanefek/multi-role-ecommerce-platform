import Table from "../../ui/Table";
import OrderItemRow from "./OrderItemRow";
function OrderItems({ items, totalPrice }) {
  return (
    <Table columns="1.5fr 1fr 1.5fr 1fr 1fr">
      <Table.Header>
        <div>Product</div>
        <div>Quantity</div>
        <div>Unit Price</div>
        <div>Subtotal</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={items}
        render={(item) => <OrderItemRow item={item} key={item.id} />}
      />
    </Table>
  );
}

export default OrderItems;
