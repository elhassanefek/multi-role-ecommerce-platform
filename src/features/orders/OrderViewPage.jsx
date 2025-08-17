import OrderSummary from "./OrderSummary";
import OrderItems from "./OrderItems";
import OrderShipping from "./OrderShipping";
import OrderActions from "./OrderActions";

import { useOrder } from "./useOrder";
import { useParams } from "react-router-dom";

function OrderViewPage() {
  const { orderId } = useParams();
  const { order, isLoading } = useOrder(orderId);
  if (isLoading) return <div>Loading...</div>;
  if (!order) return <div>Order not found.</div>;
  console.log(order);
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <OrderSummary order={order} />
      <OrderShipping address={order.shippingAddress} />
      <OrderItems items={order.items} totalPrice={order.totalPrice} />
      <OrderActions order={order} />
    </div>
  );
}

export default OrderViewPage;
