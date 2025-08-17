import Button from "../../ui/Button";

function OrderActions({ order }) {
  const canCancel =
    !order.isCancelled &&
    !order.isDelivered &&
    (order.status === "Pending" || order.status === "Confirmed");

  const handleCancel = () => {
    // Placeholder: confirm and trigger mutation
    alert("Cancel order feature coming soon.");
  };

  return (
    <div className="flex flex-col gap-2 mt-4">
      {order.trackingInfo?.trackingUrl && (
        <a
          href={order.trackingInfo.trackingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Track Shipment
        </a>
      )}

      {canCancel && (
        <Button onClick={handleCancel} variation="danger">
          Cancel Order
        </Button>
      )}
    </div>
  );
}

export default OrderActions;
