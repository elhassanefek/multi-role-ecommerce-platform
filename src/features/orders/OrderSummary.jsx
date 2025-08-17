import { format } from "date-fns";

function OrderSummary({ order }) {
  const formattedDate = format(new Date(order.createdAt), "PPpp");

  return (
    <div>
      <h2 className="text-xl font-semibold">Order #{order.id}</h2>
      <p className="text-gray-600">Placed on: {formattedDate}</p>
      <p className="text-gray-600 capitalize">Payment: {order.paymentMethod}</p>
      <p className="text-gray-600">
        Status: <span className="font-medium">{order.status}</span>
      </p>
      <p className="font-bold text-lg mt-2">
        Total: ${order.totalPrice.toFixed(2)}
      </p>
    </div>
  );
}

export default OrderSummary;
